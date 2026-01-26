import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface SensorReadingProps {
  icon: string;
  label: string;
  value: string;
  unit: string;
  color: string;
}

export function SensorReading({
  icon,
  label,
  value,
  unit,
  color,
}: SensorReadingProps) {
  return (
    <Card style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    paddingVertical: Layout.spacing.lg,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
  },
  label: {
    fontSize: 12,
    color: Colors.light.textTertiary,
    marginBottom: 8,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
  },
  unit: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
});
