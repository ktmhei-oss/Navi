/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ThemeMode,
  ScreenType,
  AgendaItem,
  NotificationItem,
  ServiceItem,
  CalendarEvent,
  StudentTask,
} from './types';
import {
  INITIAL_AGENDA,
  INITIAL_NOTIFICATIONS,
  DIRECTORY_SERVICES,
  SCHEDULE_EVENTS,
  INITIAL_TASKS,
} from './data/mockData';
import { GlobalHeader } from './components/GlobalHeader';
import { BottomNav } from './components/BottomNav';
import { LobbyView } from './components/views/LobbyView';
import { FloorplanView } from './components/views/FloorplanView';
import { CalendarView } from './components/views/CalendarView';
import { AgendaDetailModal } from './components/modals/AgendaDetailModal';
import { CampusMapModal } from './components/modals/CampusMapModal';
import { CafeteriaModal } from './components/modals/CafeteriaModal';
import { TasksModal } from './components/modals/TasksModal';
import { StudentProfileModal } from './components/modals/StudentProfileModal';
import { ServiceDetailModal } from './components/modals/ServiceDetailModal';
import { NotificationModal } from './components/modals/NotificationModal';
import { HelpModal } from './components/modals/HelpModal';
import { LogoutModal } from './components/modals/LogoutModal';

export default function App() {
  // Navigation History Stack
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('lobby');
  const [historyStack, setHistoryStack] = useState<ScreenType[]>(['lobby']);

  // Theme Mode: light | dark | contrast
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // App Data State
  const [agenda] = useState<AgendaItem[]>(INITIAL_AGENDA);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [services] = useState<ServiceItem[]>(DIRECTORY_SERVICES);
  const [events] = useState<CalendarEvent[]>(SCHEDULE_EVENTS);
  const [tasks, setTasks] = useState<StudentTask[]>(INITIAL_TASKS);

  // Modal States
  const [selectedAgenda, setSelectedAgenda] = useState<AgendaItem | CalendarEvent | null>(null);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isCampusMapOpen, setIsCampusMapOpen] = useState<boolean>(false);
  const [targetMapRoom, setTargetMapRoom] = useState<string | undefined>(undefined);
  const [isCafeteriaOpen, setIsCafeteriaOpen] = useState<boolean>(false);
  const [isTasksOpen, setIsTasksOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState<boolean>(false);

  // Apply theme to body
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  // Update page title corresponding to the active screen
  useEffect(() => {
    const titles: Record<ScreenType, string> = {
      lobby: 'Lobby – Navi',
      floorplan: 'Floorplan – Navi',
      calendar: 'Calendar – Navi',
    };
    document.title = titles[currentScreen] || 'Navi - Digital services navigator';
  }, [currentScreen]);

  // Toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 1800);
  };

  const cycleTheme = () => {
    const cycle: ThemeMode[] = ['light', 'dark', 'contrast'];
    const nextIndex = (cycle.indexOf(theme) + 1) % cycle.length;
    const nextTheme = cycle[nextIndex];
    setTheme(nextTheme);

    const labels: Record<ThemeMode, string> = {
      light: 'Light Mode',
      dark: 'Dark Mode',
      contrast: 'Enhanced Contrast (AAA)',
    };
    showToast(labels[nextTheme]);
  };

  // Navigation handlers
  const navigateTo = (targetScreen: ScreenType) => {
    if (targetScreen !== currentScreen) {
      setHistoryStack((prev) => [...prev, targetScreen]);
      setCurrentScreen(targetScreen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    if (historyStack.length > 1) {
      const nextStack = [...historyStack];
      nextStack.pop();
      const prevScreen = nextStack[nextStack.length - 1];
      setHistoryStack(nextStack);
      setCurrentScreen(prevScreen);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentScreen('lobby');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Task toggler
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  // Notification read toggler
  const handleToggleNotificationRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, unread: !n.unread } : n))
    );
  };

  const unreadTasksCount = tasks.filter((t) => !t.completed).length;

  // Render content of active screen
  const renderScreenContent = (screen: ScreenType) => {
    switch (screen) {
      case 'lobby':
        return (
          <LobbyView
            agenda={agenda}
            notifications={notifications}
            onSelectAgenda={(item) => setSelectedAgenda(item)}
            onSelectNotification={(notif) => setSelectedNotification(notif)}
            onNavigateToCalendar={() => navigateTo('calendar')}
          />
        );
      case 'floorplan':
        return (
          <FloorplanView
            services={services}
            onNavigateToCalendar={() => navigateTo('calendar')}
            onOpenServiceModal={(srv) => setSelectedService(srv)}
            onOpenCampusMap={() => {
              setTargetMapRoom(undefined);
              setIsCampusMapOpen(true);
            }}
            onOpenCafeteria={() => setIsCafeteriaOpen(true)}
          />
        );
      case 'calendar':
        return (
          <CalendarView
            events={events}
            onSelectEvent={(ev) => setSelectedAgenda(ev)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen theme-app-bg text-brand-charcoal flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950 transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-18 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 flex items-center gap-2 px-4 py-2 rounded-full shadow-lg border text-xs font-semibold theme-surface theme-border theme-text">
          <span className="material-symbols-outlined text-[16px] text-amber-500">
            brightness_medium
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Persistent Global Application Header */}
      <GlobalHeader
        theme={theme}
        onNavigateHome={() => navigateTo('lobby')}
        onCycleTheme={cycleTheme}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Cohesive Application Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-5 transition-colors duration-200">
        {renderScreenContent(currentScreen)}
      </main>

      {/* Contextual Bottom Quick Navigation */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        onGoBack={goBack}
        onOpenTasks={() => setIsTasksOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onLogout={() => setIsLogoutOpen(true)}
        unreadTasksCount={unreadTasksCount}
      />

      {/* MODALS */}
      {selectedAgenda && (
        <AgendaDetailModal
          item={selectedAgenda}
          onClose={() => setSelectedAgenda(null)}
          onOpenCampusMap={(target) => {
            setTargetMapRoom(target);
            setIsCampusMapOpen(true);
          }}
        />
      )}

      {isCampusMapOpen && (
        <CampusMapModal
          initialRoom={targetMapRoom}
          onClose={() => setIsCampusMapOpen(false)}
        />
      )}

      {isCafeteriaOpen && (
        <CafeteriaModal
          onClose={() => setIsCafeteriaOpen(false)}
          onOpenCampusMap={() => {
            setIsCafeteriaOpen(false);
            setTargetMapRoom('Cafeteria');
            setIsCampusMapOpen(true);
          }}
        />
      )}

      {isTasksOpen && (
        <TasksModal
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onClose={() => setIsTasksOpen(false)}
        />
      )}

      {isProfileOpen && (
        <StudentProfileModal
          onClose={() => setIsProfileOpen(false)}
          onLogout={() => {
            setIsProfileOpen(false);
            setIsLogoutOpen(true);
          }}
        />
      )}

      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onOpenCampusMap={(loc) => {
            setSelectedService(null);
            setTargetMapRoom(loc);
            setIsCampusMapOpen(true);
          }}
        />
      )}

      {selectedNotification && (
        <NotificationModal
          notification={selectedNotification}
          onClose={() => setSelectedNotification(null)}
          onToggleRead={handleToggleNotificationRead}
        />
      )}

      {isHelpOpen && (
        <HelpModal
          onClose={() => setIsHelpOpen(false)}
          onNavigateToFloorplan={() => {
            setIsHelpOpen(false);
            navigateTo('floorplan');
          }}
        />
      )}

      {isLogoutOpen && (
        <LogoutModal
          onClose={() => setIsLogoutOpen(false)}
          onConfirm={() => {
            setIsLogoutOpen(false);
            showToast('Signed out of student portal');
            navigateTo('lobby');
          }}
        />
      )}
    </div>
  );
}
