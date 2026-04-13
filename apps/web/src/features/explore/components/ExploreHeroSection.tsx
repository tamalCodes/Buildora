import type { ExploreHeroSectionProps } from "@/features/explore/constants/interfaces";
import Button from "@shared/components/Button";
import React from "react";
import { EXPLORE_BY } from "../constants/constants";

const ExploreHeroSection: React.FC<ExploreHeroSectionProps> = ({ onCta }) => (
  <section
    className="grid grid-cols-1 gap-10 scroll-mt-24 lg:grid-cols-12 lg:gap-12"
    id="explore-hero"
  >
    <div className="space-y-6 lg:col-span-8 lg:space-y-8">
      <h1 className="max-w-none text-[2.42rem] font-geist font-black leading-[1.03] tracking-tight text-(--text-heading) sm:max-w-4xl sm:text-5xl sm:leading-[0.97] lg:text-7xl lg:leading-[0.95]">
        Discover Builders, projects & teams.
      </h1>
      <p className="max-w-none text-base leading-7 text-(--text-secondary) sm:max-w-2xl sm:text-lg">
        Explore the Buildora ecosystem. Track launches, follow standout teams,
        and find collaborators across every stack.
      </p>
      <div className="space-y-4 sm:space-y-5">
        <Button
          variant="cta"
          withArrow
          className="w-full max-w-[20rem] px-5! py-2.5! text-[0.98rem]! rounded-[1rem]! sm:w-auto sm:max-w-none sm:px-7! sm:py-3! sm:rounded-[1.15rem]!"
          onClick={() =>
            onCta({
              type: "scroll",
              targetId: "explore-projects",
            })
          }
        >
          Explore Buildora
        </Button>
        <div className="grid grid-cols-2 items-center gap-2.5 text-[10px] font-black uppercase tracking-[0.28em] text-(--text-tertiary) sm:flex sm:flex-wrap sm:gap-3 sm:text-[11px] sm:tracking-[0.3em]">
          <span className="col-span-2 sm:col-auto">Explore by</span>
          {EXPLORE_BY.map((item) => (
            <button
              key={item.label}
              className="w-full rounded-full border border-(--border-default) bg-(--bg-input) px-3.5 py-2 text-[9px] font-black uppercase tracking-[0.18em] text-(--text-secondary) transition hover:border-(--accent-border) hover:text-(--text-heading) sm:w-auto sm:px-4 sm:text-[10px] sm:tracking-widest"
              onClick={() => onCta(item.action)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ExploreHeroSection;
