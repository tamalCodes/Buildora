import type { ProfileCore } from "@/profile/types/profile.core.types";
import type { ProfileEducation } from "@/profile/types/profile.education.types";
import type { ProfileExperience } from "@/profile/types/profile.experience.types";
import type { ProfileLink } from "@/profile/types/profile.links.types";
import type { ProfileResume } from "@/profile/types/profile.resume.types";
import type { ProfileRole } from "@/profile/types/profile.roles.types";
import type { ProfileSkill } from "@/profile/types/profile.skills.types";

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

export const mapProfileEducation = (row: any): ProfileEducation => ({
  id: row.id,
  profileId: row.profile_id,
  degreeType: row.degree_type ?? null,
  institution: row.institution ?? null,
  fieldOfStudy: row.field_of_study ?? null,
  isCurrent: row.is_current ?? null,
  graduationMonth: row.graduation_month ?? null,
  graduationYear: row.graduation_year ?? null,
  createdAt: row.created_at ?? null,
  updatedAt: row.updated_at ?? null,
});

export const mapProfileExperience = (row: any): ProfileExperience => ({
  id: row.id,
  profileId: row.profile_id,
  company: row.company ?? null,
  title: row.title ?? null,
  location: row.location ?? null,
  startDate: row.start_date ?? null,
  endDate: row.end_date ?? null,
  isCurrent: row.is_current ?? null,
  description: row.description ?? null,
  createdAt: row.created_at ?? null,
  updatedAt: row.updated_at ?? null,
});

export const mapProfileLink = (row: any): ProfileLink => ({
  id: row.id,
  profileId: row.profile_id,
  label: row.label,
  url: row.url,
  createdAt: row.created_at ?? null,
});

export const mapProfileResume = (row: any): ProfileResume => ({
  id: row.id,
  profileId: row.profile_id,
  url: row.url,
  label: row.label ?? null,
  createdAt: row.created_at ?? null,
  updatedAt: row.updated_at ?? null,
});

export const mapProfileRole = (row: any): ProfileRole => ({
  id: row.id,
  profileId: row.profile_id,
  role: row.role,
  createdAt: row.created_at ?? null,
});

export const mapProfileSkill = (row: any): ProfileSkill => ({
  id: row.id,
  profileId: row.profile_id,
  name: row.name,
  rank: row.rank ?? null,
  createdAt: row.created_at ?? null,
});
