# SEARCH & SEIZE — AI Search & Strategy

*You and an AI race around a treasure map, collecting treasures. Every turn, you move one square. The AI thinks ahead and chooses its move using Minimax + Alpha-Beta. Whoever collects the most treasure wins.*

A 2-player turn-based treasure hunting game on an 8x8 parchment map. Navigate ancient stone ruins, outmaneuver an intelligent AI agent, and seize high-value artifacts before your opponent!

---

## Live Demo

Play it now: **[search-and-seize.vercel.app](https://search-and-seize.vercel.app)**

---

## Game Overview

- **Format**: 2-player turn-based tactical grid (Human Explorer vs. AI Robot).
- **Board**: 8x8 treasure map with stone ruins, palm obstacles, and dynamic artifact deposits.
- **Goal**: Score the highest points by collecting treasures before running out of turns.
- **Treasures**:
  - 🪙 **Gold Coins**: `+1 pt`
  - ♦️ **Rubies**: `+3 pts`
  - 💎 **Gems / Sapphires**: `+5 pts`
  - 👑 **Gold Idol / Relic**: `+10 pts`

---

## Classical AI & Search Algorithms

Search & Seize serves as an interactive playground for exploring classical search and game theory algorithms:

### 1. Adversarial Search
- **Minimax Search**: Complete tree traversal alternating between Maximizing (AI) and Minimizing (Human) player choices.
- **Alpha-Beta Pruning**: Branch-and-bound optimization that prunes unneeded branches ($\alpha \ge \beta$), displaying real-time pruned node metrics.
- **Adjustable Search Depth**: D2 (Easy), D3 (Medium), D4 (Hard).

### 2. Heuristic Evaluation Engine
The live heuristic evaluation function assesses board states continuously:

$$\text{Total Evaluation} = \text{Score Advantage} + \text{Treasure Advantage} + \text{Distance Advantage} + \text{Position Control}$$

- **Score Advantage**: Weighted score differential between AI and Player.
- **Treasure Advantage**: Lead in total treasures secured.
- **Distance Advantage**: A real BFS-based treasure-race evaluation — for each side, the best achievable "net worth" among reachable treasures (`value − distance × travel cost`), with treasures the opponent can reach first heavily discounted (not ignored, since they might not actually take them). Linear in distance, so it gives the search a real, non-vanishing gradient even many steps from a treasure.
- **Position Control**: A light tiebreaker combining board-center proximity and relative mobility — deliberately small so it never outweighs actual treasure-seeking.

### 3. Pathfinding & Radar Visualization
- **Breadth-First Search (BFS)**: Real multi-target BFS (visited-set + parent map) computing true shortest paths around obstacles, reachable-treasure detection, and exploration order — not a Manhattan-distance approximation.
- **Tactical Radar**: On-board overlay showing explored wave states, candidate paths, the AI's actual selected route, and threat zones — all driven by the live BFS/Minimax/Alpha-Beta results, not simulated data.

---

## Randomized Expeditions

Every **New Expedition** (New Game / Restart) generates a fresh, validated 8x8 board instead of reusing a fixed layout:

- **Obstacles**: 8–11 randomly placed stone ruins.
- **Treasures**: 8–12 treasures with rarity-weighted values — coins (`+1`) are common, rubies (`+3`) less common, gems (`+5`) uncommon, and gold relics (`+10`) rare.
- **Start positions**: Human and AI always spawn on distinct, walkable, non-treasure cells, preferring a Manhattan distance of at least 5 apart.
- **Validation**: Every candidate board is rejected and regenerated unless *every* treasure is reachable by *both* players (verified via real BFS) and enough of the board is walkable. A known-good fixed layout is kept as a last-resort fallback if generation repeatedly fails.
- **Reproducibility**: Generation uses a seeded PRNG (`mulberry32`), so a specific board can always be reproduced from its seed for debugging — no `Math.random()` is used anywhere in board generation or in the AI's decision/evaluation logic.

The generated board becomes the actual `GameState` consumed by the human, the AI, BFS, Minimax, Alpha-Beta, the heuristic, search visualization, scoring, and move simulation — there is no separate or fake board used internally by the AI.

---

## Controls & Navigation

- **Directional Movement**: Move `UP`, `DOWN`, `LEFT`, or `RIGHT` using the on-screen tactile D-Pad or keyboard arrow keys / `W`, `A`, `S`, `D`.
- **Game Controls**: Quick **Restart**, **Pause**, or **New Expedition**.
- **Tactical Radar Toggle**: Click **RADAR** in the AI Insights panel to project AI pathfinding waves directly onto the map.

---

## Tech Stack & Architecture

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4 + Lucide Icons
- **Animation**: Motion (`motion/react`)
- **Typography**: Press Start 2P, Silkscreen, and Outfit font stacks

### Key File Structure:

```text
src/
├── ai/
│   ├── aiContract.ts          # Integration layer: wires BFS/heuristic/minimax to the UI
│   ├── bfs.ts                 # Real BFS: shortest paths, reachable treasures, exploration order
│   ├── heuristic.ts           # Deterministic evaluateGameState() (score/treasure/distance/control)
│   ├── minimax.ts             # Depth-limited Minimax, Alpha-Beta pruning, root move selection
│   ├── moves.ts               # Legal-move generation / board-boundary & obstacle rules
│   └── simulate.ts            # Pure, non-mutating move simulation (mirrors real game rules)
├── components/
│   ├── AIInsights.tsx         # AI metrics, heuristic evaluation bars, algorithm toggles
│   ├── GameBoard.tsx          # 8x8 wooden framed treasure map board
│   ├── GameCell.tsx           # Grid cells (empty, obstacles, treasures, move highlights)
│   ├── ScoreBoard.tsx         # Player & AI character profiles, turn status, live points
│   ├── DirectionControls.tsx  # D-pad controls & expedition actions
│   ├── ExpeditionLog.tsx      # Chronological move & treasure collection feed
│   └── GameAssets.tsx         # Pixel art sprites (Explorer, Robot, treasures)
├── game/
│   ├── boardGenerator.ts      # Seeded random board generation + validation (New Expedition)
│   └── mockGameState.ts       # Fixed fallback board layout, board-building helper
└── types/
    ├── ai.ts                  # HeuristicBreakdown, AIAnalysis, SearchCell types
    └── game.ts                # GameState, Position, Treasure, MoveDirection types
```

---

## Getting Started

### Prerequisites
- Node.js (v18+ or v20+)
- npm or bun

### Installation & Run

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Run TypeScript linter
npm run lint

# Build for production
npm run build
```

---

## License

Apache-2.0
