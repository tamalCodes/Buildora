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
    <div className="flex flex-wrap gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
      {HACKATHON_TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        const isDisabled = disabledTabs.includes(tab.id);
        return (
          <button
            key={tab.id}
            className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${
              isActive
                ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                : isDisabled
                ? "text-slate-600 cursor-not-allowed"
                : "text-slate-400 hover:text-indigo-200"
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
