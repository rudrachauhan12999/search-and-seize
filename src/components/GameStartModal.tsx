/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Play, Sparkles } from 'lucide-react';
import { GirlExplorerSprite, RobotExplorerSprite } from './GameAssets';

interface GameStartModalProps {
  onStart: () => void;
  onOpenHowToPlay: () => void;
}

export const GameStartModal: React.FC<GameStartModalProps> = ({
  onStart,
  onOpenHowToPlay,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs select-none">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#854d0e] via-[#713f12] to-[#451a03] p-4 sm:p-6 border-4 border-[#2b1103] shadow-[0_16px_36px_rgba(0,0,0,0.8),0_6px_0_#1e0a02] text-white text-center overflow-hidden"
      >
        {/* Golden Corner Brackets */}
        <div className="absolute top-2 left-2 w-6 h-6 bg-yellow-400 border-2 border-[#451a03] rounded-tl-lg" />
        <div className="absolute top-2 right-2 w-6 h-6 bg-yellow-400 border-2 border-[#451a03] rounded-tr-lg" />
        <div className="absolute bottom-2 left-2 w-6 h-6 bg-yellow-400 border-2 border-[#451a03] rounded-bl-lg" />
        <div className="absolute bottom-2 right-2 w-6 h-6 bg-yellow-400 border-2 border-[#451a03] rounded-br-lg" />

        {/* Decorative Top Sparkles */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
          <span className="font-silkscreen font-bold text-xs tracking-widest text-cyan-300 uppercase">
            AI TREASURE HUNT STRATEGY
          </span>
          <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
        </div>

        {/* Big Adventure Game Title */}
        <h1 className="font-pixel text-2xl sm:text-3xl text-yellow-300 drop-shadow-[3px_3px_0_#2b1103] tracking-wider uppercase mt-1">
          SEARCH &amp; SEIZE
        </h1>

        <p className="font-outfit font-bold text-sm sm:text-base text-yellow-100 tracking-wide mt-1">
          Search smart. Seize the treasure.
        </p>

        {/* Matchup Arena: Girl Explorer VS Robot Explorer */}
        <div className="my-5 p-3 rounded-2xl bg-[#522909]/80 border-2 border-[#854d0e] shadow-inner grid grid-cols-7 items-center gap-2">
          {/* GIRL EXPLORER */}
          <div className="col-span-3 flex flex-col items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 p-1 rounded-2xl bg-gradient-to-b from-[#0284c7] to-[#0369a1] border-3 border-cyan-300 shadow-[0_4px_8px_rgba(0,0,0,0.5)] flex items-center justify-center">
              <GirlExplorerSprite className="w-full h-full object-contain" showArrow={false} />
            </div>
            <span className="font-silkscreen font-bold text-xs sm:text-sm text-cyan-300 mt-2">
              GIRL EXPLORER
            </span>
            <span className="font-outfit text-[11px] text-cyan-100/80 font-medium">YOU</span>
          </div>

          {/* VS BADGE */}
          <div className="col-span-1 flex flex-col items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-b from-yellow-300 to-amber-500 border-2 border-black flex items-center justify-center shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              <span className="font-pixel text-xs text-[#451a03] font-black">VS</span>
            </div>
          </div>

          {/* ROBOT EXPLORER */}
          <div className="col-span-3 flex flex-col items-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 p-1 rounded-2xl bg-gradient-to-b from-[#e11d48] to-[#9f1239] border-3 border-rose-300 shadow-[0_4px_8px_rgba(0,0,0,0.5)] flex items-center justify-center">
              <RobotExplorerSprite className="w-full h-full object-contain" showArrow={false} />
            </div>
            <span className="font-silkscreen font-bold text-xs sm:text-sm text-rose-300 mt-2">
              ROBOT EXPLORER
            </span>
            <span className="font-outfit text-[11px] text-rose-100/80 font-medium">AI OPPONENT</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            onClick={onStart}
            type="button"
            className="arcade-btn arcade-btn-gold w-full sm:flex-1 py-3 text-sm tracking-wider flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5 fill-[#422006] text-[#422006]" />
            <span>PLAY NOW</span>
          </button>

          <button
            onClick={onOpenHowToPlay}
            type="button"
            className="arcade-btn arcade-btn-dark w-full sm:flex-1 py-3 text-xs tracking-wider flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-4 h-4 text-cyan-300" />
            <span>HOW TO PLAY</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
