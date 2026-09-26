/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AlgorithmType, MoveDirection, Position } from './game';

export type SearchCellState = 'explored' | 'candidate' | 'selected' | 'threat';

export interface SearchCell {
  row: number;
  col: number;
  state: SearchCellState;
  depth?: number;
  fScore?: number;
}

export interface BranchEvaluation {
  move: MoveDirection;
  score: number;
  pruned?: boolean;
  notes?: string;
}

export interface AIAnalysis {
  algorithm: AlgorithmType;
  depth: number;
  nodesExplored: number;
  nodesPruned: number;
  bestMove: MoveDirection | null;
  evaluation: number;
  status: 'idle' | 'exploring' | 'evaluating' | 'searching' | 'completed';
  statusMessage: string;
  whyThisMove?: string[];
  branchEvaluations?: BranchEvaluation[];
}

export interface HeuristicBreakdown {
  scoreAdvantage: number;
  treasureAdvantage: number;
  distanceAdvantage: number;
  controlBonus: number;
  totalEvaluation: number;
  explanation?: string;
}

export interface AISearchVisualizationData {
  cells: SearchCell[];
  bfsPathToNearestTreasure?: Position[];
  selectedPath?: Position[];
  showOverlay: boolean;
}
