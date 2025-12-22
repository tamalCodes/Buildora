import { AuthService } from "@/services/authService";
import { detectUserType, getOrgNameFromEmail } from "@/utils/emailUtils";
import {
  AuthStep,
  AuthenticateRequestSchema,
  IdentifyRequestSchema,
  UserType,
} from "@buildora/shared";
import React, { useEffect, useState } from "react";
import Button from "../../../shared/components/Button";
import { useCustomToast } from "../../../shared/components/CustomToast";
import Input from "../../../shared/components/Input";

interface AuthFormProps {
  onLoginSuccess?: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");
  const [step, setStep] = useState<AuthStep>(AuthStep.IDENTIFY);
  const [userType, setUserType] = useState<UserType>(UserType.UNDETERMINED);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    organizationName?: string;
  }>({});
  const { pushToast } = useCustomToast();

  useEffect(() => {
    setUserType(detectUserType(email));
  }, [email]);

  const clearFieldError = (
    field: "email" | "password" | "organizationName"
  ) => {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateIdentify = (rawEmail: string) => {
    const result = IdentifyRequestSchema.safeParse({ email: rawEmail.trim() });
    if (result.success) return true;

    const emailError = result.error.flatten().fieldErrors.email?.[0];
    setFieldErrors({ email: emailError || "Email is required." });
    return false;
  };

  const validateAuthenticate = (rawEmail: string, rawPassword: string) => {
    const result = AuthenticateRequestSchema.safeParse({
      email: rawEmail.trim(),
      password: rawPassword,
      userType,
      organizationName:
        userType === UserType.ORGANIZATION ? orgName.trim() : undefined,
    });

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      setFieldErrors({
        email: errors.email?.[0],
        password: errors.password?.[0],
      });
      return false;
    }

    if (userType === UserType.ORGANIZATION && !orgName.trim()) {
      setFieldErrors({ organizationName: "Organization name is required." });
      return false;
    }

    return true;
  };

  const handleIdentify = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    if (!validateIdentify(email)) return;

    setIsLoading(true);

    const result = await AuthService.identify(email);
    setIsLoading(false);
    if (result.success && result.data) {
      setIsNewUser(result.data.isNewUser);
      setUserType(result.data.userType);
      if (result.data.userType === UserType.ORGANIZATION) {
        setOrgName(result.data.orgSuggestion || getOrgNameFromEmail(email));
      }
      setStep(AuthStep.AUTHENTICATE);
      return;
    }

    pushToast({
      message: result.error || "Unable to identify user.",
      variant: "error",
    });
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    if (!validateAuthenticate(email, password)) return;
    setIsLoading(true);

    const result = await AuthService.authenticate({
      email: email.trim(),
      password,
      userType,
      organizationName:
        userType === UserType.ORGANIZATION ? orgName.trim() : undefined,
    });

    setIsLoading(false);
    if (result.success) {
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        window.location.href = "/explore";
      }
      return;
    }

    pushToast({
      message: result.error || "Authentication failed.",
      variant: "error",
    });
  };

  const handleBack = () => {
    setStep(AuthStep.IDENTIFY);
    setFieldErrors({});
  };

  const handleForgotPassword = async () => {
    setFieldErrors({});
    if (!validateIdentify(email)) return;

    setIsLoading(true);

    const result = await AuthService.forgotPassword({
      email: email.trim(),
      redirectTo: import.meta.env.VITE_AUTH_RESET_REDIRECT_URL || undefined,
    });

    setIsLoading(false);
    if (result.success) {
      pushToast({
        message: "Password reset email sent.",
        variant: "success",
      });
      return;
    }

    pushToast({
      message: result.error || "Unable to send reset email.",
      variant: "error",
    });
  };

  return (
    <div className="w-full">
      <div className="animate-in fade-in duration-700">
        {step === AuthStep.IDENTIFY ? (
          <div className="space-y-8">
            <form onSubmit={handleIdentify} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearFieldError("email");
                }}
                required
                autoFocus
                error={fieldErrors.email}
              />
              <Button className="w-full py-4 text-base" isLoading={isLoading}>
                Continue
              </Button>
            </form>

            <div className="space-y-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em] text-slate-700">
                  <span className="bg-[#030712] px-3">or connect with</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="secondary"
                  className="px-0 h-[52px]"
                  icon={
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  }
                >
                  Google
                </Button>
                <Button
                  variant="secondary"
                  className="px-0 h-[52px]"
                  icon={
                    <svg
                      className="w-5 h-5 text-indigo-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  }
                >
                  GitHub
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleFinalSubmit}
            className="space-y-8 animate-in slide-in-from-right-8 duration-500"
          >
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="w-fit flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-500 hover:text-indigo-400 transition-colors group"
              >
                <svg
                  className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Go back
              </button>
              <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest">
                  {isNewUser ? "New User" : "Recognized"}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400 truncate max-w-[200px]">
                  {email}
                </span>
                <span className="text-[10px] font-black text-slate-700 uppercase">
                  Identity
                </span>
              </div>

              {userType === UserType.ORGANIZATION && (
                <Input
                  label="Organization Name"
                  type="text"
                  placeholder="e.g. Acme Corp"
                  value={orgName}
                  onChange={(e) => {
                    setOrgName(e.target.value);
                    clearFieldError("organizationName");
                  }}
                  required
                  className="animate-in slide-in-from-top-2 duration-300"
                  error={fieldErrors.organizationName}
                />
              )}

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  clearFieldError("password");
                }}
                required
                error={fieldErrors.password}
                rightElement={
                  !isNewUser && (
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-[10px] font-bold text-indigo-500 hover:text-indigo-400 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      FORGOT?
                    </button>
                  )
                }
              />
            </div>

            <Button className="w-full py-4 text-base" isLoading={isLoading}>
              {isNewUser ? "Complete Registration" : "Log In"}
            </Button>

            <p className="text-center text-[10px] font-medium text-slate-600 leading-relaxed max-w-[240px] mx-auto uppercase tracking-tighter opacity-50">
              Infrastructure secured by Buildora Protocol.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
