/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { bfsFromSource } from '../ai/bfs';
import { GameState, Position, Treasure, TreasureType } from '../types/game';
import { createInitialBoard, createInitialGameState } from './mockGameState';

const BOARD_SIZE = 8;
const MIN_START_DISTANCE = 5;
const MAX_GENERATION_ATTEMPTS = 40;

/**
 * Deterministic seeded PRNG (mulberry32). Same seed -> same sequence -> same
 * board, so a specific layout can always be reproduced for debugging by
 * passing the same seed to generateRandomGameState.
 */
export function createSeededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return function next() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffledCells(rng: () => number): Position[] {
  const cells: Position[] = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      cells.push({ row: r, col: c });
    }
  }
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  return cells;
}

// Higher-value treasures are deliberately rarer.
const TREASURE_WEIGHTS: { value: number; type: TreasureType; weight: number }[] = [
  { value: 1, type: 'coin', weight: 45 },
  { value: 3, type: 'ruby', weight: 30 },
  { value: 5, type: 'gem', weight: 17 },
  { value: 10, type: 'gold', weight: 8 },
];
const TOTAL_WEIGHT = TREASURE_WEIGHTS.reduce((sum, w) => sum + w.weight, 0);

function pickWeightedTreasureKind(rng: () => number): { value: number; type: TreasureType } {
  let roll = rng() * TOTAL_WEIGHT;
  for (const entry of TREASURE_WEIGHTS) {
    if (roll < entry.weight) return entry;
    roll -= entry.weight;
  }
  return TREASURE_WEIGHTS[0];
}

function manhattan(a: Position, b: Position): number {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

/** Picks a human/AI start pair from a pool of free cells, preferring distance >= MIN_START_DISTANCE. */
function pickStartPair(pool: Position[], rng: () => number): { human: Position; ai: Position } {
  for (let minDist = MIN_START_DISTANCE; minDist >= 1; minDist--) {
    const candidates: [Position, Position][] = [];
    for (let i = 0; i < pool.length; i++) {
      for (let j = i + 1; j < pool.length; j++) {
        if (manhattan(pool[i], pool[j]) >= minDist) {
          candidates.push([pool[i], pool[j]]);
        }
      }
    }
    if (candidates.length > 0) {
      const [a, b] = candidates[Math.floor(rng() * candidates.length)];
      return rng() < 0.5 ? { human: a, ai: b } : { human: b, ai: a };
    }
  }
  // Pool has fewer than 2 cells — should not happen given board-size guards below.
  return { human: pool[0], ai: pool[0] };
}

export interface BoardGenerationResult {
  board: ReturnType<typeof createInitialBoard>;
  treasures: Treasure[];
  humanStart: Position;
  aiStart: Position;
}

/**
 * Attempts to build one valid randomized board from a seeded RNG:
 * random obstacles, 8-12 rarity-weighted treasures, and human/AI start
 * positions that are distinct, non-obstacle, non-treasure cells at least
 * MIN_START_DISTANCE apart where possible. Returns null if the resulting
 * layout fails validation (a treasure unreachable by either player, or too
 * few walkable cells) so the caller can retry with a fresh seed.
 */
function attemptGeneration(rng: () => number): BoardGenerationResult | null {
  const shuffled = shuffledCells(rng);

  const obstacleCount = 8 + Math.floor(rng() * 4); // 8..11
  const treasureCount = 8 + Math.floor(rng() * 5); // 8..12

  if (obstacleCount + treasureCount + 2 > shuffled.length) return null;

  const obstacles = shuffled.slice(0, obstacleCount);
  const treasureCells = shuffled.slice(obstacleCount, obstacleCount + treasureCount);
  const freePool = shuffled.slice(obstacleCount + treasureCount);

  // Enough open board left to place two distinct, reachable start positions.
  if (freePool.length < 2) return null;

  const treasures: Treasure[] = treasureCells.map((pos) => {
    const kind = pickWeightedTreasureKind(rng);
    return {
      id: `t-${kind.type}-${pos.row}-${pos.col}`,
      position: pos,
      value: kind.value,
      type: kind.type,
      collected: false,
    };
  });

  const { human: humanStart, ai: aiStart } = pickStartPair(freePool, rng);
  if (humanStart.row === aiStart.row && humanStart.col === aiStart.col) return null;

  const board = createInitialBoard(treasures, obstacles);

  // Validate: every treasure must be reachable from BOTH start positions.
  const humanBFS = bfsFromSource(humanStart, board);
  const aiBFS = bfsFromSource(aiStart, board);
  for (const t of treasures) {
    const key = `${t.position.row},${t.position.col}`;
    if (!humanBFS.distances.has(key) || !aiBFS.distances.has(key)) {
      return null;
    }
  }

  // Enough open board overall (guards against pathological obstacle placement).
  const walkableCount = BOARD_SIZE * BOARD_SIZE - obstacles.length;
  if (walkableCount < BOARD_SIZE * BOARD_SIZE * 0.6) return null;
  if (treasures.length < 8) return null;

  return { board, treasures, humanStart, aiStart };
}

/**
 * Generates a fresh, validated randomized 8x8 board (obstacles, treasures,
 * start positions) from a seed. Regenerates with derived seeds on validation
 * failure, and falls back to the original fixed layout if generation
 * repeatedly fails. Movement rules, scoring, BFS, Minimax/Alpha-Beta, and the
 * heuristic are untouched — only the layout changes.
 */
export function generateRandomBoard(seed: number): BoardGenerationResult {
  for (let attempt = 0; attempt < MAX_GENERATION_ATTEMPTS; attempt++) {
    const rng = createSeededRandom(seed + attempt * 7919);
    const result = attemptGeneration(rng);
    if (result) return result;
  }

  // Fallback: known-good fixed layout (never fails validation).
  const fallbackTreasures = createInitialGameState().treasures;
  return {
    board: createInitialBoard(fallbackTreasures),
    treasures: fallbackTreasures,
    humanStart: { row: 0, col: 1 },
    aiStart: { row: 6, col: 6 },
  };
}

/**
 * Builds a full, ready-to-play GameState from a randomized board. Same
 * shape/defaults as createInitialGameState — only the layout is randomized.
 * Everything downstream (BFS, heuristic, Minimax, Alpha-Beta, scoring, move
 * simulation, search visualization) consumes this GameState directly; there
 * is no separate board for the AI.
 */
export function generateRandomGameState(seed: number = Date.now()): GameState {
  const { board, treasures, humanStart, aiStart } = generateRandomBoard(seed);

  return {
    board,
    human: {
      id: 'human',
      name: 'You (Explorer)',
      position: humanStart,
      score: 0,
      treasuresCollected: 0,
      color: '#2563eb',
    },
    ai: {
      id: 'ai',
      name: 'AI Agent',
      position: aiStart,
      score: 0,
      treasuresCollected: 0,
      color: '#dc2626',
    },
    treasures,
    currentTurn: 'human',
    gameStatus: 'playing',
    winner: null,
    movesRemaining: 30,
    totalMoves: 30,
    difficulty: 'medium',
    algorithm: 'alpha-beta',
    searchDepth: 4,
    moveLog: [
      {
        id: 'init-0',
        turnNumber: 0,
        player: 'human',
        move: 'right',
        details: `New expedition charted on a freshly generated 8x8 island (seed ${seed}).`,
        timestamp: '00:00',
      },
    ],
    lastCollectedTreasure: null,
  };
}
