import { getAuthenticatedUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { mapProfileEducation } from "@/profile/mappers/profile.education.mapper";
import { buildProfileEducationPayload } from "@/profile/services/profile.education.service";
import {
  ProfileEducationCreateSchema,
  ProfileEducationUpdateSchema,
} from "@/profile/validators/profile.education.validators";
import type { Request, Response } from "express";

const mapEducation = mapProfileEducation;
const buildEducationPayload = buildProfileEducationPayload;

/**
 * GET /api/profile/me/educations
 * Returns education entries for the authenticated user.
 */
export const getEducations = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const { data, error: fetchError } = await supabase
      .from("profile_educations")
      .select("*")
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false });

    if (fetchError) throw fetchError;

    return res.json({
      success: true,
      data: (data || []).map(mapEducation),
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to load education.",
    });
  }
};

/**
 * POST /api/profile/me/educations
 * Creates a new education entry for the authenticated user.
 */
export const createEducation = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const input = ProfileEducationCreateSchema.parse(req.body);
    const payload = buildEducationPayload(input);

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({
        success: false,
        error: "At least one field is required.",
      });
    }

    const { data, error: insertError } = await supabase
      .from("profile_educations")
      .insert({
        profile_id: user.id,
        ...payload,
      })
      .select("*")
      .single();

    if (insertError || !data) throw insertError;

    return res.status(201).json({ success: true, data: mapEducation(data) });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to create education entry.",
    });
  }
};

/**
 * PATCH /api/profile/me/educations/:id
 * Updates an education entry owned by the authenticated user.
 */
export const updateEducation = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const { id } = req.params;
    const input = ProfileEducationUpdateSchema.parse(req.body);
    const payload = buildEducationPayload(input);

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({
        success: false,
        error: "At least one field is required.",
      });
    }

    const { data, error: updateError } = await supabase
      .from("profile_educations")
      .update(payload)
      .eq("id", id)
      .eq("profile_id", user.id)
      .select("*")
      .single();

    if (updateError || !data) throw updateError;

    return res.json({ success: true, data: mapEducation(data) });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to update education entry.",
    });
  }
};

/**
 * DELETE /api/profile/me/educations/:id
 * Deletes an education entry owned by the authenticated user.
 */
export const deleteEducation = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const { id } = req.params;
    const { data, error: deleteError } = await supabase
      .from("profile_educations")
      .delete()
      .eq("id", id)
      .eq("profile_id", user.id)
      .select("id")
      .single();

    if (deleteError || !data) {
      return res
        .status(404)
        .json({ success: false, error: "Education entry not found." });
    }

    return res.json({ success: true, data: { id } });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to delete education entry.",
    });
  }
};
