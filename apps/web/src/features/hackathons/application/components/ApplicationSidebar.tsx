import Button from "@shared/components/Button";
import React, { useEffect, useMemo, useState } from "react";
import { applicationClasses } from "../constants/classes";
import type { ApplicationSidebarProps } from "@/features/hackathons/application/constants/interfaces";
import { applicationTheme } from "../constants/themes";

const formatCountdown = (targetMs: number) => {
  const now = Date.now();
  const remaining = Math.max(targetMs - now, 0);
  const totalMinutes = Math.floor(remaining / 60000);
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;
  return `${days}d:${hours}h:${minutes}m`;
};

const ApplicationSidebar: React.FC<ApplicationSidebarProps> = ({
  hackathon,
  detail,
  progress,
  metrics,
  isOnline,
}) => {
  const targetMs = useMemo(() => {
    const now = Date.now();
    const minutes = progress.countdownMinutes ?? 435;
    return now + minutes * 60 * 1000;
  }, [progress.countdownMinutes]);
  const [countdown, setCountdown] = useState(() => formatCountdown(targetMs));
  const [labelFirst, ...labelRest] = progress.label.split(" ");
  const labelSecond = labelRest.join(" ");

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(formatCountdown(targetMs));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetMs]);

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress.percent / 100) * circumference;

  return (
    <aside
      className={`${applicationTheme.surface} p-6 space-y-6 sticky top-28 h-fit`}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24">
          <svg
            className="h-24 w-24 -rotate-90"
            viewBox="0 0 100 100"
            role="presentation"
          >
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              className="text-white/10"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="10"
              className="text-emerald-400"
              fill="none"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-tight max-w-17.5 mx-auto">
                <span className="block">{labelFirst}</span>
                <span className="block">{labelSecond || labelFirst}</span>
              </p>
              <p className="text-2xl font-geist font-black text-white">
                {progress.percent}%
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className={`${applicationClasses.label} text-slate-400`}>
            {hackathon.title}
          </p>
          <p className="text-sm text-slate-300 mt-2">
            Deadline: {detail.applicationDeadline}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-300">
        {metrics.map((item) => (
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

      <div className={applicationTheme.surfaceGlow + " p-4"}>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200">
          Applications close in
        </p>
        <p className="text-2xl font-geist font-black text-white mt-2">
          {countdown}
        </p>
        <p className="text-xs text-slate-400 mt-2">
          {isOnline
            ? "Virtual participation confirmed."
            : "In-person steps required."}
        </p>
      </div>

      <Button className="px-6! py-3! rounded-xl! w-full">
        Submit application
      </Button>
    </aside>
  );
};

export default ApplicationSidebar;
