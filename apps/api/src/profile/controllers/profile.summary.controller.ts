import { getAuthenticatedUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { mapProfileCore } from "@/profile/mappers/profile.core.mapper";
import type { ProfileSummary } from "@/profile/types/profile.core.types";
import type { Request, Response } from "express";

const mapProfile = mapProfileCore;

/**
 * GET /api/profile/me/summary
 * Returns header + About fields for initial profile render.
 */
export const getProfileSummary = async (req: Request, res: Response) => {
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

    const { data: skills, error: skillsError } = await supabase
      .from("profile_skills")
      .select("name")
      .eq("profile_id", user.id)
      .order("rank", { ascending: true })
      .limit(5);

    if (skillsError) throw skillsError;

    const payload: ProfileSummary = {
      profile: mapProfile(profile),
      skills: (skills || []).map((skill) => skill.name),
    };

    return res.json({ success: true, data: payload });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to load profile summary.",
    });
  }
};
