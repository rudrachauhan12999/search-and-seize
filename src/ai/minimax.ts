/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameState, MoveDirection, PlayerId } from '../types/game';
import { findReachableTreasures } from './bfs';
import { evaluateGameState } from './heuristic';
import { ALL_DIRECTIONS, applyDelta, getValidMoves } from './moves';
import { applyMove, applyPass, isTerminalState } from './simulate';

export interface SearchStats {
  nodesExplored: number;
  nodesPruned: number;
}

export interface RootBranch {
  move: MoveDirection;
  score: number;
  /** True only for moves that are illegal from the root (obstacle/boundary/occupied) — never explored. */
  invalid: boolean;
}

export interface SearchResult {
  bestMove: MoveDirection;
  evaluation: number;
  stats: SearchStats;
  rootBranches: RootBranch[];
}

/**
 * Depth-limited Minimax: AI is the MAX player, human is the MIN player.
 * Alternates plies, applying moves to cloned states (never mutating `state`),
 * and falls back to the heuristic at the depth limit or a terminal state.
 */
function minimaxValue(state: GameState, depth: number, maximizing: boolean, stats: SearchStats): number {
  stats.nodesExplored++;

  if (depth === 0 || isTerminalState(state)) {
    return evaluateGameState(state).totalEvaluation;
  }

  const playerId: PlayerId = maximizing ? 'ai' : 'human';
  const mover = maximizing ? state.ai : state.human;
  const other = maximizing ? state.human : state.ai;
  const moves = getValidMoves(mover.position, state.board, other.position);

  if (moves.length === 0) {
    return minimaxValue(applyPass(state, playerId), depth - 1, !maximizing, stats);
  }

  let value = maximizing ? -Infinity : Infinity;
  for (const move of moves) {
    const childValue = minimaxValue(applyMove(state, playerId, move), depth - 1, !maximizing, stats);
    value = maximizing ? Math.max(value, childValue) : Math.min(value, childValue);
  }
  return value;
}

/**
 * Minimax with Alpha-Beta pruning layered on top. Returns the exact same
 * value as full Minimax for the same state/depth — alpha-beta only skips
 * subtrees that are provably irrelevant to the final decision. Counts real
 * cutoffs (nodesPruned = legal sibling branches never explored after a cutoff).
 */
function alphaBetaValue(
  state: GameState,
  depth: number,
  alpha: number,
  beta: number,
  maximizing: boolean,
  stats: SearchStats
): number {
  stats.nodesExplored++;

  if (depth === 0 || isTerminalState(state)) {
    return evaluateGameState(state).totalEvaluation;
  }

  const playerId: PlayerId = maximizing ? 'ai' : 'human';
  const mover = maximizing ? state.ai : state.human;
  const other = maximizing ? state.human : state.ai;
  const moves = getValidMoves(mover.position, state.board, other.position);

  if (moves.length === 0) {
    return alphaBetaValue(applyPass(state, playerId), depth - 1, alpha, beta, !maximizing, stats);
  }

  if (maximizing) {
    let value = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      const childValue = alphaBetaValue(
        applyMove(state, playerId, moves[i]),
        depth - 1,
        alpha,
        beta,
        false,
        stats
      );
      value = Math.max(value, childValue);
      alpha = Math.max(alpha, value);
      if (alpha >= beta) {
        stats.nodesPruned += moves.length - (i + 1);
        break;
      }
    }
    return value;
  }

  let value = Infinity;
  for (let i = 0; i < moves.length; i++) {
    const childValue = alphaBetaValue(
      applyMove(state, playerId, moves[i]),
      depth - 1,
      alpha,
      beta,
      true,
      stats
    );
    value = Math.min(value, childValue);
    beta = Math.min(beta, value);
    if (alpha >= beta) {
      stats.nodesPruned += moves.length - (i + 1);
      break;
    }
  }
  return value;
}

/**
 * Root decision: generates the AI's legal moves, searches each resulting
 * branch (human replies as MIN) via Minimax or Alpha-Beta to `depth` plies,
 * and picks the branch with the highest value. Both algorithms share the
 * same move ordering and tie-break rule, so they agree on the chosen move.
 */
export function searchBestMove(gameState: GameState, depth: number, useAlphaBeta: boolean): SearchResult {
  const stats: SearchStats = { nodesExplored: 0, nodesPruned: 0 };
  const legalMoves = getValidMoves(gameState.ai.position, gameState.board, gameState.human.position);

  if (legalMoves.length === 0) {
    const evaluation = evaluateGameState(gameState).totalEvaluation;
    return {
      bestMove: ALL_DIRECTIONS[0],
      evaluation,
      stats,
      rootBranches: ALL_DIRECTIONS.map((move) => ({ move, score: -999, invalid: true })),
    };
  }

  let bestMove = legalMoves[0];
  let bestScore = -Infinity;
  let alpha = -Infinity;
  const beta = Infinity;

  const exploredBranches: RootBranch[] = [];

  for (const move of legalMoves) {
    const nextState = applyMove(gameState, 'ai', move);
    const score = useAlphaBeta
      ? alphaBetaValue(nextState, depth - 1, alpha, beta, false, stats)
      : minimaxValue(nextState, depth - 1, false, stats);

    exploredBranches.push({ move, score, invalid: false });

    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
    if (useAlphaBeta) {
      alpha = Math.max(alpha, bestScore);
    }
  }

  const rootBranches: RootBranch[] = ALL_DIRECTIONS.map((move) => {
    const explored = exploredBranches.find((b) => b.move === move);
    return explored ?? { move, score: -999, invalid: true };
  });

  return { bestMove, evaluation: bestScore, stats, rootBranches };
}

/**
 * Builds a human-readable, state-derived explanation of why `bestMove` was
 * chosen — grounded in the actual search/heuristic numbers for this state,
 * so the explanation changes with the position instead of being static text.
 */
export function generateWhyThisMove(
  gameState: GameState,
  bestMove: MoveDirection,
  rootBranches: RootBranch[],
  depth: number
): string[] {
  const reasons: string[] = [];
  const nextPos = applyDelta(gameState.ai.position, bestMove);
  const nextState = applyMove(gameState, 'ai', bestMove);

  const collected = gameState.treasures.find(
    (t) => !t.collected && t.position.row === nextPos.row && t.position.col === nextPos.col
  );

  if (collected) {
    reasons.push(
      `${bestMove.toUpperCase()} was selected because it immediately collects the ${collected.type} worth ${collected.value} points.`
    );
  }

  const rankByProximity = (list: { treasureId: string; distance: number }[], treasures: GameState['treasures']) =>
    list
      .map((r) => ({ ...r, treasure: treasures.find((t) => t.id === r.treasureId)! }))
      .sort((a, b) => b.treasure.value / (1 + b.distance) - a.treasure.value / (1 + a.distance));

  const beforeReachable = rankByProximity(
    findReachableTreasures(gameState.ai.position, gameState.board, gameState.treasures),
    gameState.treasures
  );
  const afterReachable = rankByProximity(
    findReachableTreasures(nextPos, gameState.board, nextState.treasures),
    nextState.treasures
  );

  const topBefore = beforeReachable[0];
  const topAfter = topBefore ? afterReachable.find((r) => r.treasureId === topBefore.treasureId) : undefined;

  if (!collected && topBefore && topAfter) {
    if (topAfter.distance < topBefore.distance) {
      reasons.push(
        `It shortens the BFS path to the highest-value reachable treasure (${topBefore.treasure.type}, value ${topBefore.treasure.value}) from ${topBefore.distance} to ${topAfter.distance} step(s).`
      );
    } else if (topAfter.distance > topBefore.distance) {
      reasons.push(
        `Although it moves away from the ${topBefore.treasure.type} in the short term, the search found this outweighed by a better outcome ${depth} plies ahead.`
      );
    }
  }

  const chosen = rootBranches.find((b) => b.move === bestMove);
  const consideredCount = rootBranches.filter((b) => !b.invalid).length;
  if (chosen) {
    const scoreStr = chosen.score >= 0 ? `+${chosen.score}` : `${chosen.score}`;
    reasons.push(
      `Among ${consideredCount} legal move${consideredCount === 1 ? '' : 's'} searched to depth ${depth}, ${bestMove.toUpperCase()} produced the best minimax evaluation (${scoreStr}).`
    );
  }

  const heuristicBefore = evaluateGameState(gameState);
  const heuristicAfter = evaluateGameState(nextState);
  if (heuristicAfter.controlBonus > heuristicBefore.controlBonus) {
    reasons.push('It also improves board control, moving toward a more central and/or mobile position.');
  } else if (heuristicAfter.distanceAdvantage > heuristicBefore.distanceAdvantage) {
    reasons.push('It also increases the AI\'s BFS-weighted treasure proximity relative to the opponent.');
  }

  return reasons;
}
