import Button from "@shared/components/Button";
import React from "react";
import { applicationClasses } from "../constants/classes";
import type { ApplicationAboutFormProps } from "../constants/interfaces";

const ApplicationAboutForm: React.FC<ApplicationAboutFormProps> = ({
  firstName,
  lastName,
  headline,
  portfolio,
  bio,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="space-y-2">
          <span className={applicationClasses.label}>First name</span>
          <input
            className={applicationClasses.input}
            defaultValue={firstName}
          />
        </label>
        <label className="space-y-2">
          <span className={applicationClasses.label}>Last name</span>
          <input className={applicationClasses.input} defaultValue={lastName} />
        </label>
      </div>
      <label className="space-y-2">
        <span className={applicationClasses.label}>Headline</span>
        <input className={applicationClasses.input} defaultValue={headline} />
      </label>
      <label className="space-y-2">
        <span className={applicationClasses.label}>Portfolio</span>
        <input className={applicationClasses.input} defaultValue={portfolio} />
      </label>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={applicationClasses.label}>Readme</span>
          <div className="flex items-center gap-2">
            <button className={applicationClasses.actionButton}>Write</button>
            <button className={applicationClasses.actionButton}>Preview</button>
          </div>
        </div>
        <textarea className={applicationClasses.textarea} defaultValue={bio} />
        <p className="text-xs text-slate-500">
          Attach images by dragging & dropping, selecting, or pasting them.
        </p>
      </div>
      <div className="flex justify-end">
        <Button className="!px-6 !py-2.5 !rounded-xl">Save</Button>
      </div>
    </div>
  );
};

export default ApplicationAboutForm;
