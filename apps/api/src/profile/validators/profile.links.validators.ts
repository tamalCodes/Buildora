import { z } from "zod";

export const ProfileLinkCreateSchema = z
  .object({
    label: z.string().trim().min(1).max(64),
    url: z.string().trim().url(),
  })
  .strict();

export const ProfileLinkUpdateSchema = z
  .object({
    label: z.string().trim().min(1).max(64).optional(),
    url: z.string().trim().url().optional(),
  })
  .strict();

export type ProfileLinkCreateRequest = z.infer<typeof ProfileLinkCreateSchema>;
export type ProfileLinkUpdateRequest = z.infer<typeof ProfileLinkUpdateSchema>;
