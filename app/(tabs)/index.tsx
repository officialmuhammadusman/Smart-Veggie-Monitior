// app/(tabs)/index.tsx
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { useAlerts } from "@/hooks/useAlerts";
import { useDevices } from "@/hooks/useDevices";
import { Device } from "@/types/device.types";
import { MOCK_CHART_DATA } from "@/utils/mockData";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  AlertOctagon,
  AlertTriangle,
  BarChart3,
  Bell,
  CheckCircle,
  Plus,
  Settings,
  Smartphone,
} from "lucide-react-native";
import React from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

export default function DashboardScreen() {
  const router = useRouter();
  const { devices, refetch } = useDevices();
  const { alerts, unreadCount } = useAlerts();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const stats = {
    totalDevices: devices.length,
    activeDevices: devices.filter((d: Device) => d.status === "active").length,
    criticalAlerts: alerts.filter(
      (a) => a.severity === "critical" && !a.is_read,
    ).length,
    warningDevices: devices.filter((d: Device) => d.status === "warning")
      .length,
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#ffffff"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View>
            <View style={styles.greetingContainer}></View>
            <Text style={styles.headerTitle}>Dashboard</Text>
          </View>
          <TouchableOpacity style={styles.notificationBadge}>
            <Bell size={20} color="#FFFFFF" />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <Animated.View
            entering={FadeInRight.delay(100).springify()}
            style={styles.statRow}
          >
            <StatCard
              Icon={Smartphone}
              label="Total Devices"
              value={stats.totalDevices}
              color={Colors.light.primary}
              onPress={() => router.push("/(tabs)/devices")}
            />
            <StatCard
              Icon={CheckCircle}
              label="Active"
              value={stats.activeDevices}
              color={Colors.light.success}
              onPress={() => router.push("/(tabs)/devices")}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInRight.delay(200).springify()}
            style={styles.statRow}
          >
            <StatCard
              Icon={AlertTriangle}
              label="Warnings"
              value={stats.warningDevices}
              color={Colors.light.warning}
              onPress={() => router.push("/(tabs)/alerts")}
            />
            <StatCard
              Icon={AlertOctagon}
              label="Critical"
              value={stats.criticalAlerts}
              color={Colors.light.danger}
              onPress={() => router.push("/(tabs)/alerts")}
            />
          </Animated.View>
        </View>

        {/* Spoilage Trends */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Spoilage Trends</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>This Week</Text>
            </TouchableOpacity>
          </View>

          <Card style={styles.chartCard}>
            <SimpleBarChart data={MOCK_CHART_DATA} />
          </Card>
        </Animated.View>

        {/* Recent Alerts */}
        <Animated.View entering={FadeInDown.delay(400).springify()}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Alerts</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/alerts")}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {alerts.slice(0, 3).map((alert, index) => (
            <AlertCard key={alert.id} alert={alert} delay={index * 100} />
          ))}
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View entering={FadeInDown.delay(500).springify()}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>

          <View style={styles.actionsContainer}>
            <ActionButton
              Icon={Plus}
              label="Add Device"
              onPress={() => router.push("/device/add-device")}
            />
            <ActionButton Icon={BarChart3} label="Reports" onPress={() => {}} />
            <ActionButton
              Icon={Settings}
              label="Settings"
              onPress={() => router.push("/(tabs)/profile")}
            />
          </View>
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// Stat Card Component
function StatCard({ Icon, label, value, color, onPress }: any) {
  return (
    <TouchableOpacity
      style={styles.statCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Card style={styles.statCardInner}>
        <View style={[styles.statIcon, { backgroundColor: color + "20" }]}>
          <Icon size={24} color={color} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </Card>
    </TouchableOpacity>
  );
}

// Alert Card Component
function AlertCard({ alert, delay }: any) {
  const getSeverityColor = () => {
    switch (alert.severity) {
      case "critical":
        return "danger";
      case "high":
        return "warning";
      case "medium":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Animated.View entering={FadeInDown.delay(delay).springify()}>
      <Card style={styles.alertCard}>
        <View style={styles.alertHeader}>
          <Badge
            label={alert.severity}
            variant={getSeverityColor()}
            size="sm"
          />
          <Text style={styles.alertTime}>
            {new Date(alert.created_at).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <Text style={styles.alertMessage} numberOfLines={2}>
          {alert.message}
        </Text>
      </Card>
    </Animated.View>
  );
}

// Action Button
function ActionButton({ Icon, label, onPress }: any) {
  return (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.actionIcon}>
        <Icon size={28} color={Colors.light.text} />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// Simple Bar Chart
function SimpleBarChart({ data }: any) {
  const maxValue = Math.max(
    ...data.map((d: any) => d.fresh + d.warning + d.spoiled),
  );

  return (
    <View style={styles.chart}>
      {data.map((item: any, index: number) => {
        const freshHeight = (item.fresh / maxValue) * 120;
        const warningHeight = (item.warning / maxValue) * 120;
        const spoiledHeight = (item.spoiled / maxValue) * 120;

        return (
          <View key={index} style={styles.chartBar}>
            <View style={styles.barStack}>
              {spoiledHeight > 0 && (
                <View
                  style={[
                    styles.barSegment,
                    {
                      height: spoiledHeight,
                      backgroundColor: Colors.light.danger,
                    },
                  ]}
                />
              )}
              {warningHeight > 0 && (
                <View
                  style={[
                    styles.barSegment,
                    {
                      height: warningHeight,
                      backgroundColor: Colors.light.warning,
                    },
                  ]}
                />
              )}
              {freshHeight > 0 && (
                <View
                  style={[
                    styles.barSegment,
                    {
                      height: freshHeight,
                      backgroundColor: Colors.light.fresh,
                    },
                  ]}
                />
              )}
            </View>
            <Text style={styles.chartLabel}>{item.date}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundSecondary,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: Layout.spacing.lg,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greetingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  greeting: {
    fontSize: Layout.fontSize.sm,
    color: "rgba(255,255,255,0.9)",
  },
  headerTitle: {
    fontSize: Layout.fontSize.xxl,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  notificationBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: Colors.light.danger,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    paddingHorizontal: Layout.spacing.lg,
    marginTop: -20,
  },
  statRow: {
    flexDirection: "row",
    gap: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
  },
  statCard: {
    flex: 1,
  },
  statCardInner: {
    alignItems: "center",
    paddingVertical: Layout.spacing.lg,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Layout.spacing.sm,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.textSecondary,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Layout.spacing.lg,
    marginTop: Layout.spacing.xl,
    marginBottom: Layout.spacing.md,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "700",
    color: Colors.light.text,
  },
  seeAll: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.primary,
    fontWeight: "600",
  },
  chartCard: {
    marginHorizontal: Layout.spacing.lg,
    padding: Layout.spacing.lg,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 150,
  },
  chartBar: {
    alignItems: "center",
    flex: 1,
  },
  barStack: {
    width: "70%",
    flexDirection: "column-reverse",
    alignItems: "center",
    gap: 2,
  },
  barSegment: {
    width: "100%",
    borderRadius: 4,
  },
  chartLabel: {
    fontSize: 10,
    color: Colors.light.textSecondary,
    marginTop: 8,
  },
  alertCard: {
    marginHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.sm,
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
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: "row",
    paddingHorizontal: Layout.spacing.lg,
    gap: Layout.spacing.md,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.light.card,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Layout.spacing.xs,
    borderWidth: 1,
    borderColor: Colors.light.borderLight,
  },
  actionLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    fontWeight: "500",
    textAlign: "center",
  },
});
