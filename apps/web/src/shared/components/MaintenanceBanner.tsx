import React from "react";

const MaintenanceBanner: React.FC = () => {
  return (
    <div className="sticky top-0 z-[60] border-b border-amber-200/70 bg-amber-300 shadow-[0_10px_30px_rgba(251,191,36,0.28)]">
      <div className="mx-auto flex min-h-12 max-w-[1600px] items-center justify-center px-4 py-3 text-center text-xs font-black uppercase tracking-[0.18em] text-slate-950 sm:px-6">
        Buildora is under active maintenance. Data may be reset at any time, and
        all UI is temporary and subject to change without notice.
      </div>
    </div>
  );
};

export default MaintenanceBanner;
