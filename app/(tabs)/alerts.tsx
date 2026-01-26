// app/(tabs)/alerts.tsx
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { useAlerts } from "@/hooks/useAlerts";
import { Alert } from "@/types/alert.types";
import { LinearGradient } from "expo-linear-gradient";
import {
    AlertCircle,
    AlertTriangle,
    Bell,
    Info,
    Zap,
} from "lucide-react-native";
import React, { useState } from "react";
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function AlertsScreen() {
  const { alerts, unreadCount, markAsRead, refetch } = useAlerts();
  const [filter, setFilter] = useState<"all" | "unread" | "critical">("all");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "unread") return !alert.is_read;
    if (filter === "critical") return alert.severity === "critical";
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#ffffff"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Alerts</Text>
        <Text style={styles.headerSubtitle}>
          {unreadCount} unread alert{unreadCount !== 1 ? "s" : ""}
        </Text>
      </LinearGradient>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <FilterButton
          label="All"
          count={alerts.length}
          active={filter === "all"}
          onPress={() => setFilter("all")}
        />
        <FilterButton
          label="Unread"
          count={unreadCount}
          active={filter === "unread"}
          onPress={() => setFilter("unread")}
        />
        <FilterButton
          label="Critical"
          count={alerts.filter((a) => a.severity === "critical").length}
          active={filter === "critical"}
          onPress={() => setFilter("critical")}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          {filteredAlerts.length === 0 ? (
            <Animated.View
              entering={FadeInDown.delay(200).springify()}
              style={styles.emptyState}
            >
              <View style={styles.emptyIconContainer}>
                <Bell
                  size={64}
                  color={Colors.light.textTertiary}
                  strokeWidth={1.5}
                />
              </View>
              <Text style={styles.emptyTitle}>No Alerts</Text>
              <Text style={styles.emptyText}>
                You&apos;re all caught up! No {filter !== "all" ? filter : ""}{" "}
                alerts to show.
              </Text>
            </Animated.View>
          ) : (
            filteredAlerts.map((alert, index) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                delay={index * 50}
                onPress={() => markAsRead(alert.id)}
              />
            ))
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// Filter Button Component
function FilterButton({ label, count, active, onPress }: any) {
  return (
    <TouchableOpacity
      style={[styles.filterButton, active && styles.filterButtonActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.filterLabel, active && styles.filterLabelActive]}>
        {label}
      </Text>
      <View style={[styles.filterBadge, active && styles.filterBadgeActive]}>
        <Text style={[styles.filterCount, active && styles.filterCountActive]}>
          {count}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// Alert Card Component
function AlertCard({
  alert,
  delay,
  onPress,
}: {
  alert: Alert;
  delay: number;
  onPress: () => void;
}) {
  const getSeverityVariant = () => {
    switch (alert.severity) {
      case "critical":
        return "danger";
      case "high":
        return "danger";
      case "medium":
        return "warning";
      default:
        return "info";
    }
  };

  const getSeverityIcon = () => {
    const iconProps = { size: 24, strokeWidth: 2 };
    switch (alert.severity) {
      case "critical":
        return <AlertCircle {...iconProps} color="#EF4444" />;
      case "high":
        return <AlertTriangle {...iconProps} color="#F59E0B" />;
      case "medium":
        return <Zap {...iconProps} color="#F59E0B" />;
      default:
        return <Info {...iconProps} color="#3B82F6" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Animated.View entering={FadeInDown.delay(delay).springify()}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Card
          style={{
            ...styles.alertCard,
            ...(!alert.is_read ? styles.alertCardUnread : {}),
          }}
        >
          <View style={styles.alertHeader}>
            <View style={styles.alertIconContainer}>{getSeverityIcon()}</View>
            <View style={styles.alertInfo}>
              <View style={styles.alertTop}>
                <Badge
                  label={alert.severity}
                  variant={getSeverityVariant() as any}
                  size="sm"
                />
                <Text style={styles.alertTime}>
                  {formatDate(alert.created_at)}
                </Text>
              </View>
              <Text style={styles.alertMessage}>{alert.message}</Text>
              {!alert.is_read && (
                <View style={styles.unreadIndicator}>
                  <View style={styles.unreadDot} />
                  <Text style={styles.unreadText}>New</Text>
                </View>
              )}
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundSecondary,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: Layout.spacing.lg,
  },
  headerTitle: {
    fontSize: Layout.fontSize.xxl,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: Layout.fontSize.md,
    color: "rgba(255,255,255,0.9)",
  },
  filtersContainer: {
    flexDirection: "row",
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    gap: Layout.spacing.sm,
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
  },
  filterLabelActive: {
    color: "#FFFFFF",
  },
  filterBadge: {
    backgroundColor: Colors.light.backgroundSecondary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  filterBadgeActive: {
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  filterCount: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.light.text,
  },
  filterCountActive: {
    color: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.sm,
  },
  alertCard: {
    marginBottom: Layout.spacing.md,
    padding: Layout.spacing.md,
  },
  alertCardUnread: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.light.primary,
  },
  alertHeader: {
    flexDirection: "row",
    gap: Layout.spacing.md,
  },
  alertIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.light.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  alertIcon: {
    fontSize: 24,
  },
  alertInfo: {
    flex: 1,
  },
  alertTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
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
  emptyState: {
    alignItems: "center",
    paddingVertical: Layout.spacing.xxl * 2,
  },
  emptyIconContainer: {
    marginBottom: Layout.spacing.lg,
  },
  emptyTitle: {
    fontSize: Layout.fontSize.xl,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: Layout.spacing.xs,
  },
  emptyText: {
    fontSize: Layout.fontSize.md,
    color: Colors.light.textSecondary,
    textAlign: "center",
    paddingHorizontal: Layout.spacing.xl,
  },
});
