import React from "react";
import type { BuilderProfileStatsProps } from "@/features/builders/constants/interfaces";

const BuilderProfileStats: React.FC<BuilderProfileStatsProps> = ({
  profile,
}) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {profile.stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-(--border-default) bg-(--bg-surface) px-4 py-4 sm:px-5 sm:py-5"
        >
          <p className="text-2xl font-geist font-black text-(--text-heading)">
            {stat.value}
          </p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-(--text-tertiary) font-black mt-1">
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
};

export default BuilderProfileStats;
