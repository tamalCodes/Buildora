import React from "react";
import type { ProjectMilestone } from "../constants/types";

type ProjectMilestonesProps = {
  milestones: ProjectMilestone[];
};

const statusStyles: Record<ProjectMilestone["status"], string> = {
  done: "bg-emerald-400",
  "in-progress": "bg-indigo-400",
  next: "bg-slate-600",
};

const ProjectMilestones: React.FC<ProjectMilestonesProps> = ({ milestones }) => {
  return (
    <section className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 lg:p-10">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
          Roadmap
        </p>
        <h2 className="text-2xl font-geist font-black text-white mt-3">
          Milestones and momentum
        </h2>
      </div>

      <div className="mt-8 space-y-6">
        {milestones.map((milestone) => (
          <div
            key={milestone.title}
            className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <span
              className={`mt-1 h-3 w-3 rounded-full ${statusStyles[milestone.status]}`}
            ></span>
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-bold text-white">
                  {milestone.title}
                </p>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  {milestone.date}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-2">
                {milestone.summary}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectMilestones;
