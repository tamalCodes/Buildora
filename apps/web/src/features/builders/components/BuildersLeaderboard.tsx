import type {
  BuildersLeaderboardProps,
  LeaderboardRowProps,
} from "@/features/builders/constants/interfaces";
import type { BuilderStatKey } from "@/features/builders/constants/types";
import React from "react";
import { Link } from "react-router-dom";
import { BUILDER_SORTS, LEADERBOARD_BUILDERS } from "../constants/constants";

const METRIC_LABELS: Record<BuilderStatKey, string> = {
  hackathons: "hackathons",
  projects: "projects",
  prizes: "prizes",
};

const METRIC_TONE: Record<BuilderStatKey, string> = {
  hackathons: "#6366f1",
  projects: "#f59e0b",
  prizes: "#10b981",
};

const SECONDARY_KEYS: Record<BuilderStatKey, BuilderStatKey[]> = {
  hackathons: ["projects", "prizes"],
  projects: ["hackathons", "prizes"],
  prizes: ["hackathons", "projects"],
};

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  builder,
  rank,
  activeSort,
}) => (
  <div className="flex flex-col lg:flex-row lg:items-center gap-4 rounded-2xl border border-(--border-default) bg-(--bg-surface) px-4 sm:px-5 py-4">
    <div className="flex items-center gap-4 min-w-0">
      <div className="w-10 h-10 rounded-xl border border-(--border-default) bg-(--bg-input) text-(--text-heading) flex items-center justify-center text-sm font-black shrink-0">
        #{rank}
      </div>
      <div className="flex items-center gap-3 min-w-0">
        <img
          src={builder.avatarUrl}
          alt={builder.name}
          className="w-11 h-11 rounded-xl border border-(--border-default) object-cover shrink-0"
        />
        <div className="min-w-0">
          <p className="text-sm font-bold text-(--text-heading) truncate">
            {builder.name}
          </p>
          <p className="text-xs text-(--text-tertiary)">{builder.handle}</p>
        </div>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 lg:ml-auto">
      <span
        aria-label={`${builder.stats[activeSort]} ${METRIC_LABELS[activeSort]}`}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-(--border-default) bg-(--bg-elevated) px-3 py-2 text-xs font-semibold text-(--text-heading)"
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: METRIC_TONE[activeSort] }}
        />
        <span className="font-black">{builder.stats[activeSort]}</span>
        <span className="uppercase tracking-[0.1em] text-[10px]">
          {METRIC_LABELS[activeSort]}
        </span>
      </span>
      <p className="text-xs text-(--text-tertiary)">
        {SECONDARY_KEYS[activeSort].map((metric, index) => (
          <React.Fragment key={metric}>
            {index > 0 ? " · " : null}
            {builder.stats[metric]} {METRIC_LABELS[metric]}
          </React.Fragment>
        ))}
      </p>
    </div>

    <Link
      to={`/builders/${builder.id}`}
      className="text-xs font-black uppercase tracking-widest text-(--accent-text) hover:text-(--accent-text-soft) lg:ml-6"
    >
      View profile
    </Link>
  </div>
);

const BuildersLeaderboard: React.FC<BuildersLeaderboardProps> = ({
  activeSort,
}) => {
  const activeSortOption =
    BUILDER_SORTS.find((option) => option.id === activeSort) ?? BUILDER_SORTS[0];

  const sortedBuilders = [...LEADERBOARD_BUILDERS].sort((left, right) => {
    const sortDifference = right.stats[activeSort] - left.stats[activeSort];
    if (sortDifference !== 0) {
      return sortDifference;
    }

    return left.rank - right.rank;
  });

  return (
    <section className="space-y-4 scroll-mt-24" id="builders-leaderboard">
      <div className="rounded-2xl border border-(--border-default) bg-(--bg-surface) px-4 sm:px-5 py-3">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-(--accent-text)">
          Trending now
        </p>
        <p className="mt-1 text-sm font-semibold text-(--text-secondary)">
          {activeSortOption.label}
        </p>
      </div>

      {sortedBuilders.map((builder, index) => (
        <LeaderboardRow
          key={builder.id}
          builder={builder}
          rank={index + 1}
          activeSort={activeSort}
        />
      ))}
    </section>
  );
};

export default BuildersLeaderboard;
