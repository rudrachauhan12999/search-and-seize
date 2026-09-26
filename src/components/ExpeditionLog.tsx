/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight } from 'lucide-react';
import { MoveLogEntry } from '../types/game';

interface ExpeditionLogProps {
  entries: MoveLogEntry[];
}

export const ExpeditionLog: React.FC<ExpeditionLogProps> = ({ entries }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && isOpen) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries, isOpen]);

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-[#0f172a] via-[#172554] to-[#0f172a] p-1 border-2 border-cyan-500/40 shadow-[0_6px_14px_rgba(0,0,0,0.6),0_2px_0_#172554] text-white overflow-hidden select-none">
      {/* Header Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-2 bg-[#172554]/80 rounded-xl border border-cyan-400/30 flex items-center justify-between text-left transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-2 font-silkscreen font-bold text-xs text-cyan-200">
          <div className="w-5 h-5 rounded-md bg-cyan-900/80 border border-cyan-400 flex items-center justify-center">
            <BookOpen className="w-3.5 h-3.5 text-yellow-300" />
          </div>
          <span>ADVENTURE JOURNAL</span>
          <span className="font-pixel text-[8px] bg-slate-900 text-yellow-300 px-1.5 py-0.5 rounded border border-cyan-500/40">
            {entries.length}
          </span>
        </div>

        {isOpen ? (
          <ChevronDown className="w-3.5 h-3.5 text-cyan-300" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-cyan-300" />
        )}
      </button>

      {/* Event Stream */}
      {isOpen && (
        <div
          ref={scrollRef}
          className="max-h-32 overflow-y-auto p-2 space-y-1 font-silkscreen text-[9px] sm:text-[10px] bg-slate-950/80 mt-1 rounded-xl divide-y divide-slate-800"
        >
          {entries.length === 0 ? (
            <p className="text-slate-400 text-center py-2 font-outfit text-xs">
              Expedition underway. Make your first move!
            </p>
          ) : (
            entries.map((entry, index) => {
              const isHuman = entry.player === 'human';

              return (
                <div
                  key={entry.id || index}
                  className="pt-1 first:pt-0 flex items-center justify-between gap-1"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-bold px-1.5 py-0.2 rounded text-[8px] uppercase border ${
                        isHuman
                          ? 'bg-cyan-500 text-black border-cyan-300 shadow-xs'
                          : 'bg-rose-500 text-white border-rose-300 shadow-xs'
                      }`}
                    >
                      {isHuman ? 'YOU' : 'AI'}
                    </span>

                    <span className="text-slate-200 font-bold">
                      → {entry.move.toUpperCase()}
                    </span>
                  </div>

                  {entry.treasureCollected && (
                    <span className="font-bold text-[#451a03] bg-gradient-to-r from-yellow-300 to-amber-400 px-1.5 py-0.2 rounded border border-yellow-500 text-[8px] flex items-center gap-0.5 shadow-xs">
                      <span>FOUND</span>
                      <span>
                        {entry.treasureCollected.type === 'gold'
                          ? '👑'
                          : entry.treasureCollected.type === 'gem'
                          ? '💎'
                          : entry.treasureCollected.type === 'ruby'
                          ? '♦️'
                          : '🪙'}
                      </span>
                      <span>+{entry.treasureCollected.value}</span>
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
