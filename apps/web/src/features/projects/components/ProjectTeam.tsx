import React from "react";
import type { ProjectTeamProps } from "@/features/projects/constants/interfaces";

const ProjectTeam: React.FC<ProjectTeamProps> = ({ team }) => {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
          Core team
        </p>
        <button className="text-xs font-black uppercase tracking-widest text-indigo-300">
          View all
        </button>
      </div>
      <div className="mt-6 space-y-4">
        {team.map((member) => (
          <div
            key={member.name}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
          >
            <img
              src={member.avatarUrl}
              alt={member.name}
              className="h-12 w-12 rounded-2xl border border-white/10 object-cover"
            />
            <div>
              <p className="text-sm font-bold text-white">{member.name}</p>
              <p className="text-xs text-slate-400">{member.role}</p>
              <p className="text-[11px] text-slate-500 mt-1">
                Focus: {member.focus}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectTeam;
