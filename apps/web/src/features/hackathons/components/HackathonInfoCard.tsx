import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "@shared/components/Button";
import type { HackathonInfoCardProps } from "@/features/hackathons/constants/interfaces";
import { getPrizePoolDisplay, isOnlineHackathon } from "../constants/utils";

const HackathonInfoCard: React.FC<HackathonInfoCardProps> = ({
  hackathon,
  detail,
  activeTab,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = location.pathname.startsWith("/hackathons/")
    ? "/hackathons"
    : "";
  const isOnline = isOnlineHackathon(hackathon, detail);
  const prizePool = getPrizePoolDisplay(detail.prizePool);

  return (
    <aside className="rounded-[2rem] border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 space-y-6 sticky top-28">
      <div className="flex justify-end">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg-soft)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-[var(--accent-text)]">
          <span className="relative inline-flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--accent-text)] opacity-45 motion-safe:animate-ping"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-text)]"></span>
          </span>
          {detail.statusLabel}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
          Applications
        </p>
        <h3 className="text-xl font-geist font-black text-[var(--text-heading)]">
          Apply to {hackathon.title}
        </h3>
        <p className="text-sm text-[var(--text-secondary)]">
          Deadline: {detail.applicationDeadline}
        </p>
        <div className="flex gap-3">
          <Button
            className="!px-5 !py-3 !rounded-xl !text-sm"
            onClick={() => {
              if (isOnline) {
                navigate(`${basePath}/${hackathon.id}/application`);
              }
            }}
            disabled={!isOnline}
          >
            {isOnline ? "Apply now" : "Onsite apply"}
          </Button>
          <Button
            variant="outline"
            className="!px-5 !py-3 !rounded-xl !text-sm"
          >
            Share
          </Button>
        </div>
      </div>

      {activeTab !== "prizes" && (
        <div className="rounded-2xl border border-[var(--accent-border)] bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-500/20 p-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
            Prize pool
          </p>
          <div className="mt-2 flex items-end gap-2">
            <p className="text-3xl leading-none font-geist font-black tracking-tight text-[var(--text-heading)]">
              {prizePool.amount}
            </p>
            {prizePool.label ? (
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] pb-0.5">
                {prizePool.label}
              </p>
            ) : null}
          </div>
          <p className="text-xs text-[var(--text-secondary)] mt-2">
            Paid across multiple tracks and sponsor awards.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 text-xs">
        {[
          { label: "Dates", value: hackathon.dates },
          { label: "Location", value: hackathon.location },
          { label: "Tracks", value: `${detail.tracks.length} tracks` },
          { label: "Builders", value: hackathon.participants },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] px-3 py-3"
          >
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-tertiary)]">
              {item.label}
            </p>
            <p className="text-[var(--text-primary)] mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs font-bold text-[var(--text-secondary)]">
        {[
          { label: "Status", value: hackathon.status },
          { label: "Mode", value: detail.mode },
          { label: "Team size", value: detail.teamSize },
          { label: "Eligibility", value: detail.eligibility },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] px-3 py-3"
          >
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-tertiary)]">
              {item.label}
            </p>
            <p className="text-[var(--text-primary)] mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
          Contact
        </p>
        <a
          href={`mailto:${detail.contactEmail}`}
          className="text-sm font-bold text-[var(--accent-text)] hover:text-[var(--accent-text-soft)]"
        >
          {detail.contactEmail}
        </a>
        <div className="flex flex-wrap gap-2">
          {detail.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] bg-[var(--bg-input)] border border-[var(--border-default)] px-3 py-1.5 rounded-full hover:text-[var(--text-heading)]"
              rel="noreferrer"
              target="_blank"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default HackathonInfoCard;
