import { apiRequestOrThrow } from "./apiClient";
import {
  DeleteResponse,
  ProfileCore,
  ProfileEducation,
  ProfileEducationCreateRequest,
  ProfileEducationUpdateRequest,
  ProfileExperience,
  ProfileExperienceCreateRequest,
  ProfileExperienceUpdateRequest,
  ProfileLink,
  ProfileLinkCreateRequest,
  ProfileLinkUpdateRequest,
  ProfileResume,
  ProfileResumeUpsertRequest,
  ProfileRole,
  ProfileRolesUpdateRequest,
  ProfileSkill,
  ProfileSkillsUpdateRequest,
  ProfileSummary,
  ProfileUpdateRequest,
} from "./types/profile.types";

export const ProfileService = {
  /**
   * Get a compact summary used by the profile header and About section.
   * Endpoint: GET /api/profile/me/summary
   * Inputs: none.
   * Output: ProfileSummary (core profile + top skills).
   * @returns Promise resolving to the profile summary payload.
   */

  getSummary(): Promise<ProfileSummary> {
    return apiRequestOrThrow<ProfileSummary>("/profile/me/summary");
  },

  /**
   * Fetch the signed-in user's core profile record.
   * Endpoint: GET /api/profile/me
   * Inputs: none.
   * Output: ProfileCore with editable and display fields.
   * @returns Promise resolving to the core profile data.
   */

  getMe(): Promise<ProfileCore> {
    return apiRequestOrThrow<ProfileCore>("/profile/me");
  },

  /**
   * Update editable fields on the signed-in user's core profile.
   * Endpoint: PATCH /api/profile/me
   * Inputs: ProfileUpdateRequest payload (partial updates allowed).
   * Output: ProfileCore reflecting the saved values.
   * @param payload Core profile fields to update.
   * @returns Promise resolving to the updated core profile data.
   */

  updateMe(payload: ProfileUpdateRequest): Promise<ProfileCore> {
    return apiRequestOrThrow<ProfileCore>("/profile/me", {
      method: "PATCH",
      body: payload,
    });
  },

  /**
   * List education entries for the signed-in user.
   * Endpoint: GET /api/profile/me/educations
   * Inputs: none.
   * Output: Array of ProfileEducation entries.
   * @returns Promise resolving to the education list.
   */

  listEducations(): Promise<ProfileEducation[]> {
    return apiRequestOrThrow<ProfileEducation[]>("/profile/me/educations");
  },

  /**
   * Create a new education entry.
   * Endpoint: POST /api/profile/me/educations
   * Inputs: ProfileEducationCreateRequest payload.
   * Output: The created ProfileEducation entry.
   * @param payload Education fields to create.
   * @returns Promise resolving to the created education entry.
   */

  createEducation(
    payload: ProfileEducationCreateRequest,
  ): Promise<ProfileEducation> {
    return apiRequestOrThrow<ProfileEducation>("/profile/me/educations", {
      method: "POST",
      body: payload,
    });
  },

  /**
   * Update an existing education entry.
   * Endpoint: PATCH /api/profile/me/educations/:id
   * Inputs: id + ProfileEducationUpdateRequest payload.
   * Output: The updated ProfileEducation entry.
   * @param id Education id to update.
   * @param payload Education fields to update.
   * @returns Promise resolving to the updated education entry.
   */

  updateEducation(
    id: string,
    payload: ProfileEducationUpdateRequest,
  ): Promise<ProfileEducation> {
    return apiRequestOrThrow<ProfileEducation>(`/profile/me/educations/${id}`, {
      method: "PATCH",
      body: payload,
    });
  },

  /**
   * Delete an education entry.
   * Endpoint: DELETE /api/profile/me/educations/:id
   * Inputs: id of the education entry.
   * Output: DeleteResponse containing the deleted id.
   * @param id Education id to delete.
   * @returns Promise resolving to the delete response.
   */

  deleteEducation(id: string): Promise<DeleteResponse> {
    return apiRequestOrThrow<DeleteResponse>(`/profile/me/educations/${id}`, {
      method: "DELETE",
    });
  },

  /**
   * List experience entries for the signed-in user.
   * Endpoint: GET /api/profile/me/experiences
   * Inputs: none.
   * Output: Array of ProfileExperience entries.
   * @returns Promise resolving to the experience list.
   */

  listExperiences(): Promise<ProfileExperience[]> {
    return apiRequestOrThrow<ProfileExperience[]>("/profile/me/experiences");
  },

  /**
   * Create a new experience entry.
   * Endpoint: POST /api/profile/me/experiences
   * Inputs: ProfileExperienceCreateRequest payload.
   * Output: The created ProfileExperience entry.
   * @param payload Experience fields to create.
   * @returns Promise resolving to the created experience entry.
   */

  createExperience(
    payload: ProfileExperienceCreateRequest,
  ): Promise<ProfileExperience> {
    return apiRequestOrThrow<ProfileExperience>("/profile/me/experiences", {
      method: "POST",
      body: payload,
    });
  },

  /**
   * Update an existing experience entry.
   * Endpoint: PATCH /api/profile/me/experiences/:id
   * Inputs: id + ProfileExperienceUpdateRequest payload.
   * Output: The updated ProfileExperience entry.
   * @param id Experience id to update.
   * @param payload Experience fields to update.
   * @returns Promise resolving to the updated experience entry.
   */

  updateExperience(
    id: string,
    payload: ProfileExperienceUpdateRequest,
  ): Promise<ProfileExperience> {
    return apiRequestOrThrow<ProfileExperience>(
      `/profile/me/experiences/${id}`,
      {
        method: "PATCH",
        body: payload,
      },
    );
  },

  /**
   * Delete an experience entry.
   * Endpoint: DELETE /api/profile/me/experiences/:id
   * Inputs: id of the experience entry.
   * Output: DeleteResponse containing the deleted id.
   * @param id Experience id to delete.
   * @returns Promise resolving to the delete response.
   */

  deleteExperience(id: string): Promise<DeleteResponse> {
    return apiRequestOrThrow<DeleteResponse>(`/profile/me/experiences/${id}`, {
      method: "DELETE",
    });
  },

  /**
   * List profile links for the signed-in user.
   * Endpoint: GET /api/profile/me/links
   * Inputs: none.
   * Output: Array of ProfileLink entries.
   * @returns Promise resolving to the profile links list.
   */

  listLinks(): Promise<ProfileLink[]> {
    return apiRequestOrThrow<ProfileLink[]>("/profile/me/links");
  },

  /**
   * Create a new profile link.
   * Endpoint: POST /api/profile/me/links
   * Inputs: ProfileLinkCreateRequest payload.
   * Output: The created ProfileLink entry.
   * @param payload Link fields to create.
   * @returns Promise resolving to the created link entry.
   */

  createLink(payload: ProfileLinkCreateRequest): Promise<ProfileLink> {
    return apiRequestOrThrow<ProfileLink>("/profile/me/links", {
      method: "POST",
      body: payload,
    });
  },

  /**
   * Update an existing profile link.
   * Endpoint: PATCH /api/profile/me/links/:id
   * Inputs: id + ProfileLinkUpdateRequest payload.
   * Output: The updated ProfileLink entry.
   * @param id Link id to update.
   * @param payload Link fields to update.
   * @returns Promise resolving to the updated link entry.
   */

  updateLink(
    id: string,
    payload: ProfileLinkUpdateRequest,
  ): Promise<ProfileLink> {
    return apiRequestOrThrow<ProfileLink>(`/profile/me/links/${id}`, {
      method: "PATCH",
      body: payload,
    });
  },

  /**
   * Delete a profile link.
   * Endpoint: DELETE /api/profile/me/links/:id
   * Inputs: id of the profile link.
   * Output: DeleteResponse containing the deleted id.
   * @param id Link id to delete.
   * @returns Promise resolving to the delete response.
   */

  deleteLink(id: string): Promise<DeleteResponse> {
    return apiRequestOrThrow<DeleteResponse>(`/profile/me/links/${id}`, {
      method: "DELETE",
    });
  },

  /**
   * Fetch the user's resume link (if any).
   * Endpoint: GET /api/profile/me/resume
   * Inputs: none.
   * Output: ProfileResume or null if not set.
   * @returns Promise resolving to the resume record or null.
   */

  getResume(): Promise<ProfileResume | null> {
    return apiRequestOrThrow<ProfileResume | null>("/profile/me/resume");
  },

  /**
   * Upsert the user's resume link.
   * Endpoint: PUT /api/profile/me/resume
   * Inputs: ProfileResumeUpsertRequest payload.
   * Output: The saved ProfileResume entry.
   * @param payload Resume fields to upsert.
   * @returns Promise resolving to the saved resume entry.
   */

  upsertResume(payload: ProfileResumeUpsertRequest): Promise<ProfileResume> {
    return apiRequestOrThrow<ProfileResume>("/profile/me/resume", {
      method: "PUT",
      body: payload,
    });
  },

  /**
   * Delete the user's resume link.
   * Endpoint: DELETE /api/profile/me/resume
   * Inputs: none.
   * Output: DeleteResponse containing the deleted id.
   * @returns Promise resolving to the delete response.
   */

  deleteResume(): Promise<DeleteResponse> {
    return apiRequestOrThrow<DeleteResponse>("/profile/me/resume", {
      method: "DELETE",
    });
  },

  /**
   * List role labels for the signed-in user.
   * Endpoint: GET /api/profile/me/roles
   * Inputs: none.
   * Output: Array of ProfileRole entries.
   * @returns Promise resolving to the roles list.
   */

  listRoles(): Promise<ProfileRole[]> {
    return apiRequestOrThrow<ProfileRole[]>("/profile/me/roles");
  },

  /**
   * Replace the role labels for the signed-in user.
   * Endpoint: PUT /api/profile/me/roles
   * Inputs: ProfileRolesUpdateRequest payload (full replacement).
   * Output: Array of ProfileRole entries after replacement.
   * @param payload Roles to set for the profile.
   * @returns Promise resolving to the updated roles list.
   */

  replaceRoles(payload: ProfileRolesUpdateRequest): Promise<ProfileRole[]> {
    return apiRequestOrThrow<ProfileRole[]>("/profile/me/roles", {
      method: "PUT",
      body: payload,
    });
  },

  /**
   * List the top skills for the signed-in user.
   * Endpoint: GET /api/profile/me/skills
   * Inputs: none.
   * Output: Array of ProfileSkill entries in rank order.
   * @returns Promise resolving to the skills list.
   */

  listSkills(): Promise<ProfileSkill[]> {
    return apiRequestOrThrow<ProfileSkill[]>("/profile/me/skills");
  },

  /**
   * Replace the top skills for the signed-in user.
   * Endpoint: PUT /api/profile/me/skills
   * Inputs: ProfileSkillsUpdateRequest payload (full replacement).
   * Output: Array of ProfileSkill entries after replacement.
   * @param payload Skills to set for the profile (rank is derived by order).
   * @returns Promise resolving to the updated skills list.
   */

  replaceSkills(payload: ProfileSkillsUpdateRequest): Promise<ProfileSkill[]> {
    return apiRequestOrThrow<ProfileSkill[]>("/profile/me/skills", {
      method: "PUT",
      body: payload,
    });
  },
};
