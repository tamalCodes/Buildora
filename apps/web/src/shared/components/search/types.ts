export type SearchCategory = {
  id: string;
  label: string;
  description: string;
  iconKey: "trophy" | "folder" | "users";
  accentClass: string;
};

export type SearchFacet = {
  id: string;
  label: string;
  description: string;
  categoryId: string;
};

export type SearchCommand = {
  id: string;
  label: string;
  description: string;
  categoryId: string;
  urlLabel?: string;
};

export type SearchResult = {
  id: string;
  title: string;
  subtitle: string;
  categoryId: string;
  urlLabel?: string;
  badge?: string;
};

export type SearchShortcut = {
  id: string;
  label: string;
  keys: string[];
};

export type SearchGuidance = {
  categoryId: string;
  title: string;
  description: string;
};
