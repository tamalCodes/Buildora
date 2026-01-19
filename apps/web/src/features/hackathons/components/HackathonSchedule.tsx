import React from "react";
import type { HackathonScheduleProps } from "@/features/hackathons/constants/interfaces";

const HackathonSchedule: React.FC<HackathonScheduleProps> = ({ detail }) => {
  return (
    <section id="schedule" className="space-y-8">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
          Schedule
        </p>
        <h2 className="text-3xl font-geist font-black text-white mt-3">
          A tight build timeline
        </h2>
      </div>
      <div className="space-y-4">
        {detail.schedule.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="rounded-[1.5rem] border border-white/10 bg-white/5 px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">
                {item.time}
              </p>
              <p className="text-lg font-bold text-white mt-2">{item.title}</p>
              <p className="text-sm text-slate-400 mt-2">
                {item.description}
              </p>
            </div>
            <div className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
              Step {index + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HackathonSchedule;
