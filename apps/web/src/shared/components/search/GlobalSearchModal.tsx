import React, { useEffect, useRef } from "react";
import {
  SEARCH_CATEGORIES,
  SEARCH_COMMANDS,
  SEARCH_FACETS,
  SEARCH_GUIDANCE,
  SEARCH_RESULTS,
  SEARCH_SHORTCUTS,
} from "./mockData";
import SearchCommandCenter from "./SearchCommandCenter";
import { useSearchOverlay } from "./SearchOverlayContext";

const GlobalSearchModal: React.FC = () => {
  const { isOpen, openSearch, closeSearch } = useSearchOverlay();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const isShortcut =
        (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (isShortcut) {
        event.preventDefault();
        openSearch();
      }
      if (event.key === "Escape") {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [closeSearch, openSearch]);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (event: MouseEvent | TouchEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(event.target as Node)) {
        closeSearch();
      }
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.body.style.overflow = previousOverflow;
    };
  }, [closeSearch, isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-24">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-md" />
      <div ref={panelRef} className="relative z-10 w-full max-w-2xl">
        <SearchCommandCenter
          title="Search"
          statusLabel="Updated just now"
          placeholder="Search hackathons, projects, and builders"
          categories={SEARCH_CATEGORIES}
          facets={SEARCH_FACETS}
          commands={SEARCH_COMMANDS}
          results={SEARCH_RESULTS}
          shortcuts={SEARCH_SHORTCUTS}
          guidance={SEARCH_GUIDANCE}
          autoFocus
          defaultOpen
          variant="compact"
          containerClassName="rounded-[2rem] p-6"
        />
      </div>
    </div>
  );
};

export default GlobalSearchModal;
