import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from "react";
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/style-register";

interface PasswordInputProps extends TextInputProps {
  label: string;
  showHint?: boolean;
  showError?: boolean;
  errorMessage?: string;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({ 
  label, 
  showHint, 
  showError, 
  errorMessage,
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          secureTextEntry={!showPassword}
          {...props}
        />
        <TouchableOpacity 
          style={styles.togglePasswordButton}
          onPress={() => setShowPassword(!showPassword)}
          disabled={props.editable === false}
        >
          <MaterialIcons 
            name={showPassword ? "visibility-off" : "visibility"} 
            size={24} 
            color="#888" 
          />
        </TouchableOpacity>
      </View>
      {showHint && <Text style={styles.passwordHint}>Debe tener más de 6 caracteres</Text>}
      {showError && <Text style={styles.errorText}>{errorMessage}</Text>}
    </>
  );
};