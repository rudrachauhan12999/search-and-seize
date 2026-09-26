/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { CyanGemSprite, GoldCoinSprite, GoldenChestSprite, RubySprite } from './GameAssets';
import { TreasureType } from '../types/game';

interface TreasureProps {
  type: TreasureType;
  value: number;
}

export const Treasure: React.FC<TreasureProps> = ({ type, value }) => {
  let SpriteComponent: React.FC<{ className?: string }> = GoldCoinSprite;
  let glowColor = 'bg-yellow-400/50';
  let sparkleColor = 'text-yellow-300';

  if (type === 'gold') {
    SpriteComponent = GoldenChestSprite;
    glowColor = 'bg-amber-400/60';
    sparkleColor = 'text-yellow-300';
  } else if (type === 'gem') {
    SpriteComponent = CyanGemSprite;
    glowColor = 'bg-cyan-400/55';
    sparkleColor = 'text-cyan-200';
  } else if (type === 'ruby') {
    SpriteComponent = RubySprite;
    glowColor = 'bg-rose-500/55';
    sparkleColor = 'text-rose-300';
  } else {
    SpriteComponent = GoldCoinSprite;
    glowColor = 'bg-yellow-400/50';
    sparkleColor = 'text-yellow-200';
  }

  return (
    <div className="relative flex flex-col items-center justify-center select-none pointer-events-none w-full h-full p-0.5 overflow-visible">
      {/* Continuous Pulse Aura */}
      <motion.div
        animate={{
          scale: [0.9, 1.45, 0.9],
          opacity: [0.35, 0.85, 0.35],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`absolute -inset-2 rounded-full ${glowColor} blur-xs pointer-events-none`}
      />

      {/* Rotating Ambient Sparkle */}
      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [0.7, 1.2, 0.7],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute -top-1.5 -right-1 z-20 pointer-events-none"
      >
        <Sparkles className={`w-3.5 h-3.5 ${sparkleColor}`} />
      </motion.div>

      {/* Collectible Sprite with Bob & Float */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -3, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex items-center justify-center w-full h-full z-10"
      >
        <SpriteComponent className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter drop-shadow-[0_4px_3px_rgba(0,0,0,0.65)]" />
      </motion.div>
    </div>
  );
};
