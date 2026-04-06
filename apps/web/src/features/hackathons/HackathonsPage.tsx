import GlobalNav from "@shared/components/global-nav/GlobalNav";
import React from "react";
import { useNavigate } from "react-router-dom";
import HackathonsFeaturedSection from "./components/HackathonsFeaturedSection";
import HackathonsHeroSection from "./components/HackathonsHeroSection";
import HackathonsOpenSection from "./components/HackathonsOpenSection";
import HackathonsPageBackground from "./components/HackathonsPageBackground";
import HackathonsSponsorCtaSection from "./components/HackathonsSponsorCtaSection";
import type { HackathonsPageProps } from "./constants/interfaces";
import { useHackathonsCatalog } from "./hooks/useHackathons";

const HackathonsPage: React.FC<HackathonsPageProps> = ({ user, onSignOut }) => {
  const navigate = useNavigate();
  const { data: catalog, isLoading } = useHackathonsCatalog();
  const featuredHackathons = catalog?.featuredHackathons ?? [];
  const openHackathons = catalog?.openHackathons ?? [];

  const handleSelect = (id: string) => {
    navigate(`/hackathons/${id}/overview`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg-page)] pb-24 font-inter text-[var(--text-primary)]">
      <GlobalNav user={user} onSignOut={onSignOut} />
      <HackathonsPageBackground />

      <main className="mx-auto max-w-[1220px] space-y-16 px-5 pt-24 lg:px-8 lg:pt-28">
        <HackathonsHeroSection />

        {isLoading ? (
          <section className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-6 py-8 text-sm text-[var(--text-secondary)]">
            Loading hackathons...
          </section>
        ) : (
          <>
            <HackathonsFeaturedSection
              hackathons={featuredHackathons}
              onSelect={handleSelect}
            />

            <HackathonsOpenSection
              hackathons={openHackathons}
              onSelect={handleSelect}
            />
          </>
        )}
        <HackathonsSponsorCtaSection />
      </main>
    </div>
  );
};

export default HackathonsPage;
