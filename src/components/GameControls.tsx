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
  Brain,
  Pause,
  Play,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { AlgorithmType, DifficultyLevel, GameStatus, MoveDirection } from '../types/game';

interface GameControlsProps {
  validMoves: MoveDirection[];
  isHumanTurn: boolean;
  gameStatus: GameStatus;
  algorithm: AlgorithmType;
  searchDepth: number;
  difficulty: DifficultyLevel;
  onMove: (direction: MoveDirection) => void;
  onRestart: () => void;
  onTogglePause: () => void;
  onSelectAlgorithm: (algo: AlgorithmType) => void;
  onSelectDepth: (depth: number) => void;
  onSelectDifficulty: (difficulty: DifficultyLevel) => void;
}

export const GameControls: React.FC<GameControlsProps> = ({
  validMoves,
  isHumanTurn,
  gameStatus,
  algorithm,
  searchDepth,
  difficulty,
  onMove,
  onRestart,
  onTogglePause,
  onSelectAlgorithm,
  onSelectDepth,
  onSelectDifficulty,
}) => {
  const canMove = isHumanTurn && gameStatus === 'playing';

  // Global Keyboard listener for arrow keys & WASD
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
    <div className="w-full flex flex-col gap-3">
      {/* Movement Pad Card */}
      <div className="bg-gradient-to-b from-[#2e1d11] to-[#1f130a] p-3.5 rounded-2xl border-3 border-[#633e1e] shadow-xl text-amber-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Directional D-Pad */}
        <div className="flex flex-col items-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 mb-2">
            Explorer Navigation
          </span>

          <div className="grid grid-cols-3 gap-1.5 w-36 h-36 p-1 rounded-2xl bg-black/40 border border-amber-900/60 shadow-inner">
            {/* Top row */}
            <div />
            <button
              type="button"
              disabled={!isUpValid}
              onClick={() => onMove('up')}
              aria-label="Move Up (Arrow Up)"
              className={`flex items-center justify-center rounded-xl border-2 transition-all ${
                isUpValid
                  ? 'bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-amber-950 border-amber-300 shadow-md active:scale-95 cursor-pointer'
                  : 'bg-stone-800/60 text-stone-600 border-stone-700/40 cursor-not-allowed'
              }`}
            >
              <ArrowUp className="w-6 h-6 stroke-[3]" />
            </button>
            <div />

            {/* Middle row */}
            <button
              type="button"
              disabled={!isLeftValid}
              onClick={() => onMove('left')}
              aria-label="Move Left (Arrow Left)"
              className={`flex items-center justify-center rounded-xl border-2 transition-all ${
                isLeftValid
                  ? 'bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-amber-950 border-amber-300 shadow-md active:scale-95 cursor-pointer'
                  : 'bg-stone-800/60 text-stone-600 border-stone-700/40 cursor-not-allowed'
              }`}
            >
              <ArrowLeft className="w-6 h-6 stroke-[3]" />
            </button>

            <div className="flex items-center justify-center rounded-xl bg-[#3d2313] border border-amber-900/60 text-amber-400 text-xs font-bold font-mono">
              WASD
            </div>

            <button
              type="button"
              disabled={!isRightValid}
              onClick={() => onMove('right')}
              aria-label="Move Right (Arrow Right)"
              className={`flex items-center justify-center rounded-xl border-2 transition-all ${
                isRightValid
                  ? 'bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-amber-950 border-amber-300 shadow-md active:scale-95 cursor-pointer'
                  : 'bg-stone-800/60 text-stone-600 border-stone-700/40 cursor-not-allowed'
              }`}
            >
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </button>

            {/* Bottom row */}
            <div />
            <button
              type="button"
              disabled={!isDownValid}
              onClick={() => onMove('down')}
              aria-label="Move Down (Arrow Down)"
              className={`flex items-center justify-center rounded-xl border-2 transition-all ${
                isDownValid
                  ? 'bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-amber-950 border-amber-300 shadow-md active:scale-95 cursor-pointer'
                  : 'bg-stone-800/60 text-stone-600 border-stone-700/40 cursor-not-allowed'
              }`}
            >
              <ArrowDown className="w-6 h-6 stroke-[3]" />
            </button>
            <div />
          </div>
        </div>

        {/* Right: Helpful guide & Quick Controls */}
        <div className="flex-1 flex flex-col justify-between h-full gap-3 text-xs">
          <div className="bg-black/30 p-2.5 rounded-xl border border-amber-900/40">
            <span className="block font-bold text-amber-300 mb-1">Navigation Instructions:</span>
            <p className="text-amber-200/80 leading-relaxed text-[11px]">
              Use <strong className="text-amber-300">Arrow Keys</strong>, <strong className="text-amber-300">W/A/S/D</strong>, or click highlighted neighboring cells on the map. Impassable ruins and borders are automatically restricted.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onTogglePause}
              disabled={gameStatus === 'gameOver'}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#442813] hover:bg-[#573319] border border-amber-700/60 text-amber-200 font-semibold shadow disabled:opacity-40"
            >
              {gameStatus === 'paused' ? (
                <>
                  <Play className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4 text-amber-300" />
                  <span>Pause</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onRestart}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#442813] hover:bg-[#573319] border border-amber-700/60 text-amber-200 font-semibold shadow"
            >
              <RotateCcw className="w-4 h-4 text-amber-300" />
              <span>Restart</span>
            </button>
          </div>
        </div>
      </div>

      {/* AI Search & Strategy Configuration Bar */}
      <div className="bg-gradient-to-b from-[#2e1d11] to-[#1f130a] p-3 rounded-2xl border-2 border-[#543419] shadow-md text-amber-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Search Algorithm Toggle */}
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-amber-300">Search:</span>
          <div className="inline-flex rounded-lg bg-black/40 p-0.5 border border-amber-900/60">
            <button
              type="button"
              onClick={() => onSelectAlgorithm('minimax')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                algorithm === 'minimax'
                  ? 'bg-amber-500 text-amber-950 font-bold shadow'
                  : 'text-amber-300/70 hover:text-amber-100'
              }`}
            >
              Minimax
            </button>
            <button
              type="button"
              onClick={() => onSelectAlgorithm('alpha-beta')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all ${
                algorithm === 'alpha-beta'
                  ? 'bg-amber-500 text-amber-950 font-bold shadow'
                  : 'text-amber-300/70 hover:text-amber-100'
              }`}
            >
              Alpha-Beta
            </button>
          </div>
        </div>

        {/* Search Depth Selector */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-amber-300">Depth (Plies):</span>
          <div className="inline-flex rounded-lg bg-black/40 p-0.5 border border-amber-900/60">
            {[2, 3, 4].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => {
                  onSelectDepth(d);
                  if (d === 2) onSelectDifficulty('easy');
                  else if (d === 3) onSelectDifficulty('medium');
                  else onSelectDifficulty('hard');
                }}
                className={`w-7 py-1 rounded-md text-center font-bold transition-all ${
                  searchDepth === d
                    ? 'bg-emerald-500 text-emerald-950 shadow'
                    : 'text-amber-300/70 hover:text-amber-100'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg border border-amber-900/50">
          <span className="text-amber-400/80">Difficulty:</span>
          <span className="font-extrabold uppercase text-amber-200">{difficulty}</span>
        </div>
      </div>
    </div>
  );
};
