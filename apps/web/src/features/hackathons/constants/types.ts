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

export type HackathonsCatalog = {
  featuredHackathons: Hackathon[];
  openHackathons: Hackathon[];
  upcomingHackathons: Hackathon[];
  pastHackathons: Hackathon[];
};

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

export type HackathonsHeroStat = {
  label: string;
  value: string;
};

export type HackathonsOpenFilter = {
  label: string;
  isActive?: boolean;
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
