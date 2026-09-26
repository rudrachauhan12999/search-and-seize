/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bot,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { AIAnalysis, HeuristicBreakdown, SearchCell } from '../types/ai';
import { AlgorithmType, DifficultyLevel, MoveDirection } from '../types/game';

interface AIInsightsProps {
  analysis: AIAnalysis | null;
  heuristic: HeuristicBreakdown;
  searchCells: SearchCell[];
  showSearchOverlay: boolean;
  onToggleSearchOverlay: (val: boolean) => void;
  algorithm: AlgorithmType;
  searchDepth: number;
  difficulty: DifficultyLevel;
  onSelectAlgorithm: (algo: AlgorithmType) => void;
  onSelectDepth: (depth: number) => void;
  onSelectDifficulty: (difficulty: DifficultyLevel) => void;
  isThinking: boolean;
}

export const AIInsights: React.FC<AIInsightsProps> = ({
  analysis,
  heuristic,
  showSearchOverlay,
  onToggleSearchOverlay,
  algorithm,
  searchDepth,
  onSelectAlgorithm,
  onSelectDepth,
  onSelectDifficulty,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const renderMoveIcon = (move: MoveDirection | null) => {
    switch (move) {
      case 'up':
        return <ArrowUp className="w-3.5 h-3.5 stroke-[3.5] text-cyan-300 inline" />;
      case 'down':
        return <ArrowDown className="w-3.5 h-3.5 stroke-[3.5] text-cyan-300 inline" />;
      case 'left':
        return <ArrowLeft className="w-3.5 h-3.5 stroke-[3.5] text-cyan-300 inline" />;
      case 'right':
        return <ArrowRight className="w-3.5 h-3.5 stroke-[3.5] text-cyan-300 inline" />;
      default:
        return <span>—</span>;
    }
  };

  const isAlphaBeta = algorithm === 'alpha-beta';

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-[#0f172a] via-[#1e1b4b] to-[#0f172a] p-1 border-2 border-purple-500/40 shadow-[0_6px_14px_rgba(0,0,0,0.6),0_2px_0_#1e1b4b] text-white overflow-hidden select-none">
      {/* TACTICAL ABILITY HEADER */}
      <div className="flex items-center justify-between p-2 rounded-xl bg-[#1e1b4b]/80 border border-purple-400/30">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 font-silkscreen font-bold text-xs text-purple-200 hover:text-white cursor-pointer"
        >
          <div className="w-5 h-5 rounded-md bg-purple-900/80 border border-purple-400 flex items-center justify-center">
            <Bot className="w-3.5 h-3.5 text-cyan-300" />
          </div>
          <span className="tracking-wide">AI INSIGHTS</span>
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-purple-300" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-purple-300" />
          )}
        </button>

        {/* Tactical Search Map Ability Toggle */}
        <button
          type="button"
          onClick={() => onToggleSearchOverlay(!showSearchOverlay)}
          className={`px-2 py-0.5 rounded-lg text-[9px] font-silkscreen font-bold gap-1 flex items-center border transition-all cursor-pointer ${
            showSearchOverlay
              ? 'bg-purple-600 text-white border-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.7)]'
              : 'bg-slate-800 text-slate-300 border-slate-600 hover:text-white'
          }`}
          title="Toggle Tactical Radar on the Board"
        >
          {showSearchOverlay ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          <span>RADAR</span>
        </button>
      </div>

      {/* QUICK STATUS BAR WHEN CLOSED */}
      {!isOpen && (
        <div className="px-2.5 py-1 flex items-center justify-between font-silkscreen text-[9px] text-slate-300 bg-slate-900/70 mt-1 rounded-lg">
          <span className="text-cyan-300 font-bold">{isAlphaBeta ? 'Alpha-Beta' : 'Minimax'} (D:{searchDepth})</span>
          <span className="text-emerald-300 font-pixel text-[9px]">
            H: {heuristic.totalEvaluation > 0 ? `+${heuristic.totalEvaluation}` : heuristic.totalEvaluation}
          </span>
          <span className="text-yellow-300 flex items-center gap-1 font-bold">
            NEXT: {renderMoveIcon(analysis?.bestMove || null)} {analysis?.bestMove?.toUpperCase() || '—'}
          </span>
        </div>
      )}

      {/* EXPANDED ABILITY STATS */}
      {isOpen && (
        <div className="p-2 flex flex-col gap-1.5 font-outfit text-xs bg-slate-950/80 mt-1 rounded-xl">
          <div className="grid grid-cols-3 gap-1.5 text-center">
            <div className="p-1 rounded-lg bg-slate-900 border border-purple-900/60">
              <span className="font-silkscreen text-[7px] uppercase font-bold text-slate-400 block">
                ALGO
              </span>
              <span className="font-silkscreen text-[9px] font-bold text-cyan-300 block truncate">
                {isAlphaBeta ? 'A-B' : 'Minimax'}
              </span>
            </div>

            <div className="p-1 rounded-lg bg-slate-900 border border-purple-900/60">
              <span className="font-silkscreen text-[7px] uppercase font-bold text-slate-400 block">
                DEPTH
              </span>
              <span className="font-pixel text-[10px] text-yellow-300 block">
                {searchDepth}
              </span>
            </div>

            <div className="p-1 rounded-lg bg-slate-900 border border-purple-900/60">
              <span className="font-silkscreen text-[7px] uppercase font-bold text-slate-400 block">
                BEST MOVE
              </span>
              <div className="flex items-center justify-center gap-0.5 font-silkscreen text-[9px] font-bold text-cyan-300 uppercase">
                {renderMoveIcon(analysis?.bestMove || null)}
                <span>{analysis?.bestMove || '—'}</span>
              </div>
            </div>

            <div className="p-1 rounded-lg bg-slate-900 border border-purple-900/60">
              <span className="font-silkscreen text-[7px] uppercase font-bold text-slate-400 block">
                NODES
              </span>
              <span className="font-pixel text-[10px] text-cyan-300 block">
                {analysis?.nodesExplored || 58}
              </span>
            </div>

            <div className="p-1 rounded-lg bg-slate-900 border border-purple-900/60">
              <span className="font-silkscreen text-[7px] uppercase font-bold text-slate-400 block">
                PRUNED
              </span>
              <span className="font-pixel text-[10px] text-rose-300 block">
                {isAlphaBeta ? analysis?.nodesPruned || 37 : 0}
              </span>
            </div>

            <div className="p-1 rounded-lg bg-slate-900 border border-purple-900/60">
              <span className="font-silkscreen text-[7px] uppercase font-bold text-slate-400 block truncate" title="Evaluation">
                EVALUATION
              </span>
              <span className="font-pixel text-[10px] text-emerald-300 block">
                {analysis && analysis.evaluation > 0
                  ? `+${analysis.evaluation}`
                  : analysis?.evaluation !== undefined
                  ? `${analysis.evaluation}`
                  : heuristic.totalEvaluation > 0
                  ? `+${heuristic.totalEvaluation}`
                  : `${heuristic.totalEvaluation}`}
              </span>
            </div>
          </div>

          {/* HEURISTIC EVALUATION BREAKDOWN */}
          <div className="p-2 rounded-xl bg-slate-900/90 border border-purple-500/30 flex flex-col gap-1.5 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="font-silkscreen font-bold text-[9px] text-purple-200 tracking-wider uppercase flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-300 inline" />
                HEURISTIC EVALUATION
              </span>
              <span className="font-pixel text-[9px] text-yellow-300 font-bold">
                TOTAL: {heuristic.totalEvaluation > 0 ? `+${heuristic.totalEvaluation}` : heuristic.totalEvaluation}
              </span>
            </div>

            {/* Heuristic component bars with numeric contributions */}
            <div className="flex flex-col gap-1 font-silkscreen text-[8px]">
              {/* 1. Score Advantage */}
              <div>
                <div className="flex items-center justify-between text-slate-300 mb-0.5">
                  <span className="text-cyan-200 font-semibold">Score Advantage</span>
                  <span className={`font-pixel text-[8px] ${heuristic.scoreAdvantage >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {heuristic.scoreAdvantage > 0 ? `+${heuristic.scoreAdvantage}` : heuristic.scoreAdvantage}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      heuristic.scoreAdvantage >= 0
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-400'
                        : 'bg-gradient-to-r from-rose-600 to-rose-400'
                    }`}
                    style={{
                      width: `${Math.min(100, Math.max(12, Math.abs(heuristic.scoreAdvantage) * 2))}%`,
                    }}
                  />
                </div>
              </div>

              {/* 2. Treasure Advantage */}
              <div>
                <div className="flex items-center justify-between text-slate-300 mb-0.5">
                  <span className="text-cyan-200 font-semibold">Treasure Advantage</span>
                  <span className={`font-pixel text-[8px] ${heuristic.treasureAdvantage >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {heuristic.treasureAdvantage > 0 ? `+${heuristic.treasureAdvantage}` : heuristic.treasureAdvantage}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      heuristic.treasureAdvantage >= 0
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-300'
                        : 'bg-gradient-to-r from-rose-600 to-rose-400'
                    }`}
                    style={{
                      width: `${Math.min(100, Math.max(12, Math.abs(heuristic.treasureAdvantage) * 5))}%`,
                    }}
                  />
                </div>
              </div>

              {/* 3. Distance Advantage */}
              <div>
                <div className="flex items-center justify-between text-slate-300 mb-0.5">
                  <span className="text-cyan-200 font-semibold">Distance Advantage</span>
                  <span className={`font-pixel text-[8px] ${heuristic.distanceAdvantage >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {heuristic.distanceAdvantage > 0 ? `+${heuristic.distanceAdvantage}` : heuristic.distanceAdvantage}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      heuristic.distanceAdvantage >= 0
                        ? 'bg-gradient-to-r from-sky-400 to-blue-500'
                        : 'bg-gradient-to-r from-rose-600 to-rose-400'
                    }`}
                    style={{
                      width: `${Math.min(100, Math.max(12, Math.abs(heuristic.distanceAdvantage) * 6))}%`,
                    }}
                  />
                </div>
              </div>

              {/* 4. Position Control */}
              <div>
                <div className="flex items-center justify-between text-slate-300 mb-0.5">
                  <span className="text-cyan-200 font-semibold">Position Control</span>
                  <span className={`font-pixel text-[8px] ${heuristic.controlBonus >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {heuristic.controlBonus > 0 ? `+${heuristic.controlBonus}` : heuristic.controlBonus}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      heuristic.controlBonus >= 0
                        ? 'bg-gradient-to-r from-purple-400 to-fuchsia-400'
                        : 'bg-gradient-to-r from-rose-600 to-rose-400'
                    }`}
                    style={{
                      width: `${Math.min(100, Math.max(12, Math.abs(heuristic.controlBonus) * 8))}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Total Heuristic Footer */}
            <div className="mt-0.5 pt-1 border-t border-slate-800/80 flex items-center justify-between">
              <span className="font-silkscreen font-bold text-[8.5px] text-yellow-200">
                TOTAL HEURISTIC:
              </span>
              <span className={`font-pixel text-[9px] font-bold ${heuristic.totalEvaluation >= 0 ? 'text-emerald-300' : 'text-rose-400'}`}>
                {heuristic.totalEvaluation > 0 ? `+${heuristic.totalEvaluation}` : heuristic.totalEvaluation}
              </span>
            </div>
          </div>

          {/* Quick Engine Toggles */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-800 font-silkscreen text-[8px]">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onSelectAlgorithm('alpha-beta')}
                className={`px-1.5 py-0.5 rounded border font-bold cursor-pointer ${
                  algorithm === 'alpha-beta'
                    ? 'bg-purple-600 text-white border-purple-300 shadow-xs'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                A-B
              </button>
              <button
                type="button"
                onClick={() => onSelectAlgorithm('minimax')}
                className={`px-1.5 py-0.5 rounded border font-bold cursor-pointer ${
                  algorithm === 'minimax'
                    ? 'bg-purple-600 text-white border-purple-300 shadow-xs'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                MINIMAX
              </button>
            </div>

            <div className="flex items-center gap-1">
              {[2, 3, 4].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    onSelectDepth(d);
                    if (d === 2) onSelectDifficulty('easy');
                    else if (d === 3) onSelectDifficulty('medium');
                    else onSelectDifficulty('hard');
                  }}
                  className={`px-1.5 py-0.5 rounded border font-bold cursor-pointer ${
                    searchDepth === d
                      ? 'bg-cyan-500 text-black border-cyan-200 shadow-xs'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  D{d}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
