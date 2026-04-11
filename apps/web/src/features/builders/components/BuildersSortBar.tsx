import { Check, ChevronDown, Filter } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { BUILDER_SORTS } from "../constants/constants";
import type { BuildersSortBarProps } from "@/features/builders/constants/interfaces";

const BuildersSortBar: React.FC<BuildersSortBarProps> = ({
  activeSort,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) {
        return;
      }

      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeSortOption =
    BUILDER_SORTS.find((option) => option.id === activeSort) ?? BUILDER_SORTS[0];

  return (
    <section className="rounded-4xl border border-(--border-default) bg-(--bg-surface) px-4 sm:px-6 py-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm font-semibold text-(--text-secondary)">
          Sort builders by
        </div>
        <div className="relative w-full sm:w-auto" ref={containerRef}>
          <button
            type="button"
            className="flex w-full sm:min-w-80 items-center justify-between rounded-xl border border-(--border-default) bg-(--bg-input) px-3.5 py-2.5 text-left transition hover:border-(--border-hover)"
            onClick={() => setIsOpen((previous) => !previous)}
            aria-expanded={isOpen}
            aria-haspopup="menu"
          >
            <span className="inline-flex items-center gap-2.5">
              <Filter className="h-4 w-4 text-(--text-tertiary)" />
              <span className="text-xs font-black uppercase tracking-[0.14em] text-(--text-secondary)">
                {activeSortOption.label}
              </span>
            </span>
            <ChevronDown
              className={`h-4 w-4 text-(--text-tertiary) transition ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isOpen ? (
            <div
              role="menu"
              className="absolute right-0 z-20 mt-2 w-full sm:w-80 rounded-xl border border-(--border-default) bg-(--bg-elevated) p-2 shadow-(--glass-shadow)"
            >
              <p className="px-2 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-(--text-tertiary)">
                Latest trend
              </p>
              {BUILDER_SORTS.map((option) => {
                const isActive = option.id === activeSort;
                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold transition ${
                      isActive
                        ? "bg-(--accent-bg-soft) text-(--accent-text)"
                        : "text-(--text-secondary) hover:bg-(--bg-input) hover:text-(--text-heading)"
                    }`}
                    onClick={() => {
                      onChange(option.id);
                      setIsOpen(false);
                    }}
                  >
                    <span>{option.label}</span>
                    {isActive ? <Check className="h-4 w-4" /> : null}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default BuildersSortBar;
