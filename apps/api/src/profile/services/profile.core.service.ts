import type { ProfileUpdateInput } from "@/profile/types/profile.core.types";

export const buildProfileCoreUpdate = (input: ProfileUpdateInput) => {
  const update: Record<string, unknown> = {
    first_name: input.firstName,
    last_name: input.lastName,
    gender: input.gender,
    tshirt_size: input.tshirtSize,
    city: input.city,
    bio: input.bio,
    readme: input.readme,
    contact_email: input.contactEmail,
    phone_country: input.phoneCountry,
    phone_number: input.phoneNumber,
    emergency_name: input.emergencyName,
    emergency_phone: input.emergencyPhone,
    no_formal_education: input.noFormalEducation,
  };

  return Object.fromEntries(
    Object.entries(update).filter(([, value]) => value !== undefined)
  );
};
