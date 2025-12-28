import Button from "@shared/components/Button";
import { X } from "lucide-react";
import React from "react";
import { applicationClasses } from "../constants/classes";
import type { ApplicationExperienceFormProps } from "../constants/interfaces";

const ApplicationExperienceForm: React.FC<ApplicationExperienceFormProps> = ({
  roles,
  skills,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className={applicationClasses.label}>
          Which of the following describes you best?
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {roles.map((role) => (
            <button
              key={role.id}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors ${
                role.selected
                  ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-100"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-emerald-500/30"
              }`}
            >
              <div>
                <p className="text-sm font-semibold">{role.label}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {role.description}
                </p>
              </div>
              <span
                className={`h-5 w-5 rounded-md border ${
                  role.selected
                    ? "border-emerald-400 bg-emerald-400/30"
                    : "border-white/20"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className={applicationClasses.label}>Add up to 5 skills</p>
        <input className={applicationClasses.input} placeholder="E.g. React" />
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-bold ${
                skill.selected
                  ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-100"
                  : "border-white/10 bg-white/5 text-slate-300"
              }`}
            >
              {skill.label}
              <button className="text-xs text-slate-400 hover:text-emerald-200">
                <X className="h-3 w-3" aria-hidden />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="!px-6 !py-2.5 !rounded-xl">Save</Button>
      </div>
    </div>
  );
};

export default ApplicationExperienceForm;
