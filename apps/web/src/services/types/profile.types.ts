export interface ProfileCore {
  id: string;
  email?: string | null;
  userType?: string | null;
  organizationName?: string | null;
  avatarUrl?: string | null;
  name?: string | null;
  createdAt?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  gender?: string | null;
  tshirtSize?: string | null;
  city?: string | null;
  bio?: string | null;
  readme?: string | null;
  contactEmail?: string | null;
  phoneCountry?: string | null;
  phoneNumber?: string | null;
  emergencyName?: string | null;
  emergencyPhone?: string | null;
  noFormalEducation?: boolean | null;
}

export interface ProfileSummary {
  profile: ProfileCore;
  skills: string[];
}

export interface ProfileEducation {
  id: string;
  profileId: string;
  degreeType?: string | null;
  institution?: string | null;
  fieldOfStudy?: string | null;
  isCurrent?: boolean | null;
  graduationMonth?: number | null;
  graduationYear?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface ProfileExperience {
  id: string;
  profileId: string;
  company?: string | null;
  title?: string | null;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  isCurrent?: boolean | null;
  description?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface ProfileLink {
  id: string;
  profileId: string;
  label: string;
  url: string;
  createdAt?: string | null;
}

export interface ProfileResume {
  id: string;
  profileId: string;
  url: string;
  label?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface ProfileRole {
  id: string;
  profileId: string;
  role: string;
  createdAt?: string | null;
}

export interface ProfileSkill {
  id: string;
  profileId: string;
  name: string;
  rank?: number | null;
  createdAt?: string | null;
}

export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  gender?: string;
  tshirtSize?: string;
  city?: string;
  bio?: string;
  readme?: string;
  contactEmail?: string;
  phoneCountry?: string;
  phoneNumber?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  noFormalEducation?: boolean;
}

export interface ProfileEducationCreateRequest {
  degreeType?: string;
  institution?: string;
  fieldOfStudy?: string;
  isCurrent?: boolean;
  graduationMonth?: number;
  graduationYear?: number;
}

export type ProfileEducationUpdateRequest = ProfileEducationCreateRequest;

export interface ProfileExperienceCreateRequest {
  company?: string;
  title?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
}

export type ProfileExperienceUpdateRequest = ProfileExperienceCreateRequest;

export interface ProfileLinkCreateRequest {
  label: string;
  url: string;
}

export interface ProfileLinkUpdateRequest {
  label?: string;
  url?: string;
}

export interface ProfileResumeUpsertRequest {
  url: string;
  label?: string;
}

export interface ProfileRolesUpdateRequest {
  roles: string[];
}

export interface ProfileSkillsUpdateRequest {
  skills: string[];
}

export interface DeleteResponse {
  id: string;
}
