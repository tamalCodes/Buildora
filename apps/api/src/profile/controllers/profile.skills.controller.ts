import { getAuthenticatedUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { mapProfileSkill } from "@/profile/mappers/profile.skills.mapper";
import { ProfileSkillsUpdateSchema } from "@/profile/validators/profile.skills.validators";
import type { Request, Response } from "express";

const mapSkill = mapProfileSkill;
const buildSkillsPayload = (skills: string[], profileId: string) =>
  skills.map((name, index) => ({
    profile_id: profileId,
    name,
    rank: index + 1,
  }));

/**
 * GET /api/profile/me/skills
 * Returns the top skills for the authenticated user.
 */
export const listSkills = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const { data, error: fetchError } = await supabase
      .from("profile_skills")
      .select("*")
      .eq("profile_id", user.id)
      .order("rank", { ascending: true });

    if (fetchError) throw fetchError;

    return res.json({
      success: true,
      data: (data || []).map(mapSkill),
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to load skills.",
    });
  }
};

/**
 * PUT /api/profile/me/skills
 * Replaces the full set of skills for the authenticated user.
 */
export const replaceSkills = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const { skills } = ProfileSkillsUpdateSchema.parse(req.body);

    const { error: deleteError } = await supabase
      .from("profile_skills")
      .delete()
      .eq("profile_id", user.id);

    if (deleteError) throw deleteError;

    if (skills.length === 0) {
      return res.json({ success: true, data: [] });
    }

    const payload = buildSkillsPayload(skills, user.id);
    const { data, error: insertError } = await supabase
      .from("profile_skills")
      .insert(payload)
      .select("*");

    if (insertError) throw insertError;

    return res.json({ success: true, data: (data || []).map(mapSkill) });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to update skills.",
    });
  }
};
