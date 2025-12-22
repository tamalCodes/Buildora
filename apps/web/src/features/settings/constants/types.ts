import type { ReactNode } from "react";

export type SettingsSectionId =
  | "account"
  | "notifications"
  | "wallets"
  | "beta"
  | "kyc"
  | "mcp"
  | "security";

export type SettingsNavItem = {
  id: SettingsSectionId;
  label: string;
  icon: ReactNode;
};

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
