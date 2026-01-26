// constants/Colors.ts
// constants/Layout.ts
import { Dimensions } from "react-native";

export const Colors = {
  light: {
    // Primary colors
    primary: "#10B981", // Green - Fresh/Good
    primaryDark: "#059669",
    primaryLight: "#D1FAE5",

    // Secondary colors
    secondary: "#3B82F6", // Blue
    secondaryDark: "#2563EB",
    secondaryLight: "#DBEAFE",

    // Status colors
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#3B82F6",

    // Spoilage status colors
    fresh: "#10B981",
    good: "#84CC16",
    caution: "#F59E0B",
    spoiled: "#EF4444",

    // Neutral colors
    background: "#FFFFFF",
    backgroundSecondary: "#F9FAFB",
    card: "#FFFFFF",
    cardBorder: "#E5E7EB",

    // Text colors
    text: "#111827",
    textSecondary: "#6B7280",
    textTertiary: "#9CA3AF",

    // Border colors
    border: "#E5E7EB",
    borderLight: "#F3F4F6",

    // Shadow
    shadow: "rgba(0, 0, 0, 0.1)",
  },

  dark: {
    // Primary colors
    primary: "#10B981",
    primaryDark: "#059669",
    primaryLight: "#065F46",

    // Secondary colors
    secondary: "#3B82F6",
    secondaryDark: "#2563EB",
    secondaryLight: "#1E3A8A",

    // Status colors
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#3B82F6",

    // Spoilage status colors
    fresh: "#10B981",
    good: "#84CC16",
    caution: "#F59E0B",
    spoiled: "#EF4444",

    // Neutral colors
    background: "#111827",
    backgroundSecondary: "#1F2937",
    card: "#1F2937",
    cardBorder: "#374151",

    // Text colors
    text: "#F9FAFB",
    textSecondary: "#D1D5DB",
    textTertiary: "#9CA3AF",

    // Border colors
    border: "#374151",
    borderLight: "#4B5563",

    // Shadow
    shadow: "rgba(0, 0, 0, 0.5)",
  },
};

// Gradients
export const Gradients = {
  primary: ["#10B981", "#059669"],
  secondary: ["#3B82F6", "#2563EB"],
  warning: ["#F59E0B", "#D97706"],
  danger: ["#EF4444", "#DC2626"],
};

const { width, height } = Dimensions.get("window");

export const Layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 9999,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
  },
  fontWeight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
  iconSize: {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  },
};
