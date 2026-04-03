import Button from "@shared/components/Button";
import GlobalNav from "@shared/components/global-nav/GlobalNav";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FeaturedProjectsSection from "./components/FeaturedProjectsSection";
import {
  EXPLORE_BY,
  FEATURED_PROJECTS,
  SIGNALS,
  TEAM_SPOTLIGHTS,
  TOP_BUILDERS,
  TRENDING_STACKS,
} from "./constants/constants";
import type {
  Builder,
  ExploreCtaAction,
  ExploreSectionId,
  Signal,
} from "./constants/types";
import type { ExplorePageProps } from "./constants/interfaces";

const ExplorePage: React.FC<ExplorePageProps> = ({ user, onSignOut }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [followedBuilderIds, setFollowedBuilderIds] = useState<
    Set<Builder["id"]>
  >(new Set());
  const [viewedSignalId, setViewedSignalId] = useState<Signal["id"] | null>(
    null
  );
  const [showcaseIntent, setShowcaseIntent] = useState<
    Extract<ExploreCtaAction, { type: "showcase" }>["intent"] | null
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
          navigate(`/projects/${action.projectId}`);
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

  const activeSignal = SIGNALS.find((signal) => signal.id === viewedSignalId);

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] overflow-x-hidden font-inter">
      <GlobalNav user={user} onSignOut={onSignOut} />

      <div className="pointer-events-none fixed inset-0 -z-10" style={{ opacity: "var(--blob-opacity)" }}>
        <div className="absolute -top-40 left-0 h-[520px] w-[520px] rounded-full bg-indigo-600 blur-[140px]"></div>
        <div className="absolute top-1/3 right-0 h-[420px] w-[420px] rounded-full bg-teal-500 blur-[160px]"></div>
        <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-rose-500 blur-[160px]"></div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-24 space-y-24">
        <section
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 scroll-mt-24"
          id="explore-hero"
        >
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg-soft)] px-4 py-2 text-xs font-black uppercase tracking-widest text-[var(--accent-text)]">
              Buildora Explorer
            </div>
            <h1 className="text-5xl lg:text-7xl font-geist font-black text-[var(--text-heading)] leading-[0.95] tracking-tight">
              Discover builders, projects, and teams shaping the future.
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
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
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
                <span>Explore by</span>
                {EXPLORE_BY.map((item) => (
                  <button
                    key={item.label}
                    className="rounded-full border border-[var(--border-default)] bg-[var(--bg-input)] px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:border-[var(--accent-border)] hover:text-[var(--text-heading)] transition"
                    onClick={() => handleCta(item.action)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FeaturedProjectsSection projects={FEATURED_PROJECTS} onCta={handleCta} />

        <section
          className="rounded-[2.5rem] border border-[var(--border-default)] bg-[var(--bg-input)] px-8 py-6 scroll-mt-24"
          id="explore-pulse"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
                Ecosystem pulse
              </p>
              <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-xl">
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
                  className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-input)] px-4 py-3"
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
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6 scroll-mt-24" id="explore-teams">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
                Teams forming
              </p>
              <h3 className="text-2xl font-geist font-black text-[var(--text-heading)] mt-3">
                Collaborations starting this week
              </h3>
            </div>
            <div className="space-y-4">
              {TEAM_SPOTLIGHTS.map((team) => (
                <div
                  key={team.id}
                  className="glass-card rounded-[1.75rem] border border-[var(--border-default)] p-6 space-y-4"
                >
                  <div>
                    <p className="text-sm font-bold text-[var(--text-heading)]">{team.name}</p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">{team.focus}</p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">
                    <span>{team.members} members</span>
                    <span>{team.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 scroll-mt-24" id="explore-stacks">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
                Trending stacks
              </p>
              <h3 className="text-2xl font-geist font-black text-[var(--text-heading)] mt-3">
                Where builders are investing next
              </h3>
            </div>
            <div className="glass-card rounded-[2rem] border border-[var(--border-default)] p-8">
              <div className="flex flex-wrap gap-3">
                {TRENDING_STACKS.map((stack) => (
                  <button
                    key={stack}
                    className="rounded-full border border-[var(--border-default)] bg-[var(--bg-input)] px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:border-[var(--accent-border)] hover:text-[var(--text-heading)] transition"
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
              <p className="text-xs text-[var(--text-tertiary)] mt-6">
                Tap a stack to jump back into the latest launches.
              </p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6 scroll-mt-24" id="explore-builders">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
                Top builders
              </p>
              <h3 className="text-2xl font-geist font-black text-[var(--text-heading)] mt-3">
                People to follow right now
              </h3>
            </div>
            <div className="space-y-4">
              {TOP_BUILDERS.map((builder) => (
                <div
                  key={builder.id}
                  className="glass-card rounded-[1.75rem] border border-[var(--border-default)] p-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={builder.avatarUrl}
                      alt={builder.name}
                      className="w-12 h-12 rounded-2xl border border-[var(--border-default)]"
                    />
                    <div>
                      <p className="text-sm font-bold text-[var(--text-heading)]">
                        {builder.name}
                      </p>
                      <p className="text-xs text-[var(--text-tertiary)]">{builder.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent-text)] bg-[var(--accent-bg-soft)] border border-[var(--accent-border)] px-3 py-1 rounded-full">
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
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
                Signals
              </p>
              <h3 className="text-2xl font-geist font-black text-[var(--text-heading)] mt-3">
                Launches and milestones today
              </h3>
              {activeSignal ? (
                <p className="text-xs text-[var(--text-secondary)] mt-3">
                  Last viewed: {activeSignal.title}.
                </p>
              ) : null}
            </div>
            <div className="glass-card rounded-[2.5rem] border border-[var(--border-default)] p-8 space-y-6">
              {SIGNALS.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-bold text-[var(--text-heading)]">{item.title}</p>
                    <p className="text-xs text-[var(--text-tertiary)] mt-1">{item.meta}</p>
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
          className="rounded-[2.5rem] border border-[var(--accent-border)] bg-gradient-to-r from-[var(--accent-bg-soft)] via-transparent to-cyan-500/10 p-10 scroll-mt-24"
          id="explore-showcase"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text-soft)]">
                Buildora Explorer
              </p>
              <h3 className="text-3xl font-geist font-black text-[var(--text-heading)] mt-3">
                Tell the community what you are building.
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-2xl">
                Share your project, highlight your team, and attract
                collaborators in minutes.
              </p>
              {showcaseIntent ? (
                <p className="text-xs text-[var(--text-secondary)] mt-4">
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
