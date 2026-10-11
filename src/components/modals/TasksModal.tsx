import React from 'react';
import { StudentTask } from '../../types';

interface TasksModalProps {
  tasks: StudentTask[];
  onToggleTask: (taskId: string) => void;
  onClose: () => void;
}

export const TasksModal: React.FC<TasksModalProps> = ({
  tasks,
  onToggleTask,
  onClose,
}) => {
  const pendingCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm theme-surface theme-border border rounded-3xl p-5 shadow-2xl relative space-y-4 max-h-[90vh] overflow-y-auto custom-scroll">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close tasks dialog"
          className="absolute top-4 right-4 w-8 h-8 rounded-full theme-surface-muted flex items-center justify-center theme-text-muted hover:theme-text cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Header */}
        <div className="pr-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full theme-primary-bg animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider theme-badge-sage px-1.5 py-0.5 rounded border">
              DEADLINES & TASKS
            </span>
          </div>
          <h2 className="text-xl font-extrabold theme-text tracking-tight">
            Upcoming Deadlines
          </h2>
          <p className="text-xs theme-text-muted mt-0.5">
            {pendingCount > 0 ? `${pendingCount} actionable items remaining` : 'All tasks completed!'}
          </p>
        </div>

        {/* Task List */}
        <div className="space-y-2.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => onToggleTask(task.id)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                task.completed
                  ? 'theme-surface-muted theme-border opacity-60'
                  : 'theme-surface theme-border shadow-xs hover:border-emerald-500/50'
              }`}
            >
              <div className="pt-0.5">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleTask(task.id)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3
                    className={`text-xs font-bold theme-text ${
                      task.completed ? 'line-through text-slate-400' : ''
                    }`}
                  >
                    {task.title}
                  </h3>
                  {task.isUrgent && !task.completed && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 shrink-0 border border-amber-300 dark:border-amber-800">
                      Urgent
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 text-[11px] theme-text-muted">
                  <span className="truncate">{task.course}</span>
                  <span>•</span>
                  <span className="font-medium shrink-0 font-mono text-[10px]">{task.dueText}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl theme-primary-bg theme-primary-text font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          Done
        </button>
      </div>
    </div>
  );
};
