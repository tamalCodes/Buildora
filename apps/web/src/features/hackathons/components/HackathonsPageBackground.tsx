import React from "react";

const HackathonsPageBackground: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute -top-28 left-1/2 h-90 w-90 -translate-x-1/2 rounded-full bg-sky-300/25 blur-[110px]"></div>
    <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-200/25 blur-[120px]"></div>
  </div>
);

export default HackathonsPageBackground;
