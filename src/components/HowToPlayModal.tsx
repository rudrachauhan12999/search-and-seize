/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, X } from 'lucide-react';
import { GirlExplorerSprite } from './GameAssets';

interface HowToPlayModalProps {
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs select-none">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#854d0e] via-[#713f12] to-[#451a03] p-5 border-4 border-[#2b1103] shadow-[0_16px_36px_rgba(0,0,0,0.8),0_6px_0_#1e0a02] text-white overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 arcade-btn arcade-btn-dark w-8 h-8 flex items-center justify-center p-0"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Title Header with Girl Explorer */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 p-0.5 rounded-2xl bg-[#0284c7] border-2 border-cyan-300 shadow-md flex items-center justify-center shrink-0">
            <GirlExplorerSprite className="w-full h-full object-contain" showArrow={false} />
          </div>
          <div>
            <h2 className="font-pixel text-base sm:text-lg text-yellow-300 drop-shadow-[2px_2px_0_#2b1103] tracking-wider uppercase">
              HOW TO PLAY
            </h2>
            <p className="font-silkscreen text-[11px] text-cyan-200 font-bold">
              TREASURE HUNT RULES
            </p>
          </div>
        </div>

        {/* 5 Simple Game Rules */}
        <div className="space-y-2.5 text-xs text-yellow-50">
          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#522909]/90 border border-[#854d0e]">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-cyan-400 text-[#082f49] font-pixel text-[10px] shrink-0 font-black border border-black shadow-xs">
              1
            </span>
            <p className="font-outfit font-medium">
              <strong className="text-cyan-300">MOVE:</strong> Navigate 1 tile per turn using <strong className="text-white">WASD</strong>, <strong className="text-white">Arrow Keys</strong>, or the arcade D-pad.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#522909]/90 border border-[#854d0e]">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-yellow-400 text-[#451a03] font-pixel text-[10px] shrink-0 font-black border border-black shadow-xs">
              2
            </span>
            <p className="font-outfit font-medium">
              <strong className="text-yellow-300">COLLECT TREASURE:</strong> Step onto any treasure tile to seize it before the Robot Explorer grabs it!
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#522909]/90 border border-[#854d0e]">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-400 text-[#052e16] font-pixel text-[10px] shrink-0 font-black border border-black shadow-xs">
              3
            </span>
            <p className="font-outfit font-medium">
              <strong className="text-emerald-300">AVOID OBSTACLES:</strong> Trees, rocks, water ponds, and ancient ruins block movement—find the best paths around them.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#522909]/90 border border-[#854d0e]">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-rose-400 text-[#4c0519] font-pixel text-[10px] shrink-0 font-black border border-black shadow-xs">
              4
            </span>
            <p className="font-outfit font-medium">
              <strong className="text-rose-300">AI MOVES AFTER YOU:</strong> The AI evaluates the map and takes its turn immediately after your move.
            </p>
          </div>

          <div className="flex items-start gap-2.5 p-2 rounded-xl bg-[#522909]/90 border border-[#854d0e]">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-amber-400 text-[#451a03] font-pixel text-[10px] shrink-0 font-black border border-black shadow-xs">
              5
            </span>
            <div>
              <strong className="text-amber-300 block mb-1">HIGHEST SCORE WINS:</strong>
              <div className="grid grid-cols-4 gap-1.5 font-silkscreen text-center text-[10px] font-bold">
                <span className="bg-[#291404] p-1 rounded border border-yellow-500 text-yellow-300">🪙 +1</span>
                <span className="bg-[#2b0814] p-1 rounded border border-rose-500 text-rose-300">♦️ +3</span>
                <span className="bg-[#042429] p-1 rounded border border-cyan-400 text-cyan-300">💎 +5</span>
                <span className="bg-[#382003] p-1 rounded border border-yellow-400 text-yellow-300">👑 +10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          type="button"
          className="arcade-btn arcade-btn-gold w-full mt-4 py-2.5 text-xs tracking-wider"
        >
          READY FOR ADVENTURE!
        </button>
      </motion.div>
    </div>
  );
};
