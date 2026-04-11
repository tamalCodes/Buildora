import React from "react";
import type { BuilderProfileAboutProps } from "@/features/builders/constants/interfaces";

const BuilderProfileAbout: React.FC<BuilderProfileAboutProps> = ({
  profile,
}) => {
  const readmeSections = profile.readme && profile.readme.length > 0
    ? profile.readme
    : profile.bio;
  const strengths = profile.strengths && profile.strengths.length > 0
    ? profile.strengths
    : profile.highlights;

  return (
    <section className="space-y-6">
      <div className="rounded-4xl border border-(--border-default) bg-(--bg-surface) p-6 sm:p-8 space-y-6">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-(--accent-text)">
            Builder README
          </p>
          <h2 className="text-2xl sm:text-3xl font-geist font-black text-(--text-heading) mt-3">
            Who {profile.name.split(" ")[0]} is and how they build
          </h2>
        </div>
        <div className="space-y-4 text-sm sm:text-base text-(--text-secondary) leading-relaxed">
          {readmeSections.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="rounded-4xl border border-(--border-default) bg-(--bg-surface) p-6 sm:p-8">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-(--text-tertiary)">
          Core strengths
        </p>
        <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-(--text-primary)">
          {strengths.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-(--border-default) bg-(--bg-input) px-4 py-3"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {profile.experience && profile.experience.length > 0 ? (
        <div className="rounded-4xl border border-(--border-default) bg-(--bg-surface) p-6 sm:p-8">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-(--text-tertiary)">
            Experience
          </p>
          <div className="mt-5 space-y-4">
            {profile.experience.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-(--border-default) bg-(--bg-input) px-4 py-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-black text-(--text-heading)">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-(--text-tertiary)">
                    {item.period}
                  </p>
                </div>
                <p className="text-sm text-(--text-primary) mt-1">
                  {item.organization}
                  {item.location ? ` · ${item.location}` : ""}
                </p>
                {item.summary ? (
                  <p className="text-sm text-(--text-secondary) mt-2">
                    {item.summary}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {profile.education && profile.education.length > 0 ? (
        <div className="rounded-4xl border border-(--border-default) bg-(--bg-surface) p-6 sm:p-8">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-(--text-tertiary)">
            Education
          </p>
          <div className="mt-4 space-y-3">
            {profile.education.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-(--border-default) bg-(--bg-input) px-4 py-3"
              >
                <p className="text-sm font-black text-(--text-heading)">
                  {item.degree}
                </p>
                <p className="text-sm text-(--text-primary) mt-1">
                  {item.institution}
                </p>
                <p className="text-xs text-(--text-tertiary) mt-1">
                  {item.period}
                </p>
                {item.focus ? (
                  <p className="text-sm text-(--text-secondary) mt-2">
                    {item.focus}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default BuilderProfileAbout;
