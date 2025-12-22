import React from "react";
import type { SettingsCardProps } from "../constants/interfaces";

const SettingsCard: React.FC<SettingsCardProps> = ({
  title,
  description,
  action,
  children,
  className = "",
}) => {
  return (
    <section
      className={`glass-card rounded-[2rem] border border-white/10 ${className}`}
    >
      <div className="flex flex-col gap-3 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-geist font-black text-white">{title}</h3>
          {description ? (
            <p className="mt-1 text-sm text-slate-400">{description}</p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <div className="px-6 py-6">{children}</div>
    </section>
  );
};

export default SettingsCard;
