import React from "react";
import SettingsCard from "../../settings/components/SettingsCard";
import {
  SettingsButton,
  SettingsCheckbox,
  SettingsInput,
} from "../../settings/components/SettingsControls";

const ProfileEducationSection: React.FC = () => {
  return (
    <SettingsCard
      title="Education"
      description="All journeys count."
      action={<SettingsButton>Save</SettingsButton>}
    >
      <div className="space-y-4">
        <SettingsCheckbox label="I don't have a formal education" />
        <label className="block text-sm text-slate-400">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500">
            Degree type
          </span>
          <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
            <option>Bachelors</option>
            <option>Masters</option>
            <option>Bootcamp</option>
            <option>Self-taught</option>
          </select>
        </label>
        <SettingsInput
          label="Educational institution"
          placeholder="University or program name"
        />
        <SettingsCheckbox label="I currently study here" />
        <SettingsInput label="Field of study" />
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm text-slate-400">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500">
              Year of graduation
            </span>
            <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
              <option>2024</option>
              <option>2025</option>
              <option>2026</option>
            </select>
          </label>
          <label className="block text-sm text-slate-400">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500">
              Month of graduation
            </span>
            <select className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
              <option>April</option>
              <option>June</option>
              <option>December</option>
            </select>
          </label>
        </div>
      </div>
    </SettingsCard>
  );
};

export default ProfileEducationSection;
