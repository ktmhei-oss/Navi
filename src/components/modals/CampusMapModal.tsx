import React, { useState } from 'react';

interface CampusMapModalProps {
  initialRoom?: string;
  onClose: () => void;
}

export const CampusMapModal: React.FC<CampusMapModalProps> = ({
  initialRoom,
  onClose,
}) => {
  const [selectedFloor, setSelectedFloor] = useState<number>(() => {
    if (initialRoom && initialRoom.includes('304')) return 3;
    if (initialRoom && (initialRoom.includes('Hall 2') || initialRoom.includes('East Wing'))) return 2;
    if (initialRoom && initialRoom.includes('Library')) return 1;
    return 0; // Ground floor by default
  });

  const floors = [
    { level: 0, label: 'Ground Floor', tag: 'Lobby & Dining' },
    { level: 1, label: 'Floor 1', tag: 'Library & Guidance' },
    { level: 2, label: 'Floor 2', tag: 'Labs & Hall 2' },
    { level: 3, label: 'Floor 3', tag: 'Room 304 & Hall A' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-md theme-surface theme-border border rounded-3xl p-5 shadow-2xl relative space-y-4 max-h-[92vh] overflow-y-auto custom-scroll">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close campus map"
          className="absolute top-4 right-4 w-8 h-8 rounded-full theme-surface-muted flex items-center justify-center theme-text-muted hover:theme-text cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Header */}
        <div className="pr-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full theme-primary-bg animate-pulse"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider theme-badge-sage px-1.5 py-0.5 rounded border">
              PASILA MAIN CAMPUS
            </span>
          </div>
          <h2 className="text-xl font-extrabold theme-text tracking-tight">
            Campus Wayfinding
          </h2>
          <p className="text-xs theme-text-muted mt-0.5">
            Indoor navigation & spatial route finder
          </p>
        </div>

        {/* Floor Selector Tabs */}
        <div className="grid grid-cols-4 gap-1.5 p-1 theme-surface-muted rounded-xl border theme-border">
          {floors.map((fl) => {
            const isSelected = selectedFloor === fl.level;
            return (
              <button
                key={fl.level}
                onClick={() => setSelectedFloor(fl.level)}
                className={`py-1.5 px-1 rounded-lg text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'theme-primary-bg theme-primary-text font-bold shadow-xs'
                    : 'theme-text hover:opacity-80'
                }`}
              >
                <span className="block text-[11px] font-bold">
                  {fl.level === 0 ? 'G Floor' : `Floor ${fl.level}`}
                </span>
                <span className="block text-[9px] opacity-75 truncate">{fl.tag.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Floor SVG Visualizer */}
        <div className="theme-surface-muted rounded-2xl p-3 border theme-border relative overflow-hidden flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-[11px] font-semibold theme-text-muted mb-2 px-1">
            <span>Level {selectedFloor === 0 ? 'G (Ground Atrium)' : selectedFloor}</span>
            <span className="text-[10px] theme-badge-sage px-2 py-0.5 rounded border">
              Step-Free Access
            </span>
          </div>

          <svg
            viewBox="0 0 360 220"
            className="w-full h-auto bg-slate-100/50 dark:bg-slate-900/60 rounded-xl border border-slate-300 dark:border-slate-800"
          >
            {/* Base Campus Blueprint Outline */}
            <rect x="20" y="20" width="320" height="180" rx="12" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400 dark:text-slate-600" />
            
            {/* Central Atrium Area */}
            <rect x="130" y="50" width="100" height="120" rx="6" fill="rgba(27, 67, 50, 0.08)" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" className="text-emerald-600" />
            <text x="180" y="115" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">
              Central Atrium
            </text>

            {/* Elevators and Stairwells */}
            <g>
              <rect x="140" y="25" width="35" height="20" rx="3" fill="#cbd5e1" />
              <text x="157" y="38" textAnchor="middle" className="text-[8px] font-bold fill-slate-900">Elevator A</text>
              <rect x="185" y="25" width="35" height="20" rx="3" fill="#cbd5e1" />
              <text x="202" y="38" textAnchor="middle" className="text-[8px] font-bold fill-slate-900">Elevator B</text>
            </g>

            {/* Ground Floor Rooms */}
            {selectedFloor === 0 && (
              <>
                {/* Lobby Point */}
                <rect x="145" y="140" width="70" height="50" rx="6" fill="#1b4332" />
                <text x="180" y="165" textAnchor="middle" className="text-[10px] font-bold fill-white">Lobby</text>
                <text x="180" y="177" textAnchor="middle" className="text-[8px] fill-emerald-200">You Are Here</text>

                {/* Cafeteria Wing */}
                <rect x="30" y="50" width="90" height="130" rx="6" fill="#e8f0ec" stroke="#2d6a4f" strokeWidth="1" />
                <text x="75" y="105" textAnchor="middle" className="text-[10px] font-bold fill-emerald-950">Cafeteria</text>
                <text x="75" y="120" textAnchor="middle" className="text-[8px] fill-emerald-800">Lunch 10:30-14:30</text>

                {/* Student Union */}
                <rect x="240" y="50" width="90" height="130" rx="6" fill="#eef2ff" stroke="#6366f1" strokeWidth="1" />
                <text x="285" y="105" textAnchor="middle" className="text-[10px] font-bold fill-indigo-950">Student Union</text>
                <text x="285" y="120" textAnchor="middle" className="text-[8px] fill-indigo-700">Lounge & Helpdesk</text>
              </>
            )}

            {/* Floor 1 */}
            {selectedFloor === 1 && (
              <>
                <rect x="30" y="35" width="90" height="150" rx="6" fill="#e8f0ec" stroke="#2d6a4f" strokeWidth="1" />
                <text x="75" y="105" textAnchor="middle" className="text-[10px] font-bold fill-emerald-950">Library</text>
                <text x="75" y="120" textAnchor="middle" className="text-[8px] fill-emerald-800">Circulation & Quiet</text>

                <rect x="240" y="35" width="90" height="70" rx="6" fill="#eef2ff" stroke="#6366f1" strokeWidth="1" />
                <text x="285" y="65" textAnchor="middle" className="text-[10px] font-bold fill-indigo-950">Health (YTHS)</text>
                <text x="285" y="80" textAnchor="middle" className="text-[8px] fill-indigo-700">Door H12</text>

                <rect x="240" y="115" width="90" height="70" rx="6" fill="#f1f5f9" stroke="#595959" strokeWidth="1" />
                <text x="285" y="145" textAnchor="middle" className="text-[10px] font-bold fill-slate-900">Student Services</text>
                <text x="285" y="160" textAnchor="middle" className="text-[8px] fill-slate-600">Guidance Desk</text>
              </>
            )}

            {/* Floor 2 */}
            {selectedFloor === 2 && (
              <>
                <rect x="30" y="35" width="90" height="150" rx="6" fill="#e8f0ec" stroke="#2d6a4f" strokeWidth="1" />
                <text x="75" y="105" textAnchor="middle" className="text-[10px] font-bold fill-emerald-950">Computer Labs</text>
                <text x="75" y="120" textAnchor="middle" className="text-[8px] fill-emerald-800">Labs 1 – 4</text>

                <rect x="240" y="35" width="90" height="150" rx="6" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.5" />
                <text x="285" y="105" textAnchor="middle" className="text-[10px] font-bold fill-indigo-950">Hall 2</text>
                <text x="285" y="120" textAnchor="middle" className="text-[8px] fill-indigo-700 font-bold">East Wing</text>
              </>
            )}

            {/* Floor 3 */}
            {selectedFloor === 3 && (
              <>
                <rect x="30" y="35" width="90" height="70" rx="6" fill="#1b4332" stroke="#2d6a4f" strokeWidth="2" />
                <text x="75" y="65" textAnchor="middle" className="text-[10px] font-bold fill-white">Room 304</text>
                <text x="75" y="80" textAnchor="middle" className="text-[8px] fill-emerald-200 font-bold">SWD4TF021 Target</text>

                <rect x="30" y="115" width="90" height="70" rx="6" fill="#e8f0ec" stroke="#2d6a4f" strokeWidth="1" />
                <text x="75" y="145" textAnchor="middle" className="text-[10px] font-bold fill-emerald-950">Hall A</text>
                <text x="75" y="160" textAnchor="middle" className="text-[8px] fill-emerald-800">Lecture Hall</text>

                <rect x="240" y="35" width="90" height="150" rx="6" fill="#f1f5f9" stroke="#595959" strokeWidth="1" />
                <text x="285" y="105" textAnchor="middle" className="text-[10px] font-bold fill-slate-900">Faculty Offices</text>
                <text x="285" y="120" textAnchor="middle" className="text-[8px] fill-slate-600">Software Dept.</text>
              </>
            )}
          </svg>
        </div>

        {/* Step-by-Step Wayfinding Guide */}
        <div className="theme-surface-muted rounded-2xl p-3.5 space-y-2 border theme-border text-xs">
          <div className="font-bold theme-text flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-emerald-600">directions_walk</span>
            Directions to Room 304 (Hall A):
          </div>
          <ol className="list-decimal pl-4 space-y-1.5 theme-text-muted">
            <li>From current spot in <strong>Lobby</strong>, head north toward Central Atrium.</li>
            <li>Take <strong>Elevator A</strong> or the North Stairwell to <strong>Floor 3</strong>.</li>
            <li>Turn right into <strong>Wing A corridor</strong>.</li>
            <li><strong>Room 304</strong> is the second door on your left, across from Hall A.</li>
          </ol>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl theme-primary-bg theme-primary-text font-bold text-xs shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          Close Map
        </button>
      </div>
    </div>
  );
};
