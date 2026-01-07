import { z } from "zod";

/**
 * Schema: ProfileResumeUpsertSchema
 * Purpose: Guard the resume payload for PUT /api/profile/me/resume.
 * Used by: `apps/api/src/profile/controllers/profile.resume.controller.ts` (upsertResume).
 * How it works: Requires a valid URL and allows an optional label, rejecting unknown keys.
 */
export const ProfileResumeUpsertSchema = z
  .object({
    url: z.string().trim().url(),
    label: z.string().trim().max(120).optional(),
  })
  .strict();

export type ProfileResumeUpsertRequest = z.infer<
  typeof ProfileResumeUpsertSchema
>;
