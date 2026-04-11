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
        className={`group flex w-full flex-nowrap items-center gap-3 rounded-2xl border border-(--border-default) bg-(--bg-input) px-4 py-2.5 text-left text-xs text-(--text-secondary) transition hover:border-(--border-hover) hover:text-(--text-heading) ${buttonClassName}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <svg
          className="h-4 w-4 text-(--text-tertiary) group-hover:text-(--text-heading)"
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
        <span className="min-w-0 flex-1 truncate text-(--text-secondary) group-hover:text-(--text-heading)">
          Type to begin search, or use the global shortcut
        </span>
        {showShortcut ? (
          <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-(--text-secondary)">
            <span className="rounded-lg border border-(--border-hover) bg-(--bg-input) px-2 py-1 text-(--text-primary)">
              Ctrl
            </span>
            <span className="rounded-lg border border-(--border-hover) bg-(--bg-input) px-2 py-1 text-(--text-primary)">
              K
            </span>
          </span>
        ) : null}
      </button>
    </>
  );
};

export default GlobalSearchBar;
