/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Bot, Coins, Crown, User } from 'lucide-react';
import { Player, PlayerId } from '../types/game';

interface PlayerCardProps {
  player: Player;
  isCurrentTurn: boolean;
  isWinning: boolean;
  type: PlayerId;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isCurrentTurn,
  isWinning,
  type,
}) => {
  const isHuman = type === 'human';

  return (
    <div
      className={`relative flex-1 p-3.5 rounded-2xl transition-all duration-300 ${
        isHuman
          ? isCurrentTurn
            ? 'bg-gradient-to-br from-blue-900/90 to-indigo-950/95 border-3 border-blue-400 shadow-xl shadow-blue-950/40 ring-2 ring-blue-400/40 scale-[1.02]'
            : 'bg-gradient-to-br from-[#2a2336] to-[#1c1724] border-2 border-blue-800/40 shadow-md'
          : isCurrentTurn
          ? 'bg-gradient-to-br from-red-900/90 to-rose-950/95 border-3 border-red-400 shadow-xl shadow-red-950/40 ring-2 ring-red-400/40 scale-[1.02]'
          : 'bg-gradient-to-br from-[#331f24] to-[#201216] border-2 border-red-800/40 shadow-md'
      }`}
    >
      {/* Winning Leader Ribbon */}
      {isWinning && player.score > 0 && (
        <div className="absolute -top-3 right-3 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 border border-amber-200 text-amber-950 text-[11px] font-extrabold shadow-md">
          <Crown className="w-3 h-3 fill-amber-950" />
          <span>LEADING</span>
        </div>
      )}

      {/* Header Info */}
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl border-2 shadow-inner ${
            isHuman
              ? 'bg-gradient-to-br from-blue-500 to-blue-700 border-blue-300 text-white'
              : 'bg-gradient-to-br from-red-500 to-red-700 border-red-300 text-white'
          }`}
        >
          {isHuman ? <User className="w-6 h-6 stroke-[2.5]" /> : <Bot className="w-6 h-6 stroke-[2.5]" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isHuman ? 'bg-blue-400 shadow-[0_0_8px_#60a5fa]' : 'bg-red-400 shadow-[0_0_8px_#f87171]'
              }`}
            />
            <h3 className="font-cinzel font-bold text-sm md:text-base text-amber-100 tracking-wide truncate">
              {isHuman ? 'YOU (Explorer)' : 'AI AGENT'}
            </h3>
          </div>
          <p className="text-xs text-amber-300/70 font-medium">
            {isHuman ? 'Human Player' : 'Minimax / Alpha-Beta'}
          </p>
        </div>
      </div>

      {/* Numerical Stats */}
      <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-amber-900/40">
        <div className="bg-black/30 rounded-xl p-2 text-center border border-white/5">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-300/80">
            Score
          </span>
          <span
            className={`font-cinzel text-2xl font-black ${
              isHuman ? 'text-blue-300' : 'text-red-300'
            }`}
          >
            {player.score}
          </span>
        </div>

        <div className="bg-black/30 rounded-xl p-2 text-center border border-white/5 flex flex-col items-center justify-center">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-300/80">
            Treasures
          </span>
          <div className="flex items-center gap-1.5 justify-center">
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="font-cinzel text-xl font-extrabold text-amber-200">
              {player.treasuresCollected}
            </span>
          </div>
        </div>
      </div>

      {/* Active turn badge */}
      {isCurrentTurn && (
        <div
          className={`mt-2.5 py-1 px-2 text-center rounded-lg text-xs font-bold tracking-wider uppercase border animate-pulse ${
            isHuman
              ? 'bg-blue-500/20 text-blue-200 border-blue-400/50'
              : 'bg-red-500/20 text-red-200 border-red-400/50'
          }`}
        >
          {isHuman ? 'Active Turn' : 'Calculating Move...'}
        </div>
      )}
    </div>
  );
};
