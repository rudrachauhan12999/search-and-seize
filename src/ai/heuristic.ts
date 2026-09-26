/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HeuristicBreakdown } from '../types/ai';
import { GameState } from '../types/game';
import { bfsFromSource } from './bfs';
import { getValidMoves } from './moves';

/** Points "spent" per BFS step of travel when pricing a treasure's net worth. */
const DISTANCE_COST = 1.5;
/** How much a treasure's value is discounted when the opponent can reach it first. */
const CONTESTED_DISCOUNT = 0.15;

/**
 * Deterministic static evaluation h(s) of a game state from the AI's
 * perspective (positive favors the AI, negative favors the human).
 *
 * Total = Score Advantage + Treasure Advantage + Distance Advantage + Control Bonus
 *
 * - Score Advantage: 10 x (AI score - Human score) — already-realized value.
 * - Treasure Advantage: 4 x (AI treasures collected - Human treasures collected).
 * - Distance Advantage: for each side, the best achievable "net worth" among
 *   reachable, in-time treasures — value minus DISTANCE_COST per real BFS
 *   step to reach it — with treasures the opponent can reach first heavily
 *   discounted (not ignored, since the opponent may not actually take them).
 *   Unlike a reciprocal 1/(1+distance) term, this is linear in distance, so
 *   every step closer changes the score by a fixed, non-vanishing amount —
 *   giving the search a real gradient to follow even many steps away.
 * - Control Bonus: a light tiebreaker — central board proximity plus
 *   relative mobility (legal move count) — intentionally small relative to
 *   Distance Advantage so it never outweighs actual treasure-seeking.
 */
export function evaluateGameState(gameState: GameState): HeuristicBreakdown {
  const { ai, human, board, treasures, movesRemaining } = gameState;

  const scoreAdvantage = (ai.score - human.score) * 10;
  const treasureAdvantage = (ai.treasuresCollected - human.treasuresCollected) * 4;

  const remaining = treasures.filter((t) => !t.collected);
  let distanceAdvantage = 0;

  if (remaining.length > 0) {
    const aiBFS = bfsFromSource(ai.position, board);
    const humanBFS = bfsFromSource(human.position, board);

    // Start at -Infinity (not 0): once every remaining treasure's net worth
    // goes negative (common lategame, once the cheap wins are gone), a 0
    // floor would freeze this term at a constant regardless of position,
    // silently deleting the search's only positional signal. Starting
    // unbounded means the actual best-available option (even if negative)
    // still varies with distance, so the gradient never disappears.
    let aiPotential = -Infinity;
    let humanPotential = -Infinity;

    for (const t of remaining) {
      const key = `${t.position.row},${t.position.col}`;
      const aiDist = aiBFS.distances.get(key);
      const humanDist = humanBFS.distances.get(key);

      if (aiDist !== undefined && aiDist <= movesRemaining) {
        const winsRace = humanDist === undefined || aiDist <= humanDist;
        const worth = winsRace ? t.value : t.value * CONTESTED_DISCOUNT;
        aiPotential = Math.max(aiPotential, worth - aiDist * DISTANCE_COST);
      }
      if (humanDist !== undefined && humanDist <= movesRemaining) {
        const winsRace = aiDist === undefined || humanDist <= aiDist;
        const worth = winsRace ? t.value : t.value * CONTESTED_DISCOUNT;
        humanPotential = Math.max(humanPotential, worth - humanDist * DISTANCE_COST);
      }
    }

    if (aiPotential === -Infinity) aiPotential = 0;
    if (humanPotential === -Infinity) humanPotential = 0;

    distanceAdvantage = Math.round((aiPotential - humanPotential) * 2);
  }

  const aiDistToCenter = Math.abs(ai.position.row - 3.5) + Math.abs(ai.position.col - 3.5);
  const humanDistToCenter = Math.abs(human.position.row - 3.5) + Math.abs(human.position.col - 3.5);

  const aiMobility = getValidMoves(ai.position, board, human.position).length;
  const humanMobility = getValidMoves(human.position, board, ai.position).length;

  const controlBonus = Math.round(
    (humanDistToCenter - aiDistToCenter) * 0.5 + (aiMobility - humanMobility) * 0.5
  );

  const totalEvaluation = scoreAdvantage + treasureAdvantage + distanceAdvantage + controlBonus;

  return {
    scoreAdvantage,
    treasureAdvantage,
    distanceAdvantage,
    controlBonus,
    totalEvaluation,
    explanation:
      `Score lead ${scoreAdvantage >= 0 ? '+' : ''}${scoreAdvantage}, treasure-count lead ${treasureAdvantage >= 0 ? '+' : ''}${treasureAdvantage}, ` +
      `BFS treasure-race advantage ${distanceAdvantage >= 0 ? '+' : ''}${distanceAdvantage}, board control ${controlBonus >= 0 ? '+' : ''}${controlBonus}.`,
  };
}
