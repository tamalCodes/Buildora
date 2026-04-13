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
    <div className="min-h-screen bg-(--bg-page) text-(--text-primary) overflow-x-hidden font-inter">
      <GlobalNav user={user} onSignOut={onSignOut} />

      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ opacity: "var(--blob-opacity)" }}
      >
        <div className="absolute -top-40 left-0 h-130 w-130 rounded-full bg-indigo-600 blur-[140px]"></div>
        <div className="absolute top-1/3 right-0 h-105 w-105 rounded-full bg-teal-500 blur-[160px]"></div>
        <div className="absolute bottom-0 left-1/3 h-120 w-120 rounded-full bg-rose-500 blur-[160px]"></div>
      </div>

      <main className="mx-auto max-w-305 space-y-16 px-3 pb-20 pt-24 sm:space-y-24 sm:px-5 sm:pb-24 lg:px-8 lg:pt-28">
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
