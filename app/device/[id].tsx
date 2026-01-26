// app/device/[id].tsx
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/Colors";
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
import React from "react";
import {
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

  const device = getDeviceById(id || "");
  const reading = getLatestReading(id || "");

  if (!device) {
    return (
      <View style={styles.container}>
        <Text>Device not found</Text>
      </View>
    );
  }

  const getSpoilageColor = () => {
    switch (reading?.spoilage_prediction) {
      case "fresh":
        return Colors.light.fresh;
      case "good":
        return Colors.light.good;
      case "warning":
        return Colors.light.caution;
      case "spoiled":
        return Colors.light.spoiled;
      default:
        return Colors.light.textTertiary;
    }
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
            color="rgba(255,255,255,0.9)"
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
                  <Camera color={Colors.light.textTertiary} size={48} />
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
                  {reading?.spoilage_prediction?.toUpperCase() || "UNKNOWN"}
                </Text>
                <View style={styles.confidenceContainer}>
                  <Text style={styles.confidenceLabel}>Confidence</Text>
                  <Text style={styles.confidenceValue}>
                    {reading?.confidence?.toFixed(1) || 0}%
                  </Text>
                </View>
              </LinearGradient>
            </Card>
          </Animated.View>

          {/* Sensor Readings */}
          <Animated.View entering={FadeInDown.delay(300).springify()}>
            <Text style={styles.sectionTitle}>Sensor Readings</Text>
            <View style={styles.sensorsGrid}>
              <SensorCard
                Icon={Wind}
                label="Gas Level"
                value={reading?.gas_level?.toFixed(1) || "0"}
                unit="ppm"
                color={Colors.light.warning}
              />
              <SensorCard
                Icon={Thermometer}
                label="Temperature"
                value={reading?.temperature?.toFixed(1) || "0"}
                unit="°C"
                color={Colors.light.info}
              />
              <SensorCard
                Icon={Droplets}
                label="Humidity"
                value={reading?.humidity?.toFixed(1) || "0"}
                unit="%"
                color={Colors.light.secondary}
              />
              <SensorCard
                Icon={Clock}
                label="Last Update"
                value="2m"
                unit="ago"
                color={Colors.light.primary}
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
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
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
        <Text style={styles.sensorUnit}>{unit}</Text>
      </View>
    </Card>
  );
}

// Mini Line Chart Component
function MiniLineChart({ currentValue }: { currentValue: number }) {
  // Generate mock historical data
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
                  backgroundColor:
                    point.value > 70
                      ? Colors.light.danger
                      : Colors.light.primary,
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
    backgroundColor: Colors.light.backgroundSecondary,
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
    backgroundColor: "rgba(255,255,255,0.2)",
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
    backgroundColor: "rgba(255,255,255,0.2)",
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
    color: "rgba(255,255,255,0.9)",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.lg,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "700",
    color: Colors.light.text,
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
    backgroundColor: Colors.light.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraPlaceholderText: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.textTertiary,
  },
  liveIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.9)",
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
    color: "rgba(255,255,255,0.9)",
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
    color: "rgba(255,255,255,0.9)",
  },
  confidenceValue: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "700",
    color: "#FFFFFF",
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
    color: Colors.light.textTertiary,
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
    color: Colors.light.text,
  },
  sensorUnit: {
    fontSize: 14,
    color: Colors.light.textSecondary,
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
    color: Colors.light.textTertiary,
  },
  actionsContainer: {
    gap: Layout.spacing.md,
    marginBottom: Layout.spacing.lg,
  },
  actionButton: {
    width: "100%",
  },
});
