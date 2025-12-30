import type { ProfileEducation } from "@/profile/types/profile.education.types";

export const mapProfileEducation = (row: any): ProfileEducation => ({
  id: row.id,
  profileId: row.profile_id,
  degreeType: row.degree_type ?? null,
  institution: row.institution ?? null,
  fieldOfStudy: row.field_of_study ?? null,
  isCurrent: row.is_current ?? null,
  graduationMonth: row.graduation_month ?? null,
  graduationYear: row.graduation_year ?? null,
  createdAt: row.created_at ?? null,
  updatedAt: row.updated_at ?? null,
});
