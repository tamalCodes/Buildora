import React from "react";
import type { HackathonPrizesProps } from "@/features/hackathons/constants/interfaces";

const HackathonPrizes: React.FC<HackathonPrizesProps> = ({ detail }) => {
  return (
    <section id="prizes" className="space-y-8">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
          Prizes
        </p>
        <h2 className="text-3xl font-geist font-black text-white mt-3">
          {detail.prizePool} across categories
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {detail.prizes.map((prize) => (
          <div
            key={prize.title}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">{prize.title}</h3>
              <span className="text-sm font-black text-indigo-300">
                {prize.amount}
              </span>
            </div>
            <p className="text-sm text-slate-400">{prize.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HackathonPrizes;
