import React from "react";
import RegisterForm from "../components/register/RegisterForm";

type UserRole = "student" | "admin";

interface RegisterScreenProps {
  onNavigateToLogin: () => void;
  defaultRole?: UserRole;
}

export default function RegisterScreen({ onNavigateToLogin, defaultRole = "student" }: RegisterScreenProps) {
  return (
    <RegisterForm
      onNavigateToLogin={onNavigateToLogin}
      defaultRole={defaultRole}
    />
  );
}