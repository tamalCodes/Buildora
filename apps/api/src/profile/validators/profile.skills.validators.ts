import { z } from "zod";

export const ProfileSkillsUpdateSchema = z
  .object({
    skills: z.array(z.string().trim().min(1).max(64)).max(5),
  })
  .strict();

export type ProfileSkillsUpdateRequest = z.infer<
  typeof ProfileSkillsUpdateSchema
>;
