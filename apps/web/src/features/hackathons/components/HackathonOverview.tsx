import React from "react";
import type { HackathonOverviewProps } from "@/features/hackathons/constants/interfaces";

const HackathonOverview: React.FC<HackathonOverviewProps> = ({ detail }) => {
  return (
    <section id="overview" className="space-y-8">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-(--accent-text)">
          Overview
        </p>
        <h2 className="text-3xl font-geist font-black text-(--text-heading) mt-3">
          What you will build and ship
        </h2>
      </div>
      <div className="rounded-4xl border border-(--border-default) bg-(--bg-surface) p-8 space-y-6">
        <div className="space-y-4">
          {detail.about.map((paragraph) => (
            <p key={paragraph} className="text-sm text-(--text-secondary) leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-(--text-tertiary)">
              Tracks
            </p>
            <div className="flex flex-wrap gap-2">
              {detail.tracks.map((track) => (
                <span
                  key={track}
                  className="text-[10px] font-black uppercase tracking-widest text-(--text-secondary) bg-(--bg-input) border border-(--border-default) px-3 py-1.5 rounded-full"
                >
                  {track}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-(--text-tertiary)">
              Perks
            </p>
            <ul className="space-y-2 text-sm text-(--text-secondary)">
              {detail.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-(--accent-border-active)"></span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-(--border-subtle) pt-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-(--text-tertiary)">
            Rules
          </p>
          <ul className="space-y-2 text-sm text-(--text-secondary) mt-4">
            {detail.rules.map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-(--text-muted)"></span>
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HackathonOverview;
