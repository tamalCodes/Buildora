import React from "react";
import Button from "../UI/Button";
import Footer from "../UI/Footer";
import GlobalNav from "../UI/GlobalNav";

type Project = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  upvotes: number;
  coverUrl: string;
};

type Builder = {
  id: string;
  name: string;
  role: string;
  badge: string;
  avatarUrl: string;
};

const FEATURED_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Lume Atlas",
    summary: "Visual ops layer for shipping open data pipelines in days.",
    stack: ["Next.js", "Vector", "Postgres"],
    upvotes: 824,
    coverUrl:
      "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "p2",
    title: "Signal Forge",
    summary: "Realtime insights for distributed engineering teams.",
    stack: ["Rust", "Kafka", "WebGL"],
    upvotes: 563,
    coverUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "p3",
    title: "Mintstream",
    summary: "Creator economy rails for communities and on-chain clubs.",
    stack: ["Solidity", "ZK", "React"],
    upvotes: 417,
    coverUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop",
  },
];

const TOP_BUILDERS: Builder[] = [
  {
    id: "b1",
    name: "Anya Dsouza",
    role: "Product Engineer",
    badge: "Top 1% Builder",
    avatarUrl: "https://i.pravatar.cc/150?u=anya",
  },
  {
    id: "b2",
    name: "Rahil K",
    role: "Protocol Designer",
    badge: "Hackathon Winner",
    avatarUrl: "https://i.pravatar.cc/150?u=rahil",
  },
  {
    id: "b3",
    name: "Meera Das",
    role: "AI Engineer",
    badge: "Community Lead",
    avatarUrl: "https://i.pravatar.cc/150?u=meera",
  },
];

const TRENDING_STACKS = [
  "Agents",
  "Rust",
  "Solidity",
  "RAG",
  "Design Systems",
  "ZK",
  "Edge",
];

const ExplorePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05060c] text-slate-100 overflow-x-hidden font-inter">
      <GlobalNav />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-0 h-[520px] w-[520px] rounded-full bg-indigo-600/15 blur-[140px]"></div>
        <div className="absolute top-1/3 right-0 h-[420px] w-[420px] rounded-full bg-teal-500/10 blur-[160px]"></div>
        <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-rose-500/10 blur-[160px]"></div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-24 space-y-24">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-indigo-300">
              Buildora Explorer
            </div>
            <h1 className="text-5xl lg:text-7xl font-geist font-black text-white leading-[0.95] tracking-tight">
              Discover builders, projects, and teams shaping what comes next.
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              Explore the Buildora ecosystem. Track launches, follow standout
              teams, and find collaborators across every stack.
            </p>
            <div className="space-y-5">
              <Button className="!px-8 !py-4 !rounded-2xl">
                Start exploring
              </Button>
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">
                <span>Explore by</span>
                {["Projects", "Builders", "Teams", "Stacks"].map((item) => (
                  <button
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:border-indigo-500/40 hover:text-white transition"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
                Featured launches
              </p>
              <h2 className="text-3xl font-geist font-black text-white mt-3">
                Curated projects from the Buildora ecosystem
              </h2>
            </div>
            <Button
              variant="outline"
              className="!px-5 !py-2.5 !text-xs !rounded-xl"
            >
              View all projects
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {FEATURED_PROJECTS.map((project) => (
              <div
                key={project.id}
                className="glass-card rounded-[2.5rem] overflow-hidden border border-white/10 group"
              >
                <div className="relative">
                  <img
                    src={project.coverUrl}
                    alt={project.title}
                    className="h-52 w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060c] via-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-geist font-black text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-300 mt-1">
                      {project.summary}
                    </p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((stack) => (
                      <span
                        key={stack}
                        className="text-[10px] font-black uppercase tracking-widest text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
                      >
                        {stack}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">
                      {project.upvotes} upvotes
                    </span>
                    <Button
                      variant="secondary"
                      className="!px-4 !py-2 !text-xs !rounded-xl"
                    >
                      View project
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-white/10 bg-white/5 px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
                Ecosystem pulse
              </p>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                A quick snapshot of activity across the Buildora network.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "New launches", value: "128" },
                { label: "Active builders", value: "21k" },
                { label: "Teams forming", value: "640" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <p className="text-2xl font-geist font-black text-white">
                    {stat.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
                Top builders
              </p>
              <h3 className="text-2xl font-geist font-black text-white mt-3">
                People to follow right now
              </h3>
            </div>
            <div className="space-y-4">
              {TOP_BUILDERS.map((builder) => (
                <div
                  key={builder.id}
                  className="glass-card rounded-[1.75rem] border border-white/10 p-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={builder.avatarUrl}
                      alt={builder.name}
                      className="w-12 h-12 rounded-2xl border border-white/10"
                    />
                    <div>
                      <p className="text-sm font-bold text-white">
                        {builder.name}
                      </p>
                      <p className="text-xs text-slate-500">{builder.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                      {builder.badge}
                    </span>
                    <Button
                      variant="outline"
                      className="!px-4 !py-2 !text-xs !rounded-xl"
                    >
                      Follow
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
                Signals
              </p>
              <h3 className="text-2xl font-geist font-black text-white mt-3">
                Launches and milestones today
              </h3>
            </div>
            <div className="glass-card rounded-[2.5rem] border border-white/10 p-8 space-y-6">
              {[
                {
                  title: "Signal Forge hit 10k teams",
                  meta: "Milestone · 3 hours ago",
                },
                {
                  title: "Lume Atlas opens beta waitlist",
                  meta: "Launch · Today",
                },
                {
                  title: "Mintstream announces creator grants",
                  meta: "Announcement · Today",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.meta}</p>
                  </div>
                  <Button
                    variant="secondary"
                    className="!px-4 !py-2 !text-xs !rounded-xl"
                  >
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-indigo-600/20 via-transparent to-cyan-500/20 p-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-200">
                Buildora Explorer
              </p>
              <h3 className="text-3xl font-geist font-black text-white mt-3">
                Tell the community what you are building.
              </h3>
              <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                Share your project, highlight your team, and attract
                collaborators in minutes.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button className="!px-6 !py-3 !rounded-xl">
                Create a showcase
              </Button>
              <Button variant="outline" className="!px-6 !py-3 !rounded-xl">
                Explore highlights
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage;
