import type { Request } from "express";
import { supabase } from "@/lib/supabase";

export const getAuthenticatedUser = async (req: Request) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return { user: null, error: "Unauthorized" };
  }

  const token = authHeader.split(" ")[1];
  const { data: userData, error } = await supabase.auth.getUser(token);

  if (error || !userData.user) {
    return { user: null, error: "Session invalid." };
  }

  return { user: userData.user, error: null };
};
