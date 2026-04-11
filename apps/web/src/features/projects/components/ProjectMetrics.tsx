import React from "react";
import type { ProjectMetricsProps } from "@/features/projects/constants/interfaces";

const trendStyles = {
  up: "text-emerald-300",
  down: "text-rose-300",
  flat: "text-slate-300",
};

const ProjectMetrics: React.FC<ProjectMetricsProps> = ({
  metrics,
  highlights,
}) => {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
          Momentum
        </p>
        <h2 className="text-2xl font-geist font-black text-white mt-3">
          Growth metrics and proof points
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">
              {metric.label}
            </p>
            <p className="text-3xl font-geist font-black text-white mt-3">
              {metric.value}
            </p>
            <p
              className={`text-xs mt-2 font-semibold ${trendStyles[metric.trend]}`}
            >
              {metric.helper}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="rounded-4xl border border-white/10 bg-white/5 p-6"
          >
            <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
              {item.metric}
            </p>
            <h3 className="text-lg font-geist font-black text-white mt-4">
              {item.title}
            </h3>
            <p className="text-sm text-slate-400 mt-3">{item.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectMetrics;
