import Button from "@shared/components/Button";
import React from "react";
import SocialIcon from "@shared/components/SocialIcon";
import type { SocialIconType } from "@shared/components/SocialIcon";
import { MapPin } from "lucide-react";
import type { BuilderProfileHeroProps } from "@/features/builders/constants/interfaces";

const SOCIAL_LABEL_TO_TYPE: Record<string, SocialIconType> = {
  X: "X",
  GitHub: "GitHub",
  LinkedIn: "LinkedIn",
  Discord: "Discord",
};

const BuilderProfileHero: React.FC<BuilderProfileHeroProps> = ({ profile }) => {
  const rolePills = profile.roles && profile.roles.length > 0
    ? profile.roles
    : [profile.role];

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
      <div className="lg:col-span-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6">
          <div className="relative shrink-0">
            <div className="absolute -inset-2 rounded-[2.1rem] bg-indigo-500/25 blur-xl"></div>
            <div className="absolute -inset-0.5 rounded-4xl border border-indigo-400/30"></div>
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="relative w-28 h-28 rounded-4xl border border-(--border-default) object-cover"
            />
          </div>

          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-(--accent-text)">
              Builder profile
            </p>
            <div>
              <h1 className="text-4xl lg:text-5xl font-geist font-black text-(--text-heading) tracking-tight">
                {profile.name}
              </h1>
              <p className="mt-1 text-sm text-(--text-tertiary)">
                {profile.handle}
              </p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-(--text-secondary)">
                <MapPin size={14} />
                {profile.location}
              </p>
            </div>
            <p className="text-sm font-semibold text-(--text-primary)">
              {profile.role}
            </p>
          </div>
        </div>

        {profile.headline ? (
          <p className="max-w-3xl text-base text-(--text-secondary) leading-relaxed">
            {profile.headline}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {rolePills.map((item) => (
            <span
              key={item}
              className="inline-flex items-center rounded-full border border-(--border-default) bg-(--bg-input) px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-(--text-secondary)"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {profile.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-black uppercase tracking-[0.18em] text-(--accent-text) bg-(--accent-bg-soft) border border-(--accent-border) px-3 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 lg:pl-4">
        <div className="rounded-4xl border border-(--border-default) bg-(--bg-surface) p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <Button className="px-5! py-2.5! rounded-xl!">Follow</Button>
            <Button variant="secondary" className="px-5! py-2.5! rounded-xl!">
              Message
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {profile.links
              .filter((link) => SOCIAL_LABEL_TO_TYPE[link.label])
              .map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="h-10 w-10 rounded-xl border border-(--border-default) bg-(--bg-input) text-(--text-secondary) flex items-center justify-center hover:border-(--accent-border) hover:text-(--text-heading) transition"
                  aria-label={link.label}
                >
                  <SocialIcon
                    type={SOCIAL_LABEL_TO_TYPE[link.label]}
                    className="h-4 w-4"
                  />
                </a>
              ))}
          </div>

          <div className="rounded-xl border border-(--border-default) bg-(--bg-input) px-4 py-3 space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-(--text-tertiary)">
              Best known for
            </p>
            {profile.highlights.slice(0, 2).map((item) => (
              <p key={item} className="text-sm text-(--text-secondary)">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuilderProfileHero;
