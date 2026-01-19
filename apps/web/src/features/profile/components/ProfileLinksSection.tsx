import SettingsCard from "@/features/settings/components/SettingsCard";
import { SettingsButton } from "@/features/settings/components/SettingsControls";
import React from "react";

const ProfileLinksSection: React.FC = () => {
  return (
    <SettingsCard
      title="Links"
      description="Links that speak for you."
      action={<SettingsButton>Save</SettingsButton>}
    >
      <div className="space-y-4">
        {[
          { label: "GitHub", placeholder: "https://github.com/you" },
          { label: "LinkedIn", placeholder: "https://linkedin.com/in/you" },
          { label: "X", placeholder: "https://x.com/you" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 sm:flex-row sm:items-center"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200">
              {item.label === "GitHub" && (
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .5A12 12 0 0 0 0 12.8c0 5.4 3.4 10 8.2 11.6.6.1.8-.2.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.6-1.5-2-1.5-2-1.2-.9.1-.9.1-.9 1.3.1 2 .9 2 .9 1.2 2.1 3 1.5 3.7 1.1.1-.9.5-1.5.8-1.8-2.6-.3-5.3-1.4-5.3-6.2 0-1.4.5-2.6 1.3-3.5-.1-.3-.6-1.6.1-3.3 0 0 1-.3 3.4 1.3a11 11 0 0 1 6.2 0c2.4-1.6 3.4-1.3 3.4-1.3.7 1.7.2 3 .1 3.3.8.9 1.3 2.1 1.3 3.5 0 4.8-2.7 5.9-5.4 6.2.5.4.9 1.2.9 2.5v3.7c0 .4.2.7.8.6 4.8-1.6 8.2-6.2 8.2-11.6A12 12 0 0 0 12 .5z" />
                </svg>
              )}
              {item.label === "LinkedIn" && (
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 8.75h3.95v11.75H3zM9.2 8.75h3.79v1.6h.05c.53-.96 1.84-1.97 3.79-1.97 4.05 0 4.8 2.67 4.8 6.13v6.0h-3.95v-5.32c0-1.27-.02-2.9-1.77-2.9-1.78 0-2.05 1.38-2.05 2.8v5.42H9.2z" />
                </svg>
              )}
              {item.label === "X" && (
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.9 2H22l-7.2 8.3L23 22h-6.7l-5.1-6.7L5.2 22H2l7.7-8.9L1 2h6.8l4.6 6.1L18.9 2z" />
                </svg>
              )}
            </span>
            <input
              className="w-full flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100"
              placeholder={item.placeholder}
            />
            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-200 transition hover:border-rose-400/40 hover:text-rose-100"
              type="button"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              </svg>
            </button>
          </div>
        ))}
        <button
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10"
          type="button"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-indigo-200">
            <svg
              aria-hidden="true"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </span>
          Add new link
        </button>
      </div>
    </SettingsCard>
  );
};

export default ProfileLinksSection;
