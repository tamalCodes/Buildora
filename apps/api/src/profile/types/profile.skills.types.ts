export interface ProfileSkill {
  id: string;
  profileId: string;
  name: string;
  rank?: number | null;
  createdAt?: string | null;
}

export interface ProfileSkillsUpdateInput {
  skills: string[];
}
