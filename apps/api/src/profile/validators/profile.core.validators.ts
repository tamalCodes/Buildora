import { z } from "zod";

/**
 * Schema: ProfileUpdateSchema
 * Purpose: Guard the PATCH /api/profile/me payload and keep only the fields we store.
 * Used by: `apps/api/src/profile/controllers/profile.core.controller.ts`.
 * How it works: Allows each updatable string or boolean to be optional, trimmed, and capped, and rejects extra keys.
 */
export const ProfileUpdateSchema = z
  .object({
    firstName: z.string().trim().min(1).max(120).optional(),
    lastName: z.string().trim().min(1).max(120).optional(),
    gender: z.string().trim().max(32).optional(),
    tshirtSize: z.string().trim().max(8).optional(),
    city: z.string().trim().max(120).optional(),
    bio: z.string().trim().max(1000).optional(),
    readme: z.string().trim().max(5000).optional(),
    contactEmail: z.string().trim().email().optional(),
    phoneCountry: z.string().trim().max(8).optional(),
    phoneNumber: z.string().trim().max(32).optional(),
    emergencyName: z.string().trim().max(120).optional(),
    emergencyPhone: z.string().trim().max(32).optional(),
    noFormalEducation: z.boolean().optional(),
  })
  .strict();

export type ProfileUpdateRequest = z.infer<typeof ProfileUpdateSchema>;
