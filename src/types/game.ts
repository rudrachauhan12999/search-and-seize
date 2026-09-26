/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Position {
  row: number;
  col: number;
}

export type TreasureType = 'coin' | 'ruby' | 'gem' | 'gold';

export interface Treasure {
  id: string;
  position: Position;
  value: number;
  type: TreasureType;
  collected: boolean;
}

export type PlayerId = 'human' | 'ai';

export interface Player {
  id: PlayerId;
  name: string;
  position: Position;
  score: number;
  treasuresCollected: number;
  color?: string;
}

export type CellType = 'empty' | 'obstacle' | 'treasure';

export interface GameCell {
  row: number;
  col: number;
  type: CellType;
  treasure?: Treasure;
}

export type MoveDirection = 'up' | 'down' | 'left' | 'right';

export type GameStatus = 'playing' | 'thinking' | 'paused' | 'gameOver';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type AlgorithmType = 'minimax' | 'alpha-beta';

export interface MoveLogEntry {
  id: string;
  turnNumber: number;
  player: PlayerId;
  move: MoveDirection;
  treasureCollected?: {
    type: TreasureType;
    value: number;
  };
  details?: string;
  timestamp: string;
}

export interface GameState {
  board: GameCell[][];
  human: Player;
  ai: Player;
  treasures: Treasure[];
  currentTurn: PlayerId;
  gameStatus: GameStatus;
  winner?: PlayerId | 'draw' | null;
  movesRemaining: number;
  totalMoves: number;
  difficulty: DifficultyLevel;
  algorithm: AlgorithmType;
  searchDepth: number;
  moveLog: MoveLogEntry[];
  lastCollectedTreasure?: {
    type: TreasureType;
    value: number;
    position: Position;
    player: PlayerId;
  } | null;
}
