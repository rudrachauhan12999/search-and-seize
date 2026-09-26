/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SearchCellState } from '../types/ai';
import { GameCell as GameCellType, MoveDirection, Treasure as TreasureType } from '../types/game';
import { Obstacle } from './Obstacle';
import { Treasure } from './Treasure';

interface GameCellProps {
  cell: GameCellType;
  treasure?: TreasureType;
  searchState?: SearchCellState | null;
  isValidHumanMove: boolean;
  validMoveDirection?: MoveDirection;
  showCoords?: boolean;
  onCellClick: (row: number, col: number) => void;
}

export const GameCell: React.FC<GameCellProps> = ({
  cell,
  treasure,
  searchState,
  isValidHumanMove,
  showCoords = false,
  onCellClick,
}) => {
  const { row, col, type } = cell;
  const isObstacle = type === 'obstacle';
  const hasTreasure = !!treasure && !treasure.collected;

  // Search Map strategy overlay
  let searchOverlay = null;
  if (searchState === 'explored') {
    searchOverlay = (
      <div className="absolute inset-0 bg-blue-500/40 border-2 border-blue-400 rounded-lg pointer-events-none z-10">
        <span className="absolute top-0.5 left-1 text-[7px] font-pixel text-blue-200">SCAN</span>
      </div>
    );
  } else if (searchState === 'candidate') {
    searchOverlay = (
      <div className="absolute inset-0 bg-yellow-400/40 border-2 border-yellow-300 rounded-lg pointer-events-none z-10">
        <span className="absolute top-0.5 left-1 text-[7px] font-pixel text-yellow-200">NEXT</span>
      </div>
    );
  } else if (searchState === 'selected') {
    searchOverlay = (
      <div className="absolute inset-0 bg-emerald-500/50 border-2 border-emerald-300 shadow-[inset_0_0_12px_rgba(52,211,153,0.8)] rounded-lg pointer-events-none z-10 animate-pulse">
        <span className="absolute top-0.5 left-1 text-[7px] font-pixel text-emerald-200">PATH</span>
      </div>
    );
  } else if (searchState === 'threat') {
    searchOverlay = (
      <div className="absolute inset-0 bg-rose-600/50 border-2 border-rose-400 shadow-[inset_0_0_12px_rgba(251,113,133,0.8)] rounded-lg pointer-events-none z-10">
        <span className="absolute top-0.5 left-1 text-[7px] font-pixel text-rose-200">AI</span>
      </div>
    );
  }

  // Terrain variation based on coordinate pattern (creating winding trails, stone pavers, and varied grass)
  const isPath =
    (row === 0 && col === 3) ||
    (row === 1 && col === 2) ||
    (row === 2 && col === 6) ||
    (row === 3 && (col === 1 || col === 5)) ||
    (row === 4 && col === 4) ||
    (row === 5 && (col === 0 || col === 2)) ||
    (row === 6 && (col === 2 || col === 5));

  const isPaver =
    (row === 0 && col === 4) ||
    (row === 1 && col === 0) ||
    (row === 2 && col === 2) ||
    (row === 6 && col === 0);

  // Deterministic subtle terrain features
  const seed = (row * 13 + col * 29) % 100;
  const hasGrassTuft = seed < 22 && !isPath && !isPaver && !isObstacle;
  const hasWildflower = seed >= 22 && seed < 45 && !isPath && !isPaver && !isObstacle;
  const hasStonePebble = seed >= 45 && seed < 62 && !isObstacle;
  const hasTinyLeaf = seed >= 62 && seed < 75 && !isObstacle;
  const hasMapMarking = seed >= 75 && seed < 85 && (isPath || !isObstacle);

  const coordLabel = `${String.fromCharCode(65 + col)}${row + 1}`;

  // Background color variations for grass to prevent monotonous checkerboard
  const grassGradient =
    (row + col) % 3 === 0
      ? 'from-[#22c55e] via-[#16a34a] to-[#15803d]'
      : (row + col) % 3 === 1
      ? 'from-[#16a34a] via-[#15803d] to-[#166534]'
      : 'from-[#4ade80] via-[#22c55e] to-[#15803d]';

  return (
    <div
      onClick={() => onCellClick(row, col)}
      role="button"
      tabIndex={isValidHumanMove ? 0 : -1}
      aria-label={`Cell ${coordLabel} ${isObstacle ? 'Obstacle' : hasTreasure ? `Treasure +${treasure.value}` : ''}`}
      className={`relative w-full h-full flex items-center justify-center rounded-xl border-2 select-none overflow-hidden transition-all duration-150 ${
        isValidHumanMove
          ? 'ring-4 ring-cyan-300 border-cyan-400 bg-gradient-to-br from-[#0284c7] to-[#0369a1] shadow-[0_0_16px_rgba(34,211,238,0.9)] cursor-pointer scale-[1.04] z-20 hover:brightness-115'
          : isObstacle
          ? 'border-[#2d4d1d] bg-[#224419] cursor-not-allowed shadow-inner'
          : isPath
          ? 'border-[#854d0e] bg-gradient-to-br from-[#d97706] via-[#b45309] to-[#92400e]'
          : isPaver
          ? 'border-[#334155] bg-gradient-to-br from-[#64748b] to-[#475569]'
          : `border-[#15803d] bg-gradient-to-br ${grassGradient}`
      }`}
    >
      {/* Sandy Trail Textures & Footsteps */}
      {isPath && !isObstacle && (
        <div className="absolute inset-0 pointer-events-none opacity-45">
          <div className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-[#fef08a]" />
          <div className="absolute bottom-2 right-2 w-2 h-1 rounded-full bg-[#78350f]" />
          <div className="absolute top-3 right-2 w-1 h-1 rounded-full bg-[#fde047]" />
          {hasMapMarking && (
            <div className="absolute bottom-1 left-1.5 flex gap-0.5 opacity-60">
              <span className="w-1 h-1 rounded-full bg-[#451a03]" />
              <span className="w-1 h-1 rounded-full bg-[#451a03]" />
              <span className="w-1 h-1 rounded-full bg-[#451a03]" />
            </div>
          )}
        </div>
      )}

      {/* Stone Pavers texture */}
      {isPaver && !isObstacle && (
        <div className="absolute inset-0 pointer-events-none opacity-40 flex flex-col justify-around p-0.5">
          <div className="h-0.5 w-full bg-[#0f172a]" />
          <div className="h-0.5 w-full bg-[#0f172a]" />
        </div>
      )}

      {/* Subtle Environmental Terrain Details */}
      {!isObstacle && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle grass blade tufts */}
          {hasGrassTuft && (
            <svg className="absolute bottom-1 left-1.5 w-3 h-2 text-[#14532d] opacity-50" viewBox="0 0 12 8" fill="currentColor">
              <path d="M2 8 C2 4 4 1 6 0 C5 3 4 6 4 8 Z" />
              <path d="M6 8 C6 5 8 2 11 1 C9 4 8 7 8 8 Z" />
            </svg>
          )}

          {/* Tiny Wildflowers */}
          {hasWildflower && (
            <span className="absolute top-1 right-1.5 text-[8px] leading-none opacity-70 drop-shadow-xs">
              {seed % 2 === 0 ? '🌼' : '🌸'}
            </span>
          )}

          {/* Small smooth river stones / pebbles */}
          {hasStonePebble && (
            <div className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 opacity-40">
              <div className="w-1.5 h-1 rounded-full bg-[#e2e8f0] border border-[#334155]" />
              <div className="w-1 h-0.5 rounded-full bg-[#cbd5e1]" />
            </div>
          )}

          {/* Tiny fallen jungle/forest leaves */}
          {hasTinyLeaf && (
            <span className="absolute top-1.5 left-1 text-[7px] leading-none opacity-45">
              {seed % 2 === 0 ? '🍃' : '🍂'}
            </span>
          )}
        </div>
      )}

      {/* Steady Glowing Border for Valid Move Squares (No spinning/moving squares) */}
      {isValidHumanMove && (
        <div className="absolute inset-1 rounded-lg border-2 border-cyan-200/90 pointer-events-none shadow-[inset_0_0_8px_rgba(34,211,238,0.7)]" />
      )}

      {/* Obstacle or Treasure */}
      {isObstacle ? (
        <Obstacle variant={row * 8 + col} />
      ) : hasTreasure ? (
        <Treasure type={treasure.type} value={treasure.value} />
      ) : null}

      {/* Strategy search overlay */}
      {searchOverlay}

      {/* Optional coordinates (only when toggled on) */}
      {showCoords && (
        <span className="absolute bottom-0.5 right-1 text-[7px] font-silkscreen text-white/80 bg-black/60 px-1 rounded pointer-events-none font-bold">
          {coordLabel}
        </span>
      )}
    </div>
  );
};
