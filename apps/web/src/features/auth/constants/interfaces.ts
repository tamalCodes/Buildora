import type React from "react";

export interface AuthContainerProps {
  children: React.ReactNode;
}

export interface AuthFormProps {
  onLoginSuccess?: () => void;
}
