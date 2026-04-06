import React from "react";
import { PULSE_STATS } from "@/features/explore/constants/constants";

const EcosystemPulseSection: React.FC = () => (
  <section
    className="rounded-[2.5rem] border border-[var(--border-default)] bg-[var(--bg-input)] px-8 py-6 scroll-mt-24"
    id="explore-pulse"
  >
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
          Ecosystem pulse
        </p>
        <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xl">
          A quick snapshot of activity across the Buildora network.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {PULSE_STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-input)] px-4 py-3"
          >
            <p className="text-2xl font-geist font-black text-[var(--text-heading)]">
              {stat.value}
            </p>
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] font-bold">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default EcosystemPulseSection;
