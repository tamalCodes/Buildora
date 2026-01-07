import { z } from "zod";

const ShortTextSchema = z.string().trim().max(180);
const LongTextSchema = z.string().trim().max(2000);
const DateSchema = z.string().trim().max(32);

/**
 * Schema: ProfileExperienceCreateSchema
 * Purpose: Validate experience data when users POST /api/profile/me/experiences.
 * Used by: `apps/api/src/profile/controllers/profile.experience.controller.ts` (createExperience, updateExperience via alias).
 * How it works: Allows each field to be optional, enforces length limits, and keeps only the expected keys.
 */
export const ProfileExperienceCreateSchema = z
  .object({
    company: ShortTextSchema.optional(),
    title: ShortTextSchema.optional(),
    location: ShortTextSchema.optional(),
    startDate: DateSchema.optional(),
    endDate: DateSchema.optional(),
    isCurrent: z.boolean().optional(),
    description: LongTextSchema.optional(),
  })
  .strict();

export const ProfileExperienceUpdateSchema = ProfileExperienceCreateSchema;

export type ProfileExperienceCreateRequest = z.infer<
  typeof ProfileExperienceCreateSchema
>;
export type ProfileExperienceUpdateRequest = z.infer<
  typeof ProfileExperienceUpdateSchema
>;
