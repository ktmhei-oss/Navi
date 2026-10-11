import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onGoBack: () => void;
  onOpenTasks: () => void;
  onOpenHelp: () => void;
  onLogout: () => void;
  unreadTasksCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  onGoBack,
  onOpenTasks,
  onOpenHelp,
  onLogout,
  unreadTasksCount,
}) => {
  return (
    <div className="sticky bottom-0 inset-x-0 w-full theme-nav-bg backdrop-blur-md theme-border-t border-t px-6 sm:px-8 py-3.5 z-30 transition-colors duration-200">
      <div className="max-w-2xl mx-auto">
        {/* 1. LOBBY NAV */}
        {currentScreen === 'lobby' && (
          <div className="flex items-center justify-between">
            <button
              onClick={onLogout}
              aria-label="Sign out"
              title="Sign out"
              className="w-11 h-11 rounded-xl flex items-center justify-center theme-text-muted hover:theme-text hover:bg-slate-500/10 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">logout</span>
            </button>
            <button
              onClick={() => onNavigate('floorplan')}
              aria-label="Floorplan"
              title="Floorplan"
              className="w-11 h-11 rounded-xl flex items-center justify-center theme-surface theme-border border shadow-2xs theme-text hover:opacity-85 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[26px]">explore</span>
            </button>
          </div>
        )}

        {/* 2. FLOORPLAN NAV */}
        {currentScreen === 'floorplan' && (
          <div className="flex items-center justify-between">
            <button
              onClick={onGoBack}
              aria-label="Back"
              title="Back"
              className="w-11 h-11 rounded-xl flex items-center justify-center theme-text active:scale-95 transition-all cursor-pointer hover:bg-slate-500/10"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <button
              onClick={onOpenHelp}
              aria-label="Help"
              title="Help"
              className="w-11 h-11 rounded-xl flex items-center justify-center theme-text-muted hover:theme-text hover:bg-slate-500/10 active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[24px]">help</span>
            </button>
          </div>
        )}

        {/* 3. CALENDAR NAV */}
        {currentScreen === 'calendar' && (
          <div className="flex items-center justify-between">
            <button
              onClick={onGoBack}
              aria-label="Back"
              title="Back"
              className="w-11 h-11 rounded-xl flex items-center justify-center theme-text active:scale-95 transition-all cursor-pointer hover:bg-slate-500/10"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <button
              onClick={() => onNavigate('lobby')}
              aria-label="Home"
              title="Home"
              className="w-11 h-11 rounded-xl flex items-center justify-center theme-text active:scale-95 transition-all cursor-pointer hover:bg-slate-500/10"
            >
              <span className="material-symbols-outlined text-[24px]">home</span>
            </button>
            <button
              onClick={onOpenTasks}
              aria-label="Tasks"
              title="Tasks"
              className="w-11 h-11 rounded-xl relative flex items-center justify-center theme-surface theme-border border shadow-2xs theme-text active:scale-95 transition-all cursor-pointer hover:opacity-85"
            >
              <span className="material-symbols-outlined text-[24px]">check_box</span>
              {unreadTasksCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full theme-primary-bg theme-primary-text text-[9px] font-bold flex items-center justify-center shadow-xs">
                  {unreadTasksCount}
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
