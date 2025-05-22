import { supabase } from "@/lib/supabase";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View, } from "react-native";

interface ResetPasswordScreenProps {
  token: string;
  onPasswordReset: () => void;
  onNavigateToLogin: () => void;
}

export default function ResetPasswordScreen({token,onPasswordReset,onNavigateToLogin,}: ResetPasswordScreenProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!newPassword || !confirmPassword) {
      setError("Por favor, completa todos los campos");
      return false;
    }
    if (newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      Alert.alert(
        "Contraseña actualizada",
        "Tu contraseña ha sido actualizada exitosamente",
        [{ text: "OK", onPress: onPasswordReset }]
      );
    } catch (err: any) {
      setError(
        err.message || "Error al restablecer la contraseña. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-gray-100 justify-center p-4">
      <View className="bg-white rounded-xl p-5 shadow-md">
        <Text className="text-2xl font-bold text-center text-gray-800 mb-5">
          Restablecer Contraseña
        </Text>

        {error ? (
          <Text className="text-red-500 text-center mb-4">{error}</Text>
        ) : null}

        <Text className="text-base font-semibold text-gray-700 mb-1">
          Nueva Contraseña
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg bg-white h-12 px-3 mb-2">
          <TextInput
            className="flex-1 text-base"
            placeholder="Ingresa tu nueva contraseña"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={!showPassword}
            editable={!loading}
          />
          <TouchableOpacity
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
        <Text className="text-xs text-gray-500 mb-4">
          Debe tener más de 6 caracteres
        </Text>

        <Text className="text-base font-semibold text-gray-700 mb-1">
          Confirmar Contraseña
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-lg bg-white h-12 px-3">
          <TextInput
            className="flex-1 text-base"
            placeholder="Confirma tu nueva contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            editable={!loading}
          />
          <TouchableOpacity
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
          className={`mt-5 rounded-lg py-4 items-center ${
            loading ? "bg-blue-300" : "bg-blue-600"
          }`}
          onPress={handleResetPassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold text-base">
              Cambiar Contraseña
            </Text>
          )}
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-sm text-gray-600">
            ¿Recuerdas tu contraseña?
          </Text>
          <TouchableOpacity onPress={onNavigateToLogin} disabled={loading}>
            <Text className="text-sm font-semibold text-blue-600 ml-1">
              Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
