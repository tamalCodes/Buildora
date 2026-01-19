import { ProfileService } from "@/services/profileService";
import {
  ProfileEducationCreateRequest,
  ProfileEducationUpdateRequest,
  ProfileExperienceCreateRequest,
  ProfileExperienceUpdateRequest,
  ProfileLinkCreateRequest,
  ProfileLinkUpdateRequest,
  ProfileResumeUpsertRequest,
  ProfileRolesUpdateRequest,
  ProfileSkillsUpdateRequest,
  ProfileUpdateRequest,
} from "@/services/types/profile.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const baseOptions = {
  retry: false,
  staleTime: 0,
  gcTime: 0,
  refetchOnWindowFocus: false,
};

/**
 * React Query keys for profile-related resources.
 * Purpose: ensure every profile API response has a stable cache identity.
 * Used by: query hooks below and any manual cache invalidation.
 * Inputs: none (functions return readonly key arrays).
 * Output: cache key helpers for profile data.
 */
export const profileQueryKeys = {
  all: ["profile"] as const,
  me: () => [...profileQueryKeys.all, "me"] as const,
  summary: () => [...profileQueryKeys.all, "summary"] as const,
  educations: () => [...profileQueryKeys.all, "educations"] as const,
  experiences: () => [...profileQueryKeys.all, "experiences"] as const,
  links: () => [...profileQueryKeys.all, "links"] as const,
  resume: () => [...profileQueryKeys.all, "resume"] as const,
  roles: () => [...profileQueryKeys.all, "roles"] as const,
  skills: () => [...profileQueryKeys.all, "skills"] as const,
};

/**
 * Fetch the profile summary for the header and About section.
 * Used by: profile header + summary UI.
 * Endpoint: GET /api/profile/me/summary
 * Inputs: none.
 * Output: React Query result with ProfileSummary in `data`.
 * @returns Query result object from `useQuery`.
 */

export const useProfileSummary = () =>
  useQuery({
    queryKey: profileQueryKeys.summary(),
    queryFn: ProfileService.getSummary,
    ...baseOptions,
  });

/**
 * Fetch the signed-in user's core profile record.
 * Used by: core profile forms (basic info, contact, about).
 * Endpoint: GET /api/profile/me
 * Inputs: none.
 * Output: React Query result with ProfileCore in `data`.
 * @returns Query result object from `useQuery`.
 */

export const useProfileMe = () =>
  useQuery({
    queryKey: profileQueryKeys.me(),
    queryFn: ProfileService.getMe,
    ...baseOptions,
  });

/**
 * Update the signed-in user's core profile fields.
 * Used by: save actions in basic info, about, and contact sections.
 * Endpoint: PATCH /api/profile/me
 * Inputs: `mutation.mutate(payload)` where payload is ProfileUpdateRequest.
 * Output: mutation result resolving to ProfileCore.
 * Invalidates: profileQueryKeys.me(), profileQueryKeys.summary().
 * @returns Mutation object from `useMutation`.
 */

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProfileUpdateRequest) =>
      ProfileService.updateMe(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.me() });
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.summary() });
    },
  });
};

/**
 * Fetch the signed-in user's education entries.
 * Used by: Education section list UI.
 * Endpoint: GET /api/profile/me/educations
 * Inputs: none.
 * Output: React Query result with ProfileEducation[] in `data`.
 * @returns Query result object from `useQuery`.
 */

export const useProfileEducations = () =>
  useQuery({
    queryKey: profileQueryKeys.educations(),
    queryFn: ProfileService.listEducations,
    ...baseOptions,
  });

/**
 * Create a new education entry.
 * Used by: Education section add flow.
 * Endpoint: POST /api/profile/me/educations
 * Inputs: `mutation.mutate(payload)` where payload is ProfileEducationCreateRequest.
 * Output: mutation result resolving to ProfileEducation.
 * Invalidates: profileQueryKeys.educations().
 * @returns Mutation object from `useMutation`.
 */

export const useCreateEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProfileEducationCreateRequest) =>
      ProfileService.createEducation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileQueryKeys.educations(),
      });
    },
  });
};

/**
 * Update an existing education entry by id.
 * Used by: Education section edit flow.
 * Endpoint: PATCH /api/profile/me/educations/:id
 * Inputs: `mutation.mutate({ id, payload })`.
 * Output: mutation result resolving to ProfileEducation.
 * Invalidates: profileQueryKeys.educations().
 * @returns Mutation object from `useMutation`.
 */

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: ProfileEducationUpdateRequest;
    }) => ProfileService.updateEducation(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileQueryKeys.educations(),
      });
    },
  });
};

/**
 * Delete an education entry by id.
 * Used by: Education section delete action.
 * Endpoint: DELETE /api/profile/me/educations/:id
 * Inputs: `mutation.mutate(id)`.
 * Output: mutation result resolving to DeleteResponse.
 * Invalidates: profileQueryKeys.educations().
 * @returns Mutation object from `useMutation`.
 */

export const useDeleteEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProfileService.deleteEducation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileQueryKeys.educations(),
      });
    },
  });
};

/**
 * Fetch the signed-in user's experience entries.
 * Used by: Experience section list UI.
 * Endpoint: GET /api/profile/me/experiences
 * Inputs: none.
 * Output: React Query result with ProfileExperience[] in `data`.
 * @returns Query result object from `useQuery`.
 */

export const useProfileExperiences = () =>
  useQuery({
    queryKey: profileQueryKeys.experiences(),
    queryFn: ProfileService.listExperiences,
    ...baseOptions,
  });

/**
 * Create a new experience entry.
 * Used by: Experience section add flow.
 * Endpoint: POST /api/profile/me/experiences
 * Inputs: `mutation.mutate(payload)` where payload is ProfileExperienceCreateRequest.
 * Output: mutation result resolving to ProfileExperience.
 * Invalidates: profileQueryKeys.experiences().
 * @returns Mutation object from `useMutation`.
 */

export const useCreateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProfileExperienceCreateRequest) =>
      ProfileService.createExperience(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileQueryKeys.experiences(),
      });
    },
  });
};

/**
 * Update an existing experience entry by id.
 * Used by: Experience section edit flow.
 * Endpoint: PATCH /api/profile/me/experiences/:id
 * Inputs: `mutation.mutate({ id, payload })`.
 * Output: mutation result resolving to ProfileExperience.
 * Invalidates: profileQueryKeys.experiences().
 * @returns Mutation object from `useMutation`.
 */

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: ProfileExperienceUpdateRequest;
    }) => ProfileService.updateExperience(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileQueryKeys.experiences(),
      });
    },
  });
};

/**
 * Delete an experience entry by id.
 * Used by: Experience section delete action.
 * Endpoint: DELETE /api/profile/me/experiences/:id
 * Inputs: `mutation.mutate(id)`.
 * Output: mutation result resolving to DeleteResponse.
 * Invalidates: profileQueryKeys.experiences().
 * @returns Mutation object from `useMutation`.
 */

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProfileService.deleteExperience(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: profileQueryKeys.experiences(),
      });
    },
  });
};

/**
 * Fetch the signed-in user's profile links.
 * Used by: Links section list UI.
 * Endpoint: GET /api/profile/me/links
 * Inputs: none.
 * Output: React Query result with ProfileLink[] in `data`.
 * @returns Query result object from `useQuery`.
 */

export const useProfileLinks = () =>
  useQuery({
    queryKey: profileQueryKeys.links(),
    queryFn: ProfileService.listLinks,
    ...baseOptions,
  });

/**
 * Create a new profile link.
 * Used by: Links section add flow.
 * Endpoint: POST /api/profile/me/links
 * Inputs: `mutation.mutate(payload)` where payload is ProfileLinkCreateRequest.
 * Output: mutation result resolving to ProfileLink.
 * Invalidates: profileQueryKeys.links().
 * @returns Mutation object from `useMutation`.
 */

export const useCreateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProfileLinkCreateRequest) =>
      ProfileService.createLink(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.links() });
    },
  });
};

/**
 * Update an existing profile link by id.
 * Used by: Links section edit flow.
 * Endpoint: PATCH /api/profile/me/links/:id
 * Inputs: `mutation.mutate({ id, payload })`.
 * Output: mutation result resolving to ProfileLink.
 * Invalidates: profileQueryKeys.links().
 * @returns Mutation object from `useMutation`.
 */

export const useUpdateLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: ProfileLinkUpdateRequest;
    }) => ProfileService.updateLink(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.links() });
    },
  });
};

/**
 * Delete a profile link by id.
 * Used by: Links section delete action.
 * Endpoint: DELETE /api/profile/me/links/:id
 * Inputs: `mutation.mutate(id)`.
 * Output: mutation result resolving to DeleteResponse.
 * Invalidates: profileQueryKeys.links().
 * @returns Mutation object from `useMutation`.
 */

export const useDeleteLink = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ProfileService.deleteLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.links() });
    },
  });
};

/**
 * Fetch the user's resume link (if any).
 * Used by: Resume upload / display UI.
 * Endpoint: GET /api/profile/me/resume
 * Inputs: none.
 * Output: React Query result with ProfileResume | null in `data`.
 * @returns Query result object from `useQuery`.
 */

export const useProfileResume = () =>
  useQuery({
    queryKey: profileQueryKeys.resume(),
    queryFn: ProfileService.getResume,
    ...baseOptions,
  });

/**
 * Upsert the user's resume link.
 * Used by: Resume save action.
 * Endpoint: PUT /api/profile/me/resume
 * Inputs: `mutation.mutate(payload)` where payload is ProfileResumeUpsertRequest.
 * Output: mutation result resolving to ProfileResume.
 * Invalidates: profileQueryKeys.resume().
 * @returns Mutation object from `useMutation`.
 */

export const useUpsertResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProfileResumeUpsertRequest) =>
      ProfileService.upsertResume(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.resume() });
    },
  });
};

/**
 * Delete the user's resume link.
 * Used by: Resume delete action.
 * Endpoint: DELETE /api/profile/me/resume
 * Inputs: `mutation.mutate()` (no args).
 * Output: mutation result resolving to DeleteResponse.
 * Invalidates: profileQueryKeys.resume().
 * @returns Mutation object from `useMutation`.
 */

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => ProfileService.deleteResume(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.resume() });
    },
  });
};

/**
 * Fetch the user's role labels.
 * Used by: Experience role selection UI.
 * Endpoint: GET /api/profile/me/roles
 * Inputs: none.
 * Output: React Query result with ProfileRole[] in `data`.
 * @returns Query result object from `useQuery`.
 */

export const useProfileRoles = () =>
  useQuery({
    queryKey: profileQueryKeys.roles(),
    queryFn: ProfileService.listRoles,
    ...baseOptions,
  });

/**
 * Replace the user's role labels.
 * Used by: Experience role selection save action.
 * Endpoint: PUT /api/profile/me/roles
 * Inputs: `mutation.mutate(payload)` where payload is ProfileRolesUpdateRequest.
 * Output: mutation result resolving to ProfileRole[].
 * Invalidates: profileQueryKeys.roles().
 * @returns Mutation object from `useMutation`.
 */
export const useReplaceRoles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProfileRolesUpdateRequest) =>
      ProfileService.replaceRoles(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.roles() });
    },
  });
};

/**
 * Fetch the user's top skills.
 * Used by: Skills section list UI.
 * Endpoint: GET /api/profile/me/skills
 * Inputs: none.
 * Output: React Query result with ProfileSkill[] in `data`.
 * @returns Query result object from `useQuery`.
 */
export const useProfileSkills = () =>
  useQuery({
    queryKey: profileQueryKeys.skills(),
    queryFn: ProfileService.listSkills,
    ...baseOptions,
  });

/**
 * Replace the user's top skills list.
 * Used by: Skills section save action.
 * Endpoint: PUT /api/profile/me/skills
 * Inputs: `mutation.mutate(payload)` where payload is ProfileSkillsUpdateRequest.
 * Output: mutation result resolving to ProfileSkill[].
 * Invalidates: profileQueryKeys.skills(), profileQueryKeys.summary().
 * @returns Mutation object from `useMutation`.
 */
export const useReplaceSkills = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ProfileSkillsUpdateRequest) =>
      ProfileService.replaceSkills(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.skills() });
      queryClient.invalidateQueries({ queryKey: profileQueryKeys.summary() });
    },
  });
};
