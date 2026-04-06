import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@shared/components/Button";
import type { HackathonHeroProps } from "@/features/hackathons/constants/interfaces";
import { isOnlineHackathon } from "../constants/utils";
import HackathonTabs from "./HackathonTabs";

const HackathonHero: React.FC<HackathonHeroProps> = ({
  hackathon,
  detail,
  activeTab = "overview",
  disabledTabs = [],
  onNavigate,
}) => {
  const navigate = useNavigate();
  const isOnline = isOnlineHackathon(hackathon, detail);
  const combinedDisabled = isOnline
    ? disabledTabs
    : [...new Set([...disabledTabs, "application"])];

  return (
    <section className="space-y-6">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={hackathon.logoUrl}
              alt={hackathon.title}
              className="w-14 h-14 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-input)] p-2"
            />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
                {hackathon.organizer}
              </p>
              <h1 className="text-4xl lg:text-6xl font-geist font-black text-[var(--text-heading)] tracking-tight leading-[1.02]">
                {hackathon.title}
              </h1>
            </div>
          </div>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
            {detail.heroSubtitle}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button
            className="!px-8 !py-4 !rounded-2xl"
            onClick={() => {
              if (isOnline) {
                if (onNavigate) {
                  onNavigate("application");
                  return;
                }
                navigate(`/hackathons/${hackathon.id}/application`);
              }
            }}
            disabled={!isOnline}
          >
            {isOnline ? "Apply now" : "Onsite apply"}
          </Button>
        </div>
        <HackathonTabs
          activeTab={activeTab}
          disabledTabs={combinedDisabled}
          onNavigate={(tabId) => {
            if (onNavigate) {
              onNavigate(tabId);
              return;
            }
            if (tabId === "application") {
              if (isOnline) {
                navigate(`/hackathons/${hackathon.id}/application`);
              }
              return;
            }
            navigate(`/hackathons/${hackathon.id}/${tabId}`);
          }}
        />
      </div>
    </section>
  );
};

export default HackathonHero;
