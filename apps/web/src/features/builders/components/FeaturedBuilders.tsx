import Button from "@shared/components/Button";
import React from "react";
import { Link } from "react-router-dom";
import { FEATURED_BUILDERS } from "../constants/constants";
import type { FeaturedBuilderCardProps } from "@/features/builders/constants/interfaces";

const FeaturedBuilderCard: React.FC<FeaturedBuilderCardProps> = ({ builder }) => {
  const isCta = builder.variant === "cta";
  const card = (
    <div
      className={`group relative h-full min-h-60 overflow-hidden rounded-4xl border border-(--border-default) shadow-(--glass-shadow) transition duration-300 hover:-translate-y-0.5 hover:border-(--accent-border) ${
        isCta ? "bg-(--bg-input)" : "bg-(--bg-surface)"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_58%)]"></div>
      <div className="relative h-full p-6 flex flex-col gap-6">
        <span className="inline-flex w-fit rounded-full border border-(--accent-border) bg-(--accent-bg-soft) px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-(--accent-text)">
          {builder.badge}
        </span>
        {isCta ? (
          <div className="flex h-full flex-col">
            <div>
              <h3 className="text-2xl font-geist font-black text-(--text-heading)">
                {builder.name}
              </h3>
              <p className="text-sm text-(--text-secondary) mt-2 max-w-[30ch]">
                {builder.ctaDescription}
              </p>
            </div>
            <div className="mt-auto">
              <Button
                variant="secondary"
                className="h-10! rounded-full! px-4! py-0! text-xs! font-black! uppercase! tracking-widest!"
              >
                {builder.ctaLabel}
                <span className="text-sm">+</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-auto flex items-end justify-between gap-4">
            <div>
              <h3 className="text-2xl font-geist font-black text-(--text-heading) leading-tight">
                {builder.name}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--text-tertiary) mt-2">
                {builder.subtitle}
              </p>
            </div>
            {builder.imageUrl ? (
              <img
                src={builder.imageUrl}
                alt={builder.name}
                className="w-16 h-16 rounded-2xl border border-(--border-default) bg-(--bg-input) object-cover shadow-sm"
              />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );

  if (isCta) {
    return card;
  }

  return (
    <Link to={`/builders/${builder.id}`} className="block h-full">
      {card}
    </Link>
  );
};

const FeaturedBuilders: React.FC = () => {
  return (
    <section className="space-y-6 scroll-mt-24" id="builders-featured">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-(--accent-text)">
          Featured builders
        </p>
        <h2 className="text-2xl sm:text-3xl font-geist font-black text-(--text-heading) mt-3">
          Highlights from the Buildora community
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-fr gap-6">
        {FEATURED_BUILDERS.map((builder) => (
          <FeaturedBuilderCard key={builder.id} builder={builder} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedBuilders;
