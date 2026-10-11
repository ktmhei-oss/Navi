import React from 'react';
import { AgendaItem, CalendarEvent } from '../../types';

interface AgendaDetailModalProps {
  item: AgendaItem | CalendarEvent | null;
  onClose: () => void;
  onOpenCampusMap: (targetRoom?: string) => void;
}

export const AgendaDetailModal: React.FC<AgendaDetailModalProps> = ({
  item,
  onClose,
  onOpenCampusMap,
}) => {
  if (!item) return null;

  const isAgenda = 'period' in item;
  const title = item.title;
  const code = item.code;
  const time = isAgenda ? `${item.time} ${item.period}` : `${item.day} at ${item.timeSlot}`;
  const location = isAgenda ? item.location : (item.room || 'Campus Room');
  const lecturer = isAgenda ? item.lecturer : item.instructor;
  const directions = isAgenda ? item.roomDirections : item.notes;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm theme-surface theme-border border rounded-3xl p-5 shadow-2xl relative space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 w-8 h-8 rounded-full theme-surface-muted flex items-center justify-center theme-text-muted hover:theme-text cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Header */}
        <div className="pr-6">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded theme-badge-sage border">
              {code}
            </span>
            <span className="text-xs font-semibold theme-text-muted">
              {time}
            </span>
          </div>
          <h2 className="text-lg font-bold theme-text leading-snug">
            {title}
          </h2>
        </div>

        {/* Location & Navigation directions */}
        <div className="theme-surface-muted rounded-2xl p-3.5 space-y-2.5 theme-border border">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg theme-badge-sage border flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">location_on</span>
            </div>
            <div>
              <span className="text-[11px] font-bold theme-text block">
                {location}
              </span>
              <p className="text-xs theme-text-muted mt-0.5 leading-relaxed">
                {directions || 'Accessible via the Central Atrium and Main Elevators.'}
              </p>
            </div>
          </div>

          {lecturer && (
            <div className="flex items-center gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs theme-text-muted">
              <span className="material-symbols-outlined text-[16px]">person</span>
              <span>Instructor: <strong className="theme-text font-semibold">{lecturer}</strong></span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 pt-1">
          <button
            onClick={() => {
              onClose();
              onOpenCampusMap(location);
            }}
            className="flex-1 py-2.5 px-3 rounded-xl theme-primary-bg theme-primary-text font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">explore</span>
            View on Map
          </button>
          <button
            onClick={onClose}
            className="py-2.5 px-4 rounded-xl theme-surface theme-border border theme-text font-semibold text-xs hover:opacity-80 active:scale-95 transition-all cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
