// app/(tabs)/alerts.tsx
// ✅ FIXED VERSION with proper error handling

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Layout } from "@/constants/Layout";
import { useAlerts } from "@/hooks/useAlerts";
import { LinearGradient } from "expo-linear-gradient";
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  Info,
  RefreshCw,
  Zap,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface Alert {
  id: string;
  device_id: string;
  user_id: string;
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  is_read: boolean;
  created_at: string;
  alert_type: "gas" | "temperature" | "spoilage" | "maintenance";
  data?: any;
}

export default function AlertsScreen() {
  const {
    alerts,
    unreadCount,
    markAsRead,
    refetch,
    checkForNewAlerts,
    loading,
  } = useAlerts();
  const [filter, setFilter] = useState<"all" | "unread" | "critical">("all");
  const [refreshing, setRefreshing] = useState(false);

  // 🐛 DEBUG: Log alerts on mount and when they change
  useEffect(() => {
    console.log("📊 Alerts Screen - Current State:");
    console.log("  Total alerts:", alerts?.length ?? 0);
    console.log("  Unread count:", unreadCount ?? 0);
    console.log("  Loading:", loading);
    console.log("  Alerts data:", JSON.stringify(alerts, null, 2));
  }, [alerts, unreadCount, loading]);

  const onRefresh = async () => {
    console.log("🔄 Manual refresh triggered");
    setRefreshing(true);
    try {
      await checkForNewAlerts();
      await refetch();
      console.log("✅ Refresh completed");
    } catch (err) {
      console.error("❌ Error refreshing alerts:", err);
    } finally {
      setRefreshing(false);
    }
  };

  const filteredAlerts = (alerts || []).filter((alert) => {
    if (filter === "unread") return !alert.is_read;
    if (filter === "critical") return alert.severity === "critical";
    return true;
  });

  console.log(`🔍 Filtered alerts (${filter}):`, filteredAlerts.length);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#66BB6A", "#4CAF50", "#388E3C"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Alerts</Text>
        <Text style={styles.headerSubtitle}>
          {unreadCount || 0} unread alert{unreadCount !== 1 ? "s" : ""}
        </Text>
      </LinearGradient>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <FilterButton
          label="All"
          count={alerts?.length || 0}
          active={filter === "all"}
          onPress={() => setFilter("all")}
        />
        <FilterButton
          label="Unread"
          count={unreadCount || 0}
          active={filter === "unread"}
          onPress={() => setFilter("unread")}
        />
        <FilterButton
          label="Critical"
          count={alerts?.filter((a) => a.severity === "critical").length || 0}
          active={filter === "critical"}
          onPress={() => setFilter("critical")}
        />
      </View>

      {/* Loading State */}
      {loading && !refreshing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading alerts...</Text>
        </View>
      )}

      {/* Content */}
      {!loading && (
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#4CAF50"
              colors={["#4CAF50"]}
            />
          }
        >
          <View style={styles.content}>
            {/* Debug Info (remove in production) */}
            <View style={styles.debugContainer}>
              <Text style={styles.debugText}>
                Debug: {filteredAlerts.length} alerts shown
              </Text>
              <TouchableOpacity onPress={onRefresh} style={styles.debugButton}>
                <RefreshCw size={16} color="#4CAF50" />
                <Text style={styles.debugButtonText}>Force Refresh</Text>
              </TouchableOpacity>
            </View>

            {filteredAlerts.length === 0 ? (
              <EmptyState filter={filter} />
            ) : (
              filteredAlerts.map((alert, index) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  delay={index * 50}
                  onPress={() => {
                    console.log("📌 Marking alert as read:", alert.id);
                    markAsRead(alert.id);
                  }}
                />
              ))
            )}
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </View>
  );
}

// Empty State Component
function EmptyState({ filter }: { filter: string }) {
  return (
    <Animated.View
      entering={FadeInDown.delay(200).springify()}
      style={styles.emptyState}
    >
      <View style={styles.emptyIconContainer}>
        <Bell size={64} color="#A5D6A7" strokeWidth={1.5} />
      </View>
      <Text style={styles.emptyTitle}>No Alerts</Text>
      <Text style={styles.emptyText}>
        You&apos;re all caught up! No {filter !== "all" ? filter : ""} alerts to
        show.
      </Text>
    </Animated.View>
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
  const getSeverityVariant = ():
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "default" => {
    switch (alert.severity) {
      case "critical":
      case "high":
        return "danger";
      case "medium":
        return "warning";
      case "low":
        return "info";
      default:
        return "default";
    }
  };

  const getSeverityIcon = () => {
    const iconProps = { size: 24, strokeWidth: 2 };
    switch (alert.severity) {
      case "critical":
        return <AlertCircle {...iconProps} color="#EF5350" />;
      case "high":
        return <AlertTriangle {...iconProps} color="#FFA726" />;
      case "medium":
        return <Zap {...iconProps} color="#FFA726" />;
      default:
        return <Info {...iconProps} color="#42A5F5" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
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
    } catch (err) {
      return "Recently";
    }
  };

  return (
    <Animated.View entering={FadeInDown.delay(delay).springify()}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Card
          style={[styles.alertCard, !alert.is_read && styles.alertCardUnread]}
        >
          <View style={styles.alertHeader}>
            <View style={styles.alertIconContainer}>{getSeverityIcon()}</View>
            <View style={styles.alertInfo}>
              <View style={styles.alertTop}>
                <Badge
                  label={alert.severity}
                  variant={getSeverityVariant()}
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
    backgroundColor: "#F1F8E9",
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
    color: "rgba(255,255,255,0.95)",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#4CAF50",
  },
  debugContainer: {
    backgroundColor: "#E8F5E9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  debugText: {
    fontSize: 12,
    color: "#2E7D32",
    fontFamily: "monospace",
  },
  debugButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  debugButtonText: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "600",
  },
  filtersContainer: {
    flexDirection: "row",
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    gap: Layout.spacing.sm,
    backgroundColor: "#FFFFFF",
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: Layout.borderRadius.md,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C8E6C9",
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2E7D32",
  },
  filterLabelActive: {
    color: "#FFFFFF",
  },
  filterBadge: {
    backgroundColor: "#E8F5E9",
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
    color: "#2E7D32",
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
    borderLeftColor: "#4CAF50",
  },
  alertHeader: {
    flexDirection: "row",
    gap: Layout.spacing.md,
  },
  alertIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
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
    color: "#81C784",
  },
  alertMessage: {
    fontSize: Layout.fontSize.sm,
    color: "#1B5E20",
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
    backgroundColor: "#4CAF50",
  },
  unreadText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4CAF50",
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
    color: "#2E7D32",
    marginBottom: Layout.spacing.xs,
  },
  emptyText: {
    fontSize: Layout.fontSize.md,
    color: "#558B2F",
    textAlign: "center",
    paddingHorizontal: Layout.spacing.xl,
  },
});
