import { AlertTriangle, CheckCircle2, Clock4 } from "lucide-react";
import React from "react";
import { applicationClasses } from "../constants/classes";
import type { ApplicationSectionCardProps } from "../constants/interfaces";
import { applicationTheme } from "../constants/themes";

const statusStyles = {
  completed: "bg-emerald-500/20 text-emerald-200 border-emerald-500/30",
  "in-progress": "bg-amber-500/20 text-amber-200 border-amber-500/30",
  pending: "bg-white/10 text-slate-300 border-white/10",
};

const statusIcon = {
  completed: CheckCircle2,
  "in-progress": AlertTriangle,
  pending: Clock4,
};

const statusLabel = {
  completed: "Completed",
  "in-progress": "In progress",
  pending: "Pending",
};

const ApplicationSectionCard: React.FC<ApplicationSectionCardProps> = ({
  title,
  description,
  status,
  children,
  defaultOpen = false,
}) => {
  const StatusIcon = statusIcon[status];

  return (
    <details
      className={`${applicationTheme.surface} overflow-hidden`}
      open={defaultOpen}
    >
      <summary className={applicationClasses.sectionSummary}>
        <div className="flex items-center gap-4">
          <div
            className={`h-10 w-10 rounded-full border flex items-center justify-center text-xs font-black ${statusStyles[status]}`}
          >
            <StatusIcon className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <p className={applicationClasses.cardTitle}>{title}</p>
            <p className={applicationClasses.helperText}>{description}</p>
          </div>
        </div>
        <div
          className={`rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-widest ${statusStyles[status]}`}
        >
          {statusLabel[status]}
        </div>
      </summary>
      <div className={applicationClasses.sectionBody}>{children}</div>
    </details>
  );
};

export default ApplicationSectionCard;
