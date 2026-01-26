// components/ui/Badge.tsx
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface BadgeProps {
  label: string;
  variant?: "success" | "warning" | "danger" | "info" | "default";
  size?: "sm" | "md";
  style?: ViewStyle;
}

export function Badge({
  label,
  variant = "default",
  size = "md",
  style,
}: BadgeProps) {
  const getVariantColors = () => {
    switch (variant) {
      case "success":
        return { bg: Colors.light.primaryLight, text: Colors.light.primary };
      case "warning":
        return { bg: "#FEF3C7", text: Colors.light.warning };
      case "danger":
        return { bg: "#FEE2E2", text: Colors.light.danger };
      case "info":
        return {
          bg: Colors.light.secondaryLight,
          text: Colors.light.secondary,
        };
      default:
        return {
          bg: Colors.light.backgroundSecondary,
          text: Colors.light.textSecondary,
        };
    }
  };

  const colors = getVariantColors();
  const padding = size === "sm" ? 4 : 6;
  const fontSize = size === "sm" ? 10 : 12;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          paddingHorizontal: padding * 2,
          paddingVertical: padding,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: colors.text, fontSize }]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: Layout.borderRadius.full,
    alignSelf: "flex-start",
  },
  text: {
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
