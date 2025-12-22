import { User } from "@buildora/shared";

export type NavItem = {
  label: string;
  path: string;
};

export interface GlobalNavProps {
  user?: User | null;
  onSignOut?: () => void;
}
