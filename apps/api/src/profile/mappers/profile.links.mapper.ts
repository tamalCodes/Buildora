import type { ProfileLink } from "@/profile/types/profile.links.types";

export const mapProfileLink = (row: any): ProfileLink => ({
  id: row.id,
  profileId: row.profile_id,
  label: row.label,
  url: row.url,
  createdAt: row.created_at ?? null,
});
