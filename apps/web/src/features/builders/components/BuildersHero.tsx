import Button from "@shared/components/Button";
import GlobalSearchBar from "@shared/components/search/GlobalSearchBar";
import React from "react";

const BuildersHero: React.FC = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="lg:col-span-7 space-y-8">
        <div className="inline-flex items-center gap-3 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-indigo-300">
          Buildora Builders
        </div>
        <h1 className="text-5xl lg:text-7xl font-geist font-black text-white leading-[0.95] tracking-tight">
          Meet the builders setting the pace for the community.
        </h1>
        <p className="text-lg text-slate-400 max-w-xl">
          Spotlight the people shipping the most projects, winning the most
          prizes, and showing up to build together.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button className="!px-8 !py-4 !rounded-2xl">
            Follow builders
          </Button>
          <Button variant="secondary" className="!px-8 !py-4 !rounded-2xl">
            Nominate a builder
          </Button>
        </div>
        <div className="grid grid-cols-3 gap-6 pt-4">
          {[
            { label: "Active builders", value: "21k" },
            { label: "Projects shipped", value: "3.8k" },
            { label: "Prizes won", value: "480" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <p className="text-2xl font-geist font-black text-white">
                {stat.value}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5 flex flex-col gap-6">
        <GlobalSearchBar />
        <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-indigo-600/20 via-indigo-600/5 to-transparent p-8">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
            Builder network
          </p>
          <h3 className="text-2xl font-geist font-black text-white mt-4">
            Keep track of builders across every stack.
          </h3>
          <p className="text-sm text-slate-400 mt-3">
            Follow standout contributors and stay close to the teams who are
            shipping every week.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <Button className="!px-6 !py-3 !rounded-xl !text-sm">
              Explore profiles
            </Button>
            <Button
              variant="outline"
              className="!px-6 !py-3 !rounded-xl !text-sm"
            >
              Create a profile
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildersHero;
