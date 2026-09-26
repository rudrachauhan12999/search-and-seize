/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Compass, Sparkles } from 'lucide-react';
import { SearchCell } from '../types/ai';
import { GameState, MoveDirection } from '../types/game';
import { GameCell } from './GameCell';
import { PlayerMarker } from './PlayerMarker';

interface GameBoardProps {
  gameState: GameState;
  validHumanMoves: MoveDirection[];
  searchCells?: SearchCell[];
  showSearchOverlay?: boolean;
  onHumanMove: (direction: MoveDirection) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  validHumanMoves,
  searchCells = [],
  showSearchOverlay = false,
  onHumanMove,
}) => {
  const { board, human, ai, treasures, lastCollectedTreasure, currentTurn, gameStatus } = gameState;

  // Compute valid destination cells for human
  const validMoveMap = new Map<string, MoveDirection>();
  if (currentTurn === 'human' && gameStatus === 'playing') {
    validHumanMoves.forEach((dir) => {
      let r = human.position.row;
      let c = human.position.col;
      if (dir === 'up') r -= 1;
      if (dir === 'down') r += 1;
      if (dir === 'left') c -= 1;
      if (dir === 'right') c += 1;
      validMoveMap.set(`${r},${c}`, dir);
    });
  }

  const handleCellClick = (row: number, col: number) => {
    const dir = validMoveMap.get(`${row},${col}`);
    if (dir) {
      onHumanMove(dir);
    }
  };

  const isHumanTurn = currentTurn === 'human' && gameStatus === 'playing';
  const isAiThinking = gameStatus === 'thinking' || currentTurn === 'ai';

  return (
    <div className="relative flex flex-col items-center w-full max-w-[660px] select-none">
      {/* PHYSICAL TREASURE-MAP WOODEN FRAME - STEADY & GROUNDED */}
      <div className="relative w-full aspect-square p-2.5 sm:p-3.5 rounded-3xl bg-gradient-to-b from-[#854d0e] via-[#713f12] to-[#451a03] border-4 border-[#2b1103] shadow-[0_16px_32px_rgba(0,0,0,0.65),0_6px_0_#261004,inset_0_2px_4px_rgba(255,255,255,0.3),inset_0_-3px_6px_rgba(0,0,0,0.6)] flex flex-col">
        {/* Wood Grain & Plank Grooves */}
        <div className="absolute inset-x-2 top-2 h-0.5 bg-yellow-200/25 rounded pointer-events-none" />
        <div className="absolute inset-y-2 left-2 w-0.5 bg-black/40 rounded pointer-events-none" />
        <div className="absolute inset-y-2 right-2 w-0.5 bg-black/40 rounded pointer-events-none" />

        {/* Tiny Frame Nails / Rivets Along Edges */}
        <div className="absolute top-2.5 left-1/4 w-1.5 h-1.5 rounded-full bg-[#fde047] border border-[#451a03] shadow-xs pointer-events-none" />
        <div className="absolute top-2.5 right-1/4 w-1.5 h-1.5 rounded-full bg-[#fde047] border border-[#451a03] shadow-xs pointer-events-none" />
        <div className="absolute bottom-2.5 left-1/4 w-1.5 h-1.5 rounded-full bg-[#fde047] border border-[#451a03] shadow-xs pointer-events-none" />
        <div className="absolute bottom-2.5 right-1/4 w-1.5 h-1.5 rounded-full bg-[#fde047] border border-[#451a03] shadow-xs pointer-events-none" />
        <div className="absolute left-2.5 top-1/2 w-1.5 h-1.5 rounded-full bg-[#fde047] border border-[#451a03] shadow-xs pointer-events-none" />
        <div className="absolute right-2.5 top-1/2 w-1.5 h-1.5 rounded-full bg-[#fde047] border border-[#451a03] shadow-xs pointer-events-none" />

        {/* 4 Golden Brass Corner Brackets with Rivets & Rope Ties */}
        {/* Top Left */}
        <div className="absolute top-1.5 left-1.5 w-7 h-7 bg-gradient-to-br from-[#fef08a] via-[#facc15] to-[#ca8a04] border-2 border-[#451a03] rounded-tl-xl shadow-[1px_1px_3px_rgba(0,0,0,0.6)] flex items-center justify-center pointer-events-none z-30">
          <div className="w-2 h-2 rounded-full bg-[#713f12] border border-[#fef08a]" />
          {/* Subtle rope wrap mark */}
          <div className="absolute -bottom-1 -right-1 w-3 h-1 bg-[#d97706] rounded-full rotate-45 border border-[#451a03]" />
        </div>
        {/* Top Right */}
        <div className="absolute top-1.5 right-1.5 w-7 h-7 bg-gradient-to-bl from-[#fef08a] via-[#facc15] to-[#ca8a04] border-2 border-[#451a03] rounded-tr-xl shadow-[1px_1px_3px_rgba(0,0,0,0.6)] flex items-center justify-center pointer-events-none z-30">
          <div className="w-2 h-2 rounded-full bg-[#713f12] border border-[#fef08a]" />
          <div className="absolute -bottom-1 -left-1 w-3 h-1 bg-[#d97706] rounded-full -rotate-45 border border-[#451a03]" />
        </div>
        {/* Bottom Left */}
        <div className="absolute bottom-1.5 left-1.5 w-7 h-7 bg-gradient-to-tr from-[#fef08a] via-[#facc15] to-[#ca8a04] border-2 border-[#451a03] rounded-bl-xl shadow-[1px_1px_3px_rgba(0,0,0,0.6)] flex items-center justify-center pointer-events-none z-30">
          <div className="w-2 h-2 rounded-full bg-[#713f12] border border-[#fef08a]" />
          <div className="absolute -top-1 -right-1 w-3 h-1 bg-[#d97706] rounded-full -rotate-45 border border-[#451a03]" />
        </div>
        {/* Bottom Right */}
        <div className="absolute bottom-1.5 right-1.5 w-7 h-7 bg-gradient-to-tl from-[#fef08a] via-[#facc15] to-[#ca8a04] border-2 border-[#451a03] rounded-br-xl shadow-[1px_1px_3px_rgba(0,0,0,0.6)] flex items-center justify-center pointer-events-none z-30">
          <div className="w-2 h-2 rounded-full bg-[#713f12] border border-[#fef08a]" />
          <div className="absolute -top-1 -left-1 w-3 h-1 bg-[#d97706] rounded-full rotate-45 border border-[#451a03]" />
        </div>

        {/* Top Center Nautical Compass Badge */}
        <div className="absolute -top-3.5 inset-x-0 mx-auto w-fit z-30">
          <div className="flex items-center gap-1.5 px-3.5 py-0.5 rounded-full bg-gradient-to-r from-[#d97706] via-[#facc15] to-[#d97706] border-2 border-[#451a03] shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            <Compass className="w-3.5 h-3.5 text-[#451a03] animate-[spin_12s_linear_infinite]" />
            <span className="font-silkscreen font-bold text-[10px] text-[#451a03] tracking-widest uppercase">
              ISLAND MAP
            </span>
          </div>
        </div>

        {/* Parchment Map Mat Underneath Tiles */}
        <div className="relative flex-1 h-full rounded-2xl p-1 sm:p-1.5 bg-[#d4a373] border-3 border-[#6b421a] shadow-[inset_0_3px_8px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Subtle parchment stain texture & compass markings */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle at 70% 30%, #5c3d1e 0%, transparent 60%), radial-gradient(circle at 20% 80%, #5c3d1e 0%, transparent 60%)',
            }}
          />

          {/* 8x8 Island Terrain Grid */}
          <div className="grid grid-cols-8 grid-rows-8 gap-1 w-full h-full relative z-10">
            {board.flatMap((rowCells, r) =>
              rowCells.map((cell, c) => {
                const treasure = treasures.find(
                  (t) => t.position.row === r && t.position.col === c && !t.collected
                );
                const searchState = showSearchOverlay
                  ? searchCells.find((sc) => sc.row === r && sc.col === c)?.state || null
                  : null;
                const dir = validMoveMap.get(`${r},${c}`);
                const isValidHumanMove = !!dir;

                return (
                  <GameCell
                    key={`${r}-${c}`}
                    cell={cell}
                    treasure={treasure}
                    searchState={searchState}
                    isValidHumanMove={isValidHumanMove}
                    validMoveDirection={dir}
                    showCoords={false}
                    onCellClick={handleCellClick}
                  />
                );
              })
            )}
          </div>

          {/* Overlaid Animated Character Tokens (with overflow-visible for 40% larger sprites) */}
          {/* 1. GIRL EXPLORER TOKEN (YOU) */}
          <motion.div
            className="absolute pointer-events-none p-0.5 flex items-center justify-center overflow-visible"
            style={{
              width: '12.5%',
              height: '12.5%',
              zIndex: 35,
            }}
            animate={{
              left: `${human.position.col * 12.5}%`,
              top: `${human.position.row * 12.5}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 320,
              damping: 24,
              mass: 0.6,
            }}
          >
            <PlayerMarker
              type="human"
              name={human.name}
              isCurrentTurn={isHumanTurn}
              position={human.position}
            />
          </motion.div>

          {/* 2. ROBOT EXPLORER TOKEN (AI) */}
          <motion.div
            className="absolute pointer-events-none p-0.5 flex items-center justify-center overflow-visible"
            style={{
              width: '12.5%',
              height: '12.5%',
              zIndex: 35,
            }}
            animate={{
              left: `${ai.position.col * 12.5}%`,
              top: `${ai.position.row * 12.5}%`,
            }}
            transition={{
              type: 'spring',
              stiffness: 320,
              damping: 24,
              mass: 0.6,
            }}
          >
            <PlayerMarker
              type="ai"
              name={ai.name}
              isCurrentTurn={isAiThinking}
              position={ai.position}
            />
          </motion.div>

          {/* Floating Treasure Pop Effect (+1, +3, +5, +10) */}
          <AnimatePresence>
            {lastCollectedTreasure && (
              <motion.div
                key={`${lastCollectedTreasure.position.row}-${lastCollectedTreasure.position.col}-${Date.now()}`}
                initial={{ opacity: 0, y: 15, scale: 0.6 }}
                animate={{ opacity: 1, y: -8, scale: 1.15 }}
                exit={{ opacity: 0, y: -30, scale: 0.8 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="absolute inset-x-0 top-6 mx-auto w-fit z-50 pointer-events-none"
              >
                <div
                  className={`px-3.5 py-1 rounded-full border-3 border-black shadow-[0_6px_0_#000,0_0_16px_rgba(250,204,21,0.8)] flex items-center gap-1.5 font-silkscreen font-bold text-xs sm:text-sm tracking-wide ${
                    lastCollectedTreasure.player === 'human'
                      ? 'bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-300 text-[#451a03]'
                      : 'bg-gradient-to-r from-rose-500 to-purple-600 text-white'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {lastCollectedTreasure.type === 'gold'
                      ? '👑'
                      : lastCollectedTreasure.type === 'gem'
                      ? '💎'
                      : lastCollectedTreasure.type === 'ruby'
                      ? '♦️'
                      : '🪙'}
                  </span>
                  <span>+{lastCollectedTreasure.value}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
