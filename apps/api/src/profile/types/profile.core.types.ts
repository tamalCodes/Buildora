export interface ProfileCore {
  id: string;
  email: string | null;
  userType: string | null;
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

export interface ProfileUpdateInput {
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
