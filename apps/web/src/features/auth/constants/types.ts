export type AuthFieldErrorKey = "email" | "password" | "organizationName";

export type AuthFieldErrors = Partial<Record<AuthFieldErrorKey, string>>;
