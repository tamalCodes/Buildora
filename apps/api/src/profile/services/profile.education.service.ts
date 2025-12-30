import type { ProfileEducationCreateInput } from "@/profile/types/profile.education.types";

export const buildProfileEducationPayload = (
  input: ProfileEducationCreateInput
) => {
  const payload: Record<string, unknown> = {
    degree_type: input.degreeType,
    institution: input.institution,
    field_of_study: input.fieldOfStudy,
    is_current: input.isCurrent,
    graduation_month: input.graduationMonth,
    graduation_year: input.graduationYear,
  };

  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  );
};
