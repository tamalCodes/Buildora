import React from "react";

export const RouteLoadingFallback: React.FC = () => (
  <div
    aria-busy="true"
    aria-live="polite"
    className="mx-auto flex min-h-[40vh] w-full max-w-5xl items-center justify-center px-6 py-12 text-sm text-slate-600"
  >
    Loading...
  </div>
);

export const RouteErrorFallback: React.FC = () => (
  <div
    role="alert"
    className="mx-auto flex min-h-[40vh] w-full max-w-5xl flex-col items-center justify-center gap-3 px-6 py-12 text-center text-sm text-slate-700"
  >
    <strong className="text-base text-slate-900">Something went wrong.</strong>
    <span>Refresh the page or try again in a moment.</span>
  </div>
);
