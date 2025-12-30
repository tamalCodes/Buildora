export interface ProfileRole {
  id: string;
  profileId: string;
  role: string;
  createdAt?: string | null;
}

export interface ProfileRolesUpdateInput {
  roles: string[];
}
