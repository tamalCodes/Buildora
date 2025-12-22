import React from "react";
import Button from "@shared/components/Button";
import type { ProjectHeroProps } from "../constants/interfaces";

const ProjectHero: React.FC<ProjectHeroProps> = ({ project, details }) => {
  return (
    <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/5">
      <div className="absolute inset-0">
        <img
          src={project.coverUrl}
          alt={project.title}
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#06080f] via-[#0b1220]/70 to-transparent"></div>
      </div>
      <div className="relative z-10 p-10 lg:p-14">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200 bg-indigo-500/20 border border-indigo-500/30 px-3 py-1 rounded-full">
            {details.status}
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-200 bg-white/10 border border-white/10 px-3 py-1 rounded-full">
            {details.stage}
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            {details.location}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
                {project.teamName}
              </p>
              <h1 className="text-4xl lg:text-6xl font-geist font-black text-white leading-[1.02] tracking-tight mt-4">
                {project.title}
              </h1>
              <p className="text-lg text-slate-300 mt-4 max-w-2xl">
                {details.tagline}
              </p>
              <p className="text-sm text-slate-400 mt-4 max-w-2xl">
                {project.summary}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button className="!px-6 !py-3 !rounded-xl !text-sm">
                Follow project
              </Button>
              <Button
                variant="outline"
                className="!px-6 !py-3 !rounded-xl !text-sm"
              >
                Request demo
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
              <span>{project.stack.join(" / ")}</span>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                Project pulse
              </p>
              <div className="grid grid-cols-2 gap-4 mt-5">
                {details.snapshot.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <p className="text-xl font-geist font-black text-white">
                      {item.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Likes
                </p>
                <p className="text-2xl font-geist font-black text-white mt-2">
                  {project.likes}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Awards
                </p>
                <p className="text-2xl font-geist font-black text-white mt-2">
                  {project.awards}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectHero;
