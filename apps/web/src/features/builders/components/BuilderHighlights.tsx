import React from "react";
import { BUILDER_PANELS } from "../constants/constants";
import type { HighlightPanelProps } from "@/features/builders/constants/interfaces";

const metricTone: Record<string, string> = {
  prizes: "#10b981",
  projects: "#f59e0b",
};

const panelTone: Record<string, string> = {
  "hackathons-won": "#10b981",
  "projects-built": "#f59e0b",
};

const HighlightPanel: React.FC<HighlightPanelProps> = ({ panel }) => (
  <article className="rounded-4xl border border-(--border-default) bg-(--bg-surface) p-5 sm:p-6">
    <div className="space-y-6">
      <div>
        <p
          className="inline-flex w-fit items-center gap-2 rounded-full border border-(--border-default) bg-(--bg-input) px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-(--text-heading)"
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: panelTone[panel.id] ?? "var(--accent-bg)" }}
          />
          Builder highlights
        </p>
        <h3 className="text-2xl font-geist font-black text-(--text-heading) mt-3">
          {panel.title}
        </h3>
        <p className="text-sm text-(--text-secondary) mt-2">
          {panel.description}
        </p>
      </div>
      <div className="space-y-3">
        {panel.entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between rounded-xl border border-(--border-default) bg-(--bg-input) px-3 sm:px-4 py-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={entry.avatarUrl}
                alt={entry.name}
                className="w-9 h-9 rounded-lg border border-(--border-default) object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-bold text-(--text-heading) truncate">
                  {entry.name}
                </p>
                <p className="text-xs text-(--text-tertiary)">{entry.handle}</p>
              </div>
            </div>
            <span
              aria-label={`${entry.metricValue} ${entry.metricLabel}`}
              className="inline-flex items-center gap-2 rounded-full border border-(--border-default) bg-(--bg-elevated) px-3 py-1 text-xs font-black uppercase tracking-[0.08em] text-(--text-heading)"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundColor: metricTone[entry.metricLabel] ?? "var(--accent-bg)",
                }}
              />
              {entry.metricValue} {entry.metricLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  </article>
);

const BuilderHighlights: React.FC = () => {
  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 scroll-mt-24"
      id="builders-highlights"
    >
      {BUILDER_PANELS.map((panel) => (
        <HighlightPanel key={panel.id} panel={panel} />
      ))}
    </section>
  );
};

export default BuilderHighlights;
