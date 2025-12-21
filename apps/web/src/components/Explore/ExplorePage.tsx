import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import GlobalNav from "../UI/GlobalNav";
import { User } from "@buildora/shared";

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

type Team = {
  id: string;
  name: string;
  focus: string;
  members: number;
  location: string;
};

type Signal = {
  id: string;
  title: string;
  meta: string;
};

type ExploreSectionId =
  | "explore-hero"
  | "explore-projects"
  | "explore-teams"
  | "explore-stacks"
  | "explore-pulse"
  | "explore-builders"
  | "explore-signals"
  | "explore-showcase";

type ExploreCtaAction =
  | { type: "scroll"; targetId: ExploreSectionId }
  | { type: "navigate"; to: string }
  | { type: "viewProject"; projectId: Project["id"] }
  | { type: "followBuilder"; builderId: Builder["id"] }
  | { type: "viewSignal"; signalId: Signal["id"] }
  | { type: "showcase"; intent: "create" | "highlights" };

type ExploreCta = {
  label: string;
  action: ExploreCtaAction;
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

const TEAM_SPOTLIGHTS: Team[] = [
  {
    id: "t1",
    name: "Helios Labs",
    focus: "Spatial analytics for climate response.",
    members: 7,
    location: "Nairobi + Remote",
  },
  {
    id: "t2",
    name: "Kintsugi Systems",
    focus: "On-chain treasury tools for DAOs.",
    members: 4,
    location: "Berlin",
  },
  {
    id: "t3",
    name: "Threadline",
    focus: "Story-driven onboarding for AI apps.",
    members: 6,
    location: "Austin + Remote",
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

const SIGNALS: Signal[] = [
  {
    id: "s1",
    title: "Signal Forge hit 10k teams",
    meta: "Milestone - 3 hours ago",
  },
  {
    id: "s2",
    title: "Lume Atlas opens beta waitlist",
    meta: "Launch - Today",
  },
  {
    id: "s3",
    title: "Mintstream announces creator grants",
    meta: "Announcement - Today",
  },
];

const EXPLORE_BY: ExploreCta[] = [
  {
    label: "Projects",
    action: { type: "scroll", targetId: "explore-projects" },
  },
  {
    label: "Builders",
    action: { type: "scroll", targetId: "explore-builders" },
  },
  {
    label: "Teams",
    action: { type: "scroll", targetId: "explore-teams" },
  },
  {
    label: "Stacks",
    action: { type: "scroll", targetId: "explore-stacks" },
  },
];

interface ExplorePageProps {
  user?: User | null;
  onSignOut?: () => void;
}

const ExplorePage: React.FC<ExplorePageProps> = ({ user, onSignOut }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeProjectId, setActiveProjectId] = useState<Project["id"] | null>(
    null
  );
  const [followedBuilderIds, setFollowedBuilderIds] = useState<
    Set<Builder["id"]>
  >(new Set());
  const [viewedSignalId, setViewedSignalId] = useState<Signal["id"] | null>(
    null
  );
  const [showcaseIntent, setShowcaseIntent] = useState<
    ExploreCtaAction["intent"] | null
  >(null);

  const scrollToSection = useCallback((targetId: ExploreSectionId) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleCta = useCallback(
    (action: ExploreCtaAction) => {
      switch (action.type) {
        case "scroll": {
          const hash = `#${action.targetId}`;
          if (location.hash === hash) {
            scrollToSection(action.targetId);
            return;
          }
          navigate(`/explore${hash}`);
          return;
        }
        case "navigate":
          navigate(action.to);
          return;
        case "viewProject": {
          setActiveProjectId(action.projectId);
          const hash = "#explore-projects";
          if (location.hash === hash) {
            scrollToSection("explore-projects");
            return;
          }
          navigate(`/explore${hash}`);
          return;
        }
        case "followBuilder":
          setFollowedBuilderIds((prev) => {
            const next = new Set(prev);
            if (next.has(action.builderId)) {
              next.delete(action.builderId);
            } else {
              next.add(action.builderId);
            }
            return next;
          });
          return;
        case "viewSignal": {
          setViewedSignalId(action.signalId);
          const hash = "#explore-signals";
          if (location.hash === hash) {
            scrollToSection("explore-signals");
            return;
          }
          navigate(`/explore${hash}`);
          return;
        }
        case "showcase": {
          setShowcaseIntent(action.intent);
          const targetId =
            action.intent === "highlights"
              ? "explore-projects"
              : "explore-showcase";
          const hash = `#${targetId}`;
          if (location.hash === hash) {
            scrollToSection(targetId);
            return;
          }
          navigate(`/explore${hash}`);
          return;
        }
        default:
          return;
      }
    },
    [location.hash, navigate, scrollToSection]
  );

  useEffect(() => {
    if (!location.hash) {
      return;
    }
    const targetId = location.hash.replace("#", "") as ExploreSectionId;
    scrollToSection(targetId);
  }, [location.hash, scrollToSection]);

  const activeProject = FEATURED_PROJECTS.find(
    (project) => project.id === activeProjectId
  );
  const activeSignal = SIGNALS.find((signal) => signal.id === viewedSignalId);

  return (
    <div className="min-h-screen bg-[#05060c] text-slate-100 overflow-x-hidden font-inter">
      <GlobalNav user={user} onSignOut={onSignOut} />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-0 h-[520px] w-[520px] rounded-full bg-indigo-600/15 blur-[140px]"></div>
        <div className="absolute top-1/3 right-0 h-[420px] w-[420px] rounded-full bg-teal-500/10 blur-[160px]"></div>
        <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-rose-500/10 blur-[160px]"></div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-24 space-y-24">
        <section
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 scroll-mt-24"
          id="explore-hero"
        >
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
              <Button
                className="!px-8 !py-4 !rounded-2xl"
                onClick={() =>
                  handleCta({
                    type: "scroll",
                    targetId: "explore-projects",
                  })
                }
              >
                Start exploring
              </Button>
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">
                <span>Explore by</span>
                {EXPLORE_BY.map((item) => (
                  <button
                    key={item.label}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:border-indigo-500/40 hover:text-white transition"
                    onClick={() => handleCta(item.action)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8 scroll-mt-24" id="explore-projects">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
                Featured launches
              </p>
              <h2 className="text-3xl font-geist font-black text-white mt-3">
                Curated projects from the Buildora ecosystem
              </h2>
              {activeProject ? (
                <p className="text-xs text-slate-400 mt-3">
                  Viewing {activeProject.title} right now.
                </p>
              ) : null}
            </div>
            <Button
              variant="outline"
              className="!px-5 !py-2.5 !text-xs !rounded-xl"
              onClick={() =>
                handleCta({
                  type: "scroll",
                  targetId: "explore-projects",
                })
              }
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
                      onClick={() =>
                        handleCta({
                          type: "viewProject",
                          projectId: project.id,
                        })
                      }
                    >
                      {activeProjectId === project.id
                        ? "Viewing"
                        : "View project"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="rounded-[2.5rem] border border-white/10 bg-white/5 px-8 py-6 scroll-mt-24"
          id="explore-pulse"
        >
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
          <div className="space-y-6 scroll-mt-24" id="explore-teams">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
                Teams forming
              </p>
              <h3 className="text-2xl font-geist font-black text-white mt-3">
                Collaborations starting this week
              </h3>
            </div>
            <div className="space-y-4">
              {TEAM_SPOTLIGHTS.map((team) => (
                <div
                  key={team.id}
                  className="glass-card rounded-[1.75rem] border border-white/10 p-6 space-y-4"
                >
                  <div>
                    <p className="text-sm font-bold text-white">{team.name}</p>
                    <p className="text-xs text-slate-500 mt-1">{team.focus}</p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    <span>{team.members} members</span>
                    <span>{team.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 scroll-mt-24" id="explore-stacks">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
                Trending stacks
              </p>
              <h3 className="text-2xl font-geist font-black text-white mt-3">
                Where builders are investing next
              </h3>
            </div>
            <div className="glass-card rounded-[2rem] border border-white/10 p-8">
              <div className="flex flex-wrap gap-3">
                {TRENDING_STACKS.map((stack) => (
                  <button
                    key={stack}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:border-indigo-500/40 hover:text-white transition"
                    onClick={() =>
                      handleCta({
                        type: "scroll",
                        targetId: "explore-projects",
                      })
                    }
                  >
                    {stack}
                  </button>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-6">
                Tap a stack to jump back into the latest launches.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6 scroll-mt-24" id="explore-builders">
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
                      variant={
                        followedBuilderIds.has(builder.id)
                          ? "secondary"
                          : "outline"
                      }
                      className="!px-4 !py-2 !text-xs !rounded-xl"
                      aria-pressed={followedBuilderIds.has(builder.id)}
                      onClick={() =>
                        handleCta({
                          type: "followBuilder",
                          builderId: builder.id,
                        })
                      }
                    >
                      {followedBuilderIds.has(builder.id)
                        ? "Following"
                        : "Follow"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 scroll-mt-24" id="explore-signals">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
                Signals
              </p>
              <h3 className="text-2xl font-geist font-black text-white mt-3">
                Launches and milestones today
              </h3>
              {activeSignal ? (
                <p className="text-xs text-slate-400 mt-3">
                  Last viewed: {activeSignal.title}.
                </p>
              ) : null}
            </div>
            <div className="glass-card rounded-[2.5rem] border border-white/10 p-8 space-y-6">
              {SIGNALS.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.meta}</p>
                  </div>
                  <Button
                    variant="secondary"
                    className="!px-4 !py-2 !text-xs !rounded-xl"
                    aria-pressed={viewedSignalId === item.id}
                    onClick={() =>
                      handleCta({
                        type: "viewSignal",
                        signalId: item.id,
                      })
                    }
                  >
                    {viewedSignalId === item.id ? "Viewed" : "View"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-indigo-600/20 via-transparent to-cyan-500/20 p-10 scroll-mt-24"
          id="explore-showcase"
        >
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
              {showcaseIntent ? (
                <p className="text-xs text-slate-300 mt-4">
                  Ready to {showcaseIntent === "create" ? "create" : "explore"}?
                  We will open the next step here.
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-3">
              <Button
                className="!px-6 !py-3 !rounded-xl"
                onClick={() =>
                  handleCta({
                    type: "showcase",
                    intent: "create",
                  })
                }
              >
                Create a showcase
              </Button>
              <Button
                variant="outline"
                className="!px-6 !py-3 !rounded-xl"
                onClick={() =>
                  handleCta({
                    type: "showcase",
                    intent: "highlights",
                  })
                }
              >
                Explore highlights
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ExplorePage;
