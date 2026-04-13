import { HACKATHON_HERO_STATS } from "@/features/hackathons/constants/constants";
import Button from "@shared/components/Button";
import React from "react";

const HackathonsHeroSection: React.FC = () => (
  <section className="grid grid-cols-1 gap-12 scroll-mt-24 lg:grid-cols-12">
    <div className="space-y-8 lg:col-span-8">
      <h1 className="max-w-4xl text-5xl font-geist font-black leading-[0.95] tracking-tight text-(--text-heading) lg:text-7xl">
        Build your next team, prize, & obsession.
      </h1>
      <p className="max-w-2xl text-lg text-(--text-secondary)">
        Explore curated challenges across AI, web3, and emerging tech. Featured
        hackathons are sponsored and verified by trusted partners.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="cta"
          withArrow
          className="rounded-[1.15rem]! px-7! py-3!"
        >
          Explore Hackathons
        </Button>
        <Button variant="secondary" className="rounded-[1.15rem]! px-7! py-3!">
          Submit your project
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-3">
        {HACKATHON_HERO_STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-(--border-default) bg-(--bg-surface) px-4 py-3.5"
          >
            <p className="text-2xl font-geist font-black leading-none text-(--text-heading)">
              {stat.value}
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-(--text-tertiary)">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HackathonsHeroSection;
