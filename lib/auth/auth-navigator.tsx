import HomeScreen from "@/app/(tabs)/home-screen";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import LoginScreen from "../../app/login";
import RegisterScreen from "../../app/register";
import { ForgotPasswordModal } from "./forgot-password";
import { LoadingScreen } from "./loading-screen";
import { useAuth } from "./useAuth";

export function AuthNavigator() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'register'>('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  
  const router = useRouter();
  const { session, loading, handleSignOut, handleForgotPassword } = useAuth();

  useEffect(() => {
    if (session && !loading) {
      router.replace("/");
    }
  }, [session, loading]);

  const handlePasswordReset = async () => {
    setResetLoading(true);
    const { error, success } = await handleForgotPassword(resetEmail);
    
    if (success) {
      Alert.alert(
        "Correo enviado",
        "Hemos enviado un enlace de recuperación a tu correo electrónico.",
        [
          {
            text: "OK",
            onPress: () => {
              setShowForgotPassword(false);
              setResetEmail("");
            },
          },
        ]
      );
    } else if (error) {
      setResetError(error);
    }
    setResetLoading(false);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (session) {
    return <HomeScreen session={session} />;
  }

  return (
    <>
      {currentScreen === 'register' ? (
        <RegisterScreen onNavigateToLogin={() => setCurrentScreen('login')} />
      ) : (
        <LoginScreen
          onLoginSuccess={() => {}}
          onNavigateToRegister={() => setCurrentScreen('register')}
          onNavigateToForgotPassword={() => setShowForgotPassword(true)}
        />
      )}
      
      <ForgotPasswordModal
        visible={showForgotPassword}
        email={resetEmail}
        loading={resetLoading}
        error={resetError}
        onEmailChange={setResetEmail}
        onSubmit={handlePasswordReset}
        onClose={() => {
          setShowForgotPassword(false);
          setResetError("");
        }}
      />
    </>
  );
}
