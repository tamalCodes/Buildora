import type { User } from "@buildora/shared";

export interface ExplorePageProps {
  user?: User | null;
  onSignOut?: () => void;
}
