import Button from "@shared/components/Button";
import React from "react";
import SocialIcon from "@shared/components/SocialIcon";
import type { SocialIconType } from "@shared/components/SocialIcon";
import type { BuilderProfileHeroProps } from "@/features/builders/constants/interfaces";

const BuilderProfileHero: React.FC<BuilderProfileHeroProps> = ({ profile }) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 items-center">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="absolute -inset-2 rounded-[2rem] bg-indigo-500/20 blur-xl"></div>
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="relative w-28 h-28 rounded-[2rem] border border-white/10 object-cover"
          />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
            Builder profile
          </p>
          <h1 className="text-4xl lg:text-5xl font-geist font-black text-white mt-3">
            {profile.name}
          </h1>
          <p className="text-sm text-slate-400 mt-2">{profile.handle}</p>
          <p className="text-sm text-slate-500 mt-1">{profile.location}</p>
        </div>
      </div>

      <div className="space-y-6 lg:ml-auto">
        <div className="flex flex-wrap gap-2">
          {profile.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-black uppercase tracking-widest text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button className="!px-6 !py-3 !rounded-xl">Follow</Button>
          <Button variant="secondary" className="!px-6 !py-3 !rounded-xl">
            Message
          </Button>
          <div className="flex items-center gap-2">
            {profile.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="h-10 w-10 rounded-xl border border-white/10 bg-white/5 text-slate-300 flex items-center justify-center hover:border-indigo-500/50 hover:text-white transition"
                aria-label={link.label}
              >
                <SocialIcon
                  type={link.label as SocialIconType}
                  className="h-4 w-4"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderProfileHero;
