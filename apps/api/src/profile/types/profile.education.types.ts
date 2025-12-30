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

export interface ProfileEducationCreateInput {
  degreeType?: string;
  institution?: string;
  fieldOfStudy?: string;
  isCurrent?: boolean;
  graduationMonth?: number;
  graduationYear?: number;
}

export type ProfileEducationUpdateInput = ProfileEducationCreateInput;
