/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  BoulderObstacle,
  BushObstacle,
  OakTreeObstacle,
  PineTreeObstacle,
  SkullRuinsObstacle,
  StoneRuinsObstacle,
  WaterPondObstacle,
  WoodenCrateObstacle,
} from './GameAssets';

interface ObstacleProps {
  variant?: number;
}

export const Obstacle: React.FC<ObstacleProps> = ({ variant = 0 }) => {
  const type = variant % 8;

  switch (type) {
    case 0:
      return <StoneRuinsObstacle className="w-full h-full p-0.5 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" />;
    case 1:
      return <OakTreeObstacle className="w-full h-full p-0.5 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" />;
    case 2:
      return <PineTreeObstacle className="w-full h-full p-0.5 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" />;
    case 3:
      return <WaterPondObstacle className="w-full h-full p-0.5 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" />;
    case 4:
      return <BoulderObstacle className="w-full h-full p-0.5 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" />;
    case 5:
      return <WoodenCrateObstacle className="w-full h-full p-0.5 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" />;
    case 6:
      return <SkullRuinsObstacle className="w-full h-full p-0.5 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" />;
    case 7:
    default:
      return <BushObstacle className="w-full h-full p-0.5 filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" />;
  }
};
