import {
  AuthenticateRequestSchema,
  ForgotPasswordRequestSchema,
  IdentifyRequestSchema,
  ResetPasswordRequestSchema,
  UserType,
} from "@buildora/shared";
import { Request, Response } from "express";
import { supabase } from "../lib/supabase";

const RESET_REDIRECT_URL = process.env.SUPABASE_RESET_REDIRECT_URL || "";

const PUBLIC_DOMAINS = new Set([
  "gmail.com",
  "outlook.com",
  "yahoo.com",
  "proton.me",
  "hotmail.com",
  "icloud.com",
  "aol.com",
  "protonmail.com",
  "me.com",
]);

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const mapProfile = (profile: any) => ({
  id: profile.id,
  email: profile.email,
  userType: profile.user_type,
  organizationName: profile.organization_name || undefined,
  avatarUrl: profile.avatar_url || undefined,
  name: profile.name || undefined,
  createdAt: profile.created_at || undefined,
});

export const identifyUser = async (req: Request, res: Response) => {
  try {
    const { email } = IdentifyRequestSchema.parse(req.body);
    const normalizedEmail = normalizeEmail(email);

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("user_type, organization_name")
      .eq("email", normalizedEmail)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    const domain = normalizedEmail.split("@")[1] || "";
    const detectedType = profile
      ? profile.user_type
      : PUBLIC_DOMAINS.has(domain)
      ? UserType.PERSONAL
      : UserType.ORGANIZATION;

    return res.json({
      success: true,
      data: {
        isNewUser: !profile,
        userType: detectedType,
        orgSuggestion: profile?.organization_name || undefined,
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Identity check failed.",
    });
  }
};

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { email, password, userType, organizationName } =
      AuthenticateRequestSchema.parse(req.body);
    const normalizedEmail = normalizeEmail(email);

    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

    if (signInError) {
      if (signInError.message.includes("Invalid login credentials")) {
        const { data: existingProfile, error: profileLookupError } =
          await supabase
            .from("profiles")
            .select("id")
            .eq("email", normalizedEmail)
            .maybeSingle();

        if (profileLookupError) throw profileLookupError;

        if (existingProfile) {
          return res.status(401).json({
            success: false,
            error: "Invalid login credentials.",
          });
        }

        const { data: signUpData, error: signUpError } =
          await supabase.auth.admin.createUser({
            email: normalizedEmail,
            password,
            email_confirm: true,
          });

        if (signUpError) {
          if (
            signUpError.message
              .toLowerCase()
              .includes("already been registered") ||
            signUpError.message.toLowerCase().includes("already registered")
          ) {
            return res.status(401).json({
              success: false,
              error: "Invalid login credentials.",
            });
          }

          throw signUpError;
        }
        if (!signUpData.user) throw new Error("User creation failed.");

        const { data: newSession, error: sessionError } =
          await supabase.auth.signInWithPassword({
            email: normalizedEmail,
            password,
          });

        if (sessionError) throw sessionError;

        const { error: profileError } = await supabase.from("profiles").insert({
          id: signUpData.user.id,
          email: normalizedEmail,
          user_type: userType,
          organization_name:
            userType === UserType.ORGANIZATION ? organizationName : null,
        });

        if (profileError) throw profileError;

        return res.json({
          success: true,
          data: {
            user: {
              id: signUpData.user.id,
              email: normalizedEmail,
              userType,
              organizationName:
                userType === UserType.ORGANIZATION
                  ? organizationName
                  : undefined,
            },
            token: newSession.session?.access_token,
          },
        });
      }

      throw signInError;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", signInData.user.id)
      .limit(1)
      .maybeSingle();

    if (profileError) throw profileError;

    let resolvedProfile = profile;
    if (!resolvedProfile) {
      const { error: insertError } = await supabase.from("profiles").insert({
        id: signInData.user.id,
        email: normalizedEmail,
        user_type: userType,
        organization_name:
          userType === UserType.ORGANIZATION ? organizationName : null,
      });

      if (insertError) throw insertError;

      const { data: createdProfile, error: createdProfileError } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", signInData.user.id)
          .limit(1)
          .maybeSingle();

      if (createdProfileError || !createdProfile) {
        throw createdProfileError || new Error("Profile creation failed.");
      }

      resolvedProfile = createdProfile;
    }

    return res.json({
      success: true,
      data: {
        user: mapProfile(resolvedProfile),
        token: signInData.session?.access_token,
      },
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Authentication failed.",
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email, redirectTo } = ForgotPasswordRequestSchema.parse(req.body);
    const normalizedEmail = normalizeEmail(email);
    const redirectUrl = redirectTo || RESET_REDIRECT_URL;

    if (!redirectUrl) {
      return res.status(400).json({
        success: false,
        error: "Reset redirect URL not configured.",
      });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(
      normalizedEmail,
      { redirectTo: redirectUrl }
    );

    if (error) throw error;

    return res.json({ success: true, data: { delivered: true } });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Password reset failed.",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { accessToken, newPassword } = ResetPasswordRequestSchema.parse(
      req.body
    );

    const { data: userData, error: userError } = await supabase.auth.getUser(
      accessToken
    );

    if (userError || !userData.user) {
      return res.status(401).json({
        success: false,
        error: "Reset token is invalid or expired.",
      });
    }

    const { error: updateError } = await supabase.auth.admin.updateUserById(
      userData.user.id,
      { password: newPassword }
    );

    if (updateError) throw updateError;

    return res.json({ success: true, data: { updated: true } });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      error: error.message || "Password update failed.",
    });
  }
};

export const getMe = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const { data: userData, error: userError } = await supabase.auth.getUser(
      token
    );

    if (userError || !userData.user) {
      return res
        .status(401)
        .json({ success: false, error: "Session invalid." });
    }

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userData.user.id)
      .single();

    if (error || !profile) {
      return res
        .status(401)
        .json({ success: false, error: "Session invalid." });
    }

    return res.json({ success: true, data: mapProfile(profile) });
  } catch (error) {
    return res.status(401).json({ success: false, error: "Session expired." });
  }
};
