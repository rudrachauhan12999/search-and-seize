/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AIAnalysis, AISearchVisualizationData, BranchEvaluation, SearchCell } from '../types/ai';
import { GameState, MoveDirection, Position } from '../types/game';
import { bfsFromSource, findReachableTreasures } from './bfs';
import { evaluateGameState } from './heuristic';
import { generateWhyThisMove, searchBestMove } from './minimax';
import { applyDelta, getValidMoves, isValidCell } from './moves';

/**
 * ============================================================================
 * AI INTEGRATION CONTRACT
 * ============================================================================
 * This module wires the frontend UI to the real classical AI engine:
 *   - BFS pathfinding/search                -> ./bfs.ts
 *   - Heuristic evaluation                  -> ./heuristic.ts
 *   - Minimax / Alpha-Beta game-tree search -> ./minimax.ts
 *   - Legal-move / board rules              -> ./moves.ts
 *   - Pure, non-mutating state simulation    -> ./simulate.ts
 *
 * The exported function signatures below are unchanged so the UI (App.tsx
 * and every component under src/components) needs no modification.
 * ============================================================================
 */

export { isValidCell, getValidMoves };

/**
 * Calculate the deterministic heuristic evaluation for a game state.
 * Total = Score Advantage + Treasure Advantage + Distance Advantage (BFS) + Control Bonus.
 */
export { evaluateGameState };

/**
 * Returns the best move for the AI player, computed via depth-limited
 * Minimax or Alpha-Beta pruning (per gameState.algorithm) over gameState.searchDepth plies.
 */
export async function getBestAIMove(gameState: GameState): Promise<MoveDirection> {
  const validMoves = getValidMoves(gameState.ai.position, gameState.board, gameState.human.position);
  if (validMoves.length === 0) {
    return 'up';
  }

  const depth = gameState.searchDepth || 4;
  const isAlphaBeta = gameState.algorithm === 'alpha-beta';
  const result = searchBestMove(gameState, depth, isAlphaBeta);
  return result.bestMove;
}

/**
 * Returns the AI analysis telemetry: real node counts, real pruning counts,
 * and a state-derived explanation, all produced by the same search that
 * getBestAIMove uses (so the displayed decision and the applied move match).
 */
export async function getAIAnalysis(gameState: GameState): Promise<AIAnalysis> {
  const depth = gameState.searchDepth || 4;
  const isAlphaBeta = gameState.algorithm === 'alpha-beta';
  const validMoves = getValidMoves(gameState.ai.position, gameState.board, gameState.human.position);

  if (validMoves.length === 0) {
    const heuristic = evaluateGameState(gameState);
    return {
      algorithm: gameState.algorithm,
      depth,
      nodesExplored: 0,
      nodesPruned: 0,
      bestMove: null,
      evaluation: heuristic.totalEvaluation,
      status: 'completed',
      statusMessage: 'No legal moves available for the AI from its current position.',
      whyThisMove: ['The AI is boxed in by obstacles or the opponent and has no legal move this turn.'],
      branchEvaluations: [],
    };
  }

  const result = searchBestMove(gameState, depth, isAlphaBeta);
  const whyThisMove = generateWhyThisMove(gameState, result.bestMove, result.rootBranches, depth);

  const branchEvaluations: BranchEvaluation[] = result.rootBranches.map((branch) => ({
    move: branch.move,
    score: Math.round(branch.score),
    pruned: branch.invalid,
    notes: branch.invalid
      ? 'Obstacle, boundary, or occupied cell'
      : branch.move === result.bestMove
      ? 'Optimal branch selected'
      : 'Explored',
  }));

  return {
    algorithm: gameState.algorithm,
    depth,
    nodesExplored: result.stats.nodesExplored,
    nodesPruned: result.stats.nodesPruned,
    bestMove: result.bestMove,
    evaluation: Math.round(result.evaluation),
    status: 'completed',
    statusMessage: `Decision computed via ${isAlphaBeta ? 'Alpha-Beta Pruning' : 'Minimax Search'} at depth ${depth}.`,
    whyThisMove,
    branchEvaluations,
  };
}

/**
 * Finds real shortest walkable paths from the AI to every reachable,
 * uncollected treasure using BFS (real distances/paths, not Manhattan).
 */
export function findTreasurePaths(
  gameState: GameState
): { treasureId: string; distance: number; path: Position[] }[] {
  return findReachableTreasures(gameState.ai.position, gameState.board, gameState.treasures);
}

/**
 * Returns AI Search Visualization data driven by real BFS exploration and
 * the actual Minimax/Alpha-Beta root decision: explored BFS wave, candidate
 * paths to secondary treasures, the selected route for the chosen move, and
 * opponent threat cells.
 */
export async function getSearchVisualization(gameState: GameState): Promise<AISearchVisualizationData> {
  const aiPos = gameState.ai.position;
  const humanPos = gameState.human.position;
  const board = gameState.board;

  const cells: SearchCell[] = [];
  const setCell = (row: number, col: number, state: SearchCell['state'], depth?: number) => {
    const idx = cells.findIndex((c) => c.row === row && c.col === col);
    const entry: SearchCell = { row, col, state, depth };
    if (idx >= 0) cells[idx] = entry;
    else cells.push(entry);
  };

  // 1. BFS exploration wave from the AI's position (bounded radius so the overlay stays legible).
  const aiBFS = bfsFromSource(aiPos, board);
  for (const cell of aiBFS.order) {
    if (cell.row === aiPos.row && cell.col === aiPos.col) continue;
    const distance = aiBFS.distances.get(`${cell.row},${cell.col}`)!;
    if (distance <= 3) {
      setCell(cell.row, cell.col, 'explored', distance);
    }
  }

  // 2. Rank reachable treasures by BFS-weighted proximity (value / (1 + distance)).
  const reachable = findReachableTreasures(aiPos, board, gameState.treasures);
  const ranked = reachable
    .map((r) => {
      const treasure = gameState.treasures.find((t) => t.id === r.treasureId)!;
      return { ...r, treasure, proximity: treasure.value / (1 + r.distance) };
    })
    .sort((a, b) => b.proximity - a.proximity);

  // Secondary reachable treasures become candidate-path cells.
  for (const target of ranked.slice(1, 3)) {
    for (const pos of target.path.slice(1)) {
      const existing = cells.find((c) => c.row === pos.row && c.col === pos.col);
      if (!existing) setCell(pos.row, pos.col, 'candidate');
    }
  }

  // 3. Real root decision from Minimax/Alpha-Beta, and the BFS route it implies.
  const depth = gameState.searchDepth || 4;
  const isAlphaBeta = gameState.algorithm === 'alpha-beta';
  const validMoves = getValidMoves(aiPos, board, humanPos);

  let selectedPath: Position[] = [];
  if (validMoves.length > 0) {
    const { bestMove } = searchBestMove(gameState, depth, isAlphaBeta);
    const nextPos = applyDelta(aiPos, bestMove);
    selectedPath = [aiPos, nextPos];

    const primaryTarget = ranked[0];
    if (primaryTarget) {
      const goal = primaryTarget.treasure.position;
      const fromNext = bfsFromSource(nextPos, board);
      const routeFromNext = fromNext.distances.has(`${goal.row},${goal.col}`)
        ? (function reconstruct() {
            const path: Position[] = [];
            let key: string | null = `${goal.row},${goal.col}`;
            while (key !== null) {
              const [r, c] = key.split(',').map(Number);
              path.push({ row: r, col: c });
              if (r === nextPos.row && c === nextPos.col) break;
              key = fromNext.parents.get(key) ?? null;
            }
            return path.reverse();
          })()
        : [nextPos];
      selectedPath = [aiPos, ...routeFromNext];
    }
  }

  for (const pos of selectedPath) {
    setCell(pos.row, pos.col, 'selected');
  }

  // 4. Opponent threat zone: cells one step from the human's current position.
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c].type === 'obstacle') continue;
      const distToHuman = Math.abs(r - humanPos.row) + Math.abs(c - humanPos.col);
      if (distToHuman === 1 && !cells.some((cell) => cell.row === r && cell.col === c)) {
        setCell(r, c, 'threat');
      }
    }
  }

  return {
    cells,
    bfsPathToNearestTreasure: ranked[0]?.path ?? [],
    selectedPath,
    showOverlay: true,
  };
}
