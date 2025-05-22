import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { styles } from "../../styles/style-auth";

export function LoadingScreen() {
  return (
    <View style={[styles.container, styles.loadingContainer]}>
      <ActivityIndicator size="large" color="#2B69DB" />
      <Text style={styles.loadingText}>Cargando...</Text>
    </View>
  );
}