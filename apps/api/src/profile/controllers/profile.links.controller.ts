import type { Request, Response } from "express";
import { getAuthenticatedUser } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { mapProfileLink } from "@/profile/mappers/profile.links.mapper";
import {
  ProfileLinkCreateSchema,
  ProfileLinkUpdateSchema,
} from "@/profile/validators/profile.links.validators";

const mapLink = mapProfileLink;
const buildLinkPayload = (input: { label: string; url: string }) => ({
  label: input.label,
  url: input.url,
});

/**
 * GET /api/profile/me/links
 * Returns profile links for the authenticated user.
 */
export const getLinks = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const { data, error: fetchError } = await supabase
      .from("profile_links")
      .select("*")
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false });

    if (fetchError) throw fetchError;

    return res.json({
      success: true,
      data: (data || []).map(mapLink),
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to load profile links.",
    });
  }
};

/**
 * POST /api/profile/me/links
 * Creates a new profile link for the authenticated user.
 */
export const createLink = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const input = ProfileLinkCreateSchema.parse(req.body);
    const payload = buildLinkPayload(input);

    const { data, error: insertError } = await supabase
      .from("profile_links")
      .insert({
        profile_id: user.id,
        ...payload,
      })
      .select("*")
      .single();

    if (insertError || !data) throw insertError;

    return res.status(201).json({ success: true, data: mapLink(data) });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to create profile link.",
    });
  }
};

/**
 * PATCH /api/profile/me/links/:id
 * Updates a profile link owned by the authenticated user.
 */
export const updateLink = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const { id } = req.params;
    const input = ProfileLinkUpdateSchema.parse(req.body);

    if (Object.keys(input).length === 0) {
      return res.status(400).json({
        success: false,
        error: "At least one field is required.",
      });
    }

    const { data, error: updateError } = await supabase
      .from("profile_links")
      .update(input)
      .eq("id", id)
      .eq("profile_id", user.id)
      .select("*")
      .single();

    if (updateError || !data) throw updateError;

    return res.json({ success: true, data: mapLink(data) });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to update profile link.",
    });
  }
};

/**
 * DELETE /api/profile/me/links/:id
 * Deletes a profile link owned by the authenticated user.
 */
export const deleteLink = async (req: Request, res: Response) => {
  const { user, error } = await getAuthenticatedUser(req);
  if (error || !user) {
    return res.status(401).json({ success: false, error });
  }

  try {
    const { id } = req.params;
    const { data, error: deleteError } = await supabase
      .from("profile_links")
      .delete()
      .eq("id", id)
      .eq("profile_id", user.id)
      .select("id")
      .single();

    if (deleteError || !data) {
      return res
        .status(404)
        .json({ success: false, error: "Profile link not found." });
    }

    return res.json({ success: true, data: { id } });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Failed to delete profile link.",
    });
  }
};
