import React from "react";
import Button from "@shared/components/Button";
import type { HackathonListingCardProps } from "@/features/hackathons/constants/interfaces";

const HackathonsFeaturedCard: React.FC<HackathonListingCardProps> = ({
  hackathon,
  onSelect,
}) => (
  <div
    className="group overflow-hidden rounded-2xl border border-(--border-default) bg-(--bg-surface) shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-(--accent-border) cursor-pointer"
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
    <div className="relative h-52">
      <img
        src={hackathon.coverUrl}
        alt={hackathon.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent"></div>
      <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-3">
        <span className="rounded-full border border-white/30 bg-black/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
          Featured
        </span>
        {hackathon.sponsor && (
          <span className="rounded-full border border-white/30 bg-black/25 px-3 py-1 text-[10px] font-semibold text-white/90">
            {hackathon.sponsor}
          </span>
        )}
      </div>
      <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl border border-white/30 bg-white/10 p-1.5 backdrop-blur-sm">
          <img
            src={hackathon.logoUrl}
            alt={hackathon.title}
            className="h-full w-full rounded-lg"
          />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{hackathon.organizer}</p>
          <h3 className="truncate text-xl font-geist font-black text-white">{hackathon.title}</h3>
        </div>
      </div>
    </div>
    <div className="space-y-5 p-6">
      <div className="flex flex-wrap gap-2">
        {hackathon.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-(--border-default) bg-(--bg-input) px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-(--text-secondary)"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-(--text-tertiary)">
            Dates
          </p>
          <p className="mt-1 text-(--text-primary)">{hackathon.dates}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-(--text-tertiary)">
            Location
          </p>
          <p className="mt-1 text-(--text-primary)">{hackathon.location}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-(--text-tertiary)">
            Prize
          </p>
          <p className="mt-1 font-semibold text-(--text-primary)">{hackathon.prize}</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-(--text-tertiary)">
            Builders
          </p>
          <p className="mt-1 text-(--text-secondary)">{hackathon.participants}</p>
        </div>
      </div>
      <div className="flex justify-end border-t border-(--border-subtle) pt-4">
        <Button
          className="rounded-lg! px-5! py-2.5! text-sm!"
          onClick={(event) => {
            event.stopPropagation();
            onSelect();
          }}
        >
          Apply now
        </Button>
      </div>
    </div>
  </div>
);

export default HackathonsFeaturedCard;
