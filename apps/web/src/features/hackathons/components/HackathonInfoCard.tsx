import React from "react";
import Button from "@shared/components/Button";
import type { HackathonInfoCardProps } from "../constants/interfaces";

const HackathonInfoCard: React.FC<HackathonInfoCardProps> = ({
  hackathon,
  detail,
}) => {
  return (
    <aside className="rounded-[2rem] border border-white/10 bg-white/5 p-6 space-y-6 sticky top-28">
      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-300">
          Applications
        </p>
        <h3 className="text-xl font-geist font-black text-white">
          Apply to {hackathon.title}
        </h3>
        <p className="text-sm text-slate-400">
          Deadline: {detail.applicationDeadline}
        </p>
        <div className="flex gap-3">
          <Button className="!px-5 !py-3 !rounded-xl !text-sm">
            Apply now
          </Button>
          <Button
            variant="outline"
            className="!px-5 !py-3 !rounded-xl !text-sm"
          >
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-300">
        {[
          { label: "Status", value: hackathon.status },
          { label: "Mode", value: detail.mode },
          { label: "Team size", value: detail.teamSize },
          { label: "Eligibility", value: detail.eligibility },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-3"
          >
            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              {item.label}
            </p>
            <p className="text-slate-100 mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-500/20 p-4">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200">
          Prize pool
        </p>
        <p className="text-2xl font-geist font-black text-white mt-2">
          {detail.prizePool}
        </p>
        <p className="text-xs text-slate-400 mt-2">
          Paid across multiple tracks and sponsor awards.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
          Contact
        </p>
        <a
          href={`mailto:${detail.contactEmail}`}
          className="text-sm font-bold text-indigo-300 hover:text-indigo-200"
        >
          {detail.contactEmail}
        </a>
        <div className="flex flex-wrap gap-2">
          {detail.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              className="text-[10px] font-black uppercase tracking-widest text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:text-white"
              rel="noreferrer"
              target="_blank"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default HackathonInfoCard;
