import React from 'react';

interface HelpModalProps {
  onClose: () => void;
  onNavigateToFloorplan: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({
  onClose,
  onNavigateToFloorplan,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm theme-surface theme-border border rounded-3xl p-5 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto custom-scroll">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close help"
          className="absolute top-4 right-4 w-8 h-8 rounded-full theme-surface-muted flex items-center justify-center theme-text-muted hover:theme-text cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Header */}
        <div className="pr-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full theme-primary-bg"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider theme-badge-sage px-1.5 py-0.5 rounded border">
              NAVI ASSIST
            </span>
          </div>
          <h2 className="text-xl font-extrabold theme-text tracking-tight">
            Campus Help & Guide
          </h2>
          <p className="text-xs theme-text-muted mt-0.5">
            Key guidance for navigating Pasila campus
          </p>
        </div>

        {/* Guides */}
        <div className="space-y-2.5 text-xs">
          <div className="theme-surface-muted p-3 rounded-2xl border theme-border">
            <strong className="block theme-text font-bold mb-1">
              🏢 How to navigate spaces:
            </strong>
            <p className="theme-text-muted leading-relaxed">
              Use the bottom compass icon to access all campus directory services and interactive floor plans. Tap on any course in the Daily Agenda to get step-by-step route directions.
            </p>
          </div>

          <div className="theme-surface-muted p-3 rounded-2xl border theme-border">
            <strong className="block theme-text font-bold mb-1">
              ♿ Accessibility & Elevators:
            </strong>
            <p className="theme-text-muted leading-relaxed">
              Elevators A & B located in the central atrium offer barrier-free step-free access to all 4 levels.
            </p>
          </div>

          <div className="theme-surface-muted p-3 rounded-2xl border theme-border">
            <strong className="block theme-text font-bold mb-1">
              🚨 Campus Security & Info Desk:
            </strong>
            <p className="theme-text-muted leading-relaxed">
              Main lobby service desk is open Mon–Fri 07:30–18:00. Emergency campus security phone: <strong>+358 40 123 4567</strong>.
            </p>
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={() => {
            onClose();
            onNavigateToFloorplan();
          }}
          className="w-full py-2.5 rounded-xl theme-primary-bg theme-primary-text font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          View Campus Floorplan
        </button>
      </div>
    </div>
  );
};
