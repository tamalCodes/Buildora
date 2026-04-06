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
    <div className="flex flex-wrap gap-3 rounded-full border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3 backdrop-blur">
      {HACKATHON_TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        const isDisabled = disabledTabs.includes(tab.id);
        return (
          <button
            key={tab.id}
            className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${
              isActive
                ? "border border-[var(--accent-border-active)] bg-[var(--accent-bg-active)] text-[var(--accent-text-on-active)] shadow-lg shadow-indigo-500/20"
                : isDisabled
                ? "text-[var(--text-muted)] cursor-not-allowed"
                : "text-[var(--text-secondary)] hover:text-[var(--text-heading)]"
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
  );
};

export default HackathonTabs;
