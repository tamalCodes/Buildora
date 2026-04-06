import React from "react";
import { Link } from "react-router-dom";
import type { HackathonMoreProps } from "@/features/hackathons/constants/interfaces";

const HackathonMore: React.FC<HackathonMoreProps> = ({ hackathons }) => {
  return (
    <section className="space-y-5 md:space-y-8">
      <div className="flex items-start justify-between gap-3 md:items-center">
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[var(--accent-text)] md:text-xs md:tracking-[0.3em]">
            More hackathons
          </p>
          <h2 className="mt-2 text-[2rem] leading-[1.05] font-geist font-black text-[var(--text-heading)] md:mt-3 md:text-3xl">
            Keep browsing open calls
          </h2>
        </div>
        <Link
          to="/hackathons"
          className="shrink-0 rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg-soft)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-[var(--accent-text)] transition hover:text-[var(--accent-text-soft)] md:border-none md:bg-transparent md:px-0 md:py-0 md:text-xs md:tracking-widest"
        >
          See all
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {hackathons.length ? (
          hackathons.map((hackathon) => (
            <Link
              key={hackathon.id}
              to={`/hackathons/${hackathon.id}/overview`}
              className="rounded-[1.35rem] border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 space-y-4 transition-all hover:border-[var(--accent-border)] md:rounded-[1.5rem] md:p-6"
            >
              <div className="flex items-center gap-4">
                <img
                  src={hackathon.logoUrl}
                  alt={hackathon.title}
                  className="w-10 h-10 rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] p-2"
                />
                <div>
                  <p className="text-base leading-tight font-bold text-[var(--text-heading)] md:text-sm">
                    {hackathon.title}
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                    {hackathon.location} - {hackathon.dates}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {hackathon.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] bg-[var(--bg-input)] border border-[var(--border-default)] px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-3">
                <span className="text-xs font-bold text-[var(--text-tertiary)]">
                  {hackathon.prize}
                </span>
                <span className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg-soft)] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.13em] text-[var(--accent-text)]">
                  Apply now
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="md:col-span-2 xl:col-span-3 rounded-[1.5rem] border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 text-sm text-[var(--text-secondary)]">
            No additional hackathons to suggest right now.
          </div>
        )}
      </div>
    </section>
  );
};

export default HackathonMore;
