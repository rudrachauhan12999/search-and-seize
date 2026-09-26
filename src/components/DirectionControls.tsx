/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';
import { GameStatus, MoveDirection } from '../types/game';

interface DirectionControlsProps {
  validMoves: MoveDirection[];
  isHumanTurn: boolean;
  gameStatus: GameStatus;
  onMove: (direction: MoveDirection) => void;
  onRestart: () => void;
  onTogglePause: () => void;
}

export const DirectionControls: React.FC<DirectionControlsProps> = ({
  validMoves,
  isHumanTurn,
  gameStatus,
  onMove,
  onRestart,
  onTogglePause,
}) => {
  const canMove = isHumanTurn && gameStatus === 'playing';

  // Global Keyboard listener for Arrow keys and WASD
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!canMove) return;

      let direction: MoveDirection | null = null;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        direction = 'up';
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        direction = 'down';
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        direction = 'left';
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        direction = 'right';
      }

      if (direction) {
        e.preventDefault();
        if (validMoves.includes(direction)) {
          onMove(direction);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canMove, validMoves, onMove]);

  const isUpValid = canMove && validMoves.includes('up');
  const isDownValid = canMove && validMoves.includes('down');
  const isLeftValid = canMove && validMoves.includes('left');
  const isRightValid = canMove && validMoves.includes('right');

  return (
    <div className="w-full flex flex-col items-center gap-1.5 select-none">
      {/* VIBRANT ARCADE D-PAD CONTROLLER */}
      <div className="p-2 sm:p-2.5 rounded-2xl bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617] border-3 border-[#334155] shadow-[0_8px_16px_rgba(0,0,0,0.6),0_3px_0_#0f172a,inset_0_1px_2px_rgba(255,255,255,0.2)]">
        <div className="grid grid-cols-3 gap-2">
          {/* Row 1 */}
          <div />
          <button
            type="button"
            disabled={!isUpValid}
            onClick={() => onMove('up')}
            aria-label="Move Up"
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl font-bold flex items-center justify-center transition-all duration-100 ${
              isUpValid
                ? 'bg-gradient-to-b from-[#38bdf8] via-[#0284c7] to-[#0369a1] text-white border-2 border-cyan-200 shadow-[0_4px_0_#075985,0_0_14px_rgba(56,189,248,0.7)] hover:brightness-115 hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer'
                : 'bg-[#1e293b] text-slate-500 border-2 border-slate-700 opacity-50 cursor-not-allowed shadow-[0_2px_0_#0f172a]'
            }`}
          >
            <ArrowUp className="w-7 h-7 stroke-[3.5] drop-shadow-xs" />
          </button>
          <div />

          {/* Row 2 */}
          <button
            type="button"
            disabled={!isLeftValid}
            onClick={() => onMove('left')}
            aria-label="Move Left"
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl font-bold flex items-center justify-center transition-all duration-100 ${
              isLeftValid
                ? 'bg-gradient-to-b from-[#38bdf8] via-[#0284c7] to-[#0369a1] text-white border-2 border-cyan-200 shadow-[0_4px_0_#075985,0_0_14px_rgba(56,189,248,0.7)] hover:brightness-115 hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer'
                : 'bg-[#1e293b] text-slate-500 border-2 border-slate-700 opacity-50 cursor-not-allowed shadow-[0_2px_0_#0f172a]'
            }`}
          >
            <ArrowLeft className="w-7 h-7 stroke-[3.5] drop-shadow-xs" />
          </button>

          {/* D-Pad Center Metallic Ring */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#0f172a] to-[#1e293b] border-2 border-[#475569] flex items-center justify-center shadow-inner">
            <div className="w-4 h-4 rounded-full bg-cyan-400 border border-black shadow-[0_0_10px_#22d3ee] animate-pulse" />
          </div>

          <button
            type="button"
            disabled={!isRightValid}
            onClick={() => onMove('right')}
            aria-label="Move Right"
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl font-bold flex items-center justify-center transition-all duration-100 ${
              isRightValid
                ? 'bg-gradient-to-b from-[#38bdf8] via-[#0284c7] to-[#0369a1] text-white border-2 border-cyan-200 shadow-[0_4px_0_#075985,0_0_14px_rgba(56,189,248,0.7)] hover:brightness-115 hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer'
                : 'bg-[#1e293b] text-slate-500 border-2 border-slate-700 opacity-50 cursor-not-allowed shadow-[0_2px_0_#0f172a]'
            }`}
          >
            <ArrowRight className="w-7 h-7 stroke-[3.5] drop-shadow-xs" />
          </button>

          {/* Row 3 */}
          <div />
          <button
            type="button"
            disabled={!isDownValid}
            onClick={() => onMove('down')}
            aria-label="Move Down"
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl font-bold flex items-center justify-center transition-all duration-100 ${
              isDownValid
                ? 'bg-gradient-to-b from-[#38bdf8] via-[#0284c7] to-[#0369a1] text-white border-2 border-cyan-200 shadow-[0_4px_0_#075985,0_0_14px_rgba(56,189,248,0.7)] hover:brightness-115 hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer'
                : 'bg-[#1e293b] text-slate-500 border-2 border-slate-700 opacity-50 cursor-not-allowed shadow-[0_2px_0_#0f172a]'
            }`}
          >
            <ArrowDown className="w-7 h-7 stroke-[3.5] drop-shadow-xs" />
          </button>
          <div />
        </div>
      </div>

      {/* Movement Shortcuts Ribbon */}
      <div className="text-center font-silkscreen text-[10px] text-yellow-300 font-bold drop-shadow-xs">
        MOVE: <span className="bg-[#1e293b] text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/40">WASD</span> or <span className="bg-[#1e293b] text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/40">ARROWS</span>
      </div>

      {/* Chunky Game Action Buttons */}
      <div className="flex items-center gap-2 w-full max-w-xs mt-0.5">
        <button
          type="button"
          onClick={onTogglePause}
          disabled={gameStatus === 'gameOver'}
          className="arcade-btn arcade-btn-dark flex-1 py-1 text-xs gap-1.5 flex items-center justify-center cursor-pointer"
        >
          {gameStatus === 'paused' ? (
            <>
              <Play className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span>▶ RESUME</span>
            </>
          ) : (
            <>
              <Pause className="w-3.5 h-3.5 text-cyan-300" />
              <span>Ⅱ PAUSE</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="arcade-btn arcade-btn-red flex-1 py-1 text-xs gap-1.5 flex items-center justify-center cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 stroke-[3]" />
          <span>↻ RESTART</span>
        </button>
      </div>
    </div>
  );
};
