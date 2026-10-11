import React from 'react';
import { ThemeMode, ScreenType } from '../types';

interface GlobalHeaderProps {
  theme: ThemeMode;
  onNavigateHome: () => void;
  onCycleTheme: () => void;
  onOpenProfile: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  theme,
  onNavigateHome,
  onCycleTheme,
  onOpenProfile,
}) => {
  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return 'contrast';
      case 'dark':
        return 'dark_mode';
      case 'contrast':
        return 'tonality';
      default:
        return 'contrast';
    }
  };

  const getThemeTitle = () => {
    switch (theme) {
      case 'light':
        return 'Switch to Dark Mode';
      case 'dark':
        return 'Switch to Enhanced Contrast (AAA)';
      case 'contrast':
        return 'Switch to Light Mode';
    }
  };

  return (
    <header className="px-4 sm:px-6 py-3.5 flex items-center justify-between z-20 shrink-0 theme-header theme-border-b border-b transition-colors duration-200">
      {/* Brand Zone */}
      <div className="flex items-center gap-3">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          title="Navi - Digital services navigator"
        >
          {/* Navi Logo */}
          <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm ring-1 ring-black/5 group-hover:scale-105 transition-transform shrink-0">
            <span className="font-bold text-lg tracking-tighter">
              N<span className="text-emerald-400 text-sm leading-none">·</span>
            </span>
          </div>
          <div>
            <span className="font-bold text-xl sm:text-2xl tracking-tight theme-text block leading-none">
              Navi
            </span>
            <span className="text-[11px] font-medium theme-text-muted hidden sm:block tracking-tight mt-0.5">
              Digital services navigator
            </span>
          </div>
        </button>
      </div>

      {/* Utilities Zone */}
      <div className="flex items-center gap-2">
        {/* Theme Switcher Button */}
        <button
          onClick={onCycleTheme}
          aria-label="Toggle visual theme mode"
          title={getThemeTitle()}
          className="w-9 h-9 rounded-xl theme-surface theme-border border flex items-center justify-center theme-text hover:opacity-80 active:scale-95 transition-all cursor-pointer shadow-2xs"
        >
          <span className="material-symbols-outlined text-[19px]">
            {getThemeIcon()}
          </span>
        </button>

        {/* Student Profile Button */}
        <button
          onClick={onOpenProfile}
          aria-label="Student profile"
          title="Student Profile"
          className="w-9 h-9 rounded-xl theme-primary-bg theme-primary-text flex items-center justify-center shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[19px]">person</span>
        </button>
      </div>
    </header>
  );
};

