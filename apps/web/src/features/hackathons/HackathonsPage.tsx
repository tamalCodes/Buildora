import React from "react";
import { useNavigate } from "react-router-dom";
import GlobalNav from "@shared/components/global-nav/GlobalNav";
import {
  FEATURED_HACKATHONS,
  OPEN_HACKATHONS,
  PAST_HACKATHONS,
  UPCOMING_HACKATHONS,
} from "./constants/constants";
import type { HackathonsPageProps } from "./constants/interfaces";
import HackathonsFeaturedSection from "./components/HackathonsFeaturedSection";
import HackathonsHeroSection from "./components/HackathonsHeroSection";
import HackathonsOpenSection from "./components/HackathonsOpenSection";
import HackathonsPageBackground from "./components/HackathonsPageBackground";
import HackathonsSponsorCtaSection from "./components/HackathonsSponsorCtaSection";

const HackathonsPage: React.FC<HackathonsPageProps> = ({ user, onSignOut }) => {
  const navigate = useNavigate();

  const handleSelect = (id: string) => {
    navigate(`/hackathons/${id}/overview`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg-page)] pb-24 font-inter text-[var(--text-primary)]">
      <GlobalNav user={user} onSignOut={onSignOut} />
      <HackathonsPageBackground />

      <main className="mx-auto max-w-[1220px] space-y-16 px-5 pt-24 lg:px-8 lg:pt-28">
        <HackathonsHeroSection />

        <HackathonsFeaturedSection
          hackathons={FEATURED_HACKATHONS}
          onSelect={handleSelect}
        />

        <HackathonsOpenSection hackathons={OPEN_HACKATHONS} onSelect={handleSelect} />
        <HackathonsSponsorCtaSection />
      </main>
    </div>
  );
};

export default HackathonsPage;
