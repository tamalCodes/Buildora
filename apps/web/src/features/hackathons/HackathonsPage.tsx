import React from "react";
import Button from "../../shared/components/Button";
import GlobalNav from "../../shared/components/global-nav/GlobalNav";
import Input from "../../shared/components/Input";
import {
  FEATURED_HACKATHONS,
  FILTERS,
  OPEN_HACKATHONS,
  PAST_HACKATHONS,
  UPCOMING_HACKATHONS,
} from "./constants";
import type { Hackathon, HackathonsPageProps } from "./types";

const FeaturedCard = ({ hackathon }: { hackathon: Hackathon }) => (
  <div className="group relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 min-h-[340px]">
    <div className="absolute inset-0">
      <img src={hackathon.coverUrl} alt={hackathon.title} className="h-full w-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070a12] via-[#070a12]/60 to-[#070a12]/10"></div>
    </div>
    <div className="relative z-10 p-10 lg:p-12 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 p-2">
            <img src={hackathon.logoUrl} alt={hackathon.title} className="w-full h-full rounded-xl" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">Featured hackathon</p>
            <p className="text-sm text-slate-400 font-medium">{hackathon.organizer}</p>
          </div>
        </div>
        {hackathon.sponsor && (
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-200 bg-white/10 border border-white/10 px-4 py-2 rounded-full">
            {hackathon.sponsor}
          </span>
        )}
      </div>
      <div className="space-y-6">
        <h2 className="text-4xl lg:text-5xl font-geist font-black text-white leading-[1.05] tracking-tight">
          {hackathon.title}
        </h2>
        <div className="flex flex-wrap gap-2">
          {hackathon.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <div className="text-sm font-bold text-slate-300">{hackathon.dates}</div>
        <div className="text-sm font-bold text-slate-400">{hackathon.location}</div>
        <div className="text-sm font-bold text-slate-200">{hackathon.prize}</div>
        <div className="text-sm font-bold text-slate-500">{hackathon.participants}</div>
        <div className="ml-auto">
          <Button className="!px-6 !py-3 !rounded-xl !text-sm">Apply now</Button>
        </div>
      </div>
    </div>
  </div>
);

const HackathonCard = ({ hackathon }: { hackathon: Hackathon }) => (
  <div className="group glass-card rounded-[2rem] overflow-hidden border border-white/10 hover:border-indigo-500/40 transition-all duration-500">
    <div className="relative">
      <img src={hackathon.coverUrl} alt={hackathon.title} className="h-40 w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-white bg-black/40 border border-white/20 px-3 py-1 rounded-full">
          {hackathon.status}
        </span>
        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200 bg-indigo-500/20 border border-indigo-500/30 px-3 py-1 rounded-full">
          {hackathon.location}
        </span>
      </div>
    </div>
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 p-2">
          <img src={hackathon.logoUrl} alt={hackathon.title} className="w-full h-full rounded-xl" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white leading-tight">{hackathon.title}</h3>
          <p className="text-xs font-semibold text-slate-500">{hackathon.organizer}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {hackathon.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-400">
        <div>
          <p className="text-slate-500 uppercase tracking-widest text-[10px]">Timeline</p>
          <p className="text-slate-200 mt-1">{hackathon.dates}</p>
        </div>
        <div>
          <p className="text-slate-500 uppercase tracking-widest text-[10px]">Rewards</p>
          <p className="text-slate-200 mt-1">{hackathon.prize}</p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-white/5 pt-6">
        <span className="text-xs font-bold text-slate-500">{hackathon.participants}</span>
        <Button variant="secondary" className="!px-4 !py-2 !text-xs !rounded-xl">View details</Button>
      </div>
    </div>
  </div>
);

const CompactCard = ({ hackathon }: { hackathon: Hackathon }) => (
  <div className="group flex items-center justify-between gap-6 rounded-[1.5rem] border border-white/10 bg-white/5 px-6 py-5 hover:border-indigo-500/30 transition-all">
    <div className="flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 p-2">
        <img src={hackathon.logoUrl} alt={hackathon.title} className="w-full h-full rounded-lg" />
      </div>
      <div>
        <p className="text-sm font-bold text-white">{hackathon.title}</p>
        <p className="text-xs text-slate-500">{hackathon.location} · {hackathon.dates}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <span className="hidden md:inline-flex text-[10px] font-black uppercase tracking-widest text-slate-300 bg-white/10 border border-white/10 px-3 py-1 rounded-full">
        {hackathon.status}
      </span>
      <Button variant="outline" className="!px-4 !py-2 !text-xs !rounded-xl">
        {hackathon.status === 'Past' ? 'Recap' : 'Notify me'}
      </Button>
    </div>
  </div>
);

const HackathonsPage: React.FC<HackathonsPageProps> = ({ user, onSignOut }) => {
  return (
    <div className="min-h-screen bg-[#06080f] text-slate-100 pb-32 overflow-x-hidden font-inter">
      <GlobalNav user={user} onSignOut={onSignOut} />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-0 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]"></div>
        <div className="absolute top-40 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[140px]"></div>
        <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-fuchsia-500/10 blur-[160px]"></div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 space-y-24">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-indigo-300">
              Buildora Hackathons
            </div>
            <h1 className="text-5xl lg:text-7xl font-geist font-black text-white leading-[0.95] tracking-tight">
              Find your next team, prize, and obsession.
            </h1>
            <p className="text-lg text-slate-400 max-w-xl">
              Explore curated challenges across AI, web3, and emerging tech. Featured hackathons are sponsored and verified by our partners.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="!px-8 !py-4 !rounded-2xl">Explore hackathons</Button>
              <Button variant="secondary" className="!px-8 !py-4 !rounded-2xl">Submit project</Button>
            </div>
            <div className="grid grid-cols-3 gap-6 pt-6">
              {[
                { label: 'Hackathons live', value: '48' },
                { label: 'Prize pool', value: '$3.6M' },
                { label: 'Builders active', value: '18k' }
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-2xl font-geist font-black text-white">{stat.value}</p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card rounded-[2.5rem] p-8 border-white/10">
              <div className="flex items-center justify-between">
                <p className="text-sm font-black uppercase tracking-widest text-slate-400">Search</p>
                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                  Updated 3 min ago
                </span>
              </div>
              <div className="pt-6">
                <Input
                  placeholder="Search hackathons, organizers, or tech stacks"
                  leftElement={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  }
                />
              </div>
              <div className="flex flex-wrap gap-2 pt-6">
                {FILTERS.map((filter, index) => (
                  <button
                    key={filter}
                    className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${
                      index === 0
                        ? 'bg-white text-slate-950 border-white'
                        : 'bg-white/5 text-slate-400 border-white/10 hover:border-indigo-500/40 hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-indigo-600/20 via-indigo-600/5 to-transparent p-8">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">Team finder</p>
              <h3 className="text-2xl font-geist font-black text-white mt-4">Meet builders before the build starts.</h3>
              <p className="text-sm text-slate-400 mt-3">
                Browse teams, match with your skill set, and apply instantly to join.
              </p>
              <div className="flex items-center gap-4 mt-6">
                <Button className="!px-6 !py-3 !rounded-xl !text-sm">Browse teams</Button>
                <Button variant="outline" className="!px-6 !py-3 !rounded-xl !text-sm">Create a team</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">Featured hackathons</p>
              <h2 className="text-3xl font-geist font-black text-white mt-3">Sponsored and verified by Buildora</h2>
            </div>
            <Button variant="outline" className="!px-5 !py-2.5 !text-xs !rounded-xl">View all featured</Button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
            {FEATURED_HACKATHONS.map((hackathon) => (
              <FeaturedCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">Open hackathons</p>
              <h2 className="text-3xl font-geist font-black text-white mt-3">Apply while the window is open</h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white shadow-lg shadow-indigo-600/20">Open now</button>
              <button className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 border border-white/10">Ending soon</button>
              <button className="px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 border border-white/10">Highest prize</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
            {OPEN_HACKATHONS.map((hackathon) => (
              <HackathonCard key={hackathon.id} hackathon={hackathon} />
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">Upcoming</p>
                <h3 className="text-2xl font-geist font-black text-white mt-3">Save the dates</h3>
              </div>
              <button className="text-xs font-black uppercase tracking-widest text-indigo-300">Notify me</button>
            </div>
            <div className="space-y-4">
              {UPCOMING_HACKATHONS.map((hackathon) => (
                <CompactCard key={hackathon.id} hackathon={hackathon} />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">Past</p>
                <h3 className="text-2xl font-geist font-black text-white mt-3">See what shipped</h3>
              </div>
              <button className="text-xs font-black uppercase tracking-widest text-indigo-300">View highlights</button>
            </div>
            <div className="space-y-4">
              {PAST_HACKATHONS.map((hackathon) => (
                <CompactCard key={hackathon.id} hackathon={hackathon} />
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-indigo-600/20 via-transparent to-cyan-500/20 p-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-200">Buildora for teams</p>
              <h3 className="text-3xl font-geist font-black text-white mt-3">Sponsor a featured hackathon with Buildora.</h3>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                Launch campaigns, attract high-signal builders, and get dedicated support for mentors and judges.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button className="!px-6 !py-3 !rounded-xl">Become a sponsor</Button>
              <Button variant="outline" className="!px-6 !py-3 !rounded-xl">Request deck</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HackathonsPage;


