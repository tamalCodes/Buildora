import type { ProfileExperienceCreateInput } from "@/profile/types/profile.experience.types";

export const buildProfileExperiencePayload = (
  input: ProfileExperienceCreateInput
) => {
  const payload: Record<string, unknown> = {
    company: input.company,
    title: input.title,
    location: input.location,
    start_date: input.startDate,
    end_date: input.endDate,
    is_current: input.isCurrent,
    description: input.description,
  };

  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  );
};
