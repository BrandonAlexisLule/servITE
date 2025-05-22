import React from "react";
import { ActivityIndicator, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../../styles/style-auth";

interface ForgotPasswordModalProps {
  visible: boolean;
  email: string;
  loading: boolean;
  error: string;
  onEmailChange: (text: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export function ForgotPasswordModal({
  visible,
  email,
  loading,
  error,
  onEmailChange,
  onSubmit,
  onClose,
}: ForgotPasswordModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Recuperar contraseña</Text>
          <Text style={styles.modalText}>
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </Text>

          {error && <Text style={styles.modalError}>{error}</Text>}

          <TextInput
            style={styles.modalInput}
            placeholder="Correo electrónico"
            placeholderTextColor="#999"
            value={email}
            onChangeText={onEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={onClose}
              disabled={loading}
            >
              <Text style={styles.modalCancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalSubmitButton]}
              onPress={onSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.modalButtonText}>Enviar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}