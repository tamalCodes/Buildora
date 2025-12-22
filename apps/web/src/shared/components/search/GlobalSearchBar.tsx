import React from "react";
import { useSearchOverlay } from "./SearchOverlayContext";

type GlobalSearchBarProps = {
  className?: string;
  buttonClassName?: string;
  showShortcut?: boolean;
};

const GlobalSearchBar: React.FC<GlobalSearchBarProps> = ({
  className = "",
  buttonClassName = "",
  showShortcut = true,
}) => {
  const { openSearch, isOpen } = useSearchOverlay();

  return (
    <>
      <button
        type="button"
        onClick={openSearch}
        className={`group flex w-full flex-nowrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-left text-xs text-slate-400 transition hover:border-white/20 hover:text-white ${buttonClassName}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <svg
          className="h-4 w-4 text-slate-500 group-hover:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="min-w-0 flex-1 truncate text-slate-400 group-hover:text-white">
          Type to begin search, or use the global shortcut
        </span>
        {showShortcut ? (
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <span className="rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-slate-200">
              Ctrl
            </span>
            <span className="rounded-lg border border-white/20 bg-white/10 px-2 py-1 text-slate-200">
              K
            </span>
          </span>
        ) : null}
      </button>
    </>
  );
};

export default GlobalSearchBar;
