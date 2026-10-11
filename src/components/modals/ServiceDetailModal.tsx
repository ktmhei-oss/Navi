import React from 'react';
import { ServiceItem } from '../../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenCampusMap: (loc?: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onOpenCampusMap,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm theme-surface theme-border border rounded-3xl p-5 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto custom-scroll">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close service modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-full theme-surface-muted flex items-center justify-center theme-text-muted hover:theme-text cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Header */}
        <div className="pr-6 flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl theme-badge-sage border flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[26px]">
              {service.icon}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded theme-badge-sage border">
                {service.statusBadge}
              </span>
            </div>
            <h2 className="text-lg font-bold theme-text leading-snug">
              {service.name}
            </h2>
            <p className="text-xs theme-text-muted mt-0.5">
              {service.description}
            </p>
          </div>
        </div>

        {/* Service Details Body */}
        {service.details && (
          <div className="theme-surface-muted rounded-2xl p-3.5 space-y-2.5 border theme-border text-xs">
            {service.details.location && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider theme-text-dim block">
                  PHYSICAL LOCATION
                </span>
                <span className="font-semibold theme-text mt-0.5 block">
                  {service.details.location}
                </span>
              </div>
            )}

            {service.details.hours && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider theme-text-dim block">
                  OPENING HOURS
                </span>
                <span className="theme-text mt-0.5 block">
                  {service.details.hours}
                </span>
              </div>
            )}

            {service.details.contact && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider theme-text-dim block">
                  CONTACT
                </span>
                <span className="theme-text mt-0.5 block font-mono text-[11px]">
                  {service.details.contact}
                </span>
              </div>
            )}

            {service.details.highlights && service.details.highlights.length > 0 && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider theme-text-dim block mb-1.5">
                  AVAILABLE ACTIONS
                </span>
                <ul className="space-y-1 theme-text-muted">
                  {service.details.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 font-bold leading-none">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          {service.details?.location && !service.details.location.includes('Online') && (
            <button
              onClick={() => {
                onClose();
                onOpenCampusMap(service.details?.location);
              }}
              className="flex-1 py-2.5 px-3 rounded-xl theme-primary-bg theme-primary-text font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">explore</span>
              Find on Floorplan
            </button>
          )}
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl theme-surface theme-border border theme-text font-semibold text-xs hover:opacity-80 active:scale-95 transition-all cursor-pointer text-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
