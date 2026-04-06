import React from "react";
import { BUILDER_PANELS } from "../constants/constants";
import type { HighlightPanelProps } from "@/features/builders/constants/interfaces";

const metricStyles: Record<string, string> = {
  prizes: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
  projects: "bg-amber-500/15 text-amber-600 dark:text-amber-300",
};

const panelAccent: Record<string, string> = {
  "hackathons-won": "bg-emerald-500/10 border-emerald-500/25 text-emerald-700 dark:text-emerald-300",
  "projects-built": "bg-amber-500/10 border-amber-500/25 text-amber-700 dark:text-amber-300",
};

const HighlightPanel: React.FC<HighlightPanelProps> = ({ panel }) => (
  <article className="rounded-[2rem] border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 sm:p-6">
    <div className="space-y-6">
      <div>
        <p
          className={`inline-flex w-fit rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${
            panelAccent[panel.id] ??
            "bg-[var(--accent-bg-soft)] border-[var(--accent-border)] text-[var(--accent-text)]"
          }`}
        >
          Builder highlights
        </p>
        <h3 className="text-2xl font-geist font-black text-[var(--text-heading)] mt-3">
          {panel.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mt-2">
          {panel.description}
        </p>
      </div>
      <div className="space-y-3">
        {panel.entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] px-3 sm:px-4 py-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={entry.avatarUrl}
                alt={entry.name}
                className="w-9 h-9 rounded-lg border border-[var(--border-default)] object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="text-sm font-bold text-[var(--text-heading)] truncate">
                  {entry.name}
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">{entry.handle}</p>
              </div>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-[10px] sm:text-xs font-black uppercase tracking-[0.15em] ${
                metricStyles[entry.metricLabel] ??
                "bg-[var(--accent-bg-soft)] text-[var(--accent-text)]"
              }`}
            >
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
