import type React from "react";
import type { User } from "@buildora/shared";
import type { LegalAccent } from "./types";

export interface LegalPageShellProps {
  user?: User | null;
  onSignOut?: () => void;
  eyebrow: string;
  title: string;
  subtitle: string;
  meta?: string[];
  accent?: LegalAccent;
  children: React.ReactNode;
}

export interface TermsOfUsePageProps {
  user?: User | null;
  onSignOut?: () => void;
}

export interface PrivacyPolicyPageProps {
  user?: User | null;
  onSignOut?: () => void;
}

export interface CodeOfConductPageProps {
  user?: User | null;
  onSignOut?: () => void;
}

export interface BrandAssetsPageProps {
  user?: User | null;
  onSignOut?: () => void;
}
