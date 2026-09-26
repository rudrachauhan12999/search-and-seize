/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Zap } from 'lucide-react';
import { GirlExplorerSprite, RobotExplorerSprite } from './GameAssets';
import { GameState } from '../types/game';

interface ScoreBoardProps {
  gameState: GameState;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ gameState }) => {
  const { human, ai, currentTurn, gameStatus, treasures } = gameState;
  const remainingTreasures = treasures.filter((t) => !t.collected).length;
  const turnCount = gameState.moveLog.length + 1;

  const isGameOver = gameStatus === 'gameOver';
  const isPaused = gameStatus === 'paused';
  const isAiThinking = !isGameOver && !isPaused && (gameStatus === 'thinking' || currentTurn === 'ai');
  const isHumanTurn = !isGameOver && !isPaused && !isAiThinking;

  return (
    <div className="relative w-full max-w-5xl mx-auto select-none">
      {/* COMPACT WOODEN & GOLD ADVENTURE HUD BANNER (height reduced by 10% via padding/margins) */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#78350f] via-[#854d0e] to-[#78350f] px-2 py-0.5 sm:px-2.5 sm:py-0.5 border-3 border-[#261004] shadow-[0_4px_10px_rgba(0,0,0,0.5),0_2px_0_#261004] flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Decorative Gold Brass Corner Accents */}
        <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-yellow-400 border border-black" />
        <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-400 border border-black" />

        {/* LEFT: COMPACT YOU (GIRL EXPLORER) WITH CYAN TURN GLOW */}
        <div
          className={`flex items-center gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1 rounded-xl transition-all duration-300 ${
            isHumanTurn
              ? 'bg-gradient-to-r from-[#0284c7] to-[#0369a1] border-2 border-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9),inset_0_0_8px_rgba(56,189,248,0.5)] ring-2 ring-cyan-400/70'
              : 'bg-[#451a03]/85 border border-yellow-900/60 opacity-85'
          }`}
        >
          {/* Girl Explorer Avatar (enlarged for prominent visibility) */}
          <div
            className={`w-11 h-11 sm:w-13 sm:h-13 shrink-0 flex items-center justify-center p-1 rounded-xl bg-[#083344] border-2 overflow-hidden transition-all ${
              isHumanTurn
                ? 'border-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.9)] ring-1 ring-cyan-200'
                : 'border-cyan-700/70 shadow-xs'
            }`}
          >
            <GirlExplorerSprite className="w-full h-full object-contain scale-110 drop-shadow-md" showArrow={false} />
          </div>

          <div className="leading-tight">
            <div className="flex items-center gap-1">
              <span className={`font-silkscreen font-bold text-[10px] sm:text-xs uppercase tracking-wide transition-colors ${
                isHumanTurn ? 'text-cyan-200 drop-shadow-[0_0_6px_rgba(34,211,238,0.9)]' : 'text-cyan-400/80'
              }`}>
                YOU
              </span>
              {human.score > ai.score && (
                <span className="font-silkscreen text-[7px] bg-yellow-400 text-[#451a03] px-1 rounded-xs font-bold">
                  👑
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-1">
              <span className="font-pixel text-sm sm:text-lg text-yellow-300 drop-shadow-[1px_1px_0_#000]">
                {human.score}
              </span>
              <span className="font-silkscreen text-[8px] text-cyan-200/80 font-bold">PTS</span>
            </div>

            <div className="font-silkscreen text-[8.5px] text-yellow-200 font-bold flex items-center gap-0.5">
              <span>💰</span>
              <span>{human.treasuresCollected}</span>
            </div>
          </div>
        </div>

        {/* CENTER: MASSIVE TURN BANNER & SUB-STATS */}
        <div className="flex flex-col items-center justify-center text-center flex-1 max-w-xs sm:max-w-sm px-1">
          {/* Active Turn Ribbon */}
          <motion.div
            animate={
              isHumanTurn || isAiThinking
                ? { scale: [1, 1.025, 1] }
                : {}
            }
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-full py-0.5 px-2 rounded-xl font-silkscreen font-bold text-[10px] sm:text-xs tracking-wider uppercase border-2 border-black shadow-[0_2px_0_#000] flex items-center justify-center gap-1.5 transition-all duration-300 ${
              isGameOver
                ? 'bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 text-[#451a03]'
                : isPaused
                ? 'bg-slate-700 text-yellow-200'
                : isAiThinking
                ? 'bg-gradient-to-r from-[#d946ef] via-[#ec4899] to-[#f43f5e] text-white shadow-[0_0_16px_rgba(217,70,239,0.9),0_0_6px_rgba(244,63,94,0.7)]'
                : 'bg-gradient-to-r from-[#06b6d4] via-[#38bdf8] to-[#0ea5e9] text-[#082f49] shadow-[0_0_16px_rgba(6,182,212,0.9),0_0_6px_rgba(56,189,248,0.7)]'
            }`}
          >
            {isGameOver ? (
              <>
                <Trophy className="w-3 h-3 fill-[#451a03]" />
                <span>EXPEDITION COMPLETE!</span>
              </>
            ) : isPaused ? (
              <span>Ⅱ PAUSED</span>
            ) : isAiThinking ? (
              <>
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>🤖 AI THINKING</span>
              </>
            ) : (
              <>
                <Zap className="w-3 h-3 fill-amber-950 text-amber-950" />
                <span>⚡ YOUR TURN</span>
              </>
            )}
          </motion.div>

          {/* Quick Sub-Stats */}
          <div className="flex items-center justify-center gap-2 mt-0.5 font-silkscreen text-[7px] sm:text-[8px] text-yellow-200 font-bold">
            <span className="bg-[#451a03] px-1 py-0.2 rounded border border-yellow-900">
              TURN {turnCount}
            </span>
            <span className="bg-[#451a03] px-1 py-0.2 rounded border border-yellow-900 text-yellow-300">
              🏆 {remainingTreasures} LEFT
            </span>
          </div>
        </div>

        {/* RIGHT: COMPACT AI (ROBOT EXPLORER) WITH MAGENTA TURN GLOW */}
        <div
          className={`flex items-center justify-end gap-2 sm:gap-2.5 px-2.5 sm:px-3 py-1 rounded-xl transition-all duration-300 ${
            isAiThinking
              ? 'bg-gradient-to-r from-[#86198f] to-[#701a75] border-2 border-fuchsia-400 shadow-[0_0_18px_rgba(217,70,239,0.9),inset_0_0_8px_rgba(244,63,94,0.5)] ring-2 ring-fuchsia-400/70'
              : 'bg-[#451a03]/85 border border-yellow-900/60 opacity-85'
          }`}
        >
          <div className="text-right leading-tight">
            <div className="flex items-center justify-end gap-1">
              {ai.score > human.score && (
                <span className="font-silkscreen text-[7px] bg-yellow-400 text-[#451a03] px-1 rounded-xs font-bold">
                  👑
                </span>
              )}
              <span className={`font-silkscreen font-bold text-[10px] sm:text-xs uppercase tracking-wide transition-colors ${
                isAiThinking ? 'text-fuchsia-200 drop-shadow-[0_0_6px_rgba(217,70,239,0.9)]' : 'text-rose-400/80'
              }`}>
                AI
              </span>
            </div>

            <div className="flex items-baseline justify-end gap-1">
              <span className="font-pixel text-sm sm:text-lg text-rose-300 drop-shadow-[1px_1px_0_#000]">
                {ai.score}
              </span>
              <span className="font-silkscreen text-[8px] text-rose-200/80 font-bold">PTS</span>
            </div>

            <div className="font-silkscreen text-[8.5px] text-yellow-200 font-bold flex items-center justify-end gap-0.5">
              <span>💰</span>
              <span>{ai.treasuresCollected}</span>
            </div>
          </div>

          {/* Robot Explorer Avatar (enlarged for prominent visibility) */}
          <div
            className={`w-11 h-11 sm:w-13 sm:h-13 shrink-0 flex items-center justify-center p-1 rounded-xl bg-[#3f0717] border-2 overflow-hidden transition-all ${
              isAiThinking
                ? 'border-fuchsia-400 shadow-[0_0_12px_rgba(217,70,239,0.9)] ring-1 ring-fuchsia-200'
                : 'border-rose-800/70 shadow-xs'
            }`}
          >
            <RobotExplorerSprite className="w-full h-full object-contain scale-110 drop-shadow-md" showArrow={false} />
          </div>
        </div>
      </div>
    </div>
  );
};
