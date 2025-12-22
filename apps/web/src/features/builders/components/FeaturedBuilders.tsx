import React from "react";
import { Link } from "react-router-dom";
import { FEATURED_BUILDERS } from "../constants/constants";
import type { FeaturedBuilder } from "../constants/types";

const FeaturedBuilderCard = ({ builder }: { builder: FeaturedBuilder }) => {
  const isCta = builder.variant === "cta";
  const card = (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_30px_60px_-40px_rgba(15,23,42,0.6)] ${
        isCta ? "min-h-[200px]" : "min-h-[240px]"
      }`}
      style={{ backgroundImage: builder.gradient }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative h-full p-6 flex flex-col justify-between gap-6">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">
          {builder.badge}
        </span>
        {isCta ? (
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-geist font-black text-white">
                {builder.name}
              </h3>
              <p className="text-sm text-white/70 mt-2">
                {builder.ctaDescription}
              </p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-black uppercase tracking-widest text-white">
              {builder.ctaLabel}
              <span className="text-sm">+</span>
            </button>
          </div>
        ) : (
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-2xl font-geist font-black text-white leading-tight">
                {builder.name}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mt-2">
                {builder.subtitle}
              </p>
            </div>
            {builder.imageUrl ? (
              <img
                src={builder.imageUrl}
                alt={builder.name}
                className="w-16 h-16 rounded-2xl border border-white/30 object-cover shadow-lg"
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
    <Link to={`/builders/${builder.id}`} className="block">
      {card}
    </Link>
  );
};

const FeaturedBuilders: React.FC = () => {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
          Featured builders
        </p>
        <h2 className="text-3xl font-geist font-black text-white mt-3">
          Highlights from the Buildora community
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURED_BUILDERS.map((builder) => (
          <FeaturedBuilderCard key={builder.id} builder={builder} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedBuilders;
