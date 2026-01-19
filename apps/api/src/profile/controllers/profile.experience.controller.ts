import { getAuthenticatedUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { mapProfileExperience } from "@/profile/mappers/profile.mappers";
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
 * Route: GET /api/profile/me/experiences
 * Purpose: List experience entries for the signed-in user.
 * Used by: `apps/api/src/profile/routes.ts` (router.get("/me/experiences", listExperiences)).
 * How it works: Authenticates the request, queries `profile_experiences` by profile id, and maps each row.
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
 * Route: POST /api/profile/me/experiences
 * Purpose: Create a new experience entry for the signed-in user.
 * Used by: `apps/api/src/profile/routes.ts` (router.post("/me/experiences", createExperience)).
 * How it works: Validates the body with `ProfileExperienceCreateSchema`, builds a payload, inserts it, and returns the mapped row.
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
 * Route: PATCH /api/profile/me/experiences/:id
 * Purpose: Update an existing experience entry owned by the signed-in user.
 * Used by: `apps/api/src/profile/routes.ts` (router.patch("/me/experiences/:id", updateExperience)).
 * How it works: Validates the body, builds an update payload, updates the row by id + profile id, and maps the result.
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
 * Route: DELETE /api/profile/me/experiences/:id
 * Purpose: Delete an experience entry owned by the signed-in user.
 * Used by: `apps/api/src/profile/routes.ts` (router.delete("/me/experiences/:id", deleteExperience)).
 * How it works: Deletes the row by id + profile id and returns the deleted id on success.
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
