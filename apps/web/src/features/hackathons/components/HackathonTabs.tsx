import React from "react";
import { HACKATHON_TABS } from "../constants/tabs";

type HackathonTabsProps = {
  activeTab: string;
  onNavigate: (tabId: string) => void;
  disabledTabs?: string[];
};

const HackathonTabs: React.FC<HackathonTabsProps> = ({
  activeTab,
  onNavigate,
  disabledTabs = [],
}) => {
  return (
    <div className="-mx-1 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:overflow-visible md:pb-0">
      <div className="inline-flex min-w-full gap-2 rounded-2xl border border-(--border-default) bg-(--bg-surface) p-1.5 backdrop-blur md:flex md:flex-wrap md:gap-3 md:rounded-full md:px-4 md:py-3">
        {HACKATHON_TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          const isDisabled = disabledTabs.includes(tab.id);
          return (
            <button
              key={tab.id}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-[11px] font-black uppercase tracking-[0.16em] transition md:rounded-full md:px-5 md:text-[10px] md:tracking-widest ${
                isActive
                  ? "border border-(--accent-border-active) bg-(--accent-bg-active) text-(--accent-text-on-active) shadow-[0_0_0_1px_rgba(99,102,241,0.15),0_12px_24px_rgba(79,70,229,0.28)]"
                  : isDisabled
                  ? "cursor-not-allowed border border-transparent text-(--text-muted) opacity-60"
                  : "border border-transparent text-(--text-secondary) hover:text-(--text-heading)"
              }`}
              onClick={() => {
                if (!isDisabled) {
                  onNavigate(tab.id);
                }
              }}
              disabled={isDisabled}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default HackathonTabs;
