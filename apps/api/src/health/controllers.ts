import { Request, Response } from "express";
import { supabase } from "@/lib/supabase";

const HEALTH_PING_SECRET = process.env.HEALTH_PING_SECRET;

const isAuthorized = (req: Request) => {
  if (!HEALTH_PING_SECRET) return false;
  const headerSecret =
    (req.headers["x-health-secret"] as string | undefined) || undefined;
  const querySecret =
    (req.query.secret as string | undefined) || undefined;
  return (
    headerSecret === HEALTH_PING_SECRET || querySecret === HEALTH_PING_SECRET
  );
};

/**
 * Route: GET /health/ping
 * Purpose: Keep Supabase warm with a protected ping that only a known secret can trigger.
 * Used by: Cron jobs or uptime monitors that call `/health/ping` with the shared secret from env.
 * How it works: Verifies the shared `HEALTH_PING_SECRET` via `x-health-secret` header or `secret` query string before reading one `profiles` row.
 */
export const pingSupabase = async (req: Request, res: Response) => {
  if (!isAuthorized(req)) {
    if (!HEALTH_PING_SECRET) {
      return res.status(503).json({
        success: false,
        error:
          "HEALTH_PING_SECRET is not configured; the protected ping cannot run.",
      });
    }

    return res.status(401).json({
      success: false,
      error: "Invalid health ping secret.",
    });
  }

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return res.json({
      success: true,
      data: {
        status: "ok",
        checkedAt: new Date().toISOString(),
        profileIdSample: data?.id ?? null,
      },
    });
  } catch (error: any) {
    return res.status(503).json({
      success: false,
      error: error.message || "Supabase health ping failed.",
    });
  }
};
