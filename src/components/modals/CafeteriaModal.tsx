import React from 'react';
import { CAFETERIA_MENU } from '../../data/mockData';

interface CafeteriaModalProps {
  onClose: () => void;
  onOpenCampusMap: () => void;
}

export const CafeteriaModal: React.FC<CafeteriaModalProps> = ({
  onClose,
  onOpenCampusMap,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm theme-surface theme-border border rounded-3xl p-5 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto custom-scroll">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close lunch menu"
          className="absolute top-4 right-4 w-8 h-8 rounded-full theme-surface-muted flex items-center justify-center theme-text-muted hover:theme-text cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Header */}
        <div className="pr-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full theme-primary-bg animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider theme-badge-sage px-1.5 py-0.5 rounded border">
              CAMPUS RESTAURANT
            </span>
          </div>
          <h2 className="text-xl font-extrabold theme-text tracking-tight">
            Ravintola Pääsky
          </h2>
          <div className="flex items-center gap-2 mt-1 text-xs theme-text-muted">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            <span>Lunch 10:30 – 14:30</span>
            <span>•</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              Student €2.95
            </span>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2.5">
          {CAFETERIA_MENU.items.map((item, idx) => (
            <div
              key={idx}
              className="theme-surface-muted rounded-2xl p-3 theme-border border space-y-1"
            >
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider theme-text-dim">
                  {item.type}
                </span>
                <div className="flex items-center gap-1">
                  {item.dietary.map((d) => (
                    <span
                      key={d}
                      className="text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded theme-badge-sage border"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="text-xs font-bold theme-text leading-tight">
                {item.name}
              </h3>
              <p className="text-[11px] theme-text-muted leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Pricing notice */}
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
          <span>KELA Subsidized Rate:</span>
          <strong className="font-bold font-mono">€2.95 with Student Card</strong>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => {
              onClose();
              onOpenCampusMap();
            }}
            className="flex-1 py-2.5 px-3 rounded-xl theme-primary-bg theme-primary-text font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">location_on</span>
            Find Cafeteria (Ground Floor)
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
