import type { ExploreShowcaseSectionProps } from "@/features/explore/constants/interfaces";
import Button from "@shared/components/Button";
import React from "react";

const ExploreShowcaseSection: React.FC<ExploreShowcaseSectionProps> = ({
  showcaseIntent,
  onCta,
}) => (
  <section
    className="rounded-[2.5rem] border border-[var(--accent-border)] bg-gradient-to-r from-[var(--accent-bg-soft)] via-transparent to-cyan-500/10 p-10 scroll-mt-24"
    id="explore-showcase"
  >
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
      <div>
      
        <h3 className="text-3xl font-geist font-black text-[var(--text-heading)] mt-3">
          Tell the community what you are building.
        </h3>
        <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-2xl">
          Share your project, highlight your team, and attract collaborators in
          minutes.
        </p>
        {showcaseIntent ? (
          <p className="text-xs text-[var(--text-secondary)] mt-4">
            Ready to {showcaseIntent === "create" ? "create" : "explore"}? We
            will open the next step here.
          </p>
        ) : null}
      </div>
      <div className="flex items-center gap-3">
        <Button
          className="!px-6 !py-3 !rounded-xl"
          onClick={() =>
            onCta({
              type: "showcase",
              intent: "create",
            })
          }
        >
          Create a showcase
        </Button>
        <Button
          variant="outline"
          className="!px-6 !py-3 !rounded-xl"
          onClick={() =>
            onCta({
              type: "showcase",
              intent: "highlights",
            })
          }
        >
          Explore highlights
        </Button>
      </div>
    </div>
  </section>
);

export default ExploreShowcaseSection;
