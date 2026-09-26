/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  History,
  Scroll,
} from 'lucide-react';
import { MoveDirection, MoveLogEntry } from '../types/game';

interface MoveLogProps {
  entries: MoveLogEntry[];
}

export const MoveLog: React.FC<MoveLogProps> = ({ entries }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  const renderMoveArrow = (move: MoveDirection) => {
    switch (move) {
      case 'up':
        return <ArrowUp className="w-3.5 h-3.5" />;
      case 'down':
        return <ArrowDown className="w-3.5 h-3.5" />;
      case 'left':
        return <ArrowLeft className="w-3.5 h-3.5" />;
      case 'right':
        return <ArrowRight className="w-3.5 h-3.5" />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#fdfaf2] rounded-2xl p-4 border-3 border-[#c9b48f] shadow-lg text-[#3d2714] flex flex-col h-[280px]">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#e2d2b5] shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#533219] text-amber-300">
            <Scroll className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-cinzel font-bold text-sm text-[#3d2714] tracking-wide">
              EXPEDITION LOG
            </h2>
            <p className="text-[10px] text-[#785b3b]">Turn-by-turn history</p>
          </div>
        </div>

        <span className="text-[11px] font-mono text-[#826649] bg-[#f2e6d2] px-2 py-0.5 rounded border border-[#dac8a8]">
          {entries.length} actions
        </span>
      </div>

      {/* Log List */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-1.5 pr-1 text-xs select-text scrollbar-thin scrollbar-thumb-[#c9b48f]"
      >
        {entries.map((entry, index) => {
          const isHuman = entry.player === 'human';

          return (
            <div
              key={entry.id || index}
              className={`p-2 rounded-xl flex items-center justify-between border ${
                isHuman
                  ? 'bg-blue-50/70 border-blue-200/80 text-blue-950'
                  : 'bg-red-50/70 border-red-200/80 text-red-950'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-stone-500 font-bold w-4">
                  {entry.turnNumber || index + 1}.
                </span>

                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                    isHuman
                      ? 'bg-blue-600 text-white'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  {isHuman ? 'You' : 'AI'}
                </span>

                <div className="flex items-center gap-1 font-semibold">
                  <span>moved {entry.move.toUpperCase()}</span>
                  {renderMoveArrow(entry.move)}
                </div>
              </div>

              {/* Treasure collection badge */}
              {entry.treasureCollected ? (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-200 text-amber-950 font-bold font-cinzel text-[11px] border border-amber-400">
                  <span>
                    {entry.treasureCollected.type === 'gold'
                      ? '👑'
                      : entry.treasureCollected.type === 'gem'
                      ? '💎'
                      : entry.treasureCollected.type === 'ruby'
                      ? '♦️'
                      : '🪙'}
                  </span>
                  +{entry.treasureCollected.value}
                </span>
              ) : entry.details ? (
                <span className="text-[10px] text-stone-500 italic max-w-[130px] truncate">
                  {entry.details}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
