/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { GirlExplorerSprite } from './GameAssets';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'compact' | 'badge';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
}) => {
  const [customSrc, setCustomSrc] = useState<string | null>(() => {
    return localStorage.getItem('search_and_seize_custom_logo') || null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('search_and_seize_custom_logo');
      if (stored) {
        setCustomSrc(stored);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('logoUpdated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('logoUpdated', handleStorageChange);
    };
  }, []);

  let dimensionClass = 'w-10 h-10';
  if (size === 'sm') dimensionClass = 'w-9 h-9';
  if (size === 'md') dimensionClass = 'w-12 h-12';
  if (size === 'lg') dimensionClass = 'w-16 h-16 sm:w-20 sm:h-20';
  if (size === 'xl') dimensionClass = 'w-24 h-24 sm:w-28 sm:h-28';

  if (customSrc) {
    return (
      <div className={`relative inline-flex items-center justify-center select-none shrink-0 ${dimensionClass} ${className}`}>
        <img
          src={customSrc}
          alt="SEARCH & SEIZE"
          className="w-full h-full object-contain filter drop-shadow-md"
        />
      </div>
    );
  }

  // Official Girl Explorer + Compass Gold Badge
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none shrink-0 rounded-2xl bg-gradient-to-br from-[#facc15] via-[#eab308] to-[#ca8a04] p-1 border-2 border-[#451a03] shadow-[0_3px_0_#2b1103] ${dimensionClass} ${className}`}
    >
      <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-[#0284c7] to-[#0369a1] border border-cyan-200/50 flex items-center justify-center overflow-hidden">
        <GirlExplorerSprite className="w-full h-full scale-125 translate-y-1" showArrow={false} />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-yellow-400 border border-black flex items-center justify-center shadow-xs">
          <Compass className="w-2.5 h-2.5 text-black" />
        </div>
      </div>
    </div>
  );
};
