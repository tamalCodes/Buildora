import { z } from "zod";

/**
 * Schema: ProfileLinkCreateSchema
 * Purpose: Validate payload when adding a link on /api/profile/me/links.
 * Used by: `apps/api/src/profile/controllers/profile.links.controller.ts` (createLink).
 * How it works: Requires a short label and a well-formed URL.
 */
export const ProfileLinkCreateSchema = z
  .object({
    label: z.string().trim().min(1).max(64),
    url: z.string().trim().url(),
  })
  .strict();

/**
 * Schema: ProfileLinkUpdateSchema
 * Purpose: Guard the partial update path for /api/profile/me/links/:id.
 * Used by: `apps/api/src/profile/controllers/profile.links.controller.ts` (updateLink).
 * How it works: Allows either field to be supplied, still trimmed and validated, and rejects other properties.
 */
export const ProfileLinkUpdateSchema = z
  .object({
    label: z.string().trim().min(1).max(64).optional(),
    url: z.string().trim().url().optional(),
  })
  .strict();

export type ProfileLinkCreateRequest = z.infer<typeof ProfileLinkCreateSchema>;
export type ProfileLinkUpdateRequest = z.infer<typeof ProfileLinkUpdateSchema>;
