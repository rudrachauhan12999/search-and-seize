/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  evaluateGameState,
  getAIAnalysis,
  getBestAIMove,
  getSearchVisualization,
  getValidMoves,
} from './ai/aiContract';
import { AdventureWorldBackground } from './components/AdventureWorldBackground';
import { AIInsights } from './components/AIInsights';
import { DirectionControls } from './components/DirectionControls';
import { ExpeditionLog } from './components/ExpeditionLog';
import { GameBoard } from './components/GameBoard';
import { GameOverModal } from './components/GameOverModal';
import { GameStartModal } from './components/GameStartModal';
import { Header } from './components/Header';
import { HowToPlayModal } from './components/HowToPlayModal';
import { ScoreBoard } from './components/ScoreBoard';
import { generateRandomGameState } from './game/boardGenerator';
import { createInitialGameState } from './game/mockGameState';
import {
  AIAnalysis as AIAnalysisType,
  AISearchVisualizationData,
  HeuristicBreakdown,
} from './types/ai';
import {
  AlgorithmType,
  DifficultyLevel,
  GameState,
  MoveDirection,
  Position,
  Treasure,
} from './types/game';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => createInitialGameState());
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisType | null>(null);
  const [heuristic, setHeuristic] = useState<HeuristicBreakdown>(() => evaluateGameState(gameState));
  const [searchVisualization, setSearchVisualization] = useState<AISearchVisualizationData | null>(null);
  const [showSearchOverlay, setShowSearchOverlay] = useState<boolean>(false);
  const [showHowToPlay, setShowHowToPlay] = useState<boolean>(false);
  const [showStartModal, setShowStartModal] = useState<boolean>(false);
  const [isGameOverDismissed, setIsGameOverDismissed] = useState<boolean>(false);

  // Compute valid moves for human player
  const validHumanMoves = getValidMoves(
    gameState.human.position,
    gameState.board,
    gameState.ai.position
  );

  // Initial AI telemetry sync
  useEffect(() => {
    const syncAI = async () => {
      const h = evaluateGameState(gameState);
      setHeuristic(h);
      const a = await getAIAnalysis(gameState);
      setAiAnalysis(a);
      const s = await getSearchVisualization(gameState);
      setSearchVisualization(s);
    };
    syncAI();
  }, []);

  // Check game over condition
  const checkGameOver = (state: GameState): boolean => {
    const allTreasuresCollected = state.treasures.every((t) => t.collected);
    const noMovesLeft = state.movesRemaining <= 0;
    return allTreasuresCollected || noMovesLeft;
  };

  // Helper to claim treasure when landing on cell
  const checkTreasurePickup = (
    pos: Position,
    currentTreasures: Treasure[]
  ): { updatedTreasures: Treasure[]; collectedTreasure?: Treasure } => {
    let collectedTreasure: Treasure | undefined;

    const updatedTreasures = currentTreasures.map((t) => {
      if (t.position.row === pos.row && t.position.col === pos.col && !t.collected) {
        collectedTreasure = { ...t, collected: true };
        return { ...t, collected: true };
      }
      return t;
    });

    return { updatedTreasures, collectedTreasure };
  };

  // AI Turn Execution
  const triggerAITurn = useCallback(
    async (currentState: GameState) => {
      if (currentState.gameStatus !== 'thinking') return;

      try {
        const analysisData = await getAIAnalysis(currentState);
        setAiAnalysis(analysisData);

        const searchData = await getSearchVisualization(currentState);
        setSearchVisualization(searchData);

        // Brief delay (550ms) for observing AI decision making
        await new Promise((resolve) => setTimeout(resolve, 550));

        const aiMove = await getBestAIMove(currentState);

        setGameState((prevState) => {
          if (prevState.gameStatus === 'gameOver' || prevState.gameStatus === 'paused') {
            return prevState;
          }

          const dr = aiMove === 'up' ? -1 : aiMove === 'down' ? 1 : 0;
          const dc = aiMove === 'left' ? -1 : aiMove === 'right' ? 1 : 0;
          const newAiPos: Position = {
            row: Math.max(0, Math.min(7, prevState.ai.position.row + dr)),
            col: Math.max(0, Math.min(7, prevState.ai.position.col + dc)),
          };

          const { updatedTreasures, collectedTreasure } = checkTreasurePickup(
            newAiPos,
            prevState.treasures
          );

          const newScore = prevState.ai.score + (collectedTreasure ? collectedTreasure.value : 0);
          const newTreasuresCount =
            prevState.ai.treasuresCollected + (collectedTreasure ? 1 : 0);
          const movesRemaining = prevState.movesRemaining - 1;

          const updatedState: GameState = {
            ...prevState,
            ai: {
              ...prevState.ai,
              position: newAiPos,
              score: newScore,
              treasuresCollected: newTreasuresCount,
            },
            treasures: updatedTreasures,
            movesRemaining,
            currentTurn: 'human',
            gameStatus: 'playing',
            lastCollectedTreasure: collectedTreasure
              ? {
                  type: collectedTreasure.type,
                  value: collectedTreasure.value,
                  position: newAiPos,
                  player: 'ai',
                }
              : null,
            moveLog: [
              ...prevState.moveLog,
              {
                id: `ai-${Date.now()}`,
                turnNumber: prevState.moveLog.length + 1,
                player: 'ai',
                move: aiMove,
                treasureCollected: collectedTreasure
                  ? { type: collectedTreasure.type, value: collectedTreasure.value }
                  : undefined,
                timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
              },
            ],
          };

          if (checkGameOver(updatedState)) {
            updatedState.gameStatus = 'gameOver';
            if (updatedState.human.score > updatedState.ai.score) {
              updatedState.winner = 'human';
            } else if (updatedState.ai.score > updatedState.human.score) {
              updatedState.winner = 'ai';
            } else {
              updatedState.winner = 'draw';
            }
          }

          const newH = evaluateGameState(updatedState);
          setHeuristic(newH);

          return updatedState;
        });
      } catch (err) {
        console.error('Error during AI turn:', err);
      }
    },
    []
  );

  // Trigger AI turn
  useEffect(() => {
    if (gameState.gameStatus === 'thinking') {
      triggerAITurn(gameState);
    }
  }, [gameState.gameStatus, triggerAITurn]);

  // Handle Human Move
  const handleHumanMove = (direction: MoveDirection) => {
    if (gameState.currentTurn !== 'human' || gameState.gameStatus !== 'playing') {
      return;
    }

    if (!validHumanMoves.includes(direction)) {
      return;
    }

    const dr = direction === 'up' ? -1 : direction === 'down' ? 1 : 0;
    const dc = direction === 'left' ? -1 : direction === 'right' ? 1 : 0;
    const newPos: Position = {
      row: gameState.human.position.row + dr,
      col: gameState.human.position.col + dc,
    };

    const { updatedTreasures, collectedTreasure } = checkTreasurePickup(
      newPos,
      gameState.treasures
    );

    const newScore = gameState.human.score + (collectedTreasure ? collectedTreasure.value : 0);
    const newTreasuresCount =
      gameState.human.treasuresCollected + (collectedTreasure ? 1 : 0);
    const movesRemaining = gameState.movesRemaining - 1;

    const nextState: GameState = {
      ...gameState,
      human: {
        ...gameState.human,
        position: newPos,
        score: newScore,
        treasuresCollected: newTreasuresCount,
      },
      treasures: updatedTreasures,
      movesRemaining,
      currentTurn: 'ai',
      gameStatus: 'thinking',
      lastCollectedTreasure: collectedTreasure
        ? {
            type: collectedTreasure.type,
            value: collectedTreasure.value,
            position: newPos,
            player: 'human',
          }
        : null,
      moveLog: [
        ...gameState.moveLog,
        {
          id: `human-${Date.now()}`,
          turnNumber: gameState.moveLog.length + 1,
          player: 'human',
          move: direction,
          treasureCollected: collectedTreasure
            ? { type: collectedTreasure.type, value: collectedTreasure.value }
            : undefined,
          timestamp: new Date().toLocaleTimeString([], { minute: '2-digit', second: '2-digit' }),
        },
      ],
    };

    if (checkGameOver(nextState)) {
      nextState.gameStatus = 'gameOver';
      if (nextState.human.score > nextState.ai.score) {
        nextState.winner = 'human';
      } else if (nextState.ai.score > nextState.human.score) {
        nextState.winner = 'ai';
      } else {
        nextState.winner = 'draw';
      }
    }

    setGameState(nextState);
    const newH = evaluateGameState(nextState);
    setHeuristic(newH);
  };

  // Game Control Actions
  const handleNewGame = () => {
    setShowStartModal(true);
  };

  const handleStartGame = () => {
    setShowStartModal(false);
    setIsGameOverDismissed(false);
    const fresh = generateRandomGameState();
    setGameState(fresh);
    const h = evaluateGameState(fresh);
    setHeuristic(h);
    getAIAnalysis(fresh).then((a) => setAiAnalysis(a));
    getSearchVisualization(fresh).then((s) => setSearchVisualization(s));
  };

  const handleRestart = () => {
    setIsGameOverDismissed(false);
    const fresh = generateRandomGameState();
    setGameState(fresh);
    const h = evaluateGameState(fresh);
    setHeuristic(h);
    getAIAnalysis(fresh).then((a) => setAiAnalysis(a));
    getSearchVisualization(fresh).then((s) => setSearchVisualization(s));
  };

  const handleTogglePause = () => {
    if (gameState.gameStatus === 'playing') {
      setGameState((prev) => ({ ...prev, gameStatus: 'paused' }));
    } else if (gameState.gameStatus === 'paused') {
      setGameState((prev) => ({ ...prev, gameStatus: 'playing' }));
    }
  };

  const handleSelectAlgorithm = (algo: AlgorithmType) => {
    setGameState((prev) => ({ ...prev, algorithm: algo }));
    getAIAnalysis({ ...gameState, algorithm: algo }).then((a) => setAiAnalysis(a));
  };

  const handleSelectDepth = (depth: number) => {
    setGameState((prev) => ({ ...prev, searchDepth: depth }));
    getAIAnalysis({ ...gameState, searchDepth: depth }).then((a) => setAiAnalysis(a));
  };

  const handleSelectDifficulty = (diff: DifficultyLevel) => {
    const depth = diff === 'easy' ? 2 : diff === 'medium' ? 3 : 4;
    setGameState((prev) => ({ ...prev, difficulty: diff, searchDepth: depth }));
    getAIAnalysis({ ...gameState, difficulty: diff, searchDepth: depth }).then((a) =>
      setAiAnalysis(a)
    );
  };

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col font-outfit antialiased selection:bg-cyan-400 selection:text-black overflow-x-hidden">
      {/* 1. STYLIZED TREASURE-ISLAND ADVENTURE ENVIRONMENT BACKGROUND */}
      <AdventureWorldBackground />

      {/* 2. HEADER */}
      <div className="relative z-10">
        <Header
          onNewGame={handleNewGame}
          onOpenHowToPlay={() => setShowHowToPlay(true)}
        />
      </div>

      {/* 3. TOP HUD BANNER */}
      <div className="relative z-10 w-full px-3 sm:px-6 pt-1 sm:pt-1.5 pb-0.5">
        <ScoreBoard gameState={gameState} />
      </div>

      {/* 4. MAIN GAMEPLAY AREA (Board is the HERO, filling ~90% of screen) */}
      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-2 sm:py-3 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 lg:gap-6">
        {/* CENTER / PRIMARY: BEAUTIFUL WOODEN TREASURE MAP BOARD */}
        <section className="flex-1 flex flex-col items-center justify-center w-full max-w-[660px]">
          <GameBoard
            gameState={gameState}
            validHumanMoves={validHumanMoves}
            searchCells={searchVisualization?.cells || []}
            showSearchOverlay={showSearchOverlay}
            onHumanMove={handleHumanMove}
          />
        </section>

        {/* SIDEBAR: CONTROLS & INTEL COLUMN */}
        <section className="w-full lg:w-[350px] xl:w-[370px] flex flex-col gap-3 shrink-0">
          {/* Integrated Movement Controls */}
          <div className="w-full">
            <DirectionControls
              validMoves={validHumanMoves}
              isHumanTurn={gameState.currentTurn === 'human'}
              gameStatus={gameState.gameStatus}
              onMove={handleHumanMove}
              onRestart={handleRestart}
              onTogglePause={handleTogglePause}
            />
          </div>

          {/* AI Insights Game Ability Drawer */}
          <AIInsights
            analysis={aiAnalysis}
            heuristic={heuristic}
            searchCells={searchVisualization?.cells || []}
            showSearchOverlay={showSearchOverlay}
            onToggleSearchOverlay={setShowSearchOverlay}
            algorithm={gameState.algorithm}
            searchDepth={gameState.searchDepth}
            difficulty={gameState.difficulty}
            onSelectAlgorithm={handleSelectAlgorithm}
            onSelectDepth={handleSelectDepth}
            onSelectDifficulty={handleSelectDifficulty}
            isThinking={gameState.gameStatus === 'thinking'}
          />

          {/* Expedition Event Log */}
          <ExpeditionLog entries={gameState.moveLog} />
        </section>
      </main>

      {/* MODALS */}
      {/* Game Start Modal (Girl Explorer vs Robot Explorer) */}
      {showStartModal && (
        <GameStartModal
          onStart={handleStartGame}
          onOpenHowToPlay={() => {
            setShowStartModal(false);
            setShowHowToPlay(true);
          }}
        />
      )}

      {/* Game Over Modal */}
      {gameState.gameStatus === 'gameOver' && !isGameOverDismissed && (
        <GameOverModal
          gameState={gameState}
          onPlayAgain={handleRestart}
          onViewInsights={() => {
            setIsGameOverDismissed(true);
          }}
          onClose={() => {
            setIsGameOverDismissed(true);
          }}
        />
      )}

      {/* How to Play Modal */}
      {showHowToPlay && (
        <HowToPlayModal onClose={() => setShowHowToPlay(false)} />
      )}
    </div>
  );
}
