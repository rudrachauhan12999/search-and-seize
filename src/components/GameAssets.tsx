/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// ==========================================
// 1. GIRL EXPLORER CHARACTER (PLAYER - CYAN/BLUE)
// Based directly on uploaded reference image
// Brown explorer hat with red band, ponytail, blue neckerchief, backpack, blue cursor arrow
// ==========================================
export const GirlExplorerSprite: React.FC<{
  className?: string;
  showArrow?: boolean;
}> = ({ className = 'w-12 h-12', showArrow = true }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] ${className}`}
  >
    {/* Floating Cyan/Blue Cursor Indicator (like the reference) */}
    {showArrow && (
      <g className="animate-bounce">
        <polygon points="50,14 42,4 58,4" fill="#00e5ff" stroke="#00363a" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="50,11 45,5 55,5" fill="#e0f7fa" />
      </g>
    )}

    {/* Backpack on Left Side */}
    <rect x="22" y="56" width="16" height="22" rx="4" fill="#8d5b2d" stroke="#331c0a" strokeWidth="3" />
    <rect x="20" y="62" width="6" height="12" rx="2" fill="#a06733" stroke="#331c0a" strokeWidth="2" />
    <rect x="28" y="60" width="8" height="4" rx="1" fill="#c68c4a" stroke="#331c0a" strokeWidth="1.5" />
    {/* Rolled Map on Backpack */}
    <rect x="18" y="48" width="12" height="8" rx="3" fill="#e8d5b5" stroke="#331c0a" strokeWidth="2" transform="rotate(-15 24 52)" />

    {/* Chic Anime Bob Cut Hair */}
    {/* Left Curved Bob Bell */}
    <path
      d="M32 38 C24 44 23 54 26 62 C28 66 33 66 35 63 C36 60 35 52 35 46 Z"
      fill="#42220e"
      stroke="#261205"
      strokeWidth="2.8"
      strokeLinejoin="round"
    />
    <path
      d="M31 40 C26 46 25 54 28 60 C29 62 32 62 33 60 C34 56 34 50 33 46 Z"
      fill="#5a3318"
    />
    {/* Left Bob Highlight Streak */}
    <path d="M28 46 Q27 52 29 56" stroke="#8d542a" strokeWidth="1.8" strokeLinecap="round" fill="none" />

    {/* Right Curved Bob Bell */}
    <path
      d="M68 38 C76 44 77 54 74 62 C72 66 67 66 65 63 C64 60 65 52 65 46 Z"
      fill="#42220e"
      stroke="#261205"
      strokeWidth="2.8"
      strokeLinejoin="round"
    />
    <path
      d="M69 40 C74 46 75 54 72 60 C71 62 68 62 67 60 C66 56 66 50 67 46 Z"
      fill="#5a3318"
    />
    {/* Right Bob Highlight Streak */}
    <path d="M72 46 Q73 52 71 56" stroke="#8d542a" strokeWidth="1.8" strokeLinecap="round" fill="none" />

    {/* Back Hair Under-layer behind neck */}
    <path d="M33 58 Q50 65 67 58 L67 63 Q50 70 33 63 Z" fill="#2b1407" />

    {/* Explorer Boots & Legs */}
    <rect x="38" y="78" width="10" height="12" rx="3" fill="#543318" stroke="#261205" strokeWidth="2.5" />
    <rect x="52" y="78" width="10" height="12" rx="3" fill="#543318" stroke="#261205" strokeWidth="2.5" />
    <rect x="36" y="86" width="13" height="6" rx="2.5" fill="#38210e" stroke="#261205" strokeWidth="2.5" />
    <rect x="51" y="86" width="13" height="6" rx="2.5" fill="#38210e" stroke="#261205" strokeWidth="2.5" />
    {/* White socks */}
    <rect x="39" y="78" width="8" height="3" fill="#ffffff" />
    <rect x="53" y="78" width="8" height="3" fill="#ffffff" />

    {/* Explorer Clothes / Shirt */}
    <rect x="36" y="64" width="28" height="16" rx="4" fill="#ede0c8" stroke="#261205" strokeWidth="3" />
    {/* Leather Belt with Buckle */}
    <rect x="35" y="74" width="30" height="6" fill="#6d421e" stroke="#261205" strokeWidth="2" />
    <rect x="47" y="73.5" width="6" height="7" rx="1" fill="#ffd54f" stroke="#261205" strokeWidth="1.5" />

    {/* Vibrant Cyan Neckerchief / Bandana */}
    <polygon points="50,68 36,60 64,60" fill="#00d4e6" stroke="#004d40" strokeWidth="2.5" strokeLinejoin="round" />
    <polygon points="50,65 42,60 58,60" fill="#80deea" />
    <circle cx="50" cy="61" r="2.5" fill="#00838f" />

    {/* Face */}
    <ellipse cx="50" cy="48" rx="19" ry="17" fill="#ffe2cb" stroke="#261205" strokeWidth="3" />
    {/* Warm Cheeks */}
    <ellipse cx="37" cy="54" rx="4" ry="2.5" fill="#ff8a80" opacity="0.6" />
    <ellipse cx="63" cy="54" rx="4" ry="2.5" fill="#ff8a80" opacity="0.6" />
    {/* Big Anime Eyes */}
    <ellipse cx="41" cy="48" rx="4" ry="5.5" fill="#2d170b" />
    <circle cx="40" cy="46" r="1.8" fill="#ffffff" />
    <circle cx="42" cy="50" r="0.9" fill="#ffffff" />

    <ellipse cx="59" cy="48" rx="4" ry="5.5" fill="#2d170b" />
    <circle cx="58" cy="46" r="1.8" fill="#ffffff" />
    <circle cx="60" cy="50" r="0.9" fill="#ffffff" />
    {/* Cute Mouth */}
    <path d="M48 54 Q50 57 53 54" stroke="#8d4b38" strokeWidth="2" strokeLinecap="round" fill="none" />

    {/* Front Hair Bangs with soft layered fringe */}
    <path d="M31 36 C31 43 33 46 36 46 C39 46 40 40 43 40 C46 40 47 46 51 46 C55 46 56 41 60 41 C64 41 67 45 69 36" fill="#42220e" stroke="#261205" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M33 37 C34 43 36 44 38 44 C41 44 42 39 45 39 C48 39 49 44 52 44 C56 44 57 40 60 40 C63 40 65 43 67 37" fill="#5a3318" />
    {/* Soft highlight flickers on bangs */}
    <path d="M36 39 Q38 41 40 39" stroke="#8d542a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M50 39 Q52 41 54 39" stroke="#8d542a" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Cute side lock framing the cheek */}
    <path d="M31 44 C30 48 32 52 33 54" stroke="#42220e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M68 44 C69 48 67 52 66 54" stroke="#42220e" strokeWidth="2.5" strokeLinecap="round" fill="none" />

    {/* Explorer Fedora Hat */}
    {/* Hat Crown */}
    <path d="M34 32 C34 22 42 18 50 18 C58 18 66 22 66 32 Z" fill="#d29654" stroke="#261205" strokeWidth="3" />
    {/* Hat Highlight */}
    <path d="M39 28 C40 22 46 21 50 21" stroke="#eec68e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Red Hatband */}
    <rect x="33.5" y="28" width="33" height="5" fill="#d32f2f" stroke="#261205" strokeWidth="2" />
    {/* Hat Brim */}
    <ellipse cx="50" cy="33" rx="28" ry="7" fill="#b97a38" stroke="#261205" strokeWidth="3" />
    <ellipse cx="50" cy="32" rx="25" ry="5" fill="#d29654" />
  </svg>
);

// ==========================================
// 2. ROBOT EXPLORER CHARACTER (AI - MAGENTA/RED)
// Based directly on uploaded reference image
// Explorer hat, antenna with glowing pink orb, glowing magenta visor eyes, red neckerchief
// ==========================================
export const RobotExplorerSprite: React.FC<{
  className?: string;
  showArrow?: boolean;
}> = ({ className = 'w-12 h-12', showArrow = true }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] ${className}`}
  >
    {/* Floating Magenta/Red Cursor Indicator (like the reference) */}
    {showArrow && (
      <g className="animate-bounce">
        <polygon points="50,14 42,4 58,4" fill="#ff1744" stroke="#4a000f" strokeWidth="2" strokeLinejoin="round" />
        <polygon points="50,11 45,5 55,5" fill="#ff80ab" />
      </g>
    )}

    {/* Backpack on Right Side */}
    <rect x="62" y="54" width="16" height="22" rx="4" fill="#8d5b2d" stroke="#261205" strokeWidth="3" />
    {/* Antenna with Glowing Pink Light sticking out */}
    <line x1="72" y1="54" x2="78" y2="30" stroke="#78909c" strokeWidth="3" strokeLinecap="round" />
    <circle cx="79" cy="28" r="5" fill="#ff2d70" stroke="#330012" strokeWidth="2" />
    <circle cx="78" cy="27" r="2" fill="#ffb2dd" />

    {/* Robot Legs & Boots (Magenta/White) */}
    <rect x="36" y="78" width="11" height="12" rx="3" fill="#f0f4f8" stroke="#261205" strokeWidth="2.5" />
    <rect x="53" y="78" width="11" height="12" rx="3" fill="#f0f4f8" stroke="#261205" strokeWidth="2.5" />
    {/* Magenta Kneecaps */}
    <rect x="37" y="77" width="9" height="5" rx="2" fill="#e91e63" stroke="#261205" strokeWidth="1.5" />
    <rect x="54" y="77" width="9" height="5" rx="2" fill="#e91e63" stroke="#261205" strokeWidth="1.5" />
    {/* Metallic Boots with Magenta Soles */}
    <rect x="33" y="86" width="15" height="7" rx="3" fill="#cfd8dc" stroke="#261205" strokeWidth="2.5" />
    <rect x="52" y="86" width="15" height="7" rx="3" fill="#cfd8dc" stroke="#261205" strokeWidth="2.5" />
    <rect x="33" y="90" width="15" height="3" rx="1.5" fill="#e91e63" />
    <rect x="52" y="90" width="15" height="3" rx="1.5" fill="#e91e63" />

    {/* White Robot Torso */}
    <rect x="35" y="62" width="30" height="18" rx="6" fill="#f8fafc" stroke="#261205" strokeWidth="3" />
    <rect x="38" y="72" width="24" height="6" fill="#6d421e" stroke="#261205" strokeWidth="2" />
    <rect x="47" y="71.5" width="6" height="7" rx="1" fill="#ffd54f" stroke="#261205" strokeWidth="1.5" />

    {/* Red / Magenta Neckerchief */}
    <polygon points="50,66 35,59 65,59" fill="#e53935" stroke="#4a000f" strokeWidth="2.5" strokeLinejoin="round" />
    <polygon points="50,63 42,59 58,59" fill="#ff7961" />

    {/* Head: White Rounded Monitor Chassis */}
    <rect x="30" y="36" width="40" height="26" rx="9" fill="#f8fafc" stroke="#261205" strokeWidth="3" />
    {/* Ear Headphone Nodes */}
    <ellipse cx="28" cy="49" rx="3" ry="6" fill="#e91e63" stroke="#261205" strokeWidth="2" />
    <ellipse cx="72" cy="49" rx="3" ry="6" fill="#e91e63" stroke="#261205" strokeWidth="2" />

    {/* Dark Glass Visor Screen */}
    <rect x="34" y="40" width="32" height="18" rx="6" fill="#181824" stroke="#261205" strokeWidth="2" />
    {/* Glowing Magenta / Neon Pink Eye Rectangles */}
    <rect x="38" y="44" width="7" height="10" rx="2" fill="#ff2a85" className="animate-pulse">
      <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
    </rect>
    <rect x="40" y="46" width="3" height="6" rx="1" fill="#ffffff" />

    <rect x="55" y="44" width="7" height="10" rx="2" fill="#ff2a85" className="animate-pulse">
      <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
    </rect>
    <rect x="57" y="46" width="3" height="6" rx="1" fill="#ffffff" />

    {/* Explorer Fedora Hat */}
    {/* Hat Crown */}
    <path d="M34 32 C34 22 42 18 50 18 C58 18 66 22 66 32 Z" fill="#d29654" stroke="#261205" strokeWidth="3" />
    {/* Hat Highlight */}
    <path d="M39 28 C40 22 46 21 50 21" stroke="#eec68e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    {/* Red Hatband */}
    <rect x="33.5" y="28" width="33" height="5" fill="#d32f2f" stroke="#261205" strokeWidth="2" />
    {/* Hat Brim */}
    <ellipse cx="50" cy="33" rx="28" ry="7" fill="#b97a38" stroke="#261205" strokeWidth="3" />
    <ellipse cx="50" cy="32" rx="25" ry="5" fill="#d29654" />
  </svg>
);

// ==========================================
// 3. TREASURE ASSETS (AS IN THE BOARD REFERENCE)
// Coin (+1), Ruby (+3), Gem (+5), Golden Chest (+10)
// ==========================================

export const GoldCoinSprite: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Gold Glow */}
    <circle cx="40" cy="36" r="28" fill="#facc15" opacity="0.3" filter="blur(4px)" />
    {/* Outer Coin Edge */}
    <circle cx="40" cy="36" r="24" fill="#ca8a04" stroke="#261205" strokeWidth="3" />
    {/* Inner Coin Surface */}
    <circle cx="40" cy="34" r="21" fill="url(#goldGradient)" stroke="#854d0e" strokeWidth="2" />
    {/* Crown Insignia on Coin (from reference) */}
    <path d="M30 38 L32 28 L37 32 L40 26 L43 32 L48 28 L50 38 Z" fill="#713f12" />
    <path d="M31 37 L33 29 L37 33 L40 28 L43 33 L47 29 L49 37 Z" fill="#fef08a" />
    <circle cx="40" cy="27" r="1.5" fill="#ffffff" />
    <circle cx="33" cy="28.5" r="1.2" fill="#ffffff" />
    <circle cx="47" cy="28.5" r="1.2" fill="#ffffff" />
    {/* Edge Sparkle */}
    <polygon points="20,24 22,22 24,24 22,26" fill="#ffffff" />
    <polygon points="58,22 60,19 62,22 60,25" fill="#ffffff" />
    {/* +1 Capsule Pill Label */}
    <rect x="23" y="58" width="34" height="18" rx="9" fill="#1e1302" stroke="#eab308" strokeWidth="2.5" />
    <text x="40" y="71" textAnchor="middle" fill="#facc15" fontFamily="'Silkscreen', monospace" fontSize="13" fontWeight="900">
      +1
    </text>
    <defs>
      <linearGradient id="goldGradient" x1="40" y1="13" x2="40" y2="55" gradientUnits="userSpaceOnUse">
        <stop stopColor="#fef08a" />
        <stop offset="0.4" stopColor="#facc15" />
        <stop offset="1" stopColor="#eab308" />
      </linearGradient>
    </defs>
  </svg>
);

export const RubySprite: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Pink/Red Glow */}
    <circle cx="40" cy="36" r="26" fill="#f43f5e" opacity="0.35" filter="blur(4px)" />
    {/* Ruby Cut Crystal Body */}
    <polygon points="40,14 58,26 52,50 40,56 28,50 22,26" fill="#e11d48" stroke="#261205" strokeWidth="3" strokeLinejoin="round" />
    {/* Facets */}
    <polygon points="40,14 58,26 40,32 22,26" fill="#fb7185" />
    <polygon points="40,32 58,26 52,50" fill="#be123c" />
    <polygon points="40,32 22,26 28,50" fill="#f43f5e" />
    <polygon points="40,32 52,50 40,56 28,50" fill="#9f1239" />
    {/* Bright Highlights */}
    <polygon points="34,22 40,17 46,22 40,25" fill="#ffe4e6" />
    <polygon points="20,20 22,17 24,20 22,23" fill="#ffffff" />
    <polygon points="60,20 62,17 64,20 62,23" fill="#ffffff" />
    {/* +3 Capsule Pill Label */}
    <rect x="23" y="58" width="34" height="18" rx="9" fill="#24060e" stroke="#f43f5e" strokeWidth="2.5" />
    <text x="40" y="71" textAnchor="middle" fill="#ff758f" fontFamily="'Silkscreen', monospace" fontSize="13" fontWeight="900">
      +3
    </text>
  </svg>
);

export const CyanGemSprite: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Cyan Glow */}
    <circle cx="40" cy="35" r="26" fill="#06b6d4" opacity="0.4" filter="blur(4px)" />
    {/* Diamond Gem Outline */}
    <polygon points="20,26 32,15 48,15 60,26 40,54" fill="#0891b2" stroke="#261205" strokeWidth="3" strokeLinejoin="round" />
    {/* Top Table Facet */}
    <polygon points="32,15 48,15 44,26 36,26" fill="#a5f3fc" />
    {/* Upper Side Facets */}
    <polygon points="20,26 32,15 36,26" fill="#67e8f9" />
    <polygon points="60,26 48,15 44,26" fill="#22d3ee" />
    {/* Lower Pavilion Facets */}
    <polygon points="20,26 36,26 40,54" fill="#06b6d4" />
    <polygon points="36,26 44,26 40,54" fill="#22d3ee" />
    <polygon points="44,26 60,26 40,54" fill="#0e7490" />
    {/* Shiny Glints */}
    <polygon points="16,22 18,19 20,22 18,25" fill="#ffffff" />
    <polygon points="62,20 64,17 66,20 64,23" fill="#ffffff" />
    <polygon points="40,20 41,18 42,20 41,22" fill="#ffffff" />
    {/* +5 Capsule Pill Label */}
    <rect x="23" y="58" width="34" height="18" rx="9" fill="#04202c" stroke="#22d3ee" strokeWidth="2.5" />
    <text x="40" y="71" textAnchor="middle" fill="#67e8f9" fontFamily="'Silkscreen', monospace" fontSize="13" fontWeight="900">
      +5
    </text>
  </svg>
);

export const GoldenChestSprite: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Radiant Glow */}
    <circle cx="40" cy="35" r="28" fill="#facc15" opacity="0.45" filter="blur(5px)" />
    {/* Chest Base Box */}
    <rect x="18" y="30" width="44" height="24" rx="4" fill="#991b1b" stroke="#261205" strokeWidth="3" />
    <rect x="20" y="32" width="40" height="20" rx="3" fill="#b91c1c" />
    {/* Wood Texture Panels */}
    <rect x="22" y="34" width="36" height="16" rx="2" fill="#dc2626" />
    {/* Arched Lid */}
    <path d="M18 32 C18 20 28 17 40 17 C52 17 62 20 62 32 Z" fill="#b91c1c" stroke="#261205" strokeWidth="3" />
    <path d="M20 30 C20 22 29 19 40 19 C51 19 60 22 60 30 Z" fill="#dc2626" />
    {/* Gold Metal Bands on Lid & Body */}
    <rect x="24" y="19" width="6" height="35" fill="#facc15" stroke="#261205" strokeWidth="2" />
    <rect x="50" y="19" width="6" height="35" fill="#facc15" stroke="#261205" strokeWidth="2" />
    <rect x="18" y="30" width="44" height="4" fill="#eab308" stroke="#261205" strokeWidth="2" />
    {/* Gold Crown Keyhole Lock */}
    <rect x="34" y="28" width="12" height="12" rx="3" fill="#fde047" stroke="#261205" strokeWidth="2" />
    <polygon points="36,32 38,30 40,32 42,30 44,32 44,36 36,36" fill="#713f12" />
    <circle cx="40" cy="35" r="1.5" fill="#000000" />
    {/* Sparkle Glints */}
    <polygon points="14,18 16,15 18,18 16,21" fill="#ffffff" />
    <polygon points="62,16 64,13 66,16 64,19" fill="#ffffff" />
    {/* +10 Capsule Pill Label */}
    <rect x="20" y="58" width="40" height="18" rx="9" fill="#291804" stroke="#facc15" strokeWidth="2.5" />
    <text x="40" y="71" textAnchor="middle" fill="#fef08a" fontFamily="'Silkscreen', monospace" fontSize="12" fontWeight="900">
      +10
    </text>
  </svg>
);

// ==========================================
// 4. MAP TILES & ENVIRONMENT ASSETS (FROM REFERENCE)
// Trees, Ponds, Boulders, Ruins, Crates, Paths
// ==========================================

export const OakTreeObstacle: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Trunk */}
    <rect x="34" y="44" width="12" height="24" rx="2" fill="#78350f" stroke="#261205" strokeWidth="3" />
    <path d="M30 68 C35 64 45 64 50 68" stroke="#261205" strokeWidth="3" fill="#5c270a" />
    {/* Foliage Clouds (Rounded Green as in Reference) */}
    <circle cx="28" cy="34" r="16" fill="#15803d" stroke="#261205" strokeWidth="3" />
    <circle cx="52" cy="34" r="16" fill="#15803d" stroke="#261205" strokeWidth="3" />
    <circle cx="40" cy="24" r="18" fill="#16a34a" stroke="#261205" strokeWidth="3" />
    <circle cx="40" cy="22" r="14" fill="#22c55e" />
    <circle cx="30" cy="32" r="12" fill="#16a34a" />
    <circle cx="50" cy="32" r="12" fill="#15803d" />
    {/* Foliage Highlights */}
    <circle cx="36" cy="18" r="4" fill="#86efac" />
    <circle cx="26" cy="28" r="3" fill="#4ade80" />
  </svg>
);

export const PineTreeObstacle: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Trunk */}
    <rect x="36" y="58" width="8" height="12" fill="#78350f" stroke="#261205" strokeWidth="2.5" />
    {/* Tier 3 (Bottom) */}
    <polygon points="40,36 18,58 62,58" fill="#0f5132" stroke="#261205" strokeWidth="3" strokeLinejoin="round" />
    {/* Tier 2 (Middle) */}
    <polygon points="40,24 24,44 56,44" fill="#157347" stroke="#261205" strokeWidth="3" strokeLinejoin="round" />
    {/* Tier 1 (Top) */}
    <polygon points="40,12 30,30 50,30" fill="#198754" stroke="#261205" strokeWidth="3" strokeLinejoin="round" />
    {/* Highlights */}
    <polygon points="40,14 34,26 42,26" fill="#4ade80" opacity="0.6" />
  </svg>
);

export const WaterPondObstacle: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Dirt & Stone Shore */}
    <ellipse cx="40" cy="40" rx="34" ry="30" fill="#a16207" stroke="#261205" strokeWidth="3" />
    {/* Blue Water Surface */}
    <ellipse cx="40" cy="40" rx="30" ry="26" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
    <ellipse cx="40" cy="38" rx="26" ry="22" fill="#0ea5e9" />
    {/* Water Ripples */}
    <path d="M26 36 C32 33 48 33 54 36" stroke="#e0f2fe" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M30 44 C36 42 44 42 50 44" stroke="#e0f2fe" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Lily Pads */}
    <ellipse cx="28" cy="34" rx="6" ry="4" fill="#15803d" stroke="#261205" strokeWidth="1.5" />
    <ellipse cx="50" cy="46" rx="5" ry="3.5" fill="#15803d" stroke="#261205" strokeWidth="1.5" />
    {/* Tiny Sparkle */}
    <polygon points="44,28 45,26 46,28 45,30" fill="#ffffff" />
  </svg>
);

export const BoulderObstacle: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Big Granite Rock Boulder with Facets */}
    <polygon points="40,16 64,28 66,54 48,68 26,66 16,46 22,26" fill="#64748b" stroke="#261205" strokeWidth="3.5" strokeLinejoin="round" />
    {/* Facet Shading */}
    <polygon points="40,16 64,28 48,38 28,34" fill="#94a3b8" />
    <polygon points="28,34 48,38 48,68 26,66" fill="#475569" />
    <polygon points="64,28 66,54 48,68 48,38" fill="#334155" />
    {/* Moss Patches */}
    <ellipse cx="28" cy="56" rx="6" ry="3" fill="#22c55e" stroke="#261205" strokeWidth="1.5" />
    <ellipse cx="52" cy="30" rx="4" ry="2" fill="#22c55e" stroke="#261205" strokeWidth="1" />
  </svg>
);

export const WoodenCrateObstacle: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Crate Box */}
    <rect x="18" y="18" width="44" height="44" rx="4" fill="#b45309" stroke="#261205" strokeWidth="3" />
    {/* Inner Planks */}
    <rect x="22" y="22" width="36" height="36" fill="#d97706" stroke="#261205" strokeWidth="2" />
    {/* Diagonal Bracing */}
    <line x1="22" y1="22" x2="58" y2="58" stroke="#261205" strokeWidth="4" />
    <line x1="23" y1="22" x2="57" y2="56" stroke="#92400e" strokeWidth="2.5" />
    <line x1="22" y1="58" x2="58" y2="22" stroke="#261205" strokeWidth="4" />
    <line x1="23" y1="58" x2="57" y2="24" stroke="#92400e" strokeWidth="2.5" />
    {/* Metal Corner Brackets with Rivets */}
    <circle cx="24" cy="24" r="2" fill="#f8fafc" stroke="#261205" strokeWidth="1" />
    <circle cx="56" cy="24" r="2" fill="#f8fafc" stroke="#261205" strokeWidth="1" />
    <circle cx="24" cy="56" r="2" fill="#f8fafc" stroke="#261205" strokeWidth="1" />
    <circle cx="56" cy="56" r="2" fill="#f8fafc" stroke="#261205" strokeWidth="1" />
  </svg>
);

export const StoneRuinsObstacle: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Ancient Pillar & Wall Blocks */}
    <rect x="20" y="24" width="20" height="40" rx="3" fill="#64748b" stroke="#261205" strokeWidth="3" />
    <rect x="42" y="36" width="22" height="28" rx="3" fill="#475569" stroke="#261205" strokeWidth="3" />
    {/* Pillar Fluting */}
    <line x1="26" y1="28" x2="26" y2="60" stroke="#334155" strokeWidth="2" />
    <line x1="34" y1="28" x2="34" y2="60" stroke="#334155" strokeWidth="2" />
    {/* Capital Top */}
    <rect x="18" y="22" width="24" height="6" rx="2" fill="#94a3b8" stroke="#261205" strokeWidth="2" />
    {/* Moss */}
    <path d="M18 48 C24 45 30 50 36 46" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

export const BushObstacle: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Lush Green Shrub Bush */}
    <circle cx="32" cy="44" r="16" fill="#15803d" stroke="#261205" strokeWidth="3" />
    <circle cx="48" cy="44" r="16" fill="#15803d" stroke="#261205" strokeWidth="3" />
    <circle cx="40" cy="34" r="18" fill="#16a34a" stroke="#261205" strokeWidth="3" />
    <circle cx="40" cy="32" r="14" fill="#22c55e" />
    {/* White Daisies on Bush */}
    <circle cx="34" cy="30" r="3" fill="#ffffff" />
    <circle cx="34" cy="30" r="1" fill="#facc15" />
    <circle cx="48" cy="38" r="3" fill="#ffffff" />
    <circle cx="48" cy="38" r="1" fill="#facc15" />
  </svg>
);

export const SkullRuinsObstacle: React.FC<{ className?: string }> = ({ className = 'w-full h-full' }) => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Stone Slab Base */}
    <rect x="16" y="32" width="48" height="32" rx="4" fill="#475569" stroke="#261205" strokeWidth="3" />
    <rect x="20" y="34" width="40" height="12" fill="#64748b" stroke="#261205" strokeWidth="1.5" />
    {/* Crossbones */}
    <line x1="28" y1="46" x2="52" y2="58" stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round" />
    <line x1="28" y1="58" x2="52" y2="46" stroke="#f1f5f9" strokeWidth="3" strokeLinecap="round" />
    {/* Skull */}
    <ellipse cx="40" cy="46" rx="9" ry="8" fill="#f8fafc" stroke="#261205" strokeWidth="2" />
    <rect x="36" y="52" width="8" height="5" rx="1.5" fill="#f8fafc" stroke="#261205" strokeWidth="1.5" />
    {/* Eye Sockets */}
    <ellipse cx="37" cy="45" rx="2.5" ry="3" fill="#0f172a" />
    <ellipse cx="43" cy="45" rx="2.5" ry="3" fill="#0f172a" />
    {/* Teeth marks */}
    <line x1="39" y1="54" x2="39" y2="57" stroke="#261205" strokeWidth="1" />
    <line x1="41" y1="54" x2="41" y2="57" stroke="#261205" strokeWidth="1" />
  </svg>
);
