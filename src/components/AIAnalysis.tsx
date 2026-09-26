/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Cpu,
  GitBranch,
  Info,
  Layers,
  Terminal,
} from 'lucide-react';
import { AIAnalysis as AIAnalysisType } from '../types/ai';
import { MoveDirection } from '../types/game';

interface AIAnalysisProps {
  analysis: AIAnalysisType;
  isThinking: boolean;
}

export const AIAnalysis: React.FC<AIAnalysisProps> = ({ analysis, isThinking }) => {
  const {
    algorithm,
    depth,
    nodesExplored,
    nodesPruned,
    bestMove,
    evaluation,
    status,
    statusMessage,
    branchEvaluations = [],
  } = analysis;

  const renderMoveIcon = (move: MoveDirection | null) => {
    switch (move) {
      case 'up':
        return <ArrowUp className="w-4 h-4 stroke-[3] text-emerald-400" />;
      case 'down':
        return <ArrowDown className="w-4 h-4 stroke-[3] text-emerald-400" />;
      case 'left':
        return <ArrowLeft className="w-4 h-4 stroke-[3] text-emerald-400" />;
      case 'right':
        return <ArrowRight className="w-4 h-4 stroke-[3] text-emerald-400" />;
      default:
        return <span>—</span>;
    }
  };

  const getMoveLabel = (move: MoveDirection | null) => {
    if (!move) return 'Pending';
    return move.toUpperCase();
  };

  const isAlphaBeta = algorithm === 'alpha-beta';

  return (
    <div className="w-full bg-[#fdfaf2] rounded-2xl p-4 border-3 border-[#c9b48f] shadow-lg text-[#3d2714]">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e2d2b5]">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#533219] text-amber-300">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-cinzel font-bold text-base md:text-lg text-[#3d2714] tracking-wide">
              AI ANALYSIS
            </h2>
            <p className="text-[11px] text-[#785b3b] font-medium">
              Academic Game Tree & Pruning Telemetry
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${
            isThinking
              ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
              : 'bg-emerald-100 text-emerald-800 border-emerald-300'
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isThinking ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'
            }`}
          />
          <span>{isThinking ? 'Thinking...' : 'Decision Locked'}</span>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3.5">
        {/* Algorithm */}
        <div className="bg-[#f4ebd9] p-2.5 rounded-xl border border-[#dfcead]">
          <span className="block text-[10px] uppercase font-bold tracking-wider text-[#7e6244]">
            Algorithm
          </span>
          <span className="font-cinzel font-extrabold text-xs sm:text-sm text-[#3a2211] truncate block mt-0.5">
            {isAlphaBeta ? 'Alpha-Beta' : 'Minimax'}
          </span>
        </div>

        {/* Search Depth */}
        <div className="bg-[#f4ebd9] p-2.5 rounded-xl border border-[#dfcead]">
          <span className="block text-[10px] uppercase font-bold tracking-wider text-[#7e6244]">
            Search Depth
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <Layers className="w-3.5 h-3.5 text-[#91673d]" />
            <span className="font-cinzel font-extrabold text-sm sm:text-base text-[#3a2211]">
              {depth} Plies
            </span>
          </div>
        </div>

        {/* Nodes Explored */}
        <div className="bg-[#f4ebd9] p-2.5 rounded-xl border border-[#dfcead]">
          <span className="block text-[10px] uppercase font-bold tracking-wider text-[#7e6244]">
            Nodes Explored
          </span>
          <span className="font-cinzel font-black text-sm sm:text-base text-[#1e40af] block mt-0.5">
            {nodesExplored}
          </span>
        </div>

        {/* Nodes Pruned */}
        <div className="bg-[#f4ebd9] p-2.5 rounded-xl border border-[#dfcead]">
          <span className="block text-[10px] uppercase font-bold tracking-wider text-[#7e6244]">
            Nodes Pruned
          </span>
          <span className="font-cinzel font-black text-sm sm:text-base text-[#991b1b] block mt-0.5">
            {isAlphaBeta ? nodesPruned : '0 (Minimax)'}
          </span>
        </div>
      </div>

      {/* Best Move & Overall State Evaluation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3.5">
        <div className="bg-[#ebdcc3] p-3 rounded-xl border border-[#cbb389] flex items-center justify-between">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c4f30]">
              Best Move Chosen
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-[#3d2412] text-white">
                {renderMoveIcon(bestMove)}
              </div>
              <span className="font-cinzel font-black text-base text-[#29170a]">
                {getMoveLabel(bestMove)}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-[#785b3a] bg-[#fbf6ec] px-2 py-1 rounded border border-[#dfcfb0]">
            root decision
          </span>
        </div>

        <div className="bg-[#ebdcc3] p-3 rounded-xl border border-[#cbb389] flex items-center justify-between">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6c4f30]">
              Root Evaluation
            </span>
            <div className="flex items-center gap-1 mt-1">
              <span
                className={`font-cinzel font-black text-lg ${
                  evaluation >= 0 ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {evaluation > 0 ? `+${evaluation}` : evaluation}
              </span>
              <span className="text-[11px] text-[#785b3a] ml-1">
                ({evaluation >= 0 ? 'Favors AI' : 'Favors Player'})
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#fbf6ec] border border-[#dfcfb0]">
            <GitBranch className="w-4 h-4 text-[#8b5a2b]" />
          </div>
        </div>
      </div>

      {/* Candidate Branch Evaluations Table */}
      {branchEvaluations.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold uppercase text-[#614124]">
              Candidate Move Branch Evaluations:
            </span>
            <span className="text-[10px] text-[#866a4f] italic">
              Minimax score per root branch
            </span>
          </div>

          <div className="bg-[#f5ecdc] rounded-xl overflow-hidden border border-[#d8c39f]">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#ead7b7] text-[#55361b] font-bold border-b border-[#d8c39f]">
                <tr>
                  <th className="py-1.5 px-3">Direction</th>
                  <th className="py-1.5 px-2">Score</th>
                  <th className="py-1.5 px-2">Branch Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6d6bb]">
                {branchEvaluations.map((branch) => {
                  const isSelectedBranch = branch.move === bestMove;
                  return (
                    <tr
                      key={branch.move}
                      className={
                        isSelectedBranch
                          ? 'bg-emerald-50 font-bold text-emerald-900'
                          : branch.pruned
                          ? 'opacity-60 bg-stone-100/50'
                          : 'text-[#442b17]'
                      }
                    >
                      <td className="py-1.5 px-3 flex items-center gap-1.5">
                        <span className="capitalize">{branch.move}</span>
                        {isSelectedBranch && (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-600 text-white text-[9px] font-black uppercase">
                            Chosen
                          </span>
                        )}
                      </td>
                      <td className="py-1.5 px-2 font-mono">
                        {branch.score > 0 ? `+${branch.score}` : branch.score}
                      </td>
                      <td className="py-1.5 px-2">
                        {branch.pruned ? (
                          <span className="text-rose-600 text-[11px] font-semibold">
                            ✂ Pruned (Cutoff)
                          </span>
                        ) : isSelectedBranch ? (
                          <span className="text-emerald-700 text-[11px] font-semibold">
                            ★ Max Evaluated
                          </span>
                        ) : (
                          <span className="text-amber-800 text-[11px]">Explored</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Academic Query Preview Box (from reference layout) */}
      <div className="bg-[#241a13] p-2.5 rounded-xl border border-[#523c2a] text-amber-200/90 font-mono text-xs flex items-center gap-2">
        <Terminal className="w-4 h-4 text-amber-400 shrink-0" />
        <span className="truncate">
          ?- choose_move(GameState, {algorithm}, {depth}, Decision).
        </span>
      </div>
    </div>
  );
};
