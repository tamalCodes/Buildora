import Button from "@shared/components/Button";
import GlobalNav from "@shared/components/global-nav/GlobalNav";
import { ArrowRight } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FeaturedProjectsSection from "./components/FeaturedProjectsSection";
import {
  BUILDER_SPOTLIGHT,
  EXPLORE_BY,
  FEATURED_BUILDERS,
  FEATURED_PROJECTS,
  SIGNALS,
  TEAM_SPOTLIGHTS,
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
                className="!px-7 !py-3 !rounded-[1.15rem] !justify-between gap-3 shadow-[0_18px_45px_rgba(79,70,229,0.22)] hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(79,70,229,0.3)] active:translate-y-[1px] active:shadow-[0_12px_28px_rgba(79,70,229,0.18)]"
                onClick={() =>
                  handleCta({
                    type: "scroll",
                    targetId: "explore-projects",
                  })
                }
              >
                <span className="flex items-center gap-3">
                  <span className="relative overflow-hidden rounded-full">
                    <span className="relative z-10">Start exploring</span>
                    <span className="pointer-events-none absolute inset-0 -z-0 rounded-full bg-white/12 opacity-0 blur-md transition duration-300 group-hover:opacity-100"></span>
                  </span>
                  <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/14 text-white transition duration-300 group-hover:translate-x-1 group-hover:scale-110 group-hover:bg-white/22 group-active:translate-x-0.5 group-active:scale-95">
                    <span className="pointer-events-none absolute inset-0 rounded-full border border-white/30 opacity-0 transition duration-300 group-hover:scale-[1.35] group-hover:opacity-100 group-active:scale-110"></span>
                    <span className="pointer-events-none absolute inset-0 rounded-full bg-white/10 opacity-0 blur-[10px] transition duration-300 group-hover:opacity-100"></span>
                    <ArrowRight
                      aria-hidden="true"
                      className="relative z-10 h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-active:translate-x-0"
                      strokeWidth={2.4}
                    />
                  </span>
                </span>
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

        <section className="space-y-10">
          <div className="space-y-6 scroll-mt-24" id="explore-builders">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
                Featured builders
              </p>
              <h3 className="text-2xl font-geist font-black text-[var(--text-heading)] mt-3">
                Builders shipping standout work right now
              </h3>
              <p className="mt-3 max-w-2xl text-sm text-[var(--text-secondary)]">
                A cleaner spotlight for the people building with range, taste,
                and actual momentum across the Buildora ecosystem.
              </p>
            </div>

            <div className="glass-card rounded-[2.5rem] border border-[var(--border-default)] p-4 sm:p-5 lg:p-6">
              <div className="grid grid-cols-1 gap-5 lg:gap-6 2xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
                <article className="relative min-h-[300px] overflow-hidden rounded-[2rem] border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-[0_24px_70px_rgba(15,23,42,0.14)] lg:min-h-[340px]">
                  <img
                    src={BUILDER_SPOTLIGHT.imageUrl}
                    alt={BUILDER_SPOTLIGHT.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[var(--spotlight-image-overlay)]" />

                  <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--spotlight-text-strong)]">
                          Builder spotlight
                        </p>
                        <p className="mt-2 text-sm text-[var(--spotlight-text-muted)]">
                          {BUILDER_SPOTLIGHT.location}
                        </p>
                      </div>
                    </div>

                    <div className="max-w-[78%] rounded-[1.5rem] border border-white/10 bg-[var(--spotlight-content-bg)] p-4 backdrop-blur-sm sm:max-w-[82%] sm:p-5">
                      <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={BUILDER_SPOTLIGHT.avatarUrl}
                            alt={BUILDER_SPOTLIGHT.name}
                            className="h-12 w-12 rounded-2xl border border-white/20 object-cover"
                          />
                          <div>
                            <p className="text-lg font-bold text-[var(--spotlight-text-strong)]">
                              {BUILDER_SPOTLIGHT.name}
                            </p>
                            <p className="text-sm text-[var(--spotlight-text-body)]">
                              {BUILDER_SPOTLIGHT.role}
                            </p>
                          </div>
                        </div>
                        <h4 className="max-w-[14ch] text-3xl font-geist font-black leading-[0.95] tracking-tight text-[var(--spotlight-text-strong)] sm:text-5xl">
                          {BUILDER_SPOTLIGHT.title}
                        </h4>
                        <p className="max-w-lg text-sm font-semibold text-[var(--spotlight-text-strong)] sm:text-base">
                          {BUILDER_SPOTLIGHT.headline}
                        </p>
                        <p className="max-w-lg text-sm leading-6 text-[var(--spotlight-text-body)]">
                          {BUILDER_SPOTLIGHT.summary}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-[var(--spotlight-text-body)]">
                            {BUILDER_SPOTLIGHT.currentProject}
                          </p>
                          <p className="mt-1 text-xs text-[var(--spotlight-text-muted)]">
                            {BUILDER_SPOTLIGHT.metrics[0].value} live launches ·{" "}
                            {BUILDER_SPOTLIGHT.metrics[1].value} builder reach
                          </p>
                        </div>
                        <Button
                          variant={
                            followedBuilderIds.has(BUILDER_SPOTLIGHT.id)
                              ? "secondary"
                              : "outline"
                          }
                          className="!w-full sm:!w-fit !rounded-2xl !border-white/20 !bg-white/10 !px-5 !py-3 !text-sm !text-white backdrop-blur-md hover:!border-white/35 hover:!bg-white/16"
                          aria-pressed={followedBuilderIds.has(BUILDER_SPOTLIGHT.id)}
                          onClick={() =>
                            handleCta({
                              type: "followBuilder",
                              builderId: BUILDER_SPOTLIGHT.id,
                            })
                          }
                        >
                          {followedBuilderIds.has(BUILDER_SPOTLIGHT.id)
                            ? "Following"
                            : "Follow builder"}
                        </Button>
                      </div>
                    </div>
                    </div>
                  </div>
                </article>

                <div className="space-y-4">
                  {FEATURED_BUILDERS.slice(0, 2).map((builder) => (
                    <article
                      key={builder.id}
                      className="rounded-[1.75rem] border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 shadow-[0_14px_40px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-[var(--accent-border)]"
                    >
                      <div className="flex flex-col gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-3">
                                <img
                                  src={builder.avatarUrl}
                                  alt={builder.name}
                                  className="h-10 w-10 rounded-xl border border-[var(--border-default)] object-cover"
                                />
                                <div>
                                  <p className="text-base font-bold text-[var(--text-heading)]">
                                    {builder.name}
                                  </p>
                                  <p className="text-xs text-[var(--text-tertiary)]">
                                    {builder.role}
                                  </p>
                                </div>
                              </div>
                              <p className="mt-3 text-lg font-geist font-black leading-tight text-[var(--text-heading)]">
                                {builder.headline}
                              </p>
                            </div>
                          </div>

                          <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
                            {builder.summary}
                          </p>

                          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-xs text-[var(--text-tertiary)]">
                              {builder.currentProject} · {builder.location}
                            </div>
                            <Button
                              variant={
                                followedBuilderIds.has(builder.id)
                                  ? "secondary"
                                  : "outline"
                              }
                              className="!w-full sm:!w-fit !px-4 !py-2.5 !text-xs !rounded-xl"
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
                      </div>
                    </article>
                  ))}
                </div>
              </div>
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
            <div className="glass-card rounded-[2.5rem] border border-[var(--border-default)] p-6 sm:p-7">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                {SIGNALS.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[1.4rem] border border-[var(--border-default)] bg-[var(--bg-input)] p-4 sm:p-5"
                  >
                    <div className="flex h-full flex-col justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-[var(--text-heading)]">{item.title}</p>
                        <p className="text-xs text-[var(--text-tertiary)] mt-1">{item.meta}</p>
                      </div>
                      <Button
                        variant="secondary"
                        className="!w-full sm:!w-fit !px-4 !py-2 !text-xs !rounded-xl"
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
                  </div>
                ))}
              </div>
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
