import React from "react";

const MaintenanceBanner: React.FC = () => {
  const message =
    "Buildora is under active maintenance. Data may be reset at any time, and all UI is temporary and subject to change without notice.";

  return (
    <div className="sticky top-0 z-[60] border-b border-amber-200/70 bg-amber-300 shadow-[0_10px_30px_rgba(251,191,36,0.28)]">
      <style>
        {`
          @keyframes maintenanceMarquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>

      <div className="mx-auto flex min-h-12 max-w-[1600px] items-center justify-center px-4 py-3 text-center text-xs font-black uppercase tracking-[0.18em] text-slate-950 sm:hidden">
        <div className="w-full overflow-hidden">
          <div
            className="flex w-max items-center whitespace-nowrap"
            style={{ animation: "maintenanceMarquee 16s linear infinite" }}
          >
            <span className="pr-10">{message}</span>
            <span>{message}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto hidden min-h-12 max-w-[1600px] items-center justify-center px-4 py-3 text-center text-xs font-black uppercase tracking-[0.18em] text-slate-950 sm:flex sm:px-6">
        {message}
      </div>
    </div>
  );
};

export default MaintenanceBanner;
