import GlobalNav from "@shared/components/global-nav/GlobalNav";
import React from "react";
import FeaturedBuildersSection from "./components/FeaturedBuildersSection";
import EcosystemPulseSection from "./components/EcosystemPulseSection";
import ExploreHeroSection from "./components/ExploreHeroSection";
import ExploreShowcaseSection from "./components/ExploreShowcaseSection";
import FeaturedProjectsSection from "./components/FeaturedProjectsSection";
import { FEATURED_PROJECTS } from "./constants/constants";
import type { ExplorePageProps } from "./constants/interfaces";
import { useExplorePageCta } from "./hooks/useExplorePageCta";

const ExplorePage: React.FC<ExplorePageProps> = ({ user, onSignOut }) => {
  const { followedBuilderIds, showcaseIntent, handleCta } = useExplorePageCta();

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] overflow-x-hidden font-inter">
      <GlobalNav user={user} onSignOut={onSignOut} />

      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ opacity: "var(--blob-opacity)" }}
      >
        <div className="absolute -top-40 left-0 h-[520px] w-[520px] rounded-full bg-indigo-600 blur-[140px]"></div>
        <div className="absolute top-1/3 right-0 h-[420px] w-[420px] rounded-full bg-teal-500 blur-[160px]"></div>
        <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-rose-500 blur-[160px]"></div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-24 space-y-24">
        <ExploreHeroSection onCta={handleCta} />
        <FeaturedProjectsSection projects={FEATURED_PROJECTS} onCta={handleCta} />
        <EcosystemPulseSection />
        <FeaturedBuildersSection
          followedBuilderIds={followedBuilderIds}
          onCta={handleCta}
        />
        <ExploreShowcaseSection showcaseIntent={showcaseIntent} onCta={handleCta} />
      </main>
    </div>
  );
};

export default ExplorePage;
