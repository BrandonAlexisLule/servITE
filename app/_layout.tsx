import { supabase } from "@/lib/supabase";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(!!data.session);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false, 
        contentStyle: { backgroundColor: "#121212" },
      }}
      initialRouteName={isAuthenticated ? "(tabs)" : "auth"}
    >
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />  
    </Stack>
  );
}