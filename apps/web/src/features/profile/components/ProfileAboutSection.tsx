import React from "react";
import SettingsCard from "../../settings/components/SettingsCard";
import {
  SettingsButton,
  SettingsInput,
} from "../../settings/components/SettingsControls";
import type { ProfileAboutSectionProps } from "../constants/interfaces";

const ProfileAboutSection: React.FC<ProfileAboutSectionProps> = ({
  profile,
}) => {
  return (
    <>
      <SettingsCard
        title="Basic Info"
        description="Just the essentials."
        action={<SettingsButton>Save</SettingsButton>}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <SettingsInput
            label="First name"
            defaultValue={profile?.firstName || ""}
          />
          <SettingsInput
            label="Last name"
            defaultValue={profile?.lastName || ""}
          />
          <label className="block text-sm text-slate-400">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500">
              Identify as
            </span>
            <select
              defaultValue={profile?.gender || ""}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
            </select>
          </label>
          <label className="block text-sm text-slate-400">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500">
              T-shirt size
            </span>
            <select
              defaultValue={profile?.tshirtSize || ""}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100"
            >
              <option value="">Select</option>
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </label>
          <SettingsInput
            label="City"
            placeholder="e.g. Bangalore"
            defaultValue={profile?.city || ""}
          />
        </div>
      </SettingsCard>

      <SettingsCard
        title="About You"
        description="Tell your story."
        action={<SettingsButton>Save</SettingsButton>}
      >
        <div className="space-y-5">
          <label className="block text-sm text-slate-400">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500">
              Bio
            </span>
            <textarea
              className="h-24 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600"
              placeholder="Add a short bio."
              defaultValue={profile?.bio || ""}
            />
          </label>
          <label className="block text-sm text-slate-400">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500">
              Readme
            </span>
            <textarea
              className="h-40 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600"
              placeholder="Write your story, goals, and past wins."
              defaultValue={profile?.readme || ""}
            />
            <p className="mt-2 text-xs text-slate-500">
              Markdown supported. Keep it concise and skimmable.
            </p>
          </label>
        </div>
      </SettingsCard>
    </>
  );
};

export default ProfileAboutSection;
