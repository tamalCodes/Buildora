import type { ProfileResume } from "@/profile/types/profile.resume.types";

export const mapProfileResume = (row: any): ProfileResume => ({
  id: row.id,
  profileId: row.profile_id,
  url: row.url,
  label: row.label ?? null,
  createdAt: row.created_at ?? null,
  updatedAt: row.updated_at ?? null,
});
