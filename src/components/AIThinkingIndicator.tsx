/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Compass, Sparkles } from 'lucide-react';

interface AIThinkingIndicatorProps {
  algorithm: string;
  depth: number;
}

const THINKING_STEPS = [
  'Exploring board via BFS frontier...',
  'Evaluating possible moves with heuristic...',
  'Searching game tree with Minimax & Alpha-Beta pruning...',
  'Pruning dominated branches...',
  'Selecting optimal decision...',
];

export const AIThinkingIndicator: React.FC<AIThinkingIndicatorProps> = ({
  algorithm,
  depth,
}) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % THINKING_STEPS.length);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-red-950/90 via-[#3a1515] to-red-950/90 border-2 border-red-500/70 rounded-2xl p-3.5 shadow-xl text-amber-100 flex items-center gap-4 animate-pulse-subtle">
      {/* Animated Compass Core */}
      <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-rose-900 border-2 border-amber-300 shadow-lg shadow-black/50 shrink-0">
        <Compass className="w-7 h-7 text-amber-200 animate-spin [animation-duration:4s]" />
        <Sparkles className="w-3.5 h-3.5 text-amber-300 absolute -top-1 -right-1 animate-ping" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
          <h3 className="font-cinzel font-black text-sm md:text-base text-amber-200 tracking-wider uppercase">
            AI IS THINKING...
          </h3>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-black/40 text-amber-300/80 border border-red-800">
            {algorithm} (Depth {depth})
          </span>
        </div>

        <p className="text-xs font-mono text-amber-300/90 mt-1 truncate">
          {THINKING_STEPS[stepIndex]}
        </p>
      </div>
    </div>
  );
};
