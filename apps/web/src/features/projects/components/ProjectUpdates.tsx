import React from "react";
import type { ProjectUpdatesProps } from "@/features/projects/constants/interfaces";

const ProjectUpdates: React.FC<ProjectUpdatesProps> = ({ updates }) => {
  return (
    <section className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 lg:p-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
            Updates
          </p>
          <h2 className="text-2xl font-geist font-black text-white mt-3">
            Latest product signals
          </h2>
        </div>
        <button className="text-xs font-black uppercase tracking-widest text-indigo-300">
          See all
        </button>
      </div>

      <div className="mt-8 space-y-5">
        {updates.map((update) => (
          <div
            key={update.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-bold text-white">{update.title}</p>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                {update.date}
              </span>
            </div>
            <p className="text-sm text-slate-400 mt-3">{update.summary}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {update.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-black uppercase tracking-widest text-slate-300 bg-white/10 border border-white/10 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectUpdates;
