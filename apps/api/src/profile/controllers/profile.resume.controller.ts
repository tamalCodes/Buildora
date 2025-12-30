import { getAuthenticatedUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { mapProfileResume } from "@/profile/mappers/profile.resume.mapper";
import { ProfileResumeUpsertSchema } from "@/profile/validators/profile.resume.validators";
import type { Request, Response } from "express";

const mapResume = mapProfileResume;
const buildResumePayload = (input: { url: string; label?: string }) => ({
  url: input.url,
  label: input.label ?? null,
});

/**
 * GET /api/profile/me/resume
 * Returns the resume link for the authenticated user.
 */
export const getResume = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const { data, error: fetchError } = await supabase
      .from("profile_resumes")
      .select("*")
      .eq("profile_id", user.id)
      .maybeSingle();

    if (fetchError) throw fetchError;

    if (!data) {
      return res.json({ success: true, data: null });
    }

    return res.json({ success: true, data: mapResume(data) });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to load resume.",
    });
  }
};

/**
 * PUT /api/profile/me/resume
 * Upserts the resume link for the authenticated user.
 */
export const upsertResume = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const input = ProfileResumeUpsertSchema.parse(req.body);
    const payload = buildResumePayload(input);

    const { data, error: upsertError } = await supabase
      .from("profile_resumes")
      .upsert(
        {
          profile_id: user.id,
          ...payload,
        },
        { onConflict: "profile_id" }
      )
      .select("*")
      .single();

    if (upsertError || !data) throw upsertError;

    return res.json({ success: true, data: mapResume(data) });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to update resume.",
    });
  }
};

/**
 * DELETE /api/profile/me/resume
 * Deletes the resume link for the authenticated user.
 */
export const deleteResume = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const { data, error: deleteError } = await supabase
      .from("profile_resumes")
      .delete()
      .eq("profile_id", user.id)
      .select("id")
      .single();

    if (deleteError || !data) {
      return res
        .status(404)
        .json({ success: false, error: "Resume not found." });
    }

    return res.json({ success: true, data: { id: data.id } });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to delete resume.",
    });
  }
};
