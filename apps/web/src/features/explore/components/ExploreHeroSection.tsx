import type { ExploreHeroSectionProps } from "@/features/explore/constants/interfaces";
import Button from "@shared/components/Button";
import React from "react";
import { EXPLORE_BY } from "../constants/constants";

const ExploreHeroSection: React.FC<ExploreHeroSectionProps> = ({ onCta }) => (
  <section
    className="grid grid-cols-1 lg:grid-cols-12 gap-12 scroll-mt-24"
    id="explore-hero"
  >
    <div className="lg:col-span-7 space-y-8">
  
      <h1 className="text-5xl lg:text-7xl font-geist font-black text-(--text-heading) leading-[0.95] tracking-tight">
        Discover Builders, projects, and teams shaping the future.
      </h1>
      <p className="text-lg text-(--text-secondary) max-w-2xl">
        Explore the Buildora ecosystem. Track launches, follow standout teams,
        and find collaborators across every stack.
      </p>
      <div className="space-y-5">
        <Button
          variant="cta"
          withArrow
          className="px-7! py-3! rounded-[1.15rem]!"
          onClick={() =>
            onCta({
              type: "scroll",
              targetId: "explore-projects",
            })
          }
        >
          Start exploring
        </Button>
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-(--text-tertiary)">
          <span>Explore by</span>
          {EXPLORE_BY.map((item) => (
            <button
              key={item.label}
              className="rounded-full border border-(--border-default) bg-(--bg-input) px-4 py-2 text-[10px] font-black uppercase tracking-widest text-(--text-secondary) hover:border-(--accent-border) hover:text-(--text-heading) transition"
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
