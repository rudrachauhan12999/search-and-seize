/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameCell, GameState, Position, Treasure } from '../types/game';

export const INITIAL_TREASURES: Treasure[] = [
  { id: 't-gem-0-2', position: { row: 0, col: 2 }, value: 5, type: 'gem', collected: false },
  { id: 't-coin-0-6', position: { row: 0, col: 6 }, value: 1, type: 'coin', collected: false },
  { id: 't-coin-1-4', position: { row: 1, col: 4 }, value: 1, type: 'coin', collected: false },
  { id: 't-coin-2-1', position: { row: 2, col: 1 }, value: 1, type: 'coin', collected: false },
  { id: 't-ruby-2-3', position: { row: 2, col: 3 }, value: 3, type: 'ruby', collected: false },
  { id: 't-gold-3-3', position: { row: 3, col: 3 }, value: 10, type: 'gold', collected: false },
  { id: 't-coin-3-7', position: { row: 3, col: 7 }, value: 1, type: 'coin', collected: false },
  { id: 't-gem-4-6', position: { row: 4, col: 6 }, value: 5, type: 'gem', collected: false },
  { id: 't-ruby-5-3', position: { row: 5, col: 3 }, value: 3, type: 'ruby', collected: false },
  { id: 't-ruby-6-1', position: { row: 6, col: 1 }, value: 3, type: 'ruby', collected: false },
  { id: 't-coin-7-0', position: { row: 7, col: 0 }, value: 1, type: 'coin', collected: false },
];

export const OBSTACLE_POSITIONS = [
  { row: 1, col: 1 },
  { row: 1, col: 5 },
  { row: 2, col: 5 },
  { row: 3, col: 0 },
  { row: 3, col: 4 },
  { row: 4, col: 2 },
  { row: 4, col: 5 },
  { row: 5, col: 1 },
  { row: 6, col: 4 },
  { row: 7, col: 4 },
];

export function createInitialBoard(
  treasures: Treasure[],
  obstaclePositions: Position[] = OBSTACLE_POSITIONS
): GameCell[][] {
  const board: GameCell[][] = [];

  for (let r = 0; r < 8; r++) {
    const rowCells: GameCell[] = [];
    for (let c = 0; c < 8; c++) {
      const isObstacle = obstaclePositions.some((o) => o.row === r && o.col === c);
      const treasure = treasures.find((t) => t.position.row === r && t.position.col === c && !t.collected);

      if (isObstacle) {
        rowCells.push({ row: r, col: c, type: 'obstacle' });
      } else if (treasure) {
        rowCells.push({ row: r, col: c, type: 'treasure', treasure });
      } else {
        rowCells.push({ row: r, col: c, type: 'empty' });
      }
    }
    board.push(rowCells);
  }

  return board;
}

export function createInitialGameState(): GameState {
  const initialTreasures = INITIAL_TREASURES.map((t) => ({ ...t }));
  const board = createInitialBoard(initialTreasures);

  return {
    board,
    human: {
      id: 'human',
      name: 'You (Explorer)',
      position: { row: 0, col: 1 },
      score: 0,
      treasuresCollected: 0,
      color: '#2563eb', // Blue
    },
    ai: {
      id: 'ai',
      name: 'AI Agent',
      position: { row: 6, col: 6 },
      score: 0,
      treasuresCollected: 0,
      color: '#dc2626', // Red
    },
    treasures: initialTreasures,
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
        details: 'Expedition started on parchment grid (8x8)',
        timestamp: '00:00',
      },
    ],
    lastCollectedTreasure: null,
  };
}
