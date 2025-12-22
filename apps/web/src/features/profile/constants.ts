export type ProfileSectionId =
  | "about"
  | "education"
  | "experience"
  | "links"
  | "contact";

export const PROFILE_NAV_ITEMS: {
  id: ProfileSectionId;
  label: string;
  description: string;
}[] = [
  {
    id: "about",
    label: "About",
    description: "Basic info and your story.",
  },
  {
    id: "education",
    label: "Education",
    description: "Degrees and training.",
  },
  {
    id: "experience",
    label: "Experience",
    description: "Skills, roles, and resume.",
  },
  {
    id: "links",
    label: "Links",
    description: "Showcase your work.",
  },
  {
    id: "contact",
    label: "Contact",
    description: "Keep organizers in touch.",
  },
];
