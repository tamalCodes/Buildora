import { z } from "zod";

/**
 * Schema: ProfileRolesUpdateSchema
 * Purpose: Validate complete role updates sent to PUT /api/profile/me/roles.
 * Used by: `apps/api/src/profile/controllers/profile.roles.controller.ts` (replaceRoles).
 * How it works: Requires an array of trimmed role strings, capped at 12 entries, and removes anything else.
 */
export const ProfileRolesUpdateSchema = z
  .object({
    roles: z.array(z.string().trim().min(1).max(64)).max(12),
  })
  .strict();

export type ProfileRolesUpdateRequest = z.infer<typeof ProfileRolesUpdateSchema>;
