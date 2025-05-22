import React from "react";
import { Text, TextInput, TextInputProps } from "react-native";
import { styles } from "../../styles/style-register";
interface FormFieldProps extends TextInputProps {
  label: string;
}

export const FormField: React.FC<FormFieldProps> = ({ label, ...props }) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} {...props} />
    </>
  );
};

