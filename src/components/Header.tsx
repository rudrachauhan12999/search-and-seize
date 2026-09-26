/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HelpCircle, Play, Sparkles } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  onNewGame: () => void;
  onOpenHowToPlay: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewGame, onOpenHowToPlay }) => {
  return (
    <header className="relative w-full bg-gradient-to-r from-[#78350f] via-[#92400e] to-[#78350f] border-b-4 border-[#2b1103] text-white px-3 sm:px-6 py-2 shadow-[0_6px_12px_rgba(0,0,0,0.5),0_3px_0_#1e0a02] z-30 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Logo size="sm" />

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-pixel text-sm sm:text-base md:text-lg tracking-wider text-yellow-300 drop-shadow-[2px_2px_0_#2b1103]">
                SEARCH &amp; SEIZE
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 font-silkscreen text-[9px] uppercase font-bold text-cyan-200 bg-[#083344] px-1.5 py-0.5 rounded border border-cyan-400">
                <Sparkles className="w-2.5 h-2.5 text-cyan-300" />
                TREASURE HUNT
              </span>
            </div>
            <p className="font-outfit text-xs text-yellow-100/90 font-medium">
              Search smart. Seize the treasure.
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenHowToPlay}
            type="button"
            className="arcade-btn arcade-btn-dark px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-xs gap-1.5 flex items-center"
            aria-label="How to play instructions"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-300" />
            <span className="hidden xs:inline">HOW TO PLAY</span>
            <span className="xs:hidden">RULES</span>
          </button>

          <button
            onClick={onNewGame}
            type="button"
            className="arcade-btn arcade-btn-gold px-3 sm:px-4 py-1.5 text-[10px] sm:text-xs gap-1.5 flex items-center"
            aria-label="Start a new game"
          >
            <Play className="w-3.5 h-3.5 fill-[#422006] text-[#422006]" />
            <span>NEW GAME</span>
          </button>
        </div>
      </div>
    </header>
  );
};
