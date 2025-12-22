import React from "react";
import SettingsCard from "../../settings/components/SettingsCard";
import {
  SettingsButton,
  SettingsCheckbox,
  SettingsInput,
} from "../../settings/components/SettingsControls";

const ProfileExperienceSection: React.FC = () => {
  return (
    <>
      <SettingsCard
        title="What describes you best?"
        description="Choose all that fit."
        action={<SettingsButton>Save</SettingsButton>}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Designer",
            "Frontend Developer",
            "Backend Developer",
            "Mobile Developer",
            "Blockchain Developer",
            "Other",
          ].map((label) => (
            <label
              key={label}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-400/40"
              />
              {label}
            </label>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard
        title="Top Tech Skills"
        description="Add up to 5 skills."
        action={<SettingsButton>Save</SettingsButton>}
      >
        <div className="space-y-4">
          <SettingsInput label="Add a skill" placeholder="e.g. React" />
          <div className="flex flex-wrap gap-2">
            {["Python", "Go", "JavaScript", "Node.js", "TypeScript"].map(
              (skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
                >
                  {skill}
                  <button
                    className="text-slate-500 hover:text-white"
                    type="button"
                  >
                    ×
                  </button>
                </span>
              )
            )}
          </div>
        </div>
      </SettingsCard>

      <SettingsCard
        title="Resume"
        description="Your latest resume."
        action={<SettingsButton>Save</SettingsButton>}
      >
        <div className="rounded-2xl border border-dashed border-indigo-500/40 bg-indigo-500/5 px-6 py-10 text-center">
          <p className="text-sm font-semibold text-indigo-200">
            Drag and drop or click to upload
          </p>
          <p className="mt-2 text-xs text-slate-500">PDF up to 5MB</p>
        </div>
      </SettingsCard>

      <SettingsCard
        title="Work Experience"
        description="Roles you've taken on."
        action={<SettingsButton>Save</SettingsButton>}
      >
        <div className="flex flex-col gap-4">
          <SettingsCheckbox label="I am yet to find my first work opportunity" />
          <SettingsButton variant="secondary">+ Add an experience</SettingsButton>
        </div>
      </SettingsCard>
    </>
  );
};

export default ProfileExperienceSection;
