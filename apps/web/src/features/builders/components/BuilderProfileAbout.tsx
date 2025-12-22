import React from "react";
import type { BuilderProfile } from "../constants/types";

type BuilderProfileAboutProps = {
  profile: BuilderProfile;
};

const BuilderProfileAbout: React.FC<BuilderProfileAboutProps> = ({
  profile,
}) => {
  return (
    <section className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
          About
        </p>
        <h2 className="text-2xl font-geist font-black text-white mt-3">
          {profile.role}
        </h2>
      </div>
      <div className="space-y-4 text-sm text-slate-400">
        {profile.bio.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
          Highlights
        </p>
        <ul className="mt-4 space-y-2 text-sm text-slate-300">
          {profile.highlights.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BuilderProfileAbout;
