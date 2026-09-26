/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameCell, MoveDirection, Position } from '../types/game';

export const MOVE_DELTAS: Record<MoveDirection, { dr: number; dc: number }> = {
  up: { dr: -1, dc: 0 },
  down: { dr: 1, dc: 0 },
  left: { dr: 0, dc: -1 },
  right: { dr: 0, dc: 1 },
};

export const ALL_DIRECTIONS: MoveDirection[] = ['up', 'down', 'left', 'right'];

export function applyDelta(pos: Position, move: MoveDirection): Position {
  const { dr, dc } = MOVE_DELTAS[move];
  return { row: pos.row + dr, col: pos.col + dc };
}

/**
 * Check whether a cell position is inside board boundaries and not an obstacle,
 * and (optionally) not occupied by the other player.
 */
export function isValidCell(pos: Position, board: GameCell[][], otherPlayerPos?: Position): boolean {
  const rows = board.length;
  const cols = board[0]?.length ?? 0;

  if (pos.row < 0 || pos.row >= rows || pos.col < 0 || pos.col >= cols) {
    return false;
  }
  const cell = board[pos.row]?.[pos.col];
  if (!cell || cell.type === 'obstacle') {
    return false;
  }
  if (otherPlayerPos && pos.row === otherPlayerPos.row && pos.col === otherPlayerPos.col) {
    return false;
  }
  return true;
}

/**
 * Returns the array of legal move directions from a position, respecting
 * board boundaries, obstacles, and (optionally) the other player's occupied cell.
 */
export function getValidMoves(pos: Position, board: GameCell[][], otherPlayerPos?: Position): MoveDirection[] {
  return ALL_DIRECTIONS.filter((dir) => isValidCell(applyDelta(pos, dir), board, otherPlayerPos));
}
