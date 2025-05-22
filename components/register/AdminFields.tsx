import React from "react";
import { FormField } from "./FormField";

interface AdminFieldsProps {
  department: string;
  setDepartment: (value: string) => void;
  disabled: boolean;
}

export const AdminFields: React.FC<AdminFieldsProps> = ({ 
  department, 
  setDepartment,
  disabled 
}) => {
  return (
    <FormField 
      label="Departamento"
      value={department}
      onChangeText={setDepartment}
      placeholder="Ingresa tu departamento"
      editable={!disabled}
    />
  );
};
