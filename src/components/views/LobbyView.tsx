import React from 'react';
import { AgendaItem, NotificationItem } from '../../types';

interface LobbyViewProps {
  agenda: AgendaItem[];
  notifications: NotificationItem[];
  onSelectAgenda: (item: AgendaItem) => void;
  onSelectNotification: (notif: NotificationItem) => void;
  onNavigateToCalendar: () => void;
}

export const LobbyView: React.FC<LobbyViewProps> = ({
  agenda,
  notifications,
  onSelectAgenda,
  onSelectNotification,
  onNavigateToCalendar,
}) => {
  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Current Space Card */}
      <div className="mt-2 theme-surface rounded-2xl p-4 theme-border border shadow-xs transition-colors">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full theme-primary-bg animate-pulse"></span>
          <span className="text-[11px] font-bold uppercase tracking-wider theme-badge-sage px-1.5 py-0.5 rounded border">
            CURRENT SPACE
          </span>
        </div>
        <h1 className="text-3xl font-extrabold theme-text tracking-tight">Lobby</h1>
      </div>

      {/* Daily Agenda Section */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <h2 className="text-base font-bold theme-text tracking-tight">Daily agenda</h2>
          <button
            onClick={onNavigateToCalendar}
            className="text-xs font-medium theme-text-muted hover:theme-text transition-colors cursor-pointer flex items-center gap-1"
            title="View Full Week 46 Calendar"
          >
            Today
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {agenda.map((item) => {
            const isSage = item.badgeType === 'sage';
            const isPeriwinkle = item.badgeType === 'periwinkle';
            const isNeutral = item.badgeType === 'neutral';

            return (
              <div
                key={item.id}
                onClick={() => onSelectAgenda(item)}
                className="theme-surface rounded-2xl p-3.5 theme-border border shadow-xs flex items-start gap-3 cursor-pointer hover:shadow-md hover:border-slate-400 dark:hover:border-slate-600 transition-all active:scale-[0.99] group"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectAgenda(item)}
              >
                {/* Time Badge */}
                <div
                  className={`px-2.5 py-1.5 rounded-xl border text-center shrink-0 min-w-[54px] ${
                    isSage
                      ? 'theme-badge-sage'
                      : isPeriwinkle
                      ? 'theme-badge-periwinkle'
                      : 'theme-surface-muted theme-border theme-text'
                  }`}
                >
                  <span className="block text-[11px] font-bold leading-none font-mono">
                    {item.time}
                  </span>
                  <span
                    className={`block text-[9px] font-medium mt-0.5 leading-none ${
                      isNeutral ? 'theme-text-muted uppercase text-[8px]' : ''
                    }`}
                  >
                    {item.period}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-sm font-bold theme-text truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {item.title}
                    </h3>
                    {item.dueTag && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md theme-badge-sage shrink-0 border">
                        {item.dueTag}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 mt-1 text-xs theme-text-muted">
                    {!item.isDueNotice ? (
                      <>
                        <span className="material-symbols-outlined text-[14px] text-emerald-600 dark:text-emerald-400 shrink-0">
                          location_on
                        </span>
                        <span className="truncate">{item.location}</span>
                      </>
                    ) : (
                      <span className="truncate">{item.subtext || item.location}</span>
                    )}
                  </div>
                </div>

                <div className="self-center theme-text-dim group-hover:theme-text transition-colors">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Important Notifications Section */}
      <div>
        <div className="flex items-center justify-between mb-2.5 px-0.5">
          <h2 className="text-base font-bold theme-text tracking-tight">Important notifications</h2>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full theme-surface-muted theme-text-muted theme-border border">
            {unreadCount > 0 ? `${unreadCount} Unread` : 'All Caught Up'}
          </span>
        </div>

        <div className="space-y-2.5">
          {notifications.map((notif) => {
            const isSage = notif.iconType === 'sage';

            return (
              <div
                key={notif.id}
                onClick={() => onSelectNotification(notif)}
                className={`theme-surface rounded-2xl p-3.5 theme-border border shadow-xs flex items-start gap-3 cursor-pointer hover:shadow-md transition-all active:scale-[0.99] group ${
                  notif.unread ? 'ring-1 ring-emerald-500/30' : 'opacity-85'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onSelectNotification(notif)}
              >
                {/* Icon box */}
                <div
                  className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 ${
                    isSage
                      ? 'theme-badge-sage'
                      : 'theme-surface-muted theme-text theme-border'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {notif.icon}
                  </span>
                </div>

                {/* Notice text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="text-xs font-bold theme-text truncate group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {notif.title}
                    </h3>
                    <span className="text-[10px] theme-text-dim shrink-0">
                      {notif.timeAgo}
                    </span>
                  </div>
                  <p className="text-xs theme-text-muted mt-0.5 leading-relaxed line-clamp-2">
                    {notif.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
