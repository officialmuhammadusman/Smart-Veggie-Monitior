// components/ui/Button.tsx
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  style,
}: ButtonProps) {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: Layout.borderRadius.md,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    };

    const sizeStyles: Record<string, ViewStyle> = {
      sm: { height: 40, paddingHorizontal: 16 },
      md: { height: 50, paddingHorizontal: 24 },
      lg: { height: 56, paddingHorizontal: 32 },
    };

    return { ...baseStyle, ...sizeStyles[size] };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: "600",
    };

    const sizeStyles: Record<string, TextStyle> = {
      sm: { fontSize: 14 },
      md: { fontSize: 16 },
      lg: { fontSize: 18 },
    };

    const variantStyles: Record<string, TextStyle> = {
      primary: { color: "#FFFFFF" },
      secondary: { color: "#FFFFFF" },
      outline: { color: Colors.light.primary },
      ghost: { color: Colors.light.primary },
    };

    return { ...baseStyle, ...sizeStyles[size], ...variantStyles[variant] };
  };

  const textStyle = getTextStyle();
  const loadingColor = textStyle.color as string; // Type assertion for color

  if (variant === "primary") {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        style={[styles.button, getButtonStyle(), style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#ffffff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {loading ? (
            <ActivityIndicator color={loadingColor} />
          ) : (
            <Text style={textStyle}>{title}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        getButtonStyle(),
        variant === "secondary" && { backgroundColor: Colors.light.secondary },
        variant === "outline" && styles.outlineButton,
        variant === "ghost" && styles.ghostButton,
        style,
      ]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={loadingColor} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    overflow: "hidden",
  },
  gradient: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: Colors.light.primary,
    backgroundColor: "transparent",
  },
  ghostButton: {
    backgroundColor: "transparent",
  },
});
