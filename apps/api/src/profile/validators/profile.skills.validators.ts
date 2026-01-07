import { z } from "zod";

/**
 * Schema: ProfileSkillsUpdateSchema
 * Purpose: Validate the ranked skill list supplied to PUT /api/profile/me/skills.
 * Used by: `apps/api/src/profile/controllers/profile.skills.controller.ts` (replaceSkills).
 * How it works: Ensures a short list of trimmed skill names (max 5) and rejects other payloads.
 */
export const ProfileSkillsUpdateSchema = z
  .object({
    skills: z.array(z.string().trim().min(1).max(64)).max(5),
  })
  .strict();

export type ProfileSkillsUpdateRequest = z.infer<
  typeof ProfileSkillsUpdateSchema
>;
