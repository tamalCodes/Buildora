import React from "react";
import type { SettingsSidebarProps } from "../constants/interfaces";

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  items,
  activeId,
  onSelect,
  onLogout,
}) => {
  return (
    <aside className="hidden w-full max-w-[240px] flex-col rounded-[2rem] border border-white/10 bg-white/5 px-4 py-6 lg:flex">
      <p className="px-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
        Settings
      </p>
      <nav className="mt-6 flex flex-col gap-1">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-500/15 text-indigo-200"
                  : "text-slate-400 hover:bg-white/5"
              }`}
              onClick={() => onSelect(item.id)}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-xl border ${
                  isActive
                    ? "border-indigo-500/40 bg-indigo-500/20 text-indigo-200"
                    : "border-white/10 bg-white/5 text-slate-400"
                }`}
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto pt-6">
        <button
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-300"
          onClick={onLogout}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-300">
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </span>
          Log out
        </button>
      </div>
    </aside>
  );
};

export default SettingsSidebar;
