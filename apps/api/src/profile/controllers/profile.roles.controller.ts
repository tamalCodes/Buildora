import { getAuthenticatedUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { mapProfileRole } from "@/profile/mappers/profile.roles.mapper";
import { ProfileRolesUpdateSchema } from "@/profile/validators/profile.roles.validators";
import type { Request, Response } from "express";

const mapRole = mapProfileRole;
const buildRolesPayload = (roles: string[], profileId: string) =>
  roles.map((role) => ({
    profile_id: profileId,
    role,
  }));

/**
 * GET /api/profile/me/roles
 * Returns role labels for the authenticated user.
 */
export const getRoles = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const { data, error: fetchError } = await supabase
      .from("profile_roles")
      .select("*")
      .eq("profile_id", user.id)
      .order("created_at", { ascending: true });

    if (fetchError) throw fetchError;

    return res.json({
      success: true,
      data: (data || []).map(mapRole),
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to load roles.",
    });
  }
};

/**
 * PUT /api/profile/me/roles
 * Replaces the full set of role labels for the authenticated user.
 */
export const replaceRoles = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const { roles } = ProfileRolesUpdateSchema.parse(req.body);

    const { error: deleteError } = await supabase
      .from("profile_roles")
      .delete()
      .eq("profile_id", user.id);

    if (deleteError) throw deleteError;

    if (roles.length === 0) {
      return res.json({ success: true, data: [] });
    }

    const payload = buildRolesPayload(roles, user.id);
    const { data, error: insertError } = await supabase
      .from("profile_roles")
      .insert(payload)
      .select("*");

    if (insertError) throw insertError;

    return res.json({ success: true, data: (data || []).map(mapRole) });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to update roles.",
    });
  }
};
