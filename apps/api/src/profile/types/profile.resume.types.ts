export interface ProfileResume {
  id: string;
  profileId: string;
  url: string;
  label?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface ProfileResumeUpsertInput {
  url: string;
  label?: string;
}
