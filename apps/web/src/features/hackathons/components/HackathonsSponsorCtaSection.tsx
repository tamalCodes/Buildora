import React from "react";
import Button from "@shared/components/Button";

const HackathonsSponsorCtaSection: React.FC = () => (
  <section className="rounded-2xl border border-(--border-default) bg-(--bg-surface) p-8">
    <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-center">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-(--accent-text-soft)">
          Buildora for teams
        </p>
        <h3 className="mt-2 text-2xl font-geist font-black text-(--text-heading)">
          Sponsor a featured hackathon with Buildora.
        </h3>
        <p className="mt-1.5 max-w-2xl text-sm text-(--text-secondary)">
          Launch campaigns, attract high-signal builders, and get dedicated support for
          mentors and judges.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        <Button className="rounded-lg! px-5! py-2.5!">Become a sponsor</Button>
        <Button variant="outline" className="rounded-lg! px-5! py-2.5!">
          Request deck
        </Button>
      </div>
    </div>
  </section>
);

export default HackathonsSponsorCtaSection;
