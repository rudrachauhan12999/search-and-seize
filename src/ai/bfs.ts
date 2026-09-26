/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameCell, Position, Treasure } from '../types/game';

const cellKey = (row: number, col: number): string => `${row},${col}`;

export interface BFSResult {
  /** Shortest known distance (in steps) from the source to every visited cell. */
  distances: Map<string, number>;
  /** Predecessor cell key for path reconstruction ("row,col" -> parent "row,col" | null). */
  parents: Map<string, string | null>;
  /** Cells in the exact order they were dequeued/explored (BFS frontier order). */
  order: Position[];
}

/**
 * Real breadth-first search from a single source cell across the board.
 * Respects board boundaries and treats 'obstacle' cells as impassable walls.
 * Tracks visited cells (distances), predecessor cells (parents) and the
 * exploration order (for the search visualization).
 */
export function bfsFromSource(start: Position, board: GameCell[][]): BFSResult {
  const rows = board.length;
  const cols = board[0]?.length ?? 0;

  const distances = new Map<string, number>();
  const parents = new Map<string, string | null>();
  const order: Position[] = [];

  const startKey = cellKey(start.row, start.col);
  const startCell = board[start.row]?.[start.col];
  if (!startCell || startCell.type === 'obstacle') {
    return { distances, parents, order };
  }

  distances.set(startKey, 0);
  parents.set(startKey, null);

  const queue: Position[] = [start];
  let head = 0;

  const deltas = [
    { dr: -1, dc: 0 },
    { dr: 1, dc: 0 },
    { dr: 0, dc: -1 },
    { dr: 0, dc: 1 },
  ];

  while (head < queue.length) {
    const current = queue[head++];
    order.push(current);
    const currentKey = cellKey(current.row, current.col);
    const currentDist = distances.get(currentKey)!;

    for (const { dr, dc } of deltas) {
      const nr = current.row + dr;
      const nc = current.col + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

      const cell = board[nr]?.[nc];
      if (!cell || cell.type === 'obstacle') continue;

      const neighborKey = cellKey(nr, nc);
      if (distances.has(neighborKey)) continue;

      distances.set(neighborKey, currentDist + 1);
      parents.set(neighborKey, currentKey);
      queue.push({ row: nr, col: nc });
    }
  }

  return { distances, parents, order };
}

/**
 * Reconstructs the shortest path from `start` to `goal` using the parent map
 * produced by bfsFromSource. Returns null if `goal` was never reached.
 */
export function reconstructPath(result: BFSResult, start: Position, goal: Position): Position[] | null {
  const goalKey = cellKey(goal.row, goal.col);
  if (!result.distances.has(goalKey)) return null;

  const path: Position[] = [];
  let currentKey: string | null = goalKey;

  while (currentKey !== null) {
    const [r, c] = currentKey.split(',').map(Number);
    path.push({ row: r, col: c });
    if (r === start.row && c === start.col) break;
    currentKey = result.parents.get(currentKey) ?? null;
  }

  path.reverse();
  return path;
}

/**
 * Full BFS shortest-path query between two cells (used for path visualization
 * and distance lookups). Returns Infinity distance / null path if unreachable.
 */
export function bfsShortestPath(
  start: Position,
  goal: Position,
  board: GameCell[][]
): { path: Position[] | null; distance: number; order: Position[] } {
  const result = bfsFromSource(start, board);
  const path = reconstructPath(result, start, goal);
  const distance = path ? path.length - 1 : Infinity;
  return { path, distance, order: result.order };
}

export interface ReachableTreasure {
  treasureId: string;
  distance: number;
  path: Position[];
}

/**
 * Identifies every uncollected treasure reachable from `start` via walkable
 * (non-obstacle) cells, with its true BFS shortest-path distance and route.
 */
export function findReachableTreasures(
  start: Position,
  board: GameCell[][],
  treasures: Treasure[]
): ReachableTreasure[] {
  const result = bfsFromSource(start, board);
  const reachable: ReachableTreasure[] = [];

  for (const treasure of treasures) {
    if (treasure.collected) continue;
    const key = cellKey(treasure.position.row, treasure.position.col);
    const distance = result.distances.get(key);
    if (distance === undefined) continue;

    const path = reconstructPath(result, start, treasure.position) ?? [start, treasure.position];
    reachable.push({ treasureId: treasure.id, distance, path });
  }

  return reachable;
}
