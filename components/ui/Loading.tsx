// components/ui/Loading.tsx
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface LoadingProps {
  message?: string;
  size?: "small" | "large";
  fullScreen?: boolean;
}

export function Loading({
  message,
  size = "large",
  fullScreen = false,
}: LoadingProps) {
  const Container = fullScreen ? View : React.Fragment;
  const containerStyle = fullScreen ? styles.fullScreenContainer : undefined;

  return (
    <Container style={containerStyle}>
      <View style={styles.container}>
        <ActivityIndicator size={size} color={Colors.light.primary} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </Container>
  );
}

// Skeleton Loader Component
export function Skeleton({ width = "100%", height = 20, style }: any) {
  return <View style={[styles.skeleton, { width, height }, style]} />;
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: Layout.spacing.xl,
  },
  message: {
    marginTop: Layout.spacing.md,
    fontSize: Layout.fontSize.md,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
  skeleton: {
    backgroundColor: Colors.light.borderLight,
    borderRadius: Layout.borderRadius.sm,
  },
});
