import React from "react";
import { BUILDER_SORTS } from "../constants/constants";
import type { BuilderStatKey } from "../constants/types";

type BuildersSortBarProps = {
  activeSort: BuilderStatKey;
  onChange: (next: BuilderStatKey) => void;
};

const BuildersSortBar: React.FC<BuildersSortBarProps> = ({
  activeSort,
  onChange,
}) => {
  return (
    <section className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-sm font-semibold text-slate-400">
          Sort builders by
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {BUILDER_SORTS.map((option) => {
            const isActive = option.id === activeSort;
            return (
              <button
                key={option.id}
                className={`rounded-full px-4 py-2 text-xs font-black uppercase tracking-widest transition ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                    : "bg-white/5 text-slate-400 hover:text-white hover:border-white/20 border border-white/5"
                }`}
                onClick={() => onChange(option.id)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BuildersSortBar;
