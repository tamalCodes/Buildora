import React from "react";
import type { HackathonsOpenSectionProps } from "@/features/hackathons/constants/interfaces";
import { HACKATHON_OPEN_FILTERS } from "@/features/hackathons/constants/constants";
import HackathonsGridCard from "./HackathonsGridCard";

const HackathonsOpenSection: React.FC<HackathonsOpenSectionProps> = ({
  hackathons,
  onSelect,
}) => (
  <section className="space-y-6">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-text)]">
          Open hackathons
        </p>
        <h2 className="mt-2 text-2xl font-geist font-black text-[var(--text-heading)] lg:text-3xl">
          Apply while the window is open
        </h2>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {HACKATHON_OPEN_FILTERS.map((filter) => (
          <button
            key={filter.label}
            className={
              filter.isActive
                ? "rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg-soft)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--accent-text)]"
                : "rounded-full border border-[var(--border-default)] bg-[var(--bg-input)] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)]"
            }
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {hackathons.map((hackathon) => (
        <HackathonsGridCard
          key={hackathon.id}
          hackathon={hackathon}
          onSelect={() => onSelect(hackathon.id)}
        />
      ))}
    </div>
  </section>
);

export default HackathonsOpenSection;
