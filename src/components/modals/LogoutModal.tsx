import React from 'react';

interface LogoutModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  onClose,
  onConfirm,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm theme-surface theme-border border rounded-3xl p-5 shadow-2xl relative space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">logout</span>
          </div>
          <div>
            <h2 className="text-base font-bold theme-text leading-tight">
              Sign Out of Navi?
            </h2>
            <p className="text-xs theme-text-muted mt-1 leading-relaxed">
              You will need your student single sign-on credentials to access offline campus maps and personalized timetable sync.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            Confirm Sign Out
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl theme-surface theme-border border theme-text font-semibold text-xs hover:opacity-80 active:scale-95 transition-all cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
