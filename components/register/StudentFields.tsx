import { Picker } from '@react-native-picker/picker';
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../../styles/style-register";
import { FormField } from "./FormField";

interface StudentFieldsProps {
  formData: {
    controlNumber: string;
    engineering: string;
    semester: string;
  };
  updateFormField: (field: string, value: string) => void;
  disabled: boolean;
}

export const StudentFields: React.FC<StudentFieldsProps> = ({ 
  formData, 
  updateFormField,
  disabled 
}) => {
  const careers = [
    "",
    "Ingeniería en Innovación Agrícola Sustentable",
    "Ingeniería Electromecánica",
    "Ingeniería Electrónica",
    "Ingeniería en Gestión Empresarial",
    "Ingeniería Industrial",
    "Ingeniería Mecatrónica",
    "Ingeniería en Sistemas Computacionales",
    "Licenciatura en Administración",
    "Ingeniería Electromecánica Extensión Playas de Rosarito",
    "Ingeniería Industrial Extensión de Playas de Rosarito",
    "Ingeniería en Sistemas Computacionales Extensión Playas de Rosarito",
    "Licenciatura en Administración Extensión de Playas de Rosarito",
    "Especialización en Industria Aeroespacial",
    "Maestría en Ingeniería Aeroespacial",
    "Maestría en Ciencias en Ingeniería Mecatrónica",
    "Doctorado en Ciencias en Ingeniería Mecatrónica"
  ];

  return (
    <>
      <FormField 
        label="No Control"
        value={formData.controlNumber}
        onChangeText={(value) => updateFormField("controlNumber", value)}
        placeholder="Ingresa tu número de control"
        keyboardType="numeric"
        editable={!disabled}
      />

      <Text style={styles.label}>Carrera</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.engineering}
          onValueChange={(itemValue) => updateFormField("engineering", itemValue)}
          enabled={!disabled}
          style={styles.picker}
        >
          {careers.map((career, index) => (
            <Picker.Item 
              key={index} 
              label={career || "Selecciona tu carrera"} 
              value={career}
              color={career ? "#333" : "#888"}
            />
          ))}
        </Picker>
      </View>

      <FormField 
        label="Semestre"
        value={formData.semester}
        onChangeText={(text) => {
          const numericValue = text.replace(/[^0-9]/g, '');
          if (numericValue === '' || (parseInt(numericValue) >= 1 && parseInt(numericValue) <= 14)) {
            updateFormField("semester", numericValue);
          }
        }}
        placeholder="Ingresa tu semestre"
        keyboardType="numeric"
        maxLength={2}
        editable={!disabled}
      />
    </>
  );
}