/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameState, MoveDirection, Player, PlayerId } from '../types/game';
import { applyDelta } from './moves';

/**
 * Mirrors the game-over rule used by the real game loop (App.tsx):
 * the game ends when every treasure is collected or moves run out.
 */
export function isTerminalState(state: GameState): boolean {
  return state.treasures.every((t) => t.collected) || state.movesRemaining <= 0;
}

function finalizeTerminal(state: GameState): GameState {
  if (!isTerminalState(state)) return state;

  const winner =
    state.human.score > state.ai.score ? 'human' : state.ai.score > state.human.score ? 'ai' : 'draw';

  return { ...state, gameStatus: 'gameOver', winner };
}

/**
 * Applies a single player's move to a CLONED game state and returns the
 * resulting state. Never mutates the state passed in — the board array is
 * reused by reference (obstacles never change), while the player, treasure,
 * and turn fields that actually change are replaced with new objects.
 *
 * Mirrors the real move/turn/scoring rules in App.tsx: move onto a cell,
 * collect any uncollected treasure there, decrement moves remaining, and
 * hand the turn to the other player.
 */
export function applyMove(state: GameState, playerId: PlayerId, move: MoveDirection): GameState {
  const mover = playerId === 'ai' ? state.ai : state.human;
  const newPos = applyDelta(mover.position, move);

  let treasures = state.treasures;
  let collectedValue = 0;
  let didCollect = false;

  for (let i = 0; i < treasures.length; i++) {
    const t = treasures[i];
    if (!t.collected && t.position.row === newPos.row && t.position.col === newPos.col) {
      didCollect = true;
      collectedValue = t.value;
      treasures = treasures.map((tt, idx) => (idx === i ? { ...tt, collected: true } : tt));
      break;
    }
  }

  const updatedMover: Player = {
    ...mover,
    position: newPos,
    score: mover.score + collectedValue,
    treasuresCollected: mover.treasuresCollected + (didCollect ? 1 : 0),
  };

  const nextState: GameState = {
    ...state,
    ai: playerId === 'ai' ? updatedMover : state.ai,
    human: playerId === 'human' ? updatedMover : state.human,
    treasures,
    movesRemaining: state.movesRemaining - 1,
    currentTurn: playerId === 'ai' ? 'human' : 'ai',
  };

  return finalizeTerminal(nextState);
}

/**
 * Advances the turn without moving a player — used only for the rare
 * deadlock case where a player has zero legal moves (fully boxed in),
 * so search can still proceed instead of throwing.
 */
export function applyPass(state: GameState, playerId: PlayerId): GameState {
  const nextState: GameState = {
    ...state,
    movesRemaining: state.movesRemaining - 1,
    currentTurn: playerId === 'ai' ? 'human' : 'ai',
  };
  return finalizeTerminal(nextState);
}
