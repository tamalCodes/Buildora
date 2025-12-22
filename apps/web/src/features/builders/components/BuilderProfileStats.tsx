import React from "react";
import type { BuilderProfile } from "../constants/types";

type BuilderProfileStatsProps = {
  profile: BuilderProfile;
};

const BuilderProfileStats: React.FC<BuilderProfileStatsProps> = ({
  profile,
}) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {profile.stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
        >
          <p className="text-2xl font-geist font-black text-white">
            {stat.value}
          </p>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
};

export default BuilderProfileStats;
