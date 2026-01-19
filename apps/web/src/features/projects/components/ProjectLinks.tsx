import React from "react";
import type { ProjectLinksProps } from "@/features/projects/constants/interfaces";

const toneStyles: Record<ProjectLink["tone"], string> = {
  primary:
    "bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-500/20",
  outline: "border border-white/15 text-slate-200 hover:border-indigo-400/60",
  ghost: "border border-white/5 text-slate-400 hover:border-white/20",
};

const ProjectLinks: React.FC<ProjectLinksProps> = ({ links }) => {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 p-6 space-y-4">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
        Links
      </p>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={`flex items-center justify-between rounded-2xl px-4 py-3 text-xs font-black uppercase tracking-widest transition ${
            toneStyles[link.tone]
          }`}
        >
          <span>{link.label}</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
            {link.hint}
          </span>
        </a>
      ))}
    </section>
  );
};

export default ProjectLinks;
