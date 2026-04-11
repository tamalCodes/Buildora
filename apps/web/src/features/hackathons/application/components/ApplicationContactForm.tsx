import Button from "@shared/components/Button";
import React from "react";
import { applicationClasses } from "../constants/classes";
import type { ApplicationContactFormProps } from "@/features/hackathons/application/constants/interfaces";

const ApplicationContactForm: React.FC<ApplicationContactFormProps> = ({
  fields,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {fields.map((field) => (
          <label key={field.id} className="space-y-2">
            <span className={applicationClasses.label}>{field.label}</span>
            <input
              className={applicationClasses.input}
              type={field.type}
              defaultValue={field.value}
              placeholder={field.placeholder}
            />
          </label>
        ))}
      </div>
      <div className="flex justify-end">
        <Button className="px-6! py-2.5! rounded-xl!">Save</Button>
      </div>
    </div>
  );
};

export default ApplicationContactForm;
