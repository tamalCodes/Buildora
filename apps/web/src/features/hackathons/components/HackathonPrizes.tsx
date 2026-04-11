import React from "react";
import type { HackathonPrizesProps } from "@/features/hackathons/constants/interfaces";

const HackathonPrizes: React.FC<HackathonPrizesProps> = ({ detail }) => {
  return (
    <section id="prizes" className="space-y-8">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-(--accent-text)">
          Prizes
        </p>
        <h2 className="text-3xl font-geist font-black text-(--text-heading) mt-3">
          Awards across categories
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {detail.prizes.map((prize) => (
          <div
            key={prize.title}
            className="rounded-4xl border border-(--border-default) bg-(--bg-surface) p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-(--text-heading)">{prize.title}</h3>
              <span className="text-sm font-black text-(--accent-text)">
                {prize.amount}
              </span>
            </div>
            <p className="text-sm text-(--text-secondary)">{prize.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HackathonPrizes;
