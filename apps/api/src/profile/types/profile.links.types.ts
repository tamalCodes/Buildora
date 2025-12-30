export interface ProfileLink {
  id: string;
  profileId: string;
  label: string;
  url: string;
  createdAt?: string | null;
}

export interface ProfileLinkCreateInput {
  label: string;
  url: string;
}

export interface ProfileLinkUpdateInput {
  label?: string;
  url?: string;
}
