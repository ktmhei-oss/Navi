import React from 'react';
import { STUDENT_PROFILE } from '../../data/mockData';

interface StudentProfileModalProps {
  onClose: () => void;
  onLogout: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  onClose,
  onLogout,
}) => {
  const profile = STUDENT_PROFILE;
  const progressPercent = Math.round((profile.creditsCompleted / profile.creditsRequired) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm theme-surface theme-border border rounded-3xl p-5 shadow-2xl relative space-y-4 max-h-[92vh] overflow-y-auto custom-scroll">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close profile modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-full theme-surface-muted flex items-center justify-center theme-text-muted hover:theme-text cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Profile Card Header */}
        <div className="flex items-center gap-3.5 pr-6">
          <div className="w-12 h-12 rounded-2xl theme-primary-bg theme-primary-text flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[26px]">badge</span>
          </div>
          <div>
            <h2 className="text-base font-bold theme-text leading-tight">
              Student Card
            </h2>
            <p className="text-xs theme-text-muted">Pasila Campus • Active Session</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded theme-badge-sage border">
                ID: {profile.studentId}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded theme-badge-periwinkle border">
                GPA {profile.gpa}
              </span>
            </div>
          </div>
        </div>

        {/* Degree & Faculty Info */}
        <div className="theme-surface-muted rounded-2xl p-3.5 space-y-2 border theme-border text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider theme-text-dim block">
              DEGREE PROGRAMME
            </span>
            <span className="font-semibold theme-text mt-0.5 block">
              {profile.programme}
            </span>
            <span className="text-[11px] theme-text-muted block mt-0.5">
              {profile.faculty}
            </span>
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-medium theme-text-muted">ECTS Progress:</span>
              <span className="font-mono font-bold theme-text">
                {profile.creditsCompleted} / {profile.creditsRequired} ECTS ({progressPercent}%)
              </span>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full theme-primary-bg transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Campus Affiliation Badges */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl theme-surface-muted border theme-border flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-emerald-600">wifi</span>
            <div>
              <span className="block text-[10px] theme-text-dim">Network</span>
              <strong className="block text-[11px] theme-text">eduroam active</strong>
            </div>
          </div>

          <div className="p-2.5 rounded-xl theme-surface-muted border theme-border flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-indigo-600">local_library</span>
            <div>
              <span className="block text-[10px] theme-text-dim">Library Card</span>
              <strong className="block text-[11px] theme-text">Valid (1 loan)</strong>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="flex-1 py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            Sign Out
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl theme-surface theme-border border theme-text font-semibold text-xs hover:opacity-80 active:scale-95 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
