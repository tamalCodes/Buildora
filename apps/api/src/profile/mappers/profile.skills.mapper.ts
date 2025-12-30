import type { ProfileSkill } from "@/profile/types/profile.skills.types";

export const mapProfileSkill = (row: any): ProfileSkill => ({
  id: row.id,
  profileId: row.profile_id,
  name: row.name,
  rank: row.rank ?? null,
  createdAt: row.created_at ?? null,
});
