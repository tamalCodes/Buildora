import { HACKATHON_HERO_STATS } from "@/features/hackathons/constants/constants";
import Button from "@shared/components/Button";
import SearchCommandCenter from "@shared/components/search/SearchCommandCenter";
import {
  SEARCH_CATEGORIES,
  SEARCH_COMMANDS,
  SEARCH_FACETS,
  SEARCH_GUIDANCE,
  SEARCH_RESULTS,
  SEARCH_SHORTCUTS,
} from "@shared/components/search/mockData";
import React from "react";

const HackathonsHeroSection: React.FC = () => (
  <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
    <div className="space-y-6 lg:col-span-7">
      
      <h1 className="max-w-3xl text-4xl font-geist font-black leading-tight tracking-tight text-[var(--text-heading)] lg:text-6xl">
        Find your next team, prize, and obsession.
      </h1>
      <p className="max-w-2xl text-base text-[var(--text-secondary)]">
        Explore curated challenges across AI, web3, and emerging tech.
        Featured hackathons are sponsored and verified by trusted partners.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button className="!rounded-lg !px-6 !py-3">Explore hackathons</Button>
        <Button variant="secondary" className="!rounded-lg !px-6 !py-3">
          Submit project
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-3 pt-2">
        {HACKATHON_HERO_STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3"
          >
            <p className="text-xl font-geist font-black text-[var(--text-heading)]">{stat.value}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>

    <div className="space-y-4 lg:col-span-5">
      <SearchCommandCenter
        title="Search"
        statusLabel="Updated 3 min ago"
        placeholder="Search hackathons, projects, and builders"
        categories={SEARCH_CATEGORIES}
        facets={SEARCH_FACETS}
        commands={SEARCH_COMMANDS}
        results={SEARCH_RESULTS}
        shortcuts={SEARCH_SHORTCUTS}
        guidance={SEARCH_GUIDANCE}
      />
      <div className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-text)]">
          Team finder
        </p>
        <h3 className="mt-2 text-xl font-geist font-black text-[var(--text-heading)]">
          Meet builders before the build starts.
        </h3>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Browse teams, match with your skill set, and apply instantly to join.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <Button className="!rounded-lg !px-4 !py-2.5 !text-sm">Browse teams</Button>
          <Button variant="outline" className="!rounded-lg !px-4 !py-2.5 !text-sm">
            Create a team
          </Button>
        </div>
      </div>
    </div>
  </section>
);

export default HackathonsHeroSection;
