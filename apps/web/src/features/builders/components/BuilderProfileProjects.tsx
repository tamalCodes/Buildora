import React from "react";
import type { BuilderProfileProjectsProps } from "@/features/builders/constants/interfaces";

const BuilderProfileProjects: React.FC<BuilderProfileProjectsProps> = ({
  profile,
}) => {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
          Projects
        </p>
        <h2 className="text-2xl font-geist font-black text-[var(--text-heading)] mt-3">
          Launches and shipped work
        </h2>
      </div>
      <div className="space-y-5">
        {profile.projects.map((project) => (
          <div
            key={project.id}
            className="rounded-[1.7rem] border border-[var(--border-default)] bg-[var(--bg-surface)] overflow-hidden"
          >
            <div className="relative h-36 sm:h-40">
              <img
                src={project.coverUrl}
                alt={project.title}
                className="h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,6,23,0.9)] via-transparent to-transparent"></div>
            </div>
            <div className="p-5 sm:p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-geist font-black text-[var(--text-heading)]">
                    {project.title}
                  </h3>
                  {project.subtitle ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--text-tertiary)]">
                      {project.subtitle}
                    </p>
                  ) : null}
                </div>
                <div className="min-w-[64px] rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] px-3 py-2 text-center">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-tertiary)]">
                    Likes
                  </p>
                  <p className="text-lg font-geist font-black text-[var(--text-heading)] mt-1">
                    {project.likes}
                  </p>
                </div>
              </div>

              <p className="text-sm text-[var(--text-secondary)]">{project.summary}</p>

              {project.outcome ? (
                <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] px-4 py-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                    Impact
                  </p>
                  <p className="text-sm text-[var(--text-primary)] mt-1">
                    {project.outcome}
                  </p>
                </div>
              ) : null}

              {(project.role || project.builtAt) ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.role ? (
                    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] px-3 py-2.5">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                        Role
                      </p>
                      <p className="text-sm text-[var(--text-primary)] mt-1">
                        {project.role}
                      </p>
                    </div>
                  ) : null}
                  {project.builtAt ? (
                    <div className="rounded-xl border border-[var(--border-default)] bg-[var(--bg-input)] px-3 py-2.5">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-tertiary)]">
                        Built at
                      </p>
                      <p className="text-sm text-[var(--text-primary)] mt-1">
                        {project.builtAt}
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-black uppercase tracking-[0.15em] text-[var(--text-secondary)] bg-[var(--bg-input)] border border-[var(--border-default)] px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BuilderProfileProjects;
