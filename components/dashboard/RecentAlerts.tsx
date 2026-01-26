import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { Alert } from "@/types/alert.types";
import { formatTimeAgo } from "@/utils/formatters";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RecentAlertsProps {
  alerts: Alert[];
  onAlertPress?: (alert: Alert) => void;
  onViewAllPress?: () => void;
}

export function RecentAlerts({
  alerts,
  onAlertPress,
  onViewAllPress,
}: RecentAlertsProps) {
  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "critical":
        return "danger" as const;
      case "high":
        return "danger" as const;
      case "medium":
        return "warning" as const;
      default:
        return "info" as const;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Alerts</Text>
        {onViewAllPress && (
          <TouchableOpacity onPress={onViewAllPress}>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        )}
      </View>

      {alerts.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>✅</Text>
          <Text style={styles.emptyText}>No recent alerts</Text>
        </Card>
      ) : (
        alerts.slice(0, 3).map((alert) => (
          <TouchableOpacity
            key={alert.id}
            onPress={() => onAlertPress?.(alert)}
            activeOpacity={0.7}
          >
            <Card
              style={[
                styles.alertCard,
                !alert.is_read && styles.alertCardUnread,
              ]}
            >
              <View style={styles.alertHeader}>
                <Badge
                  label={alert.severity}
                  variant={getSeverityVariant(alert.severity)}
                  size="sm"
                />
                <Text style={styles.alertTime}>
                  {formatTimeAgo(alert.created_at)}
                </Text>
              </View>
              <Text style={styles.alertMessage} numberOfLines={2}>
                {alert.message}
              </Text>
              {!alert.is_read && (
                <View style={styles.unreadIndicator}>
                  <View style={styles.unreadDot} />
                  <Text style={styles.unreadText}>New</Text>
                </View>
              )}
            </Card>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Layout.spacing.md,
  },
  title: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "700",
    color: Colors.light.text,
  },
  viewAll: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.primary,
    fontWeight: "600",
  },
  alertCard: {
    marginBottom: Layout.spacing.sm,
  },
  alertCardUnread: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.light.primary,
  },
  alertHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Layout.spacing.xs,
  },
  alertTime: {
    fontSize: 12,
    color: Colors.light.textTertiary,
  },
  alertMessage: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.text,
    lineHeight: 20,
    marginBottom: 8,
  },
  unreadIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.primary,
  },
  unreadText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.light.primary,
  },
  emptyCard: {
    alignItems: "center",
    paddingVertical: Layout.spacing.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: Layout.spacing.sm,
  },
  emptyText: {
    fontSize: Layout.fontSize.md,
    color: Colors.light.textSecondary,
  },
});
