import type { ProfileSectionId } from "./enums";

export interface ProfileNavItem {
  id: ProfileSectionId;
  label: string;
  description: string;
}

export interface ProfilePageProps {
  user?: import("@buildora/shared").User | null;
  onSignOut?: () => void;
}

export interface ProfileHeaderProps {
  avatarUrl: string;
  userLabel: string;
  userEmail: string;
  skills: string[];
}

export interface ProfileMobileNavProps {
  activeSection: ProfileSectionId;
  onChange: (value: ProfileSectionId) => void;
}

export interface ProfileSidebarProps {
  activeId: ProfileSectionId;
  onSelect: (id: ProfileSectionId) => void;
}

export interface ProfileContactSectionProps {
  userEmail: string;
  profile?: import("../../../services/types/profile.types").ProfileCore;
}

export interface ProfileAboutSectionProps {
  profile?: import("../../../services/types/profile.types").ProfileCore;
}
