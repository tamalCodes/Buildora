import React from "react";
import { Trash2 } from "lucide-react";
import Button from "@shared/components/Button";
import { applicationClasses } from "../constants/classes";
import type { ApplicationLinksFormProps } from "../constants/interfaces";

const ApplicationLinksForm: React.FC<ApplicationLinksFormProps> = ({ links }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
          >
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
              {link.label}
            </span>
            <input
              className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
              defaultValue={link.value}
              placeholder={link.placeholder}
            />
            <button
              className="text-sm text-rose-300 hover:text-rose-200"
              aria-label={`Remove ${link.label}`}
            >
              <Trash2 className="h-4 w-4" aria-hidden />
            </button>
          </div>
        ))}
        <div className="flex justify-center">
          <button className={applicationClasses.actionButton}>
            + Add new link
          </button>
        </div>
      </div>
      <div className="flex justify-end">
        <Button className="!px-6 !py-2.5 !rounded-xl">Save</Button>
      </div>
    </div>
  );
};

export default ApplicationLinksForm;
