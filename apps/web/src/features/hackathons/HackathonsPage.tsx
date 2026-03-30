import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@shared/components/Button";
import GlobalNav from "@shared/components/global-nav/GlobalNav";
import SearchCommandCenter from "@shared/components/search/SearchCommandCenter";
import {
  SEARCH_CATEGORIES,
  SEARCH_COMMANDS,
  SEARCH_FACETS,
  SEARCH_GUIDANCE,
  SEARCH_RESULTS,
  SEARCH_SHORTCUTS,
} from "@shared/components/search/mockData";
import {
  FEATURED_HACKATHONS,
  OPEN_HACKATHONS,
  PAST_HACKATHONS,
  UPCOMING_HACKATHONS,
} from "./constants/constants";
import type { Hackathon } from "./constants/types";
import type { HackathonsPageProps } from "./constants/interfaces";

type HackathonCardProps = React.Attributes & {
  hackathon: Hackathon;
  onSelect: () => void;
};

const FeaturedCard = ({ hackathon, onSelect }: HackathonCardProps) => (
  <div
    className="group relative rounded-[2.5rem] overflow-hidden border border-[var(--border-default)] bg-[var(--bg-surface)] min-h-[340px] cursor-pointer"
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
    <div className="absolute inset-0">
      <img
        src={hackathon.coverUrl}
        alt={hackathon.title}
        className="h-full w-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-[var(--overlay-bg)]"></div>
    </div>
    <div className="relative z-10 p-10 lg:p-12 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-default)] p-2">
            <img
              src={hackathon.logoUrl}
              alt={hackathon.title}
              className="w-full h-full rounded-xl"
            />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
              Featured hackathon
            </p>
            <p className="text-sm text-[var(--text-secondary)] font-medium">
              {hackathon.organizer}
            </p>
          </div>
        </div>
        {hackathon.sponsor && (
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] bg-[var(--bg-input)] border border-[var(--border-default)] px-4 py-2 rounded-full">
            {hackathon.sponsor}
          </span>
        )}
      </div>
      <div className="space-y-6">
        <h2 className="text-4xl lg:text-5xl font-geist font-black text-[var(--text-heading)] leading-[1.05] tracking-tight">
          {hackathon.title}
        </h2>
        <div className="flex flex-wrap gap-2">
          {hackathon.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-text)] bg-[var(--accent-bg-soft)] border border-[var(--accent-border)] px-3 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <div className="text-sm font-bold text-[var(--text-secondary)]">
          {hackathon.dates}
        </div>
        <div className="text-sm font-bold text-[var(--text-secondary)]">
          {hackathon.location}
        </div>
        <div className="text-sm font-bold text-[var(--text-primary)]">
          {hackathon.prize}
        </div>
        <div className="text-sm font-bold text-[var(--text-tertiary)]">
          {hackathon.participants}
        </div>
        <div className="ml-auto">
          <Button
            className="!px-6 !py-3 !rounded-xl !text-sm"
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
  </div>
);

const HackathonCard = ({ hackathon, onSelect }: HackathonCardProps) => (
  <div
    className="group glass-card rounded-[2rem] overflow-hidden border border-[var(--border-default)] hover:border-[var(--accent-border-active)] transition-all duration-500 cursor-pointer"
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
    <div className="relative">
      <img
        src={hackathon.coverUrl}
        alt={hackathon.title}
        className="h-40 w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
      />
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] bg-[var(--overlay-bg)] border border-[var(--border-default)] px-3 py-1 rounded-full">
          {hackathon.status}
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-text)] bg-[var(--accent-bg-soft)] border border-[var(--accent-border)] px-3 py-1 rounded-full">
          {hackathon.location}
        </span>
      </div>
    </div>
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-default)] p-2">
          <img
            src={hackathon.logoUrl}
            alt={hackathon.title}
            className="w-full h-full rounded-xl"
          />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[var(--text-heading)] leading-tight">
            {hackathon.title}
          </h3>
          <p className="text-xs font-semibold text-[var(--text-tertiary)]">
            {hackathon.organizer}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {hackathon.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] bg-[var(--bg-input)] border border-[var(--border-default)] px-3 py-1.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 text-xs font-bold text-[var(--text-secondary)]">
        <div>
          <p className="text-[var(--text-tertiary)] uppercase tracking-widest text-[10px]">
            Timeline
          </p>
          <p className="text-[var(--text-primary)] mt-1">{hackathon.dates}</p>
        </div>
        <div>
          <p className="text-[var(--text-tertiary)] uppercase tracking-widest text-[10px]">
            Rewards
          </p>
          <p className="text-[var(--text-primary)] mt-1">{hackathon.prize}</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-6">
        <span className="text-xs font-bold text-[var(--text-tertiary)]">
          {hackathon.participants}
        </span>
        <Button
          variant="secondary"
          className="!px-4 !py-2 !text-xs !rounded-xl"
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

const CompactCard = ({ hackathon, onSelect }: HackathonCardProps) => (
  <div
    className="group flex items-center justify-between gap-6 rounded-[1.5rem] border border-[var(--border-default)] bg-[var(--bg-surface)] px-6 py-5 hover:border-[var(--accent-border)] transition-all cursor-pointer"
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
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-[var(--bg-input)] border border-[var(--border-default)] p-2">
        <img
          src={hackathon.logoUrl}
          alt={hackathon.title}
          className="w-full h-full rounded-lg"
        />
      </div>
      <div>
        <p className="text-sm font-bold text-[var(--text-heading)]">{hackathon.title}</p>
        <p className="text-xs text-[var(--text-tertiary)]">
          {hackathon.location} - {hackathon.dates}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className="hidden md:inline-flex text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] bg-[var(--bg-input)] border border-[var(--border-default)] px-3 py-1 rounded-full">
        {hackathon.status}
      </span>
      <Button
        variant="outline"
        className="!px-4 !py-2 !text-xs !rounded-xl"
        onClick={(event) => {
          event.stopPropagation();
          onSelect();
        }}
      >
        {hackathon.status === "Past" ? "Recap" : "Notify me"}
      </Button>
    </div>
  </div>
);

const HackathonsPage: React.FC<HackathonsPageProps> = ({ user, onSignOut }) => {
  const navigate = useNavigate();
  const handleSelect = (id: string) => {
    navigate(`/hackathons/${id}/overview`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] pb-32 overflow-x-hidden font-inter">
      <GlobalNav user={user} onSignOut={onSignOut} />

      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{ opacity: "var(--blob-opacity)" }}
      >
        <div className="absolute -top-40 left-0 h-[500px] w-[500px] rounded-full bg-indigo-600 blur-[120px]"></div>
        <div className="absolute top-40 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500 blur-[140px]"></div>
        <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-fuchsia-500 blur-[160px]"></div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 space-y-24">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg-soft)] px-4 py-2 text-xs font-black uppercase tracking-widest text-[var(--accent-text)]">
              Buildora Hackathons
            </div>
            <h1 className="text-5xl lg:text-7xl font-geist font-black text-[var(--text-heading)] leading-[0.95] tracking-tight">
              Find your next team, prize, and obsession.
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-xl">
              Explore curated challenges across AI, web3, and emerging tech.
              Featured hackathons are sponsored and verified by our partners.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="!px-8 !py-4 !rounded-2xl">
                Explore hackathons
              </Button>
              <Button variant="secondary" className="!px-8 !py-4 !rounded-2xl">
                Submit project
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-6">
              {[
                { label: "Hackathons live", value: "48" },
                { label: "Prize pool", value: "$3.6M" },
                { label: "Builders active", value: "18k" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] px-4 py-3"
                >
                  <p className="text-2xl font-geist font-black text-[var(--text-heading)]">
                    {stat.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-[var(--text-tertiary)] font-bold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
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

            <div className="rounded-[2.5rem] border border-[var(--border-default)] bg-gradient-to-br from-[var(--accent-bg-soft)] via-transparent to-transparent p-8">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
                Team finder
              </p>
              <h3 className="text-2xl font-geist font-black text-[var(--text-heading)] mt-4">
                Meet builders before the build starts.
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-3">
                Browse teams, match with your skill set, and apply instantly to
                join.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <Button className="!px-6 !py-3 !rounded-xl !text-sm">
                  Browse teams
                </Button>
                <Button
                  variant="outline"
                  className="!px-6 !py-3 !rounded-xl !text-sm"
                >
                  Create a team
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
                Featured hackathons
              </p>
              <h2 className="text-3xl font-geist font-black text-[var(--text-heading)] mt-3">
                Sponsored and verified by Buildora
              </h2>
            </div>
            <Button
              variant="outline"
              className="!px-5 !py-2.5 !text-xs !rounded-xl"
            >
              View all featured
            </Button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            {FEATURED_HACKATHONS.map((hackathon) => (
              <FeaturedCard
                key={hackathon.id}
                hackathon={hackathon}
                onSelect={() => handleSelect(hackathon.id)}
              />
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
                Open hackathons
              </p>
              <h2 className="text-3xl font-geist font-black text-[var(--text-heading)] mt-3">
                Apply while the window is open
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-[var(--accent-bg)] text-[var(--text-on-accent)] shadow-lg shadow-indigo-600/20">
                Open now
              </button>
              <button className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] border border-[var(--border-default)] bg-[var(--bg-input)]">
                Ending soon
              </button>
              <button className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] border border-[var(--border-default)] bg-[var(--bg-input)]">
                Highest prize
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {OPEN_HACKATHONS.map((hackathon) => (
              <HackathonCard
                key={hackathon.id}
                hackathon={hackathon}
                onSelect={() => handleSelect(hackathon.id)}
              />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
                  Upcoming
                </p>
                <h3 className="text-2xl font-geist font-black text-[var(--text-heading)] mt-3">
                  Save the dates
                </h3>
              </div>
              <button className="text-xs font-black uppercase tracking-widest text-[var(--accent-text)]">
                Notify me
              </button>
            </div>
            <div className="space-y-4">
              {UPCOMING_HACKATHONS.map((hackathon) => (
                <CompactCard
                  key={hackathon.id}
                  hackathon={hackathon}
                  onSelect={() => handleSelect(hackathon.id)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
                  Past
                </p>
                <h3 className="text-2xl font-geist font-black text-[var(--text-heading)] mt-3">
                  See what shipped
                </h3>
              </div>
              <button className="text-xs font-black uppercase tracking-widest text-[var(--accent-text)]">
                View highlights
              </button>
            </div>
            <div className="space-y-4">
              {PAST_HACKATHONS.map((hackathon) => (
                <CompactCard
                  key={hackathon.id}
                  hackathon={hackathon}
                  onSelect={() => handleSelect(hackathon.id)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-[var(--border-default)] bg-gradient-to-r from-[var(--accent-bg-soft)] via-transparent to-transparent p-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text-soft)]">
                Buildora for teams
              </p>
              <h3 className="text-3xl font-geist font-black text-[var(--text-heading)] mt-3">
                Sponsor a featured hackathon with Buildora.
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-2xl">
                Launch campaigns, attract high-signal builders, and get
                dedicated support for mentors and judges.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button className="!px-6 !py-3 !rounded-xl">
                Become a sponsor
              </Button>
              <Button variant="outline" className="!px-6 !py-3 !rounded-xl">
                Request deck
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HackathonsPage;
