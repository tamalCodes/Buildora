import { User } from "@buildora/shared";

export type Hackathon = {
  id: string;
  title: string;
  organizer: string;
  location: string;
  dates: string;
  status: "Open" | "Upcoming" | "Past";
  tags: string[];
  prize: string;
  participants: string;
  coverUrl: string;
  logoUrl: string;
  sponsor?: string;
};

export interface HackathonsPageProps {
  user?: User | null;
  onSignOut?: () => void;
}

export type HackathonPrize = {
  title: string;
  amount: string;
  description: string;
};

export type HackathonScheduleItem = {
  time: string;
  title: string;
  description: string;
};

export type HackathonFaqItem = {
  question: string;
  answer: string;
};

export type HackathonSponsor = {
  name: string;
  tier: string;
  logoUrl: string;
};

export type HackathonSocialLink = {
  label: string;
  href: string;
};

export type HackathonDetail = {
  id: string;
  heroSubtitle: string;
  bannerUrl: string;
  applicationDeadline: string;
  statusLabel: string;
  mode: string;
  teamSize: string;
  eligibility: string;
  about: string[];
  tracks: string[];
  perks: string[];
  rules: string[];
  prizePool: string;
  prizes: HackathonPrize[];
  schedule: HackathonScheduleItem[];
  sponsors: HackathonSponsor[];
  faqs: HackathonFaqItem[];
  socials: HackathonSocialLink[];
  contactEmail: string;
};

export interface HackathonDetailsPageProps {
  user?: User | null;
  onSignOut?: () => void;
}
