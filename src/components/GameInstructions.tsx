/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  BookOpen,
  Brain,
  CheckCircle2,
  Code2,
  Compass,
  GitBranch,
  Shield,
  X,
} from 'lucide-react';

interface GameInstructionsProps {
  onClose: () => void;
}

export const GameInstructions: React.FC<GameInstructionsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-gradient-to-b from-[#38210f] via-[#2c190a] to-[#1c0f05] rounded-3xl border-4 border-[#855325] shadow-2xl p-6 text-amber-100 flex flex-col overflow-hidden">
        {/* Brass corner brackets */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-amber-400 rounded-tl-lg" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-amber-400 rounded-tr-lg" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-amber-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-3 mb-3 border-b border-amber-900/60 shrink-0">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/60 text-amber-300">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-cinzel text-xl font-bold text-amber-200 tracking-wide">
              CIPAT AI PROJECT BRIEF
            </h2>
            <p className="text-xs text-amber-300/70">
              Treasure Hunt: Classical AI Search & Adversarial Strategy
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs text-amber-200/90 leading-relaxed scrollbar-thin scrollbar-thumb-amber-800">
          {/* Section 1: Gameplay Overview */}
          <div className="bg-[#4a2e16]/60 p-3.5 rounded-2xl border border-amber-800/40">
            <h3 className="font-cinzel font-bold text-amber-300 text-sm mb-1.5 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              1. The Expedition Goal
            </h3>
            <p>
              Navigate the 8×8 grid to discover treasures before the AI agent. Collect coins (+1), rubies (+3), emerald gems (+5), and legendary chests (+10). Ancient ruins block movement, creating strategic chokepoints.
            </p>
          </div>

          {/* Section 2: AI Search & Decision Architecture */}
          <div className="bg-[#4a2e16]/60 p-3.5 rounded-2xl border border-amber-800/40">
            <h3 className="font-cinzel font-bold text-amber-300 text-sm mb-1.5 flex items-center gap-2">
              <Brain className="w-4 h-4 text-amber-400" />
              2. Classical AI Algorithms Applied
            </h3>
            <ul className="space-y-2 mt-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-200">BFS (Breadth-First Search):</strong> Unweighted shortest path finding across the grid around ruins, computing distance transforms to each remaining treasure.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-200">Minimax Algorithm:</strong> Recursive adversarial lookahead tree search. The AI acts as the Maximizing player while modeling your moves as the Minimizing player across multiple plies.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-200">Alpha-Beta Pruning:</strong> Optimizes Minimax by maintaining bounds $\alpha$ (highest value guaranteed to maximizer) and $\beta$ (lowest value guaranteed to minimizer), pruning futile branches.
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-amber-200">Heuristic Evaluation Function:</strong> Evaluates non-terminal leaf states using score difference, treasure accessibility, BFS distance advantages, and central quadrant control.
                </div>
              </li>
            </ul>
          </div>

          {/* Section 3: Clean Separation & Claude Code Hooks */}
          <div className="bg-[#24150b] p-3.5 rounded-2xl border border-amber-600/40">
            <h3 className="font-cinzel font-bold text-amber-300 text-sm mb-1.5 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-amber-400" />
              3. AI Integration Contract
            </h3>
            <p className="text-amber-300/80 mb-2">
              The frontend is structured with clean TypeScript contracts in <code className="text-amber-200 bg-black/40 px-1 py-0.5 rounded font-mono">src/ai/aiContract.ts</code>:
            </p>
            <div className="font-mono text-[11px] bg-black/60 p-2.5 rounded-xl border border-amber-900/60 text-amber-300/90 space-y-1">
              <div>• getBestAIMove(gameState): Promise&lt;MoveDirection&gt;</div>
              <div>• getAIAnalysis(gameState): Promise&lt;AIAnalysis&gt;</div>
              <div>• getSearchVisualization(gameState): Promise&lt;AISearchVisualizationData&gt;</div>
              <div>• evaluateGameState(gameState): HeuristicBreakdown</div>
            </div>
            <p className="text-[11px] text-amber-400/80 mt-2 italic">
              Claude Code will connect the full classical AI search algorithms directly into these hooks without modifying the UI layer.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 mt-3 border-t border-amber-900/60 flex justify-end shrink-0">
          <button
            onClick={onClose}
            type="button"
            className="px-5 py-2 rounded-xl bg-gradient-to-b from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-amber-950 font-bold text-xs uppercase tracking-wider border border-amber-300 shadow active:scale-95"
          >
            Enter Expedition
          </button>
        </div>
      </div>
    </div>
  );
};
