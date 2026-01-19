import React from "react";
import { PROFILE_NAV_ITEMS } from "@/features/profile/constants/enums";
import type { ProfileSidebarProps } from "@/features/profile/constants/interfaces";

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  activeId,
  onSelect,
}) => {
  return (
    <aside className="hidden w-full max-w-[240px] flex-col rounded-[2rem] border border-white/10 bg-white/5 px-4 py-6 lg:flex">
      <p className="px-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
        Profile
      </p>
      <nav className="mt-6 flex flex-col gap-1">
        {PROFILE_NAV_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-500/15 text-indigo-200"
                  : "text-slate-400 hover:bg-white/5"
              }`}
              onClick={() => onSelect(item.id)}
              type="button"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-xl border ${
                  isActive
                    ? "border-indigo-500/40 bg-indigo-500/20 text-indigo-200"
                    : "border-white/10 bg-white/5 text-slate-400"
                }`}
              >
                {item.id === "about" && (
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
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
                {item.id === "education" && (
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
                    <path d="m22 10-10-5-10 5 10 5 10-5z" />
                    <path d="M6 12v5c0 1.7 3.6 3 6 3s6-1.3 6-3v-5" />
                  </svg>
                )}
                {item.id === "experience" && (
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
                    <rect x="3" y="7" width="18" height="13" rx="2" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  </svg>
                )}
                {item.id === "links" && (
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
                    <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" />
                    <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" />
                  </svg>
                )}
                {item.id === "contact" && (
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
                    <path d="M22 16.9v2a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 3 4.2 2 2 0 0 1 5 2h2a2 2 0 0 1 2 1.7 12.9 12.9 0 0 0 .7 2.8 2 2 0 0 1-.5 2.1L8 9a16 16 0 0 0 6 6l.4-.2a2 2 0 0 1 2.1-.5 12.9 12.9 0 0 0 2.8.7A2 2 0 0 1 22 16.9z" />
                  </svg>
                )}
              </span>
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="mt-auto pt-6">
        <div className="rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/20 via-transparent to-cyan-500/10 px-4 py-3 text-xs font-black uppercase tracking-[0.2em] text-indigo-200">
          My Buildora
        </div>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
