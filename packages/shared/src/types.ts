
import { z } from 'zod';

export enum AuthStep {
  IDENTIFY = 'IDENTIFY',
  AUTHENTICATE = 'AUTHENTICATE'
}

export enum UserType {
  PERSONAL = 'PERSONAL',
  ORGANIZATION = 'ORGANIZATION',
  UNDETERMINED = 'UNDETERMINED'
}

export interface User {
  id: string;
  email: string;
  userType: UserType;
  organizationName?: string;
  avatarUrl?: string;
  name?: string;
  createdAt?: string;
}

// --- Explore Page Entities ---
export interface Hackathon {
  id: string;
  title: string;
  organizer: string;
  logoUrl: string;
  bannerUrl?: string;
  location: 'Online' | string;
  startDate: string;
  endDate: string;
  status: 'Open' | 'Closed' | 'Happening Now';
  prizePool?: string;
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  upvotes: number;
  authors: { name: string; avatarUrl: string }[];
}

export interface Article {
  id: string;
  title: string;
  source: string;
  sourceUrl: string;
  thumbnailUrl: string;
  description: string;
}

// --- API Logic ---
export const IdentifyRequestSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

export const AuthenticateRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters."),
  userType: z.nativeEnum(UserType),
  organizationName: z.string().optional(),
});

export const ForgotPasswordRequestSchema = z.object({
  email: z.string().email(),
  redirectTo: z.string().url().optional(),
});

export const ResetPasswordRequestSchema = z.object({
  accessToken: z.string().min(1, "Access token is required."),
  newPassword: z.string().min(8, "Password must be at least 8 characters."),
});

export type IdentifyRequest = z.infer<typeof IdentifyRequestSchema>;
export type AuthenticateRequest = z.infer<typeof AuthenticateRequestSchema>;
export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordRequestSchema>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  code?: string;
}

export interface UserIdentificationResponse {
  isNewUser: boolean;
  userType: UserType;
  orgSuggestion?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
