import { z } from "zod";

export const ProfileRolesUpdateSchema = z
  .object({
    roles: z.array(z.string().trim().min(1).max(64)).max(12),
  })
  .strict();

export type ProfileRolesUpdateRequest = z.infer<typeof ProfileRolesUpdateSchema>;
