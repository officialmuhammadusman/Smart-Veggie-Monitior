import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface StatsCardProps {
  icon: string;
  label: string;
  value: number | string;
  color: string;
  onPress?: () => void;
}

export function StatsCard({
  icon,
  label,
  value,
  color,
  onPress,
}: StatsCardProps) {
  const content = (
    <Card style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: color + "20" }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </Card>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={styles.touchable}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={styles.touchable}>{content}</View>;
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  card: {
    alignItems: "center",
    paddingVertical: Layout.spacing.lg,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Layout.spacing.sm,
  },
  icon: {
    fontSize: 24,
  },
  value: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
  },
  label: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.textSecondary,
    textAlign: "center",
  },
});
