import type React from "react";
import type { User } from "@buildora/shared";
import type { ButtonVariant, SettingsNavItem, SettingsSectionId } from "./types";

export interface SettingsPageProps {
  user?: User | null;
  onSignOut?: () => void;
}

export interface SettingsSidebarProps {
  items: SettingsNavItem[];
  activeId: SettingsSectionId;
  onSelect: (id: SettingsSectionId) => void;
  onLogout: () => void;
}

export interface SettingsTopNavProps {
  user?: User | null;
  onSignOut?: () => void;
}

export interface SettingsCardProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export interface SettingsButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export interface SettingsInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export interface SettingsCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export interface SettingsToggleProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
