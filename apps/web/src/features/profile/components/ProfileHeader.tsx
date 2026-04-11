import React from "react";

import type { ProfileHeaderProps } from "@/features/profile/constants/interfaces";

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  avatarUrl,
  userLabel,
  userEmail,
  skills,
}) => {
  return (
    <div className="mb-10 flex flex-col gap-5">
      <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
        My Buildora
      </p>
      <div className="flex flex-col gap-6 rounded-4xl border border-white/10 bg-white/5 px-6 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-indigo-400 via-cyan-400 to-rose-400 p-0.5">
            <img
              src={avatarUrl}
              alt={userLabel}
              className="h-full w-full rounded-full border border-white object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-geist font-black text-white">
              {userLabel}
            </h1>
            <p className="text-sm text-slate-400">{userEmail}</p>
            <p className="mt-2 text-sm text-slate-300">
              Shape your Buildora presence with details organizers care about.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
