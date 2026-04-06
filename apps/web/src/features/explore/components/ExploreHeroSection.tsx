import type { ExploreHeroSectionProps } from "@/features/explore/constants/interfaces";
import Button from "@shared/components/Button";
import { ArrowRight } from "lucide-react";
import React from "react";
import { EXPLORE_BY } from "../constants/constants";

const ExploreHeroSection: React.FC<ExploreHeroSectionProps> = ({ onCta }) => (
  <section
    className="grid grid-cols-1 lg:grid-cols-12 gap-12 scroll-mt-24"
    id="explore-hero"
  >
    <div className="lg:col-span-7 space-y-8">
  
      <h1 className="text-5xl lg:text-7xl font-geist font-black text-[var(--text-heading)] leading-[0.95] tracking-tight">
        Discover Builders, projects, and teams shaping the future.
      </h1>
      <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
        Explore the Buildora ecosystem. Track launches, follow standout teams,
        and find collaborators across every stack.
      </p>
      <div className="space-y-5">
        <Button
          className="!px-7 !py-3 !rounded-[1.15rem] !justify-between gap-3 shadow-[0_18px_45px_rgba(79,70,229,0.22)] hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(79,70,229,0.3)] active:translate-y-[1px] active:shadow-[0_12px_28px_rgba(79,70,229,0.18)]"
          onClick={() =>
            onCta({
              type: "scroll",
              targetId: "explore-projects",
            })
          }
        >
          <span className="flex items-center gap-3">
            <span className="relative overflow-hidden rounded-full">
              <span className="relative z-10">Start exploring</span>
              <span className="pointer-events-none absolute inset-0 -z-0 rounded-full bg-white/12 opacity-0 blur-md transition duration-300 group-hover:opacity-100"></span>
            </span>
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/14 text-white transition duration-300 group-hover:translate-x-1 group-hover:scale-110 group-hover:bg-white/22 group-active:translate-x-0.5 group-active:scale-95">
              <span className="pointer-events-none absolute inset-0 rounded-full border border-white/30 opacity-0 transition duration-300 group-hover:scale-[1.35] group-hover:opacity-100 group-active:scale-110"></span>
              <span className="pointer-events-none absolute inset-0 rounded-full bg-white/10 opacity-0 blur-[10px] transition duration-300 group-hover:opacity-100"></span>
              <ArrowRight
                aria-hidden="true"
                className="relative z-10 h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-active:translate-x-0"
                strokeWidth={2.4}
              />
            </span>
          </span>
        </Button>
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-[var(--text-tertiary)]">
          <span>Explore by</span>
          {EXPLORE_BY.map((item) => (
            <button
              key={item.label}
              className="rounded-full border border-[var(--border-default)] bg-[var(--bg-input)] px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:border-[var(--accent-border)] hover:text-[var(--text-heading)] transition"
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
