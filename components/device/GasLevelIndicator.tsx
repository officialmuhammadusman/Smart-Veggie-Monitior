import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface GasLevelIndicatorProps {
  level: number; // 0-100
  threshold?: number;
}

export function GasLevelIndicator({
  level,
  threshold = 70,
}: GasLevelIndicatorProps) {
  const getColor = () => {
    if (level < 50) return Colors.light.success;
    if (level < threshold) return Colors.light.warning;
    return Colors.light.danger;
  };

  const getStatus = () => {
    if (level < 50) return "Normal";
    if (level < threshold) return "Elevated";
    return "Critical";
  };

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>Gas Level</Text>
        <Text style={[styles.status, { color: getColor() }]}>
          {getStatus()}
        </Text>
      </View>

      <View style={styles.barContainer}>
        <View style={styles.barBackground}>
          <LinearGradient
            colors={[getColor(), getColor() + "80"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.barFill, { width: `${level}%` }]}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.value}>{level.toFixed(1)} ppm</Text>
        <Text style={styles.threshold}>Threshold: {threshold} ppm</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Layout.spacing.md,
  },
  label: {
    fontSize: Layout.fontSize.md,
    fontWeight: "600",
    color: Colors.light.text,
  },
  status: {
    fontSize: Layout.fontSize.sm,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  barContainer: {
    marginBottom: Layout.spacing.md,
  },
  barBackground: {
    height: 12,
    backgroundColor: Colors.light.borderLight,
    borderRadius: 6,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  value: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "700",
    color: Colors.light.text,
  },
  threshold: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.textSecondary,
  },
});
