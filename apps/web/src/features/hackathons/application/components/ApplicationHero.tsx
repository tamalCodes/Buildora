import React from "react";
import HackathonTabs from "../../components/HackathonTabs";
import { applicationClasses } from "../constants/classes";
import type { ApplicationHeroProps } from "@/features/hackathons/application/constants/interfaces";
import { applicationTheme } from "../constants/themes";

const ApplicationHero: React.FC<ApplicationHeroProps> = ({
  hackathon,
  detail,
  activeTab,
  onNavigate,
}) => {
  return (
    <section className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl border border-white/10 bg-white/5 p-2">
            <img
              src={hackathon.logoUrl}
              alt={hackathon.title}
              className="h-full w-full rounded-xl"
            />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              {hackathon.organizer}
            </p>
            <h1 className="text-3xl lg:text-5xl font-geist font-black text-white tracking-tight">
              {hackathon.title}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Application hub - {detail.applicationDeadline} deadline
            </p>
          </div>
        </div>
        <div
          className={`${applicationClasses.badge} ${applicationTheme.accent}`}
        >
          Application in progress
        </div>
      </div>

      <HackathonTabs
        activeTab={activeTab}
        onNavigate={onNavigate}
        disabledTabs={["projects"]}
      />
    </section>
  );
};

export default ApplicationHero;
