// app/(tabs)/devices.tsx
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { useDevices } from "@/hooks/useDevices";
import { Device } from "@/types/device.types";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ChevronRight, MapPin, Smartphone } from "lucide-react-native";
import React from "react";
import {
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function DevicesScreen() {
  const router = useRouter();
  const { devices, loading, refetch } = useDevices();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
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
        <Text style={styles.headerTitle}>My Devices</Text>
        <Text style={styles.headerSubtitle}>
          {devices.length} device{devices.length !== 1 ? "s" : ""} registered
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.content}>
          {/* Add Device Button */}
          <Animated.View entering={FadeInDown.delay(100).springify()}>
            <Button
              title="+ Add New Device"
              onPress={() => router.push("/device/add-device")}
              variant="outline"
              style={styles.addButton}
            />
          </Animated.View>

          {/* Devices List */}
          {devices.map((device: Device, index: number) => (
            <DeviceCard
              key={device.id}
              device={device}
              delay={index * 100 + 200}
              onPress={() => router.push(`/device/${device.id}`)}
            />
          ))}

          {devices.length === 0 && !loading && (
            <Animated.View
              entering={FadeInDown.delay(300).springify()}
              style={styles.emptyState}
            >
              <Smartphone
                size={80}
                color={Colors.light.textTertiary}
                strokeWidth={1.5}
              />
              <Text style={styles.emptyTitle}>No Devices Yet</Text>
              <Text style={styles.emptyText}>
                Add your first ESP32-CAM device to start monitoring your
                vegetables
              </Text>
            </Animated.View>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// Device Card Component
function DeviceCard({
  device,
  delay,
  onPress,
}: {
  device: Device;
  delay: number;
  onPress: () => void;
}) {
  const getStatusBadge = () => {
    switch (device.status) {
      case "active":
        return { variant: "success", label: "Active" };
      case "warning":
        return { variant: "warning", label: "Warning" };
      case "critical":
        return { variant: "danger", label: "Critical" };
      default:
        return { variant: "default", label: "Inactive" };
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
    <Animated.View entering={FadeInDown.delay(delay).springify()}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Card style={styles.deviceCard}>
          <View style={styles.deviceHeader}>
            <View style={styles.deviceInfo}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getStatusColor() },
                ]}
              />
              <View style={styles.deviceDetails}>
                <Text style={styles.deviceName}>{device.name}</Text>
                <View style={styles.locationRow}>
                  <MapPin
                    size={14}
                    color={Colors.light.textSecondary}
                    strokeWidth={2}
                  />
                  <Text style={styles.deviceLocation}>{device.location}</Text>
                </View>
              </View>
            </View>
            <Badge
              label={badge.label}
              variant={badge.variant as any}
              size="sm"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.deviceFooter}>
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
            <View style={styles.viewDetailsRow}>
              <Text style={styles.viewDetails}>View Details</Text>
              <ChevronRight
                size={16}
                color={Colors.light.primary}
                strokeWidth={2.5}
              />
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
}

// Helper function
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.lg,
  },
  addButton: {
    marginBottom: Layout.spacing.lg,
  },
  deviceCard: {
    marginBottom: Layout.spacing.md,
    padding: Layout.spacing.md,
  },
  deviceHeader: {
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
  deviceDetails: {
    flex: 1,
  },
  deviceName: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  deviceLocation: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.borderLight,
    marginVertical: Layout.spacing.md,
  },
  deviceFooter: {
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
  viewDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewDetails: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.primary,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: Layout.spacing.xxl * 2,
  },
  emptyTitle: {
    fontSize: Layout.fontSize.xl,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: Layout.spacing.xs,
    marginTop: Layout.spacing.lg,
  },
  emptyText: {
    fontSize: Layout.fontSize.md,
    color: Colors.light.textSecondary,
    textAlign: "center",
    paddingHorizontal: Layout.spacing.xl,
  },
});
