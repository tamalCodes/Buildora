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
