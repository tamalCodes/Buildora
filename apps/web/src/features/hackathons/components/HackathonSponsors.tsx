import React from "react";
import type { HackathonSponsorsProps } from "@/features/hackathons/constants/interfaces";

const HackathonSponsors: React.FC<HackathonSponsorsProps> = ({ detail }) => {
  return (
    <section id="sponsors" className="space-y-8">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
          Sponsors
        </p>
        <h2 className="text-3xl font-geist font-black text-[var(--text-heading)] mt-3">
          Partners backing the build
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {detail.sponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className="rounded-[1.5rem] border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 flex items-center gap-4"
          >
            <img
              src={sponsor.logoUrl}
              alt={sponsor.name}
              className="w-12 h-12 rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] p-2"
            />
            <div>
              <p className="text-sm font-bold text-[var(--text-heading)]">{sponsor.name}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)]">
                {sponsor.tier}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HackathonSponsors;
