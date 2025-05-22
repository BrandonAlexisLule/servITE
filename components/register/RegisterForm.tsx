
import { supabase } from "@/lib/supabase";
import React, { useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/style-register";
import { AdminFields } from "./AdminFields";
import { FormField } from "./FormField";
import { PasswordInput } from "./PasswordInput";
import { StudentFields } from "./StudentFields";

type UserRole = "student" | "admin";

interface RegisterFormProps {
  onNavigateToLogin: () => void;
  defaultRole?: UserRole;
}

export default function RegisterForm({ onNavigateToLogin, defaultRole = "student" }: RegisterFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastName: "",
    controlNumber: "",
    engineering: "",
    semester: "",
    department: ""
  });

  const updateFormField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { email, name, password, lastName, confirmPassword, controlNumber, engineering, semester, department } = formData;
    
    if (!email || !name || !password || !lastName || !confirmPassword) {
      setError("Todos los campos básicos son obligatorios");
      return false;
    }
    
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Introduce un correo electrónico válido");
      return false;
    }

    if (defaultRole === "student") {
      if (!controlNumber || !engineering) {
        setError("Número de control y carrera son obligatorios para estudiantes");
        return false;
      }

      if (semester && (parseInt(semester) < 1 || parseInt(semester) > 14)) {
        setError("El semestre debe estar entre 1 y 14");
        return false;
      }
    } else {
      if (!department) {
        setError("El departamento es obligatorio para administradores");
        return false;
      }
    }
    
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            last_name: formData.lastName,
            type: defaultRole,
            ...(defaultRole === "student" ? {
              control_number: formData.controlNumber,
              engineering: formData.engineering,
              semester: formData.semester || null,
            } : {
              department: formData.department
            }),
          }
        }
      });

      if (authError) throw authError;
      if (!data.user) throw new Error("No se pudo crear el usuario");

      Alert.alert(
        "Registro exitoso",
        `Tu cuenta de ${defaultRole === "student" ? "estudiante" : "administrador"} ha sido creada, revisa tu correo para confirmar cuenta.`,
        [{ text: "OK", onPress: onNavigateToLogin }]
      );
    } catch (error: any) {
      console.error("Error durante el registro:", error);
      setError(error.message === "User already registered" 
        ? "Este correo ya está registrado" 
        : "Error al registrar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.titulo}>Regístrate con tus datos</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <FormField 
          label="Correo"
          value={formData.email}
          onChangeText={(value) => updateFormField("email", value)}
          placeholder="Ingresa tu correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />

        <FormField 
          label="Nombre"
          value={formData.name}
          onChangeText={(value) => updateFormField("name", value)}
          placeholder="Ingresa tu nombre"
          editable={!loading}
        />

        <FormField 
          label="Apellido"
          value={formData.lastName}
          onChangeText={(value) => updateFormField("lastName", value)}
          placeholder="Ingresa tu apellido"
          editable={!loading}
        />

        <PasswordInput
          label="Contraseña"
          value={formData.password}
          onChangeText={(value) => updateFormField("password", value)}
          placeholder="Crea una contraseña"
          editable={!loading}
          showHint={true}
        />

        <PasswordInput
          label="Confirmar Contraseña"
          value={formData.confirmPassword}
          onChangeText={(value) => updateFormField("confirmPassword", value)}
          placeholder="Confirma tu contraseña"
          editable={!loading}
          showError={!!(formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword)}
          errorMessage="Las contraseñas no coinciden"
        />

        {defaultRole === "student" ? (
          <StudentFields 
            formData={formData}
            updateFormField={updateFormField}
            disabled={loading}
          />
        ) : (
          <AdminFields 
            department={formData.department}
            setDepartment={(value: string) => updateFormField("department", value)}
            disabled={loading}
          />
        )}

        <TouchableOpacity 
          style={[styles.registerButton, loading && styles.disabledButton]} 
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.registerButtonText}>Crear cuenta</Text>
          )}
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={onNavigateToLogin} disabled={loading}>
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}