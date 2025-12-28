import { Info } from "lucide-react";
import React from "react";
import { applicationClasses } from "../constants/classes";
import type { ApplicationNoticeProps } from "../constants/interfaces";
import { applicationTheme } from "../constants/themes";

const ApplicationNotice: React.FC<ApplicationNoticeProps> = ({
  message,
  ctaLabel,
  onCtaClick,
}) => {
  return (
    <div
      className={`${applicationTheme.surfaceSoft} flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-5`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 h-9 w-9 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-200">
          <Info className="h-4 w-4" aria-hidden />
        </div>
        <p className={`${applicationClasses.helperText} leading-relaxed`}>
          {message}
        </p>
      </div>
      <button className={applicationClasses.actionButton} onClick={onCtaClick}>
        {ctaLabel}
      </button>
    </div>
  );
};

export default ApplicationNotice;
