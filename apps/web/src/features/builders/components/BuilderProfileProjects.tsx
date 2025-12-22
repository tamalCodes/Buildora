import React from "react";
import type { BuilderProfileProjectsProps } from "../constants/interfaces";

const BuilderProfileProjects: React.FC<BuilderProfileProjectsProps> = ({
  profile,
}) => {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
          Projects
        </p>
        <h2 className="text-2xl font-geist font-black text-white mt-3">
          Recent launches
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {profile.projects.map((project) => (
          <div
            key={project.id}
            className="rounded-[2rem] border border-white/10 bg-white/5 overflow-hidden"
          >
            <div className="relative h-36">
              <img
                src={project.coverUrl}
                alt={project.title}
                className="h-full w-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05060c] via-transparent to-transparent"></div>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-2">
                    {project.summary}
                  </p>
                </div>
                <div className="min-w-[60px] rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Likes
                  </p>
                  <p className="text-lg font-geist font-black text-white mt-1">
                    {project.likes}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
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
