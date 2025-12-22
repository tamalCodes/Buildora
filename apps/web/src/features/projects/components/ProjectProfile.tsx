import React from "react";
import type { ProjectProfileProps } from "../constants/interfaces";

const ProjectProfile: React.FC<ProjectProfileProps> = ({ details }) => {
  const items = [
    { label: "Status", value: details.status },
    { label: "Stage", value: details.stage },
    { label: "Founded", value: details.founded },
    { label: "HQ", value: details.location },
  ];

  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
        Project details
      </p>
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
              {item.label}
            </span>
            <span className="text-xs font-bold text-slate-200">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectProfile;
