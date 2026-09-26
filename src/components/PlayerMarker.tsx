/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { GirlExplorerSprite, RobotExplorerSprite } from './GameAssets';
import { PlayerId, Position } from '../types/game';

interface PlayerMarkerProps {
  type: PlayerId;
  name: string;
  isCurrentTurn: boolean;
  position?: Position;
}

export const PlayerMarker: React.FC<PlayerMarkerProps> = ({
  type,
  isCurrentTurn,
  position,
}) => {
  const isHuman = type === 'human';
  const posKey = position ? `${position.row}-${position.col}` : 'pos';

  if (isHuman) {
    // 👧 GIRL EXPLORER (PLAYER - CYAN / BLUE GLOW)
    return (
      <div className="relative flex flex-col items-center justify-center select-none w-full h-full pointer-events-none overflow-visible">
        {/* Landing Dust & Sparkle Burst */}
        <motion.div
          key={`dust-human-${posKey}`}
          initial={{ scale: 0.3, opacity: 1 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute inset-0 rounded-full border-3 border-cyan-300 pointer-events-none flex items-center justify-center"
        >
          <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
        </motion.div>

        {/* Permanent Subtle Cyan Base Glow */}
        <div className="absolute -inset-1 rounded-full bg-cyan-400/20 blur-xs pointer-events-none" />

        {/* Turn Active Radial Cyan/Blue Aura */}
        {isCurrentTurn && (
          <motion.div
            animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0.95, 0.55] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-400/50 via-sky-300/40 to-blue-500/50 blur-sm pointer-events-none"
          />
        )}

        {/* Girl Explorer Character (neatly scaled for grid alignment) */}
        <motion.div
          key={`girl-sprite-${posKey}`}
          initial={{ y: -12, scale: 0.9 }}
          animate={{ y: [0, -2.5, 0], scale: 1 }}
          transition={{
            y: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
            scale: { type: 'spring', stiffness: 500, damping: 20 },
          }}
          className="relative flex items-center justify-center -translate-y-1.5 z-30"
        >
          <GirlExplorerSprite className="w-13 h-13 sm:w-16 sm:h-16 object-contain filter drop-shadow-[0_5px_5px_rgba(0,0,0,0.65)] drop-shadow-[0_0_7px_rgba(34,211,238,0.55)]" />
        </motion.div>
      </div>
    );
  }

  // 🤖 ROBOT EXPLORER (AI - PINK / MAGENTA / PURPLE GLOW)
  return (
    <div className="relative flex flex-col items-center justify-center select-none w-full h-full pointer-events-none overflow-visible">
      {/* Landing Radar Shockwave Ring */}
      <motion.div
        key={`dust-ai-${posKey}`}
        initial={{ scale: 0.3, opacity: 1 }}
        animate={{ scale: 2.2, opacity: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute inset-0 rounded-full border-3 border-rose-400 pointer-events-none"
      />

      {/* Permanent Subtle Pink/Purple Base Glow */}
      <div className="absolute -inset-1 rounded-full bg-rose-500/20 blur-xs pointer-events-none" />

      {/* Floating Thinking Bubble above Robot Explorer */}
      {isCurrentTurn && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ y: [0, -3.5, 0], opacity: 1 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-9 px-2.5 py-0.5 rounded-full bg-[#2e081d] border-2 border-rose-400 text-rose-200 font-silkscreen font-bold text-[8px] sm:text-[9px] shadow-[0_4px_8px_rgba(0,0,0,0.8),0_0_10px_rgba(244,63,94,0.6)] z-40 flex items-center gap-1.5 whitespace-nowrap"
        >
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          <span>AI THINKING...</span>
        </motion.div>
      )}

      {/* Turn Active Radial Pink/Purple Aura */}
      {isCurrentTurn && (
        <motion.div
          animate={{ scale: [1, 1.35, 1], opacity: [0.55, 0.95, 0.55] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -inset-4 rounded-full bg-gradient-to-r from-rose-500/50 via-pink-500/40 to-purple-600/50 blur-sm pointer-events-none"
        />
      )}

      {/* Robot Explorer Character (neatly scaled for grid alignment) */}
      <motion.div
        key={`robot-sprite-${posKey}`}
        initial={{ y: -12, scale: 0.9 }}
        animate={{ y: [0, -2.5, 0], scale: 1 }}
        transition={{
          y: { duration: 2.0, repeat: Infinity, ease: 'easeInOut' },
          scale: { type: 'spring', stiffness: 500, damping: 20 },
        }}
        className="relative flex items-center justify-center -translate-y-1.5 z-30"
      >
        <RobotExplorerSprite className="w-13 h-13 sm:w-16 sm:h-16 object-contain filter drop-shadow-[0_5px_5px_rgba(0,0,0,0.65)] drop-shadow-[0_0_7px_rgba(244,63,94,0.55)]" />
      </motion.div>
    </div>
  );
};
