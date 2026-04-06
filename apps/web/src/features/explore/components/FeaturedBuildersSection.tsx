import Button from "@shared/components/Button";
import React from "react";
import { BUILDER_SPOTLIGHT, FEATURED_BUILDERS } from "../constants/constants";
import type { FeaturedBuildersSectionProps } from "@/features/explore/constants/interfaces";

const FeaturedBuildersSection: React.FC<FeaturedBuildersSectionProps> = ({
  followedBuilderIds,
  onCta,
}) => (
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
          A cleaner spotlight for the people building with range, taste, and
          actual momentum across the Buildora ecosystem.
        </p>
      </div>

      <div className="glass-card rounded-[2.5rem] border border-[var(--border-default)] p-4 sm:p-5 lg:p-6">
        <div className="grid grid-cols-1 gap-5 lg:gap-6 2xl:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
          <article className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-[0_24px_70px_rgba(15,23,42,0.14)] sm:min-h-[300px] lg:min-h-[340px]">
            <img
              src={BUILDER_SPOTLIGHT.imageUrl}
              alt={BUILDER_SPOTLIGHT.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[var(--spotlight-image-overlay)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/10 to-slate-950/70 sm:hidden" />

            <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:hidden">
              <p className="text-xs font-black uppercase tracking-[0.32em] text-white/95">
                Builder spotlight
              </p>
              <h4 className="max-w-[13ch] text-[2.2rem] font-geist font-black leading-[0.96] tracking-tight text-white">
                {BUILDER_SPOTLIGHT.title}
              </h4>
            </div>

            <div className="relative z-10 hidden h-full flex-col justify-between p-4 sm:flex sm:p-6">
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

              <div className="w-full rounded-[1.4rem] border border-white/10 bg-[var(--spotlight-content-bg)] p-4 backdrop-blur-sm sm:max-w-[82%] sm:rounded-[1.5rem] sm:p-5">
                <div className="space-y-3 sm:space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={BUILDER_SPOTLIGHT.avatarUrl}
                        alt={BUILDER_SPOTLIGHT.name}
                        className="h-10 w-10 rounded-2xl border border-white/20 object-cover sm:h-12 sm:w-12"
                      />
                      <div>
                        <p className="text-base font-bold text-[var(--spotlight-text-strong)] sm:text-lg">
                          {BUILDER_SPOTLIGHT.name}
                        </p>
                        <p className="text-xs text-[var(--spotlight-text-body)] sm:text-sm">
                          {BUILDER_SPOTLIGHT.role}
                        </p>
                      </div>
                    </div>
                    <h4 className="max-w-[13ch] text-[2.05rem] font-geist font-black leading-[0.95] tracking-tight text-[var(--spotlight-text-strong)] sm:max-w-[14ch] sm:text-5xl">
                      {BUILDER_SPOTLIGHT.title}
                    </h4>
                    <p className="max-w-lg text-sm font-semibold text-[var(--spotlight-text-strong)] sm:text-base">
                      {BUILDER_SPOTLIGHT.headline}
                    </p>
                    <p className="hidden max-w-lg text-sm leading-6 text-[var(--spotlight-text-body)] sm:block">
                      {BUILDER_SPOTLIGHT.summary}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="hidden text-sm text-[var(--spotlight-text-body)] sm:block">
                        {BUILDER_SPOTLIGHT.currentProject}
                      </p>
                      <p className="text-xs text-[var(--spotlight-text-muted)] sm:mt-1">
                        {BUILDER_SPOTLIGHT.metrics[0].value} live launches ·{" "}
                        <span className="sm:hidden">
                          {BUILDER_SPOTLIGHT.location}
                        </span>
                        <span className="hidden sm:inline">
                          {BUILDER_SPOTLIGHT.metrics[1].value} builder reach
                        </span>
                      </p>
                    </div>
                    <Button
                      variant={
                        followedBuilderIds.has(BUILDER_SPOTLIGHT.id)
                          ? "secondary"
                          : "outline"
                      }
                      className="!w-full sm:!w-fit !rounded-2xl !border-white/20 !bg-white/10 !px-4 sm:!px-5 !py-2.5 sm:!py-3 !text-sm !text-white backdrop-blur-md hover:!border-white/35 hover:!bg-white/16"
                      aria-pressed={followedBuilderIds.has(BUILDER_SPOTLIGHT.id)}
                      onClick={() =>
                        onCta({
                          type: "followBuilder",
                          builderId: BUILDER_SPOTLIGHT.id,
                        })
                      }
                    >
                      {followedBuilderIds.has(BUILDER_SPOTLIGHT.id)
                        ? "Following"
                        : "Follow"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div className="hidden space-y-4 sm:block">
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
                          onCta({
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
  </section>
);

export default FeaturedBuildersSection;
