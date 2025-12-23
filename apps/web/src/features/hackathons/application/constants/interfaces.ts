import type React from "react";
import type { User } from "@buildora/shared";
import type { Hackathon, HackathonDetail } from "../../constants/types";
import type {
  ApplicationContactField,
  ApplicationLinkItem,
  ApplicationProgress,
  ApplicationRoleOption,
  ApplicationSectionStatus,
  ApplicationSidebarMetric,
  ApplicationSkillTag,
} from "./types";

export interface HackathonApplicationPageProps {
  user?: User | null;
  onSignOut?: () => void;
}

export interface ApplicationHeroProps {
  hackathon: Hackathon;
  detail: HackathonDetail;
  activeTab: string;
  onNavigate: (tabId: string) => void;
}

export interface ApplicationNoticeProps {
  message: string;
  ctaLabel: string;
  onCtaClick?: () => void;
}

export interface ApplicationSidebarProps {
  hackathon: Hackathon;
  detail: HackathonDetail;
  progress: ApplicationProgress;
  metrics: ApplicationSidebarMetric[];
  isOnline: boolean;
}

export interface ApplicationSectionCardProps {
  title: string;
  description: string;
  status: ApplicationSectionStatus;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export interface ApplicationExperienceFormProps {
  roles: ApplicationRoleOption[];
  skills: ApplicationSkillTag[];
}

export interface ApplicationLinksFormProps {
  links: ApplicationLinkItem[];
}

export interface ApplicationContactFormProps {
  fields: ApplicationContactField[];
}

export interface ApplicationAboutFormProps {
  firstName: string;
  lastName: string;
  headline: string;
  portfolio: string;
  bio: string;
}
