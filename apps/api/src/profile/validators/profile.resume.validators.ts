import { z } from "zod";

export const ProfileResumeUpsertSchema = z
  .object({
    url: z.string().trim().url(),
    label: z.string().trim().max(120).optional(),
  })
  .strict();

export type ProfileResumeUpsertRequest = z.infer<
  typeof ProfileResumeUpsertSchema
>;
