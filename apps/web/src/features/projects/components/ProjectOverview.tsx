import React from "react";
import type { ProjectOverviewProps } from "@/features/projects/constants/interfaces";

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ details }) => {
  return (
    <section className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 lg:p-10 space-y-8">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
          Overview
        </p>
        <p className="text-sm text-slate-300 mt-4 leading-relaxed">
          {details.about}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">
            Problem
          </p>
          <p className="text-sm text-slate-300 mt-3 leading-relaxed">
            {details.problem}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">
            Solution
          </p>
          <p className="text-sm text-slate-300 mt-3 leading-relaxed">
            {details.solution}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">
            Audience
          </p>
          <p className="text-sm text-slate-300 mt-3 leading-relaxed">
            {details.audience}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">
            Differentiators
          </p>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {details.differentiators.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProjectOverview;
