import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@shared/components/Button";
import type { HackathonHeroProps } from "../constants/interfaces";
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
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-7 space-y-6">
        <div className="inline-flex items-center gap-3 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">
          {detail.statusLabel}
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img
              src={hackathon.logoUrl}
              alt={hackathon.title}
              className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 p-2"
            />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
                {hackathon.organizer}
              </p>
              <h1 className="text-4xl lg:text-6xl font-geist font-black text-white tracking-tight leading-[1.02]">
                {hackathon.title}
              </h1>
            </div>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl">
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
      <div className="lg:col-span-5">
        <div className="relative rounded-[2.5rem] border border-white/10 bg-white/5 overflow-hidden min-h-[320px]">
          <img
            src={detail.bannerUrl}
            alt={`${hackathon.title} banner`}
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05060c] via-[#05060c]/50 to-transparent"></div>
          <div className="relative z-10 p-8 flex items-end h-full">
            <div className="rounded-2xl border border-white/10 bg-[#05060c]/70 px-4 py-3 text-xs font-bold text-slate-200">
              {hackathon.dates} · {hackathon.location}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HackathonHero;
