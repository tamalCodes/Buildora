import React from "react";
import Button from "@shared/components/Button";
import type { HackathonListingCardProps } from "@/features/hackathons/constants/interfaces";

const HackathonsCompactCard: React.FC<HackathonListingCardProps> = ({
  hackathon,
  onSelect,
}) => (
  <div
    className="group flex items-center justify-between gap-4 rounded-xl border border-(--border-default) bg-(--bg-surface) px-4 py-3 transition-all duration-200 hover:border-(--accent-border) cursor-pointer"
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
    <div className="flex min-w-0 items-center gap-3">
      <div className="h-9 w-9 rounded-lg border border-(--border-default) bg-(--bg-input) p-1.5">
        <img
          src={hackathon.logoUrl}
          alt={hackathon.title}
          className="h-full w-full rounded-md"
        />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-(--text-heading)">{hackathon.title}</p>
        <p className="truncate text-xs text-(--text-tertiary)">
          {hackathon.location} • {hackathon.dates}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className="hidden rounded-full border border-(--border-default) bg-(--bg-input) px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-(--text-secondary) md:inline-flex">
        {hackathon.status}
      </span>
      <Button
        variant="outline"
        className="rounded-lg! px-3! py-2! text-xs!"
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
      >
        {hackathon.status === "Past" ? "Recap" : "Notify"}
      </Button>
    </div>
  </div>
);

export default HackathonsCompactCard;
