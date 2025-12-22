import React from "react";
import { BUILDER_PANELS } from "../constants/constants";
import type { BuilderPanel } from "../constants/types";

const HighlightPanel = ({ panel }: { panel: BuilderPanel }) => (
  <div
    className="relative overflow-hidden rounded-[2.5rem] p-8 text-white border border-white/10 bg-white/5 backdrop-blur-2xl"
    style={{ backgroundImage: panel.gradient }}
  >
    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_60%)]"></div>
    <div className="absolute inset-0 bg-white/5"></div>
    <div className="relative space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-white/70">
          Builder highlights
        </p>
        <h3 className="text-2xl font-geist font-black mt-3">{panel.title}</h3>
        <p className="text-sm text-white/70 mt-2">{panel.description}</p>
      </div>
      <div className="space-y-3">
        {panel.entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 border border-white/10"
          >
            <div className="flex items-center gap-3">
              <img
                src={entry.avatarUrl}
                alt={entry.name}
                className="w-10 h-10 rounded-xl border border-white/20 object-cover"
              />
              <div>
                <p className="text-sm font-bold text-white">{entry.name}</p>
                <p className="text-xs text-white/60">{entry.handle}</p>
              </div>
            </div>
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-widest text-white/80">
              {entry.metricValue} {entry.metricLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BuilderHighlights: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {BUILDER_PANELS.map((panel) => (
        <HighlightPanel key={panel.id} panel={panel} />
      ))}
    </section>
  );
};

export default BuilderHighlights;
