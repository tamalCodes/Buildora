import type { ProfileRole } from "@/profile/types/profile.roles.types";

export const mapProfileRole = (row: any): ProfileRole => ({
  id: row.id,
  profileId: row.profile_id,
  role: row.role,
  createdAt: row.created_at ?? null,
});
