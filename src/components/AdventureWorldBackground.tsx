/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const AdventureWorldBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Sky & Horizon Gradient: Deep Dark Twilight Blue to Ocean Horizon */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 15%, #172554 0%, #0f172a 45%, #080d1a 85%, #030712 100%)',
        }}
      />

      {/* Warm Golden Horizon Sunset Glow */}
      <div
        className="absolute inset-x-0 top-0 h-[480px] opacity-25"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #38bdf8 0%, #0284c7 30%, #f59e0b 60%, transparent 80%)',
        }}
      />

      {/* SVG Layer: Mountains, Tropical Islands, Palm Leaves, Clouds, Dotted Sea Routes, Stars, Tiny Coins */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1600 1000"
      >
        <defs>
          <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.03" />
          </linearGradient>

          <linearGradient id="mountainFar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="islandGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d9488" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#064e3b" stopOpacity="0.8" />
          </linearGradient>

          <pattern id="seaGrid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#38bdf8" strokeWidth="0.7" strokeOpacity="0.08" />
          </pattern>
        </defs>

        {/* Vintage Nautical Sea Grid */}
        <rect width="100%" height="100%" fill="url(#seaGrid)" />

        {/* Twinkling Adventure Stars & Sparkles in Sky */}
        <g opacity="0.65">
          <circle cx="120" cy="80" r="2.5" fill="#fde047" />
          <circle cx="280" cy="140" r="1.5" fill="#ffffff" />
          <circle cx="450" cy="60" r="2" fill="#38bdf8" />
          <circle cx="720" cy="110" r="2.5" fill="#facc15" />
          <circle cx="950" cy="70" r="1.5" fill="#ffffff" />
          <circle cx="1180" cy="130" r="2" fill="#f472b6" />
          <circle cx="1400" cy="90" r="2.5" fill="#38bdf8" />
          <circle cx="1520" cy="160" r="1.5" fill="#fde047" />

          {/* Sparkle cross stars */}
          <polygon points="200,60 203,50 206,60 216,63 206,66 203,76 200,66 190,63" fill="#ffffff" opacity="0.35" />
          <polygon points="1340,70 1342,62 1344,70 1352,72 1344,74 1342,82 1340,74 1332,72" fill="#fef08a" opacity="0.45" />
        </g>

        {/* Distant Adventure Islands & Mountain Peaks */}
        {/* Left Island Peak */}
        <path
          d="M -50 420 Q 80 260 220 380 Q 320 440 400 480 L -50 560 Z"
          fill="url(#mountainFar)"
        />
        {/* Left Island Expedition Outpost Flag */}
        <g transform="translate(220, 360)">
          <line x1="0" y1="0" x2="0" y2="24" stroke="#e2e8f0" strokeWidth="2" />
          <polygon points="0,0 14,5 0,10" fill="#f59e0b" />
        </g>

        {/* Right Volcanic Peak */}
        <path
          d="M 1200 460 Q 1340 280 1480 390 Q 1580 430 1680 470 L 1680 580 L 1200 580 Z"
          fill="url(#mountainFar)"
        />
        {/* Right Island Expedition Flag */}
        <g transform="translate(1340, 270)">
          <line x1="0" y1="0" x2="0" y2="24" stroke="#e2e8f0" strokeWidth="2" />
          <polygon points="0,0 14,5 0,10" fill="#ef4444" />
        </g>

        {/* Lush Green Tropical Island Silhouettes with Palm Trees */}
        {/* Left Tropical Palm Cluster */}
        <g transform="translate(60, 480) scale(0.9)" opacity="0.3">
          <ellipse cx="90" cy="130" rx="140" ry="40" fill="url(#islandGrad)" />
          {/* Palm 1 */}
          <path d="M 60 130 Q 75 70 100 20" stroke="#78350f" strokeWidth="6" strokeLinecap="round" fill="none" />
          <ellipse cx="80" cy="15" rx="35" ry="12" fill="#15803d" transform="rotate(-30 80 15)" />
          <ellipse cx="120" cy="15" rx="35" ry="12" fill="#16a34a" transform="rotate(30 120 15)" />
          <ellipse cx="100" cy="8" rx="32" ry="10" fill="#22c55e" transform="rotate(-5 100 8)" />
          {/* Palm 2 */}
          <path d="M 110 130 Q 130 80 150 40" stroke="#78350f" strokeWidth="5" strokeLinecap="round" fill="none" />
          <ellipse cx="140" cy="35" rx="28" ry="10" fill="#15803d" transform="rotate(-25 140 35)" />
          <ellipse cx="170" cy="35" rx="28" ry="10" fill="#16a34a" transform="rotate(35 170 35)" />
        </g>

        {/* Right Tropical Island Cluster */}
        <g transform="translate(1380, 500) scale(0.85)" opacity="0.3">
          <ellipse cx="90" cy="130" rx="130" ry="38" fill="url(#islandGrad)" />
          {/* Palm */}
          <path d="M 80 130 Q 70 70 50 20" stroke="#78350f" strokeWidth="6" strokeLinecap="round" fill="none" />
          <ellipse cx="30" cy="15" rx="35" ry="12" fill="#16a34a" transform="rotate(-35 30 15)" />
          <ellipse cx="70" cy="15" rx="35" ry="12" fill="#15803d" transform="rotate(25 70 15)" />
        </g>

        {/* Stylized Floating Puffy Clouds */}
        <g fill="url(#cloudGrad)">
          {/* Top Left Cloud */}
          <path d="M 120 140 A 30 30 0 0 1 180 140 A 45 45 0 0 1 260 150 A 35 35 0 0 1 230 190 L 110 190 A 25 25 0 0 1 120 140 Z" />
          {/* Top Right Cloud */}
          <path d="M 1320 170 A 35 35 0 0 1 1390 170 A 50 50 0 0 1 1480 180 A 40 40 0 0 1 1450 220 L 1310 220 A 30 30 0 0 1 1320 170 Z" />
        </g>

        {/* Dotted Nautical Exploration Trail Lines */}
        <g stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="6 8" strokeOpacity="0.2" fill="none">
          <path d="M 100 240 Q 250 200 380 270 T 600 360" />
          <path d="M 1500 280 Q 1360 220 1200 310 T 1000 400" />
        </g>

        {/* Nautical Compass Rose on Far Left Edge */}
        <g transform="translate(80, 80) scale(0.6)" opacity="0.25">
          <circle cx="60" cy="60" r="50" stroke="#facc15" strokeWidth="2" fill="none" />
          <circle cx="60" cy="60" r="38" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" fill="none" />
          <polygon points="60,10 65,55 60,60 55,55" fill="#facc15" />
          <polygon points="60,110 65,65 60,60 55,65" fill="#ca8a04" />
          <polygon points="10,60 55,55 60,60 55,65" fill="#38bdf8" />
          <polygon points="110,60 65,55 60,60 65,65" fill="#0284c7" />
          <circle cx="60" cy="60" r="4" fill="#ffffff" />
        </g>

        {/* Red 'X' Marks the Spot Marker on Distant Coast */}
        <g transform="translate(1440, 250)" opacity="0.3">
          <line x1="0" y1="0" x2="24" y2="24" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="24" y1="0" x2="0" y2="24" stroke="#ef4444" strokeWidth="4.5" strokeLinecap="round" />
        </g>

        {/* Small floating gold coins / glints along edge */}
        <g opacity="0.45">
          <circle cx="1300" cy="420" r="6" fill="#facc15" stroke="#78350f" strokeWidth="1.5" />
          <circle cx="340" cy="380" r="5" fill="#facc15" stroke="#78350f" strokeWidth="1.5" />
        </g>

        {/* Subtle Decorative Tropical Leaves along Top-Left and Top-Right Viewport Edges */}
        <g opacity="0.35">
          {/* Top-Left Vines */}
          <path d="M 0 0 Q 60 40 100 20 Q 140 0 160 0" stroke="#15803d" strokeWidth="4" fill="none" />
          <ellipse cx="60" cy="30" rx="14" ry="7" fill="#22c55e" transform="rotate(35 60 30)" />
          <ellipse cx="90" cy="24" rx="12" ry="6" fill="#16a34a" transform="rotate(-20 90 24)" />
          <ellipse cx="130" cy="10" rx="13" ry="6" fill="#22c55e" transform="rotate(25 130 10)" />

          {/* Top-Right Vines */}
          <path d="M 1600 0 Q 1540 40 1500 20 Q 1460 0 1440 0" stroke="#15803d" strokeWidth="4" fill="none" />
          <ellipse cx="1540" cy="30" rx="14" ry="7" fill="#22c55e" transform="rotate(-35 1540 30)" />
          <ellipse cx="1510" cy="24" rx="12" ry="6" fill="#16a34a" transform="rotate(20 1510 24)" />
          <ellipse cx="1470" cy="10" rx="13" ry="6" fill="#22c55e" transform="rotate(-25 1470 10)" />
        </g>
      </svg>

      {/* Subtle Central Radial Soft Vignette so the Game Board Pops */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.35) 0%, rgba(3, 7, 18, 0.75) 100%)',
        }}
      />
    </div>
  );
};
