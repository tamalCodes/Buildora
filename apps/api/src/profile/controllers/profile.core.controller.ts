import { getAuthenticatedUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { mapProfileCore } from "@/profile/mappers/profile.core.mapper";
import { buildProfileCoreUpdate } from "@/profile/services/profile.core.service";
import { ProfileUpdateSchema } from "@/profile/validators/profile.core.validators";
import type { Request, Response } from "express";

const mapProfile = mapProfileCore;

/**
 * GET /api/profile/me
 * Returns the core profile record for the authenticated user.
 */
export const getProfile = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      return res
        .status(404)
        .json({ success: false, error: "Profile not found." });
    }

    return res.json({ success: true, data: mapProfile(profile) });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to load profile.",
    });
  }
};

/**
 * PATCH /api/profile/me
 * Updates core profile fields for the authenticated user.
 */
export const updateProfile = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const updateInput = ProfileUpdateSchema.parse(req.body);
    const updates = buildProfileCoreUpdate(updateInput);

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        error: "No valid fields provided.",
      });
    }

    const { data: profile, error: updateError } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id)
      .select("*")
      .single();

    if (updateError || !profile) throw updateError;

    return res.json({ success: true, data: mapProfile(profile) });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to update profile.",
    });
  }
};
