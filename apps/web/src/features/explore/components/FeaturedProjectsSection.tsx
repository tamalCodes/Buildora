import Button from "@shared/components/Button";
import React from "react";
import type {
  FeaturedProjectCompactCardProps,
  FeaturedProjectHeroCardProps,
  FeaturedProjectsSectionProps,
  LikesBadgeProps,
} from "@/features/explore/constants/interfaces";
import type { Project } from "../constants/types";

const formatProjectMetric = (value: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

const getStackLabel = (stack: Project["stack"]) =>
  stack.length > 2
    ? `${stack.slice(0, 2).join(" / ")} +${stack.length - 2}`
    : stack.join(" / ");

const LikesBadge: React.FC<LikesBadgeProps> = ({ likes }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[11px] font-semibold text-white/85 backdrop-blur-md">
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 10v10" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.95 2.42l-1.08 5A2 2 0 0 1 18.74 19H7V10l4.76-5.71A1 1 0 0 1 13.5 5a3 3 0 0 1 1.5.88Z" />
      <path d="M7 19H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3" />
    </svg>
    {formatProjectMetric(likes)}
  </span>
);

const ProjectLink: React.FC = () => (
  <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-(--accent-text) transition group-hover:text-(--text-heading)">
    View project
    <svg
      className="h-3 w-3"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  </span>
);

const FeaturedProjectHeroCard: React.FC<FeaturedProjectHeroCardProps> = ({
  project,
  onOpen,
}) => (
  <article
    className="group relative overflow-hidden rounded-4xl border border-(--border-default) bg-(--bg-surface) shadow-(--glass-shadow) transition duration-300 hover:-translate-y-1 hover:border-(--border-hover)"
    role="button"
    tabIndex={0}
    onClick={onOpen}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onOpen();
      }
    }}
  >
    <div className="overflow-hidden rounded-t-[2rem]">
      <div className="relative aspect-[16/10] sm:aspect-[16/9] xl:aspect-[4/3]">
        <img
          src={project.coverUrl}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15, 23, 42, 0.04) 0%, rgba(15, 23, 42, 0.14) 48%, var(--overlay-bg) 100%)",
          }}
        />
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3 sm:left-6 sm:right-6 sm:top-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-[rgba(15,23,42,0.38)] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/80 shadow-[0_10px_30px_rgba(15,23,42,0.18)] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-white/80" />
            {project.highlightLabel ?? "Featured pick"}
          </span>
          <LikesBadge likes={project.likes} />
        </div>
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
          <h3 className="text-3xl font-geist font-black tracking-tight text-white sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75 sm:text-xs">
            By {project.teamName}
          </p>
        </div>
      </div>
    </div>
    <div className="space-y-5 p-5 sm:p-6">
      <p className="max-w-2xl text-base leading-7 text-(--text-secondary)">
        {project.summary}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-(--border-default) bg-(--bg-input) px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-(--text-secondary)">
          {getStackLabel(project.stack)}
        </span>
        <span className="rounded-full border border-(--border-default) bg-(--bg-input) px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-(--text-tertiary)">
          {project.awards} awards
        </span>
      </div>
      <div className="flex flex-col gap-3 border-t border-(--border-subtle) pt-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-(--text-tertiary)">
          <span>{project.awards} recognitions</span>
        </div>
        <ProjectLink />
      </div>
    </div>
  </article>
);

const FeaturedProjectCompactCard: React.FC<FeaturedProjectCompactCardProps> = ({
  project,
  onOpen,
  className,
}) => (
  <article
    className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-(--border-default) bg-(--bg-surface) shadow-(--glass-shadow) transition duration-300 hover:-translate-y-1 hover:border-(--border-hover) xl:rounded-3xl ${className ?? ""}`}
    role="button"
    tabIndex={0}
    onClick={onOpen}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onOpen();
      }
    }}
  >
    <div className="overflow-hidden rounded-t-[1.75rem] xl:rounded-t-[1.5rem]">
      <div className="relative aspect-[4/3] xl:aspect-[16/9]">
        <img
          src={project.coverUrl}
          alt={project.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15, 23, 42, 0.02) 0%, rgba(15, 23, 42, 0.16) 50%, var(--overlay-bg) 100%)",
          }}
        />
        <div className="absolute right-4 top-4">
          <LikesBadge likes={project.likes} />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-[1.75rem] font-geist font-black tracking-tight text-white xl:text-[1.55rem]">
            {project.title}
          </h3>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/75 xl:text-[10px]">
            By {project.teamName}
          </p>
        </div>
      </div>
    </div>
    <div className="flex flex-1 flex-col justify-between p-5 xl:p-4">
      <p
        className="text-sm leading-7 text-(--text-secondary) xl:text-[13px] xl:leading-6"
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {project.summary}
      </p>
      <div className="mt-3 flex flex-col gap-3 border-t border-(--border-subtle) pt-3 xl:mt-2 xl:gap-2 xl:pt-3">
        <ProjectLink />
      </div>
    </div>
  </article>
);

const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({
  projects,
  onCta,
}) => {
  const [featureProject, ...compactProjects] = projects;

  if (!featureProject) {
    return null;
  }

  return (
    <section className="space-y-8 scroll-mt-24" id="explore-projects">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-(--accent-text)">
            Featured launches
          </p>
          <h2 className="mt-3 text-3xl font-geist font-black text-(--text-heading)">
            Curated projects from the Buildora ecosystem
          </h2>
        </div>
        <Button
          variant="outline"
          className="px-5! py-2.5! text-xs! rounded-xl!"
          onClick={() =>
            onCta({
              type: "scroll",
              targetId: "explore-projects",
            })
          }
        >
          View all projects
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
        <div className="xl:col-span-6 xl:h-full">
          <FeaturedProjectHeroCard
            project={featureProject}
            onOpen={() =>
              onCta({ type: "viewProject", projectId: featureProject.id })
            }
          />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:col-span-6 xl:grid-cols-2 xl:grid-rows-2 xl:h-full xl:content-start xl:gap-4 xl:self-start">
          {compactProjects.map((project, index) => (
            <FeaturedProjectCompactCard
              key={project.id}
              project={project}
              className={index > 0 ? "hidden sm:flex" : undefined}
              onOpen={() =>
                onCta({ type: "viewProject", projectId: project.id })
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
