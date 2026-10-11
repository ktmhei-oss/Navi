import React, { useState } from 'react';
import { CalendarEvent } from '../../types';

interface CalendarViewProps {
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onSelectEvent,
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Lectures' | 'Study Groups' | 'Work' | 'Personal'>('All');
  const [isCalendarExpanded, setIsCalendarExpanded] = useState<boolean>(false);
  const [selectedDayNum, setSelectedDayNum] = useState<number>(18);

  const filterOptions: Array<'All' | 'Lectures' | 'Study Groups' | 'Work' | 'Personal'> = [
    'All',
    'Lectures',
    'Study Groups',
    'Work',
    'Personal',
  ];

  // Helper to determine whether an event matches the filter
  const isEventVisible = (event?: CalendarEvent) => {
    if (!event) return false;
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Lectures' && event.type === 'Lecture') return true;
    if (activeFilter === 'Study Groups' && event.type === 'Study') return true;
    if (activeFilter === 'Work' && event.type === 'Work') return true;
    if (activeFilter === 'Personal' && event.type === 'Personal') return true;
    return false;
  };

  const getEventForCell = (day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri', time: '08:00' | '10:00' | '12:00' | '14:00' | '16:00') => {
    return events.find((e) => e.day === day && e.timeSlot === time);
  };

  const daysInGrid = [
    { num: 28, isPrev: true },
    { num: 29, isPrev: true },
    { num: 30, isPrev: true },
    { num: 31, isPrev: true },
    { num: 1 },
    { num: 2 },
    { num: 3 },
    { num: 4 },
    { num: 5 },
    { num: 6 },
    { num: 7 },
    { num: 8 },
    { num: 9 },
    { num: 10 },
    { num: 11 },
    { num: 12 },
    { num: 13 },
    { num: 14 },
    { num: 15 },
    { num: 16 },
    { num: 17 },
    { num: 18, isWeek46: true },
    { num: 19, isWeek46: true },
    { num: 20, isWeek46: true },
    { num: 21, isWeek46: true },
    { num: 22, isWeek46: true },
    { num: 23 },
    { num: 24 },
    { num: 25 },
    { num: 26 },
    { num: 27 },
    { num: 28 },
    { num: 29 },
    { num: 30 },
    { num: 1, isNext: true },
  ];

  const timeSlots: Array<'08:00' | '10:00' | '12:00' | '14:00' | '16:00'> = [
    '08:00',
    '10:00',
    '12:00',
    '14:00',
    '16:00',
  ];

  const weekDays: Array<{ day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'; num: number }> = [
    { day: 'Mon', num: 18 },
    { day: 'Tue', num: 19 },
    { day: 'Wed', num: 20 },
    { day: 'Thu', num: 21 },
    { day: 'Fri', num: 22 },
  ];

  return (
    <div className="space-y-3.5 animate-fade-in pb-2">
      {/* Current Space Card */}
      <div className="mt-2 theme-surface rounded-2xl p-4 theme-border border shadow-xs transition-colors">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full theme-primary-bg"></span>
          <span className="text-[11px] font-bold uppercase tracking-wider theme-badge-sage px-1.5 py-0.5 rounded border">
            CURRENT SPACE
          </span>
        </div>
        <h1 className="text-3xl font-extrabold theme-text tracking-tight">Calendar</h1>
      </div>

      {/* Filter Tags */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scroll pb-1">
        {filterOptions.map((f) => {
          const isSelected = activeFilter === f;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'theme-primary-bg theme-primary-text shadow-xs'
                  : 'theme-surface theme-border border theme-text hover:opacity-80'
              }`}
            >
              {f}
              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
            </button>
          );
        })}
      </div>

      {/* Collapsible Monthly Calendar */}
      <div className="theme-surface rounded-2xl theme-border border shadow-xs overflow-hidden transition-all duration-200">
        <button
          onClick={() => setIsCalendarExpanded(!isCalendarExpanded)}
          className="w-full p-3.5 flex items-center justify-between hover:opacity-90 transition-opacity text-left cursor-pointer"
          aria-expanded={isCalendarExpanded}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg theme-badge-sage border flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            </div>
            <div>
              <span className="text-sm font-bold theme-text block">November 2024</span>
              <span className="text-[10px] theme-text-muted">Week 46 • Autumn Semester</span>
            </div>
          </div>
          <div className="w-7 h-7 rounded-lg theme-surface-muted flex items-center justify-center theme-text transition-transform duration-200">
            <span className="material-symbols-outlined text-[18px]">
              {isCalendarExpanded ? 'expand_less' : 'expand_more'}
            </span>
          </div>
        </button>

        {/* Collapsible Days Grid */}
        {isCalendarExpanded && (
          <div className="px-3 pb-3 theme-border-t border-t pt-2.5 animate-fade-in">
            <div className="grid grid-cols-7 text-center text-[10px] font-semibold theme-text-dim mb-1.5">
              <span>Mo</span>
              <span>Tu</span>
              <span>We</span>
              <span>Th</span>
              <span>Fr</span>
              <span>Sa</span>
              <span>Su</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
              {daysInGrid.map((day, idx) => {
                const isSelected = !day.isPrev && !day.isNext && day.num === selectedDayNum;
                const isWeekDay = day.isWeek46;

                let classes = 'py-1.5 rounded-lg transition-colors cursor-pointer ';

                if (day.isPrev || day.isNext) {
                  classes += 'theme-text-dim text-[11px] opacity-35 hover:bg-slate-500/10';
                } else if (isSelected) {
                  classes += 'theme-primary-bg theme-primary-text font-bold shadow-xs';
                } else if (isWeekDay) {
                  classes += 'theme-badge-sage font-semibold border';
                } else {
                  classes += 'theme-text hover:bg-slate-500/20';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (!day.isPrev && !day.isNext) {
                        setSelectedDayNum(day.num);
                      }
                    }}
                    className={classes}
                  >
                    {day.num}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Week 46 Schedule Table */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2 px-0.5">
          <h2 className="text-sm font-bold theme-text tracking-tight">Week 46 Schedule</h2>
          <div className="flex items-center gap-1.5 text-[11px] font-medium theme-text-muted">
            <span className="w-2 h-2 rounded-full theme-primary-bg animate-pulse"></span>
            <span>Nov 18 – 22</span>
          </div>
        </div>

        {/* Schedule Grid Container */}
        <div className="theme-surface rounded-2xl theme-border border shadow-xs overflow-hidden text-center text-xs">
          {/* Header Row */}
          <div className="grid grid-cols-6 theme-border-b border-b theme-table-header font-semibold theme-text-muted divide-x theme-divide">
            <div className="py-2.5 px-1 text-[10px] uppercase tracking-wider theme-text-dim flex items-center justify-center font-mono">
              TIME
            </div>
            {weekDays.map((wd) => {
              const isToday = wd.day === 'Mon';
              return (
                <div
                  key={wd.day}
                  className={`py-2 px-0.5 ${
                    isToday ? 'theme-badge-sage' : 'theme-text'
                  }`}
                >
                  <span className="block text-[11px] font-bold leading-tight">{wd.day}</span>
                  <span className="block text-[10px] font-normal leading-tight">{wd.num}</span>
                </div>
              );
            })}
          </div>

          {/* Time Slots Rows */}
          {timeSlots.map((time, rowIdx) => {
            return (
              <div
                key={time}
                className={`grid grid-cols-6 divide-x theme-divide min-h-[48px] ${
                  rowIdx < timeSlots.length - 1 ? 'theme-border-b border-b' : ''
                }`}
              >
                {/* Time Label */}
                <div className="p-1 text-[10px] font-mono theme-text-dim flex items-center justify-center theme-table-header shrink-0">
                  {time}
                </div>

                {/* Day Columns */}
                {weekDays.map((wd) => {
                  const ev = getEventForCell(wd.day, time);
                  const visible = ev && isEventVisible(ev);

                  return (
                    <div
                      key={wd.day}
                      className="p-1 flex items-center justify-center min-w-0"
                    >
                      {ev && visible ? (
                        <button
                          type="button"
                          onClick={() => onSelectEvent(ev)}
                          title={`${ev.code}: ${ev.title} (${ev.type})`}
                          className={`w-full py-1.5 px-0.5 rounded-md text-[9px] font-mono font-semibold leading-tight truncate transition-transform hover:scale-105 active:scale-95 cursor-pointer border ${
                            ev.type === 'Lecture'
                              ? 'theme-badge-sage'
                              : ev.type === 'Study'
                              ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                              : ev.type === 'Work'
                              ? 'theme-badge-periwinkle'
                              : 'theme-surface-muted theme-border theme-text'
                          }`}
                        >
                          {ev.code}
                        </button>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Color Legend */}
        <div className="mt-3 flex items-center justify-around px-2 py-2.5 theme-surface rounded-xl theme-border border text-[11px] font-medium shadow-2xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full theme-primary-bg"></span>
            <span className="theme-text font-medium text-[10px] sm:text-[11px]">Lecture</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="theme-text font-medium text-[10px] sm:text-[11px]">Study</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
            <span className="theme-text font-medium text-[10px] sm:text-[11px]">Work</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-500"></span>
            <span className="theme-text font-medium text-[10px] sm:text-[11px]">Personal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
