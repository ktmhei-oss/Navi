import React from 'react';
import { NotificationItem } from '../../types';

interface NotificationModalProps {
  notification: NotificationItem | null;
  onClose: () => void;
  onToggleRead: (id: string) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  notification,
  onClose,
  onToggleRead,
}) => {
  if (!notification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm theme-surface theme-border border rounded-3xl p-5 shadow-2xl relative space-y-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close notification"
          className="absolute top-4 right-4 w-8 h-8 rounded-full theme-surface-muted flex items-center justify-center theme-text-muted hover:theme-text cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Header */}
        <div className="pr-6 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl theme-badge-sage border flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">
              {notification.icon}
            </span>
          </div>
          <div>
            <span className="text-[10px] theme-text-dim block mb-0.5">
              Received {notification.timeAgo} ({notification.timestamp})
            </span>
            <h2 className="text-sm font-bold theme-text leading-tight">
              {notification.title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="theme-surface-muted rounded-2xl p-3.5 theme-border border text-xs leading-relaxed theme-text">
          {notification.description}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => {
              onToggleRead(notification.id);
              onClose();
            }}
            className="flex-1 py-2.5 px-3 rounded-xl theme-primary-bg theme-primary-text font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            {notification.unread ? 'Mark as Read' : 'Keep Unread'}
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
