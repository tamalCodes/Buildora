import type { ProfileContactSectionProps } from "@/features/profile/constants/interfaces";
import SettingsCard from "@/features/settings/components/SettingsCard";
import {
  SettingsButton,
  SettingsInput,
} from "@/features/settings/components/SettingsControls";
import React from "react";

const ProfileContactSection: React.FC<ProfileContactSectionProps> = ({
  userEmail,
  profile,
}) => {
  return (
    <>
      <SettingsCard
        title="How can we reach you?"
        description="For updates and communication."
        action={<SettingsButton>Save</SettingsButton>}
      >
        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-[1fr_auto]">
            <SettingsInput label="Email address" defaultValue={userEmail} />
            <div className="flex items-end">
              <SettingsButton variant="secondary">Verify email</SettingsButton>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[160px_1fr]">
            <label className="block text-sm text-slate-400">
              <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500">
                Country
              </span>
              <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
                <option>India</option>
                <option>USA</option>
                <option>UK</option>
              </select>
            </label>
            <SettingsInput
              label="Phone number"
              placeholder="+91"
              defaultValue={profile?.phoneNumber || ""}
            />
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        title="Emergency Contact"
        description="For emergencies during events."
        action={<SettingsButton>Save</SettingsButton>}
      >
        <div className="grid gap-4 md:grid-cols-[1fr_1fr]">
          <SettingsInput
            label="Contact name"
            defaultValue={profile?.emergencyName || ""}
          />
          <SettingsInput
            label="Contact number"
            placeholder="+82 824 041 5709"
            defaultValue={profile?.emergencyPhone || ""}
          />
        </div>
      </SettingsCard>
    </>
  );
};

export default ProfileContactSection;
