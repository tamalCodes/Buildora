import GlobalNav from "@shared/components/global-nav/GlobalNav";
import React, { useState } from "react";
import BuilderHighlights from "./components/BuilderHighlights";
import BuildersHero from "./components/BuildersHero";
import BuildersLeaderboard from "./components/BuildersLeaderboard";
import BuildersSortBar from "./components/BuildersSortBar";
import FeaturedBuilders from "./components/FeaturedBuilders";
import type { BuilderStatKey } from "./constants/types";
import type { BuildersPageProps } from "./constants/interfaces";

const BuildersPage: React.FC<BuildersPageProps> = ({ user, onSignOut }) => {
  const [activeSort, setActiveSort] = useState<BuilderStatKey>("hackathons");

  return (
    <div className="min-h-screen bg-[#05060c] text-slate-100 overflow-x-hidden font-inter">
      <GlobalNav user={user} onSignOut={onSignOut} />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-0 h-[520px] w-[520px] rounded-full bg-indigo-600/15 blur-[140px]"></div>
        <div className="absolute top-1/3 right-0 h-[420px] w-[420px] rounded-full bg-teal-500/10 blur-[160px]"></div>
        <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-rose-500/10 blur-[160px]"></div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-24 space-y-20">
        <BuildersHero />
        <FeaturedBuilders />
        <BuildersSortBar activeSort={activeSort} onChange={setActiveSort} />
        <BuildersLeaderboard />
        <BuilderHighlights />
      </main>
    </div>
  );
};

export default BuildersPage;
