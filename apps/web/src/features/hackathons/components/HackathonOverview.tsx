import React from "react";
import type { HackathonOverviewProps } from "@/features/hackathons/constants/interfaces";

const HackathonOverview: React.FC<HackathonOverviewProps> = ({ detail }) => {
  return (
    <section id="overview" className="space-y-8">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
          Overview
        </p>
        <h2 className="text-3xl font-geist font-black text-white mt-3">
          What you will build and ship
        </h2>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 space-y-6">
        <div className="space-y-4">
          {detail.about.map((paragraph) => (
            <p key={paragraph} className="text-sm text-slate-300 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
              Tracks
            </p>
            <div className="flex flex-wrap gap-2">
              {detail.tracks.map((track) => (
                <span
                  key={track}
                  className="text-[10px] font-black uppercase tracking-widest text-slate-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
                >
                  {track}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
              Perks
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              {detail.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400/70"></span>
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
            Rules
          </p>
          <ul className="space-y-2 text-sm text-slate-300 mt-4">
            {detail.rules.map((rule) => (
              <li key={rule} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-slate-400/70"></span>
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
