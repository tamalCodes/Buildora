import React from "react";
import Button from "@shared/components/Button";
import type { HackathonsFeaturedSectionProps } from "@/features/hackathons/constants/interfaces";
import HackathonsFeaturedCard from "./HackathonsFeaturedCard";

const HackathonsFeaturedSection: React.FC<HackathonsFeaturedSectionProps> = ({
  hackathons,
  onSelect,
}) => (
  <section className="space-y-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--accent-text)]">
          Featured hackathons
        </p>
        <h2 className="mt-2 text-2xl font-geist font-black text-[var(--text-heading)] lg:text-3xl">
          Sponsored and verified by Buildora
        </h2>
      </div>
      <Button variant="outline" className="!rounded-lg !px-4 !py-2 !text-xs">
        View all featured
      </Button>
    </div>
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
      {hackathons.length ? (
        hackathons.map((hackathon) => (
          <HackathonsFeaturedCard
            key={hackathon.id}
            hackathon={hackathon}
            onSelect={() => onSelect(hackathon.id)}
          />
        ))
      ) : (
        <div className="xl:col-span-2 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-6 py-8 text-sm text-[var(--text-secondary)]">
          No featured hackathons available yet.
        </div>
      )}
    </div>
  </section>
);

export default HackathonsFeaturedSection;
