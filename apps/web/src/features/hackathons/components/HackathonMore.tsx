import React from "react";
import { Link } from "react-router-dom";
import type { HackathonMoreProps } from "@/features/hackathons/constants/interfaces";

const HackathonMore: React.FC<HackathonMoreProps> = ({ hackathons }) => {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
            More hackathons
          </p>
          <h2 className="text-3xl font-geist font-black text-[var(--text-heading)] mt-3">
            Keep browsing open calls
          </h2>
        </div>
        <Link
          to="/hackathons"
          className="text-xs font-black uppercase tracking-widest text-[var(--accent-text)] hover:text-[var(--accent-text-soft)]"
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
              className="rounded-[1.5rem] border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 space-y-4 hover:border-[var(--accent-border)] transition-all"
            >
              <div className="flex items-center gap-4">
                <img
                  src={hackathon.logoUrl}
                  alt={hackathon.title}
                  className="w-10 h-10 rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] p-2"
                />
                <div>
                  <p className="text-sm font-bold text-[var(--text-heading)]">{hackathon.title}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">
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
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-tertiary)]">
                  {hackathon.prize}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-text)] bg-[var(--accent-bg-soft)] border border-[var(--accent-border)] px-3 py-1.5 rounded-full">
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
