import type { ProfileCore } from "@/profile/types/profile.core.types";

export const mapProfileCore = (profile: any): ProfileCore => ({
  id: profile.id,
  email: profile.email ?? null,
  userType: profile.user_type ?? null,
  organizationName: profile.organization_name ?? null,
  avatarUrl: profile.avatar_url ?? null,
  name: profile.name ?? null,
  createdAt: profile.created_at ?? null,
  firstName: profile.first_name ?? null,
  lastName: profile.last_name ?? null,
  gender: profile.gender ?? null,
  tshirtSize: profile.tshirt_size ?? null,
  city: profile.city ?? null,
  bio: profile.bio ?? null,
  readme: profile.readme ?? null,
  contactEmail: profile.contact_email ?? null,
  phoneCountry: profile.phone_country ?? null,
  phoneNumber: profile.phone_number ?? null,
  emergencyName: profile.emergency_name ?? null,
  emergencyPhone: profile.emergency_phone ?? null,
  noFormalEducation: profile.no_formal_education ?? null,
});
