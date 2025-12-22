import React from "react";
import { Link } from "react-router-dom";
import { LEADERBOARD_BUILDERS } from "../constants/constants";
import type { BuilderStatKey } from "../constants/types";
import type {
  LeaderboardRowProps,
  StatPillProps,
} from "../constants/interfaces";

const StatPill: React.FC<StatPillProps> = ({ label, value, variant }) => {
  const styles: Record<
    BuilderStatKey,
    { bg: string; text: string; icon: JSX.Element }
  > = {
    hackathons: {
      bg: "bg-indigo-500/15",
      text: "text-indigo-200",
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 8h10" />
          <path d="M7 12h6" />
          <path d="M5 4h14v16H5z" />
        </svg>
      ),
    },
    projects: {
      bg: "bg-amber-500/15",
      text: "text-amber-200",
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M8 8h8" />
          <path d="M8 12h4" />
        </svg>
      ),
    },
    prizes: {
      bg: "bg-emerald-500/15",
      text: "text-emerald-200",
      icon: (
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 21h8" />
          <path d="M12 17v4" />
          <path d="M7 4h10v5a5 5 0 0 1-10 0V4z" />
        </svg>
      ),
    },
  };

  const style = styles[variant];

  return (
    <div
      className={`flex items-center gap-2 rounded-2xl ${style.bg} ${style.text} px-3 py-2 text-xs font-semibold`}
    >
      <span className="flex items-center justify-center">{style.icon}</span>
      <span className="font-black">{value}</span>
      <span className="uppercase tracking-widest text-[10px]">{label}</span>
    </div>
  );
};

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ builder }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center text-sm font-black">
        #{builder.rank}
      </div>
      <div className="flex items-center gap-3">
        <img
          src={builder.avatarUrl}
          alt={builder.name}
          className="w-12 h-12 rounded-2xl border border-white/10 object-cover"
        />
        <div>
          <p className="text-sm font-bold text-white">{builder.name}</p>
          <p className="text-xs text-slate-500">{builder.handle}</p>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap gap-3">
      <StatPill
        label="Hackathons"
        value={builder.stats.hackathons}
        variant="hackathons"
      />
      <StatPill
        label="Projects"
        value={builder.stats.projects}
        variant="projects"
      />
      <StatPill
        label="Prizes"
        value={builder.stats.prizes}
        variant="prizes"
      />
    </div>
    <Link
      to={`/builders/${builder.id}`}
      className="text-xs font-black uppercase tracking-widest text-indigo-300 hover:text-indigo-200"
    >
      View profile
    </Link>
  </div>
);

const BuildersLeaderboard: React.FC = () => {
  return (
    <section className="space-y-4">
      {LEADERBOARD_BUILDERS.map((builder) => (
        <LeaderboardRow key={builder.id} builder={builder} />
      ))}
      <div className="flex items-center justify-center gap-2 pt-2">
        {["1", "2", "3", "4", "5"].map((page) => (
          <button
            key={page}
            className={`h-9 w-9 rounded-full border text-xs font-bold ${
              page === "1"
                ? "border-indigo-500 bg-indigo-600 text-white"
                : "border-white/10 text-slate-500 hover:text-white"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </section>
  );
};

export default BuildersLeaderboard;
