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
 * Route: GET /api/profile/me/resume
 * Purpose: Return the resume link for the signed-in user.
 * Used by: `apps/api/src/profile/routes.ts` (router.get("/me/resume", getResume)).
 * How it works: Authenticates the request, fetches the `profile_resumes` row by profile id, and maps the record if it exists.
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
 * Route: PUT /api/profile/me/resume
 * Purpose: Upsert the resume link for the signed-in user.
 * Used by: `apps/api/src/profile/routes.ts` (router.put("/me/resume", upsertResume)).
 * How it works: Validates the payload, upserts by profile id, and returns the mapped record.
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
 * Route: DELETE /api/profile/me/resume
 * Purpose: Delete the resume link for the signed-in user.
 * Used by: `apps/api/src/profile/routes.ts` (router.delete("/me/resume", deleteResume)).
 * How it works: Deletes the row by profile id and returns the deleted id on success.
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
