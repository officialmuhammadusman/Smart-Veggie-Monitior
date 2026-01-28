// constants/Colors.ts
// constants/Layout.ts
export const Colors = {
  light: {
    // Primary colors - Green theme
    primary: "#4CAF50", // Primary Green
    primaryDark: "#388E3C",
    primaryLight: "#E8F5E9",

    // Secondary colors
    secondary: "#66BB6A", // Light Green
    secondaryDark: "#558B2F",
    secondaryLight: "#C8E6C9",

    // Status colors
    success: "#66BB6A", // Green
    warning: "#FFA726", // Orange
    danger: "#EF5350", // Red
    info: "#42A5F5", // Blue

    // Spoilage status colors
    fresh: "#66BB6A", // Medium Green
    good: "#81C784", // Light Green
    caution: "#FFA726", // Orange
    spoiled: "#EF5350", // Red

    // Neutral colors
    background: "#FFFFFF",
    backgroundSecondary: "#F1F8E9", // Light green background
    card: "#FFFFFF",
    cardBorder: "#C8E6C9",

    // Text colors
    text: "#1B5E20", // Dark green
    textSecondary: "#558B2F", // Medium-dark green
    textTertiary: "#81C784", // Light green

    // Border colors
    border: "#C8E6C9", // Light green
    borderLight: "#E8F5E9", // Very light green

    // Shadow
    shadow: "rgba(76, 175, 80, 0.15)", // Green-tinted shadow
  },

  dark: {
    // Primary colors - Dark green theme
    primary: "#66BB6A", // Light green for dark mode
    primaryDark: "#4CAF50",
    primaryLight: "#2E7D32",

    // Secondary colors
    secondary: "#81C784",
    secondaryDark: "#66BB6A",
    secondaryLight: "#388E3C",

    // Status colors
    success: "#66BB6A",
    warning: "#FFA726",
    danger: "#EF5350",
    info: "#42A5F5",

    // Spoilage status colors
    fresh: "#66BB6A",
    good: "#81C784",
    caution: "#FFA726",
    spoiled: "#EF5350",

    // Neutral colors
    background: "#1B5E20", // Dark green
    backgroundSecondary: "#2E7D32", // Medium dark green
    card: "#2E7D32",
    cardBorder: "#388E3C",

    // Text colors
    text: "#E8F5E9", // Very light green
    textSecondary: "#C8E6C9", // Light green
    textTertiary: "#A5D6A7", // Pale green

    // Border colors
    border: "#388E3C",
    borderLight: "#558B2F",

    // Shadow
    shadow: "rgba(0, 0, 0, 0.5)",
  },
};

// Gradients - Updated with green theme
export const Gradients = {
  primary: ["#66BB6A", "#4CAF50", "#388E3C"], // Green gradient
  secondary: ["#81C784", "#66BB6A"], // Light green gradient
  warning: ["#FFA726", "#FB8C00"], // Orange gradient
  danger: ["#EF5350", "#E53935"], // Red gradient
  fresh: ["#66BB6A", "#4CAF50"], // Fresh green
  header: ["#66BB6A", "#4CAF50", "#388E3C"], // Header gradient
};
