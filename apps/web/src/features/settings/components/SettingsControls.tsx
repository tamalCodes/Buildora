import React from "react";
import type {
  SettingsButtonProps,
  SettingsCheckboxProps,
  SettingsInputProps,
  SettingsToggleProps,
} from "../constants/interfaces";
import type { ButtonVariant } from "../constants/types";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-500 border border-indigo-400/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]",
  secondary:
    "bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10 hover:border-white/20",
  outline:
    "bg-transparent border border-white/10 text-slate-400 hover:text-white hover:border-indigo-500/40 hover:bg-indigo-500/5",
  ghost: "text-slate-400 hover:text-white",
  danger:
    "bg-rose-500 text-white hover:bg-rose-400 border border-rose-300/20 hover:shadow-[0_0_20px_rgba(244,63,94,0.35)]",
};

export const SettingsButton: React.FC<SettingsButtonProps> = ({
  variant = "primary",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-bold font-geist tracking-tight transition-all duration-300 active:scale-[0.98] ${BUTTON_VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
};

export const SettingsInput: React.FC<SettingsInputProps> = ({
  label,
  className = "",
  id,
  ...props
}) => {
  const inputId = id ?? `input-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <label className="block text-sm text-slate-400" htmlFor={inputId}>
      <span className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500">
        {label}
      </span>
      <input
        id={inputId}
        className={`w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-indigo-500/60 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 ${className}`}
        {...props}
      />
    </label>
  );
};

export const SettingsCheckbox: React.FC<SettingsCheckboxProps> = ({
  label,
  description,
  className = "",
  ...props
}) => {
  return (
    <label className={`flex gap-3 text-sm text-slate-300 ${className}`}>
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-400/40"
        {...props}
      />
      <span>
        <span className="block font-medium text-slate-100">{label}</span>
        {description ? (
          <span className="block text-xs text-slate-500">{description}</span>
        ) : null}
      </span>
    </label>
  );
};

export const SettingsToggle: React.FC<SettingsToggleProps> = ({
  label,
  className = "",
  ...props
}) => {
  return (
    <label className={`flex items-center gap-3 text-sm ${className}`}>
      <span className="text-slate-400">{label}</span>
      <span className="relative inline-flex h-6 w-11 items-center">
        <input type="checkbox" className="peer sr-only" {...props} />
        <span className="absolute inset-0 rounded-full bg-white/10 transition peer-checked:bg-indigo-500"></span>
        <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5"></span>
      </span>
    </label>
  );
};
