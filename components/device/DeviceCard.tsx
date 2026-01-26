import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { Device } from "@/types/device.types";
import { formatTimeAgo } from "@/utils/formatters";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface DeviceCardProps {
  device: Device;
  onPress: () => void;
}

export function DeviceCard({ device, onPress }: DeviceCardProps) {
  const getStatusBadge = () => {
    switch (device.status) {
      case "active":
        return { variant: "success" as const, label: "Active" };
      case "warning":
        return { variant: "warning" as const, label: "Warning" };
      case "critical":
        return { variant: "danger" as const, label: "Critical" };
      default:
        return { variant: "default" as const, label: "Inactive" };
    }
  };

  const getStatusColor = () => {
    switch (device.status) {
      case "active":
        return Colors.light.success;
      case "warning":
        return Colors.light.warning;
      case "critical":
        return Colors.light.danger;
      default:
        return Colors.light.textTertiary;
    }
  };

  const badge = getStatusBadge();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.deviceInfo}>
            <View
              style={[styles.statusDot, { backgroundColor: getStatusColor() }]}
            />
            <View style={styles.details}>
              <Text style={styles.name}>{device.name}</Text>
              <Text style={styles.location}>📍 {device.location}</Text>
            </View>
          </View>
          <Badge label={badge.label} variant={badge.variant} size="sm" />
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Device ID</Text>
            <Text style={styles.infoValue}>{device.id.slice(0, 8)}...</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Last Update</Text>
            <Text style={styles.infoValue}>
              {device.last_reading_at
                ? formatTimeAgo(device.last_reading_at)
                : "Never"}
            </Text>
          </View>
        </View>

        <View style={styles.actionRow}>
          <Text style={styles.viewDetails}>View Details →</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Layout.spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Layout.spacing.md,
  },
  deviceInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: Layout.spacing.sm,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
  },
  location: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.borderLight,
    marginVertical: Layout.spacing.md,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: Colors.light.textTertiary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: Layout.fontSize.sm,
    fontWeight: "600",
    color: Colors.light.text,
  },
  actionRow: {
    marginTop: Layout.spacing.md,
    alignItems: "flex-end",
  },
  viewDetails: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.primary,
    fontWeight: "600",
  },
});
