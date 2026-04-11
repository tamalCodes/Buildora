import React, { useMemo, useState } from "react";
import type { HackathonsOpenSectionProps } from "@/features/hackathons/constants/interfaces";
import { HACKATHON_OPEN_FILTERS } from "@/features/hackathons/constants/constants";
import { applyOpenHackathonsFilter } from "@/features/hackathons/constants/openFilters";
import HackathonsGridCard from "./HackathonsGridCard";

const HackathonsOpenSection: React.FC<HackathonsOpenSectionProps> = ({
  hackathons,
  onSelect,
}) => {
  const [activeFilterId, setActiveFilterId] = useState(
    HACKATHON_OPEN_FILTERS[0].id
  );

  const visibleHackathons = useMemo(
    () => applyOpenHackathonsFilter(hackathons, activeFilterId),
    [hackathons, activeFilterId]
  );

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-(--accent-text)">
            Open hackathons
          </p>
          <h2 className="mt-2 text-2xl font-geist font-black text-(--text-heading) lg:text-3xl">
            Apply while the window is open
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {HACKATHON_OPEN_FILTERS.map((filter) => {
            const isActive = filter.id === activeFilterId;

            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilterId(filter.id)}
                className={
                  isActive
                    ? "rounded-full border border-(--accent-border) bg-(--accent-bg-soft) px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-(--accent-text)"
                    : "rounded-full border border-(--border-default) bg-(--bg-input) px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-(--text-secondary)"
                }
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visibleHackathons.length ? (
          visibleHackathons.map((hackathon) => (
            <HackathonsGridCard
              key={hackathon.id}
              hackathon={hackathon}
              onSelect={() => onSelect(hackathon.id)}
            />
          ))
        ) : (
          <div className="md:col-span-2 xl:col-span-3 rounded-2xl border border-(--border-default) bg-(--bg-surface) px-6 py-8 text-sm text-(--text-secondary)">
            No open hackathons yet. Check back when new calls go live.
          </div>
        )}
      </div>
    </section>
  );
};

export default HackathonsOpenSection;
