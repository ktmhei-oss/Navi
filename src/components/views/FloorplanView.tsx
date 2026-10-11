import React, { useState, useMemo } from 'react';
import { ServiceItem, ScreenType } from '../../types';

interface FloorplanViewProps {
  services: ServiceItem[];
  onNavigateToCalendar: () => void;
  onOpenServiceModal: (service: ServiceItem) => void;
  onOpenCampusMap: () => void;
  onOpenCafeteria: () => void;
}

export const FloorplanView: React.FC<FloorplanViewProps> = ({
  services,
  onNavigateToCalendar,
  onOpenServiceModal,
  onOpenCampusMap,
  onOpenCafeteria,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All Services', 'Academic', 'Administrative', 'Campus'];

  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      const matchesSearch =
        srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.statusBadge.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat =
        activeCategory === 'All' ||
        activeCategory === 'All Services' ||
        srv.category.toLowerCase() === activeCategory.toLowerCase();

      return matchesSearch && matchesCat;
    });
  }, [services, searchQuery, activeCategory]);

  const handleServiceClick = (srv: ServiceItem) => {
    if (srv.id === 'srv-calendar' || srv.linkScreen === 'calendar') {
      onNavigateToCalendar();
    } else if (srv.id === 'srv-map') {
      onOpenCampusMap();
    } else if (srv.id === 'srv-cafeteria') {
      onOpenCafeteria();
    } else {
      onOpenServiceModal(srv);
    }
  };

  return (
    <div className="space-y-4 animate-fade-in pb-2">
      {/* Current Space Card */}
      <div className="mt-2 theme-surface rounded-2xl p-4 theme-border border shadow-xs transition-colors">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full theme-primary-bg"></span>
          <span className="text-[11px] font-bold uppercase tracking-wider theme-badge-sage px-1.5 py-0.5 rounded border">
            CURRENT SPACE
          </span>
        </div>
        <h1 className="text-3xl font-extrabold theme-text tracking-tight">Floorplan</h1>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <span className="material-symbols-outlined text-[20px] theme-text-dim absolute left-3.5 top-1/2 -translate-y-1/2">
          search
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search destination, room, or service..."
          className="w-full pl-10 pr-9 py-2.5 text-xs font-medium theme-input rounded-xl theme-border border theme-text focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs p-1 cursor-pointer"
            title="Clear search"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto custom-scroll pb-1">
        {categories.map((cat) => {
          const isSelected =
            (cat === 'All Services' && (activeCategory === 'All' || activeCategory === 'All Services')) ||
            activeCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat === 'All Services' ? 'All' : cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'theme-primary-bg theme-primary-text shadow-xs'
                  : 'theme-surface theme-border border theme-text hover:opacity-80'
              }`}
            >
              {cat}
              {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
            </button>
          );
        })}
      </div>

      {/* Directory Service Cards List */}
      <div className="space-y-2.5">
        {filteredServices.length === 0 ? (
          <div className="theme-surface rounded-2xl p-6 theme-border border text-center space-y-2">
            <span className="material-symbols-outlined text-3xl theme-text-dim">search_off</span>
            <p className="text-sm font-semibold theme-text">No services found</p>
            <p className="text-xs theme-text-muted">No campus services matched "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-2 text-xs font-bold theme-primary-bg theme-primary-text px-3 py-1.5 rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredServices.map((srv) => {
            const isCalendar = srv.id === 'srv-calendar';
            const isPeriwinkle = srv.iconBgType === 'periwinkle';
            const isSage = srv.iconBgType === 'sage';

            return (
              <div
                key={srv.id}
                onClick={() => handleServiceClick(srv)}
                className={`theme-surface rounded-2xl p-3.5 theme-border border shadow-xs flex items-center justify-between cursor-pointer hover:shadow-md transition-all active:scale-[0.99] group ${
                  isCalendar
                    ? 'hover:border-indigo-400 dark:hover:border-indigo-400'
                    : 'hover:border-emerald-500/50'
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleServiceClick(srv)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Service Icon */}
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${
                      isPeriwinkle
                        ? 'theme-badge-periwinkle'
                        : isSage
                        ? 'theme-badge-sage'
                        : 'theme-surface-muted theme-text theme-border'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {srv.icon}
                    </span>
                  </div>

                  {/* Service Text */}
                  <div className="min-w-0">
                    <h3
                      className={`text-sm font-bold theme-text transition-colors truncate ${
                        isCalendar ? 'group-hover:text-indigo-400' : 'group-hover:text-emerald-700 dark:group-hover:text-emerald-400'
                      }`}
                    >
                      {srv.name}
                    </h3>
                    <p className="text-xs theme-text-muted truncate">
                      {srv.description}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded theme-badge-sage border">
                      {srv.statusBadge}
                    </span>
                  </div>
                </div>

                {/* Forward Arrow */}
                <div
                  className={`w-9 h-9 rounded-xl theme-surface-muted theme-border border flex items-center justify-center theme-text transition-colors shrink-0 ml-2 ${
                    isCalendar
                      ? 'group-hover:bg-indigo-600 group-hover:text-white'
                      : 'group-hover:bg-emerald-700 group-hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
