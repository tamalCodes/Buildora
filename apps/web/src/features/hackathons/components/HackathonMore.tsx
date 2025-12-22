import React from "react";
import { Link } from "react-router-dom";
import type { Hackathon } from "../constants/types";

type HackathonMoreProps = {
  hackathons: Hackathon[];
};

const HackathonMore: React.FC<HackathonMoreProps> = ({ hackathons }) => {
  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
            More hackathons
          </p>
          <h2 className="text-3xl font-geist font-black text-white mt-3">
            Keep browsing open calls
          </h2>
        </div>
        <Link
          to="/hackathons"
          className="text-xs font-black uppercase tracking-widest text-indigo-300 hover:text-indigo-200"
        >
          See all
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {hackathons.map((hackathon) => (
          <Link
            key={hackathon.id}
            to={`/hackathons/${hackathon.id}`}
            className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 space-y-4 hover:border-indigo-500/40 transition-all"
          >
            <div className="flex items-center gap-4">
              <img
                src={hackathon.logoUrl}
                alt={hackathon.title}
                className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 p-2"
              />
              <div>
                <p className="text-sm font-bold text-white">{hackathon.title}</p>
                <p className="text-xs text-slate-500">
                  {hackathon.location} - {hackathon.dates}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {hackathon.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-black uppercase tracking-widest text-slate-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">
                {hackathon.prize}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-200 bg-indigo-500/20 border border-indigo-500/30 px-3 py-1.5 rounded-full">
                Apply now
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HackathonMore;
