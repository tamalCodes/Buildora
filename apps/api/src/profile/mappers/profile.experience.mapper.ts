import type { ProfileExperience } from "@/profile/types/profile.experience.types";

export const mapProfileExperience = (row: any): ProfileExperience => ({
  id: row.id,
  profileId: row.profile_id,
  company: row.company ?? null,
  title: row.title ?? null,
  location: row.location ?? null,
  startDate: row.start_date ?? null,
  endDate: row.end_date ?? null,
  isCurrent: row.is_current ?? null,
  description: row.description ?? null,
  createdAt: row.created_at ?? null,
  updatedAt: row.updated_at ?? null,
});
