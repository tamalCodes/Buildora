import { z } from "zod";

const GraduationMonthSchema = z.number().int().min(1).max(12);

const GraduationYearSchema = z.number().int().min(1900).max(2100);

/**
 * Schema: ProfileEducationCreateSchema
 * Purpose: Validate data sent to POST /api/profile/me/educations and its PATCH mirror.
 * Used by: `apps/api/src/profile/controllers/profile.education.controller.ts` (createEducation, updateEducation via alias).
 * How it works: Enforces optional string fields, boolean, and bounded numbers for graduation dates, and blocks unexpected keys.
 */
export const ProfileEducationCreateSchema = z
  .object({
    degreeType: z.string().trim().max(120).optional(),
    institution: z.string().trim().max(180).optional(),
    fieldOfStudy: z.string().trim().max(180).optional(),
    isCurrent: z.boolean().optional(),
    graduationMonth: GraduationMonthSchema.optional(),
    graduationYear: GraduationYearSchema.optional(),
  })
  .strict();

export const ProfileEducationUpdateSchema = ProfileEducationCreateSchema;

export type ProfileEducationCreateRequest = z.infer<
  typeof ProfileEducationCreateSchema
>;
export type ProfileEducationUpdateRequest = z.infer<
  typeof ProfileEducationUpdateSchema
>;
