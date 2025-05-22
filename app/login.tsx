import { supabase } from "@/lib/supabase";
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/style-login";

//al19760600@ite.edu.mx

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
  onNavigateToForgotPassword: () => void;
}

export default function LoginScreen({ 
  onLoginSuccess, 
  onNavigateToRegister,
  onNavigateToForgotPassword 
}: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!email || !password) {
      setError("Por favor, ingresa tu correo y contraseña");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        if (signInError.message.includes("Invalid login")) {
          setError("Correo o contraseña incorrectos");
        } else {
          setError(signInError.message);
        }
        return;
      }

      if (!data.user) {
        setError("No se pudo iniciar sesión");
        return;
      }
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        console.warn("Error al obtener el perfil:", profileError);
      }

      Alert.alert(
        "Inicio de sesión exitoso",
        `Bienvenido${profileData ? ' ' + profileData.name : ''}`,
        [{ text: "OK", onPress: onLoginSuccess }]
      );
    } catch (err: any) {
      setError("Error inesperado. Por favor, intenta de nuevo.");
      console.error("Error al iniciar sesión:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/images/fondo2.jpg')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.imageOverlay} />
        <Image 
          source={require('../assets/images/logo.png')} 
          style={styles.logoOnTop}
          resizeMode="contain"
        />
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.formContainer}>
          {error ? (
            <Text style={styles.error}>{error}</Text>
          ) : null}
          
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loading}
          />

          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Contraseña"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              editable={!loading}
            />
            <TouchableOpacity 
              style={styles.togglePasswordButton}
              onPress={() => setShowPassword(!showPassword)}
              disabled={loading}
            >
              <MaterialIcons 
                name={showPassword ? "visibility-off" : "visibility"} 
                size={24} 
                color="#888" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.forgotPassword}
            onPress={onNavigateToForgotPassword}
            disabled={loading}
          >
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.loginButtonText}>Iniciar sesión</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
          <TouchableOpacity onPress={onNavigateToRegister} disabled={loading}>
            <Text style={styles.registerLink}>Regístrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
