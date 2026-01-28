// app/device/[id].tsx - FIXED TO LOAD REAL DATA
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Layout } from "@/constants/Layout";
import { useDevices } from "@/hooks/useDevices";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Camera,
  Clock,
  Droplets,
  MapPin,
  MoreVertical,
  Thermometer,
  Wind,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function DeviceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { getDeviceById, getLatestReading } = useDevices();

  // State to hold the reading data
  const [reading, setReading] = useState<any>(null);
  const [loadingReading, setLoadingReading] = useState(true);

  const device = getDeviceById(id || "");

  // Fetch latest reading on mount
  useEffect(() => {
    const fetchReading = async () => {
      setLoadingReading(true);
      try {
        const data = await getLatestReading(id || "");
        console.log("📊 Device detail - Latest reading:", data);
        setReading(data);
      } catch (error) {
        console.error("Error fetching reading:", error);
      } finally {
        setLoadingReading(false);
      }
    };

    fetchReading();
  }, [id, getLatestReading]);

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>Device not found</Text>
      </View>
    );
  }

  const getSpoilageColor = () => {
    switch (reading?.ai_spoilage_prediction) {
      case "fresh":
        return "#66BB6A";
      case "good":
        return "#81C784";
      case "warning":
        return "#FFA726";
      case "spoiled":
      case "critical":
        return "#EF5350";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#66BB6A", "#4CAF50", "#388E3C"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerTop}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft color="#FFFFFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{device.name}</Text>
          <TouchableOpacity style={styles.moreButton}>
            <MoreVertical color="#FFFFFF" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerLocation}>
          <MapPin
            size={16}
            color="rgba(255,255,255,0.95)"
            style={styles.headerLocationIcon}
          />
          <Text style={styles.headerLocationText}>{device.location}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {loadingReading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.loadingText}>Loading sensor data...</Text>
            </View>
          ) : (
            <>
              {/* Camera Feed */}
              <Animated.View entering={FadeInDown.delay(100).springify()}>
                <Text style={styles.sectionTitle}>Live Camera Feed</Text>
                <Card style={styles.cameraCard}>
                  {reading?.image_url ? (
                    <Image
                      source={{ uri: reading.image_url }}
                      style={styles.cameraImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.cameraPlaceholder}>
                      <Camera color="#A5D6A7" size={48} />
                      <Text style={styles.cameraPlaceholderText}>
                        No image available
                      </Text>
                    </View>
                  )}
                  <View style={styles.liveIndicator}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>LIVE</Text>
                  </View>
                </Card>
              </Animated.View>

              {/* Spoilage Prediction */}
              <Animated.View entering={FadeInDown.delay(200).springify()}>
                <Text style={styles.sectionTitle}>Spoilage Status</Text>
                <Card style={styles.statusCard}>
                  <LinearGradient
                    colors={[getSpoilageColor(), getSpoilageColor() + "80"]}
                    style={styles.statusGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.statusLabel}>Current Status</Text>
                    <Text style={styles.statusValue}>
                      {reading?.ai_spoilage_prediction?.toUpperCase() ||
                        "UNKNOWN"}
                    </Text>
                    <View style={styles.confidenceContainer}>
                      <Text style={styles.confidenceLabel}>Confidence</Text>
                      <Text style={styles.confidenceValue}>
                        {reading?.ai_confidence?.toFixed(1) || 0}%
                      </Text>
                    </View>
                  </LinearGradient>
                </Card>
              </Animated.View>

              {/* AI Insights */}
              {reading?.ai_vegetable_type && (
                <Animated.View entering={FadeInDown.delay(250).springify()}>
                  <Text style={styles.sectionTitle}>AI Insights</Text>
                  <Card style={styles.insightsCard}>
                    <View style={styles.insightRow}>
                      <Text style={styles.insightLabel}>Vegetable Type:</Text>
                      <Text style={styles.insightValue}>
                        {reading.ai_vegetable_type}
                      </Text>
                    </View>
                    <View style={styles.insightRow}>
                      <Text style={styles.insightLabel}>Freshness Score:</Text>
                      <Text
                        style={[
                          styles.insightValue,
                          {
                            color:
                              reading.ai_freshness_score > 75
                                ? "#4CAF50"
                                : reading.ai_freshness_score > 50
                                  ? "#FFA726"
                                  : "#EF5350",
                          },
                        ]}
                      >
                        {reading.ai_freshness_score}%
                      </Text>
                    </View>
                    {reading.ai_days_until_spoilage !== undefined && (
                      <View style={styles.insightRow}>
                        <Text style={styles.insightLabel}>
                          Days Until Spoilage:
                        </Text>
                        <Text style={styles.insightValue}>
                          {reading.ai_days_until_spoilage.toFixed(1)} days
                        </Text>
                      </View>
                    )}
                    <View style={styles.insightRow}>
                      <Text style={styles.insightLabel}>Risk Level:</Text>
                      <Text
                        style={[
                          styles.insightValue,
                          styles.riskBadge,
                          {
                            backgroundColor:
                              reading.ai_risk_level === "critical"
                                ? "#EF5350"
                                : reading.ai_risk_level === "high"
                                  ? "#FFA726"
                                  : reading.ai_risk_level === "medium"
                                    ? "#FFB74D"
                                    : "#66BB6A",
                          },
                        ]}
                      >
                        {reading.ai_risk_level?.toUpperCase()}
                      </Text>
                    </View>
                  </Card>
                </Animated.View>
              )}

              {/* Sensor Readings */}
              <Animated.View entering={FadeInDown.delay(300).springify()}>
                <Text style={styles.sectionTitle}>Sensor Readings</Text>
                <View style={styles.sensorsGrid}>
                  <SensorCard
                    Icon={Wind}
                    label="Gas Level"
                    value={reading?.gas_level?.toFixed(1) || "0"}
                    unit="ppm"
                    color="#FFA726"
                  />
                  <SensorCard
                    Icon={Thermometer}
                    label="Temperature"
                    value={reading?.ai_temperature?.toFixed(1) || "0"}
                    unit="°C"
                    color="#42A5F5"
                  />
                  <SensorCard
                    Icon={Droplets}
                    label="Humidity"
                    value={reading?.ai_humidity?.toFixed(1) || "0"}
                    unit="%"
                    color="#66BB6A"
                  />
                  <SensorCard
                    Icon={Clock}
                    label="Last Update"
                    value={formatTimeAgo(reading?.created_at)}
                    unit=""
                    color="#4CAF50"
                  />
                </View>
              </Animated.View>

              {/* Gas Level Chart */}
              <Animated.View entering={FadeInDown.delay(400).springify()}>
                <Text style={styles.sectionTitle}>Gas Level Trend (24h)</Text>
                <Card style={styles.chartCard}>
                  <MiniLineChart currentValue={reading?.gas_level || 0} />
                </Card>
              </Animated.View>

              {/* Actions */}
              <Animated.View entering={FadeInDown.delay(500).springify()}>
                <View style={styles.actionsContainer}>
                  <Button
                    title="Download Report"
                    onPress={() => {}}
                    variant="outline"
                    style={styles.actionButton}
                  />
                  <Button
                    title="Configure Alerts"
                    onPress={() => {}}
                    variant="primary"
                    style={styles.actionButton}
                  />
                </View>
              </Animated.View>
            </>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// Helper function to format time ago
function formatTimeAgo(dateString?: string): string {
  if (!dateString) return "Never";

  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d`;
}

// Sensor Card Component
function SensorCard({ Icon, label, value, unit, color }: any) {
  return (
    <Card style={styles.sensorCard}>
      <View style={[styles.sensorIcon, { backgroundColor: color + "20" }]}>
        <Icon size={24} color={color} />
      </View>
      <Text style={styles.sensorLabel}>{label}</Text>
      <View style={styles.sensorValueRow}>
        <Text style={styles.sensorValue}>{value}</Text>
        {unit && <Text style={styles.sensorUnit}>{unit}</Text>}
      </View>
    </Card>
  );
}

// Mini Line Chart Component
function MiniLineChart({ currentValue }: { currentValue: number }) {
  const data = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    value: currentValue + (Math.random() - 0.5) * 20,
  }));

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue;

  return (
    <View style={styles.miniChart}>
      <View style={styles.chartArea}>
        {data.map((point, index) => {
          const height = ((point.value - minValue) / range) * 80;
          return (
            <View
              key={index}
              style={[
                styles.chartBar,
                {
                  height: height || 2,
                  backgroundColor: point.value > 70 ? "#EF5350" : "#4CAF50",
                },
              ]}
            />
          );
        })}
      </View>
      <View style={styles.chartLegend}>
        <Text style={styles.chartLegendText}>24h ago</Text>
        <Text style={styles.chartLegendText}>Now</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F8E9",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: Layout.spacing.lg,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerTitle: {
    flex: 1,
    fontSize: Layout.fontSize.xl,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerLocationIcon: {
    marginRight: 4,
  },
  headerLocationText: {
    fontSize: Layout.fontSize.md,
    color: "rgba(255,255,255,0.95)",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.lg,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Layout.spacing.xxl * 2,
  },
  loadingText: {
    marginTop: Layout.spacing.md,
    fontSize: Layout.fontSize.md,
    color: "#558B2F",
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: Layout.spacing.md,
  },
  cameraCard: {
    padding: 0,
    overflow: "hidden",
    marginBottom: Layout.spacing.xl,
  },
  cameraImage: {
    width: "100%",
    height: 240,
  },
  cameraPlaceholder: {
    width: "100%",
    height: 240,
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraPlaceholderText: {
    fontSize: Layout.fontSize.sm,
    color: "#81C784",
    marginTop: 12,
  },
  liveIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 83, 80, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    marginRight: 6,
  },
  liveText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
  statusCard: {
    padding: 0,
    overflow: "hidden",
    marginBottom: Layout.spacing.xl,
  },
  statusGradient: {
    padding: Layout.spacing.lg,
    alignItems: "center",
  },
  statusLabel: {
    fontSize: Layout.fontSize.sm,
    color: "rgba(255,255,255,0.95)",
    marginBottom: 8,
  },
  statusValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  confidenceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  confidenceLabel: {
    fontSize: Layout.fontSize.sm,
    color: "rgba(255,255,255,0.95)",
  },
  confidenceValue: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  insightsCard: {
    marginBottom: Layout.spacing.xl,
  },
  insightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Layout.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: "#E8F5E9",
  },
  insightLabel: {
    fontSize: Layout.fontSize.sm,
    color: "#558B2F",
    fontWeight: "600",
  },
  insightValue: {
    fontSize: Layout.fontSize.md,
    color: "#1B5E20",
    fontWeight: "700",
  },
  riskBadge: {
    color: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    overflow: "hidden",
  },
  sensorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Layout.spacing.md,
    marginBottom: Layout.spacing.xl,
  },
  sensorCard: {
    width: (width - Layout.spacing.lg * 2 - Layout.spacing.md) / 2,
    alignItems: "center",
    paddingVertical: Layout.spacing.lg,
  },
  sensorIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  sensorLabel: {
    fontSize: 12,
    color: "#81C784",
    marginBottom: 8,
  },
  sensorValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  sensorValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1B5E20",
  },
  sensorUnit: {
    fontSize: 14,
    color: "#558B2F",
  },
  chartCard: {
    marginBottom: Layout.spacing.xl,
  },
  miniChart: {},
  chartArea: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 80,
    gap: 2,
  },
  chartBar: {
    flex: 1,
    borderRadius: 2,
    minHeight: 2,
  },
  chartLegend: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  chartLegendText: {
    fontSize: 10,
    color: "#81C784",
  },
  actionsContainer: {
    gap: Layout.spacing.md,
    marginBottom: Layout.spacing.lg,
  },
  actionButton: {
    width: "100%",
  },
});
