import React from "react";
import Button from "@shared/components/Button";
import type { HackathonListingCardProps } from "@/features/hackathons/constants/interfaces";

const HackathonsGridCard: React.FC<HackathonListingCardProps> = ({
  hackathon,
  onSelect,
}) => (
  <div
    className="group overflow-hidden rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-[0_8px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-border)] cursor-pointer"
    onClick={onSelect}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onSelect();
      }
    }}
    role="button"
    tabIndex={0}
  >
    <div className="relative h-36">
      <img src={hackathon.coverUrl} alt={hackathon.title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"></div>
      <p className="absolute bottom-4 left-4 text-xs font-medium text-white/90">{hackathon.location}</p>
    </div>
    <div className="space-y-4 p-5">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg border border-[var(--border-default)] bg-[var(--bg-input)] p-1.5">
          <img src={hackathon.logoUrl} alt={hackathon.title} className="h-full w-full rounded-md" />
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-[var(--text-heading)]">{hackathon.title}</h3>
          <p className="truncate text-xs text-[var(--text-tertiary)]">{hackathon.organizer}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {hackathon.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-[var(--border-default)] bg-[var(--bg-input)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-secondary)]"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
            Timeline
          </p>
          <p className="mt-1 text-[var(--text-primary)]">{hackathon.dates}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
            Prize
          </p>
          <p className="mt-1 text-[var(--text-primary)]">{hackathon.prize}</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-4">
        <span className="text-xs text-[var(--text-tertiary)]">{hackathon.participants}</span>
        <Button
          variant="secondary"
          className="!rounded-lg !px-3.5 !py-2 !text-xs"
          onClick={(event) => {
            event.stopPropagation();
            onSelect();
          }}
        >
          View details
        </Button>
      </div>
    </div>
  </div>
);

export default HackathonsGridCard;
