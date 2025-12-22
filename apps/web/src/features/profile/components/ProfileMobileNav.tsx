import React from "react";
import type { ProfileSectionId } from "../constants/enums";
import { PROFILE_NAV_ITEMS } from "../constants/enums";
import type { ProfileMobileNavProps } from "../constants/interfaces";

const ProfileMobileNav: React.FC<ProfileMobileNavProps> = ({
  activeSection,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-3 rounded-[2rem] border border-white/10 bg-white/5 px-4 py-4 lg:hidden">
      <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
        Jump to
      </label>
      <select
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
        value={activeSection}
        onChange={(event) => onChange(event.target.value as ProfileSectionId)}
      >
        {PROFILE_NAV_ITEMS.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProfileMobileNav;
