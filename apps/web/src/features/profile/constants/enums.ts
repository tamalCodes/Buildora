import type { ProfileNavItem } from "./interfaces";

export enum ProfileSectionId {
  About = "about",
  Education = "education",
  Experience = "experience",
  Links = "links",
  Contact = "contact",
}

export const PROFILE_NAV_ITEMS: ProfileNavItem[] = [
  {
    id: ProfileSectionId.About,
    label: "About",
    description: "Basic info and your story.",
  },
  {
    id: ProfileSectionId.Education,
    label: "Education",
    description: "Degrees and training.",
  },
  {
    id: ProfileSectionId.Experience,
    label: "Experience",
    description: "Skills, roles, and resume.",
  },
  {
    id: ProfileSectionId.Links,
    label: "Links",
    description: "Showcase your work.",
  },
  {
    id: ProfileSectionId.Contact,
    label: "Contact",
    description: "Keep organizers in touch.",
  },
];
