export interface ProfileExperience {
  id: string;
  profileId: string;
  company?: string | null;
  title?: string | null;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  isCurrent?: boolean | null;
  description?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface ProfileExperienceCreateInput {
  company?: string;
  title?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
}

export type ProfileExperienceUpdateInput = ProfileExperienceCreateInput;
