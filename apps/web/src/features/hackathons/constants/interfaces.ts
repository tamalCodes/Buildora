import type { User } from "@buildora/shared";
import type { Hackathon, HackathonDetail } from "./types";

export interface HackathonsPageProps {
  user?: User | null;
  onSignOut?: () => void;
}

export interface HackathonDetailsPageProps {
  user?: User | null;
  onSignOut?: () => void;
}

export interface HackathonSponsorsProps {
  detail: HackathonDetail;
}

export interface HackathonScheduleProps {
  detail: HackathonDetail;
}

export interface HackathonPrizesProps {
  detail: HackathonDetail;
}

export interface HackathonOverviewProps {
  detail: HackathonDetail;
}

export interface HackathonFaqsProps {
  detail: HackathonDetail;
}

export interface HackathonHeroProps {
  hackathon: Hackathon;
  detail: HackathonDetail;
}

export interface HackathonInfoCardProps {
  hackathon: Hackathon;
  detail: HackathonDetail;
}

export interface HackathonMoreProps {
  hackathons: Hackathon[];
}
