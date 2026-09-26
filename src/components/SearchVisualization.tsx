/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Eye, EyeOff, MapPin, Network, ShieldAlert } from 'lucide-react';
import { SearchCell } from '../types/ai';

interface SearchVisualizationProps {
  searchCells: SearchCell[];
  showOverlay: boolean;
  onToggleOverlay: (val: boolean) => void;
}

export const SearchVisualization: React.FC<SearchVisualizationProps> = ({
  searchCells,
  showOverlay,
  onToggleOverlay,
}) => {
  // Count states
  const exploredCount = searchCells.filter((c) => c.state === 'explored').length;
  const candidateCount = searchCells.filter((c) => c.state === 'candidate').length;
  const selectedCount = searchCells.filter((c) => c.state === 'selected').length;
  const threatCount = searchCells.filter((c) => c.state === 'threat').length;

  return (
    <div className="w-full bg-[#fdfaf2] rounded-2xl p-4 border-3 border-[#c9b48f] shadow-lg text-[#3d2714]">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#e2d2b5]">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#533219] text-amber-300">
            <Network className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-cinzel font-bold text-base text-[#3d2714] tracking-wide">
              AI SEARCH VISUALIZATION
            </h2>
            <p className="text-[11px] text-[#785b3b]">
              BFS Frontier & Minimax Decision Trajectory
            </p>
          </div>
        </div>

        {/* Master Toggle */}
        <button
          type="button"
          onClick={() => onToggleOverlay(!showOverlay)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all border shadow-sm ${
            showOverlay
              ? 'bg-amber-100 text-amber-900 border-amber-400 hover:bg-amber-200'
              : 'bg-stone-100 text-stone-600 border-stone-300 hover:bg-stone-200'
          }`}
        >
          {showOverlay ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>{showOverlay ? 'Overlay Visible' : 'Overlay Hidden'}</span>
        </button>
      </div>

      {/* Legend Grid with Accessible Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
        {/* Blue: BFS Explored */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-blue-50 border border-blue-200">
          <div className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-[0_0_6px_#3b82f6] shrink-0" />
          <div>
            <span className="font-bold text-blue-950 block">BFS Explored</span>
            <span className="text-[10px] text-blue-800">
              {exploredCount} cells in radius
            </span>
          </div>
        </div>

        {/* Yellow: Candidate Path */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-50 border border-amber-200">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b] shrink-0" />
          <div>
            <span className="font-bold text-amber-950 block">Candidate Path</span>
            <span className="text-[10px] text-amber-800">
              {candidateCount} options
            </span>
          </div>
        </div>

        {/* Green: Selected AI Path */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200">
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981] flex items-center justify-center text-[8px] text-white font-bold shrink-0">
            ✓
          </div>
          <div>
            <span className="font-bold text-emerald-950 block">Selected AI Path</span>
            <span className="text-[10px] text-emerald-800">
              {selectedCount} step(s)
            </span>
          </div>
        </div>

        {/* Red: Opponent Threat */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-rose-50 border border-rose-200">
          <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-[0_0_6px_#f43f5e] shrink-0" />
          <div>
            <span className="font-bold text-rose-950 block">Opponent Threat</span>
            <span className="text-[10px] text-rose-800">
              {threatCount} danger zone
            </span>
          </div>
        </div>

        {/* Gray: Obstacle */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-stone-100 border border-stone-300">
          <div className="w-3.5 h-3.5 rounded bg-stone-700 shrink-0" />
          <div>
            <span className="font-bold text-stone-900 block">Obstacle</span>
            <span className="text-[10px] text-stone-600">Impassable ruin</span>
          </div>
        </div>
      </div>
    </div>
  );
};
