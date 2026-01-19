import React from "react";
import type { ProjectStackProps } from "@/features/projects/constants/interfaces";

const ProjectStack: React.FC<ProjectStackProps> = ({ stack }) => {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
        Stack
      </p>
      <div className="mt-5 space-y-3">
        {stack.map((item) => (
          <div
            key={item.name}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <p className="text-sm font-bold text-white">{item.name}</p>
            <p className="text-xs text-slate-500 mt-1">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectStack;
