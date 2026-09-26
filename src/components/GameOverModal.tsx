/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { RotateCcw, Sparkles, Trophy, X } from 'lucide-react';
import { GameState } from '../types/game';
import { GirlExplorerSprite, RobotExplorerSprite } from './GameAssets';

interface GameOverModalProps {
  gameState: GameState;
  onPlayAgain: () => void;
  onViewInsights: () => void;
  onClose: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  size: number;
  shape: 'circle' | 'square' | 'sparkle' | 'coin';
  delay: number;
  duration: number;
  rotation: number;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  gameState,
  onPlayAgain,
  onViewInsights,
  onClose,
}) => {
  const { human, ai } = gameState;
  const isHumanWinner = human.score > ai.score;
  const isDraw = human.score === ai.score;

  let title = '🏆 TREASURE MASTER!';
  let subtitle = 'You explored smart and seized the island treasures!';
  let titleColor = 'text-yellow-300';

  if (!isHumanWinner && !isDraw) {
    title = '🤖 THE AI GOT THERE FIRST!';
    subtitle = 'The Robot Explorer computed a clever route this time!';
    titleColor = 'text-rose-400';
  } else if (isDraw) {
    title = '⚔️ HONORARY DRAW!';
    subtitle = 'Both explorers matched wits and shared the bounty!';
    titleColor = 'text-cyan-300';
  }

  // Generate celebratory confetti burst particles
  const particles = useMemo<Particle[]>(() => {
    const palette = isHumanWinner
      ? ['#facc15', '#38bdf8', '#22d3ee', '#4ade80', '#fbbf24', '#f43f5e', '#a855f7']
      : ['#f43f5e', '#ec4899', '#a855f7', '#60a5fa', '#facc15'];

    const count = 38;
    const items: Particle[] = [];

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * 2 * Math.PI + (Math.random() - 0.5) * 0.4;
      const distance = 160 + Math.random() * 260;
      const targetX = Math.cos(angle) * distance;
      const targetY = Math.sin(angle) * distance - (isHumanWinner ? 40 : 0);

      const shapes: Array<'circle' | 'square' | 'sparkle' | 'coin'> = ['circle', 'square', 'sparkle', 'coin'];

      items.push({
        id: i,
        x: 0,
        y: 0,
        targetX,
        targetY,
        color: palette[i % palette.length],
        size: 8 + Math.floor(Math.random() * 10),
        shape: shapes[i % shapes.length],
        delay: Math.random() * 0.18,
        duration: 0.9 + Math.random() * 0.7,
        rotation: (Math.random() - 0.5) * 720,
      });
    }
    return items;
  }, [isHumanWinner]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs select-none overflow-hidden">
      {/* CELEBRATORY PARTICLE EXPLOSION (MOUNT ANIMATION) */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{
              x: 0,
              y: -40,
              scale: 0,
              opacity: 1,
              rotate: 0,
            }}
            animate={{
              x: p.targetX,
              y: p.targetY,
              scale: [0, 1.4, 0.9, 0],
              opacity: [1, 1, 0.8, 0],
              rotate: p.rotation,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute flex items-center justify-center pointer-events-none"
            style={{ width: p.size, height: p.size }}
          >
            {p.shape === 'coin' ? (
              <div
                className="w-full h-full rounded-full border border-black shadow-xs font-pixel text-[6px] flex items-center justify-center font-bold"
                style={{ backgroundColor: p.color, color: '#451a03' }}
              >
                $
              </div>
            ) : p.shape === 'sparkle' ? (
              <Sparkles className="w-full h-full filter drop-shadow-xs" style={{ color: p.color }} />
            ) : p.shape === 'circle' ? (
              <div
                className="w-full h-full rounded-full border border-black/40 shadow-xs"
                style={{ backgroundColor: p.color }}
              />
            ) : (
              <div
                className="w-full h-full rounded-xs border border-black/40 shadow-xs"
                style={{ backgroundColor: p.color }}
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* MODAL CONTAINER */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 24 }}
        className="relative z-20 w-full max-w-md rounded-3xl bg-gradient-to-b from-[#854d0e] via-[#713f12] to-[#451a03] p-5 sm:p-6 border-4 border-[#2b1103] shadow-[0_20px_48px_rgba(0,0,0,0.85),0_6px_0_#1e0a02] text-white text-center overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 arcade-btn arcade-btn-dark w-8 h-8 flex items-center justify-center p-0"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Character Victory Celebration Icon */}
        <div className="flex justify-center mb-3">
          <motion.div
            initial={{ scale: 0.5, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 450, damping: 15 }}
            className="w-20 h-20 sm:w-24 sm:h-24 p-1 rounded-2xl bg-gradient-to-b from-yellow-300 to-amber-500 border-3 border-black shadow-[0_6px_12px_rgba(0,0,0,0.6)] flex items-center justify-center relative"
          >
            {isHumanWinner ? (
              <GirlExplorerSprite className="w-full h-full object-contain" showArrow={false} />
            ) : (
              <RobotExplorerSprite className="w-full h-full object-contain" showArrow={false} />
            )}

            {/* Glowing Victory Crown/Badge */}
            {isHumanWinner && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.35, type: 'spring', stiffness: 450, damping: 12 }}
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-400 border-2 border-black flex items-center justify-center shadow-md"
              >
                <Trophy className="w-4 h-4 fill-[#451a03] text-[#451a03]" />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Dramatic Victory Banner */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`font-pixel text-lg sm:text-xl tracking-wider drop-shadow-[2px_2px_0_#2b1103] ${titleColor}`}
        >
          {title}
        </motion.h2>

        <p className="font-outfit text-xs text-yellow-100 font-medium mt-1">
          {subtitle}
        </p>

        {/* Chunky Score Breakdown */}
        <div className="w-full mt-4 p-3 rounded-2xl bg-[#522909]/90 border-2 border-[#854d0e] shadow-inner">
          <div className="grid grid-cols-2 divide-x-2 divide-[#381a05]">
            {/* YOU */}
            <div className="flex flex-col items-center pr-2">
              <span className="font-silkscreen text-xs font-bold uppercase text-cyan-300">
                👧 YOU
              </span>
              <span className="font-pixel text-3xl sm:text-4xl text-yellow-300 drop-shadow-[2px_2px_0_#000] mt-1">
                {human.score}
              </span>
              <span className="font-silkscreen text-[10px] text-yellow-200 mt-1">
                💰 {human.treasuresCollected} Treasures
              </span>
            </div>

            {/* AI */}
            <div className="flex flex-col items-center pl-2">
              <span className="font-silkscreen text-xs font-bold uppercase text-rose-300">
                🤖 AI
              </span>
              <span className="font-pixel text-3xl sm:text-4xl text-rose-400 drop-shadow-[2px_2px_0_#000] mt-1">
                {ai.score}
              </span>
              <span className="font-silkscreen text-[10px] text-yellow-200 mt-1">
                💰 {ai.treasuresCollected} Treasures
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-5">
          <button
            onClick={onPlayAgain}
            type="button"
            className="arcade-btn arcade-btn-gold w-full sm:flex-1 py-3 text-xs tracking-wider flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4 stroke-[3]" />
            <span>{isHumanWinner ? 'PLAY AGAIN' : 'TRY AGAIN'}</span>
          </button>

          <button
            onClick={onViewInsights}
            type="button"
            className="arcade-btn arcade-btn-dark w-full sm:flex-1 py-3 text-xs tracking-wider flex items-center justify-center gap-2"
          >
            <span>VIEW STATS</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
