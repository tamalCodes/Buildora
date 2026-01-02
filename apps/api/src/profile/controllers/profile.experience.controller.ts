import { getAuthenticatedUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { mapProfileExperience } from "@/profile/mappers/profile.experience.mapper";
import {
  ProfileExperienceCreateSchema,
  ProfileExperienceUpdateSchema,
} from "@/profile/validators/profile.experience.validators";
import type { Request, Response } from "express";

const mapExperience = mapProfileExperience;
const buildExperiencePayload = (input: {
  company?: string;
  title?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  isCurrent?: boolean;
  description?: string;
}) => {
  const payload: Record<string, unknown> = {
    company: input.company,
    title: input.title,
    location: input.location,
    start_date: input.startDate,
    end_date: input.endDate,
    is_current: input.isCurrent,
    description: input.description,
  };

  return Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  );
};

/**
 * GET /api/profile/me/experiences
 * Returns experience entries for the authenticated user.
 */
export const listExperiences = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const { data, error: fetchError } = await supabase
      .from("profile_experiences")
      .select("*")
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false });

    if (fetchError) throw fetchError;

    return res.json({
      success: true,
      data: (data || []).map(mapExperience),
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to load experiences.",
    });
  }
};

/**
 * POST /api/profile/me/experiences
 * Creates a new experience entry for the authenticated user.
 */
export const createExperience = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const input = ProfileExperienceCreateSchema.parse(req.body);
    const payload = buildExperiencePayload(input);

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({
        success: false,
        error: "At least one field is required.",
      });
    }

    const { data, error: insertError } = await supabase
      .from("profile_experiences")
      .insert({
        profile_id: user.id,
        ...payload,
      })
      .select("*")
      .single();

    if (insertError || !data) throw insertError;

    return res.status(201).json({ success: true, data: mapExperience(data) });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to create experience entry.",
    });
  }
};

/**
 * PATCH /api/profile/me/experiences/:id
 * Updates an experience entry owned by the authenticated user.
 */
export const updateExperience = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const { id } = req.params;
    const input = ProfileExperienceUpdateSchema.parse(req.body);
    const payload = buildExperiencePayload(input);

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({
        success: false,
        error: "At least one field is required.",
      });
    }

    const { data, error: updateError } = await supabase
      .from("profile_experiences")
      .update(payload)
      .eq("id", id)
      .eq("profile_id", user.id)
      .select("*")
      .single();

    if (updateError || !data) throw updateError;

    return res.json({ success: true, data: mapExperience(data) });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to update experience entry.",
    });
  }
};

/**
 * DELETE /api/profile/me/experiences/:id
 * Deletes an experience entry owned by the authenticated user.
 */
export const deleteExperience = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const { id } = req.params;
    const { data, error: deleteError } = await supabase
      .from("profile_experiences")
      .delete()
      .eq("id", id)
      .eq("profile_id", user.id)
      .select("id")
      .single();

    if (deleteError || !data) {
      return res
        .status(404)
        .json({ success: false, error: "Experience entry not found." });
    }

    return res.json({ success: true, data: { id } });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to delete experience entry.",
    });
  }
};
