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
 * Route: GET /api/profile/me/roles
 * Purpose: List role labels for the signed-in user.
 * Used by: `apps/api/src/profile/routes.ts` (router.get("/me/roles", listRoles)).
 * How it works: Authenticates the request, queries `profile_roles` by profile id, and maps each row.
 */
export const listRoles = async (req: Request, res: Response) => {
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
 * Route: PUT /api/profile/me/roles
 * Purpose: Replace the entire set of role labels for the signed-in user.
 * Used by: `apps/api/src/profile/routes.ts` (router.put("/me/roles", replaceRoles)).
 * How it works: Validates the payload, deletes existing roles for the profile, inserts the new set, and maps the result.
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
