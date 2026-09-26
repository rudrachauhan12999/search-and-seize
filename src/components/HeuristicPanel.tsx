/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Compass, HelpCircle, Scale } from 'lucide-react';
import { HeuristicBreakdown } from '../types/ai';

interface HeuristicPanelProps {
  heuristic: HeuristicBreakdown;
  showBFSPath: boolean;
  onToggleBFSPath: (val: boolean) => void;
}

export const HeuristicPanel: React.FC<HeuristicPanelProps> = ({
  heuristic,
  showBFSPath,
  onToggleBFSPath,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const {
    scoreAdvantage,
    treasureAdvantage,
    distanceAdvantage,
    controlBonus,
    totalEvaluation,
  } = heuristic;

  // Factor visual bar helper
  const renderFactorBar = (val: number, maxRange: number = 30) => {
    const percentage = Math.min(100, Math.max(0, ((val + maxRange) / (maxRange * 2)) * 100));
    const isPositive = val >= 0;

    return (
      <div className="relative w-28 sm:w-36 h-2.5 bg-[#dfcfb4] rounded-full overflow-hidden border border-[#c3b193]">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-stone-500/60 z-10" />
        <div
          className={`h-full transition-all duration-300 ${
            isPositive ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-rose-500 to-amber-600'
          }`}
          style={{
            width: `${Math.abs(val) / (maxRange * 2) * 100}%`,
            marginLeft: isPositive ? '50%' : `${percentage}%`,
          }}
        />
      </div>
    );
  };

  return (
    <div className="w-full bg-[#fdfaf2] rounded-2xl p-4 border-3 border-[#c9b48f] shadow-lg text-[#3d2714]">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[#e2d2b5]">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#533219] text-amber-300">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-cinzel font-bold text-base text-[#3d2714] tracking-wide">
                HEURISTIC EVALUATION
              </h2>
              <button
                type="button"
                onClick={() => setShowTooltip(!showTooltip)}
                className="text-[#886a4a] hover:text-[#533219] focus:outline-none"
                title="Click for heuristic evaluation formula"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-[#785b3b]">
              Static State Formulation (h(n) Function)
            </p>
          </div>
        </div>

        {/* Total Score Badge */}
        <div className="text-right">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-[#795d3f]">
            Total h(s)
          </span>
          <span
            className={`font-cinzel text-xl font-black ${
              totalEvaluation >= 0 ? 'text-emerald-700' : 'text-rose-700'
            }`}
          >
            {totalEvaluation > 0 ? `+${totalEvaluation}` : totalEvaluation}
          </span>
        </div>
      </div>

      {/* Explanatory Tooltip Banner */}
      {showTooltip && (
        <div className="mb-3 p-2.5 rounded-xl bg-[#f4ebd9] border border-[#d2be9b] text-xs text-[#52371c] leading-relaxed">
          <strong className="block text-[#3d2412] mb-0.5">Evaluation Formula:</strong>
          The heuristic evaluates the current game state using score advantage, accessible treasure potential, BFS distance differential, and board territory control.
        </div>
      )}

      {/* Breakdown Rows */}
      <div className="space-y-2 text-xs">
        {/* Row 1: Score Advantage */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-[#f8f2e4] border border-[#ebdcc4]">
          <div>
            <span className="font-bold text-[#442c18] block">Score Advantage</span>
            <span className="text-[10px] text-[#7e6244]">10 × (AI Score - Human Score)</span>
          </div>
          <div className="flex items-center gap-3">
            {renderFactorBar(scoreAdvantage)}
            <span className="font-mono font-bold w-10 text-right">
              {scoreAdvantage > 0 ? `+${scoreAdvantage}` : scoreAdvantage}
            </span>
          </div>
        </div>

        {/* Row 2: Treasure Advantage */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-[#f8f2e4] border border-[#ebdcc4]">
          <div>
            <span className="font-bold text-[#442c18] block">Treasure Advantage</span>
            <span className="text-[10px] text-[#7e6244]">Treasures secured by AI first</span>
          </div>
          <div className="flex items-center gap-3">
            {renderFactorBar(treasureAdvantage)}
            <span className="font-mono font-bold w-10 text-right">
              {treasureAdvantage > 0 ? `+${treasureAdvantage}` : treasureAdvantage}
            </span>
          </div>
        </div>

        {/* Row 3: Distance Advantage */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-[#f8f2e4] border border-[#ebdcc4]">
          <div>
            <span className="font-bold text-[#442c18] block">Distance Advantage</span>
            <span className="text-[10px] text-[#7e6244]">Player BFS dist - AI BFS dist</span>
          </div>
          <div className="flex items-center gap-3">
            {renderFactorBar(distanceAdvantage)}
            <span className="font-mono font-bold w-10 text-right">
              {distanceAdvantage > 0 ? `+${distanceAdvantage}` : distanceAdvantage}
            </span>
          </div>
        </div>

        {/* Row 4: Control Bonus */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-[#f8f2e4] border border-[#ebdcc4]">
          <div>
            <span className="font-bold text-[#442c18] block">Control Bonus</span>
            <span className="text-[10px] text-[#7e6244]">Central quadrant position weight</span>
          </div>
          <div className="flex items-center gap-3">
            {renderFactorBar(controlBonus)}
            <span className="font-mono font-bold w-10 text-right">
              {controlBonus > 0 ? `+${controlBonus}` : controlBonus}
            </span>
          </div>
        </div>
      </div>

      {/* Total Divider Line */}
      <div className="my-2.5 border-t-2 border-[#d8c39e]" />

      <div className="flex items-center justify-between text-xs font-bold text-[#412713] px-1">
        <span>Total Heuristic Balance:</span>
        <span
          className={`font-mono text-sm font-black ${
            totalEvaluation >= 0 ? 'text-emerald-700' : 'text-rose-700'
          }`}
        >
          {totalEvaluation > 0 ? `+${totalEvaluation}` : totalEvaluation} pts
        </span>
      </div>

      {/* BFS Path Visual Toggle (matching reference image) */}
      <div className="mt-3 pt-2.5 border-t border-[#e2d2b5] flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer text-xs text-[#52371c] font-semibold">
          <input
            type="checkbox"
            checked={showBFSPath}
            onChange={(e) => onToggleBFSPath(e.target.checked)}
            className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-amber-800"
          />
          <Compass className="w-4 h-4 text-[#8a5b2e]" />
          <span>Show AI BFS path to nearest treasure</span>
        </label>

        <span className="text-[10px] uppercase font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded border border-amber-400">
          Overlay
        </span>
      </div>
    </div>
  );
};
