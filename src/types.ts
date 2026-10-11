export type ThemeMode = 'light' | 'dark' | 'contrast';
export type ScreenType = 'lobby' | 'floorplan' | 'calendar';
export type DisplayMode = 'phone' | 'expanded' | 'multiscreen';

export interface NotificationItem {
  id: string;
  title: string;
  timeAgo: string;
  description: string;
  icon: string;
  iconType: 'sage' | 'neutral' | 'periwinkle';
  unread: boolean;
  timestamp: string;
}

export interface AgendaItem {
  id: string;
  time: string;
  period: string;
  code: string;
  title: string;
  location: string;
  badgeType: 'sage' | 'periwinkle' | 'neutral';
  isDueNotice?: boolean;
  dueTag?: string;
  subtext?: string;
  lecturer?: string;
  roomDirections?: string;
  credits?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  statusBadge: string;
  badgeType: 'sage' | 'periwinkle' | 'neutral';
  icon: string;
  iconBgType: 'sage' | 'periwinkle' | 'neutral';
  category: 'Academic' | 'Administrative' | 'Campus';
  linkScreen?: ScreenType;
  details?: {
    location?: string;
    hours?: string;
    contact?: string;
    highlights?: string[];
  };
}

export interface CalendarEvent {
  id: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  dayNum: number;
  timeSlot: '08:00' | '10:00' | '12:00' | '14:00' | '16:00';
  code: string;
  title: string;
  type: 'Lecture' | 'Study' | 'Work' | 'Personal';
  room?: string;
  instructor?: string;
  notes?: string;
}

export interface StudentTask {
  id: string;
  title: string;
  course: string;
  dueText: string;
  isUrgent: boolean;
  completed: boolean;
}

export interface StudentProfile {
  studentId: string;
  programme: string;
  faculty: string;
  campus: string;
  creditsCompleted: number;
  creditsRequired: number;
  gpa: number;
  academicYear: string;
}
