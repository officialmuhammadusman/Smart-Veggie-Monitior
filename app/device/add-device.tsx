// app/device/add-device.tsx
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ArrowLeft, Lightbulb, MapPin } from "lucide-react-native";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function AddDeviceScreen() {
  const router = useRouter();
  const [deviceName, setDeviceName] = useState("");
  const [location, setLocation] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddDevice = async () => {
    // Validation
    if (!deviceName || !location || !deviceId) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      // TODO: Add device to Supabase
      await new Promise((resolve) => setTimeout(resolve, 1500));

      Alert.alert("Success", "Device added successfully!", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    } catch {
      Alert.alert("Error", "Failed to add device");
    } finally {
      setLoading(false);
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
          <Text style={styles.headerTitle}>Add New Device</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Instructions */}
          <Animated.View entering={FadeInDown.delay(100).springify()}>
            <Card style={styles.instructionCard}>
              <Lightbulb color={Colors.light.primary} size={48} />
              <Text style={styles.instructionTitle}>Setup Instructions</Text>
              <Text style={styles.instructionText}>
                1. Power on your ESP32-CAM device{"\n"}
                2. Connect it to WiFi{"\n"}
                3. Note the Device ID from the display{"\n"}
                4. Fill in the details below
              </Text>
            </Card>
          </Animated.View>

          {/* Form */}
          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <Text style={styles.sectionTitle}>Device Information</Text>

            <Card style={styles.formCard}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Device Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Storage Room A"
                  value={deviceName}
                  onChangeText={setDeviceName}
                  placeholderTextColor={Colors.light.textTertiary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Location *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Main Warehouse"
                  value={location}
                  onChangeText={setLocation}
                  placeholderTextColor={Colors.light.textTertiary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Device ID *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter ESP32-CAM Device ID"
                  value={deviceId}
                  onChangeText={setDeviceId}
                  autoCapitalize="characters"
                  placeholderTextColor={Colors.light.textTertiary}
                />
                <Text style={styles.helperText}>
                  Find this on your ESP32-CAM display
                </Text>
              </View>
            </Card>
          </Animated.View>

          {/* Device Preview */}
          <Animated.View entering={FadeInDown.delay(300).springify()}>
            <Text style={styles.sectionTitle}>Preview</Text>
            <Card style={styles.previewCard}>
              <View style={styles.previewHeader}>
                <View style={styles.statusDot} />
                <View style={styles.previewInfo}>
                  <Text style={styles.previewName}>
                    {deviceName || "Device Name"}
                  </Text>
                  <View style={styles.previewLocationContainer}>
                    <MapPin size={16} color={Colors.light.textSecondary} />
                    <Text style={styles.previewLocation}>
                      {location || "Location"}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.previewDivider} />
              <View style={styles.previewFooter}>
                <Text style={styles.previewLabel}>Device ID</Text>
                <Text style={styles.previewValue}>
                  {deviceId || "XXXX-XXXX-XXXX"}
                </Text>
              </View>
            </Card>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View entering={FadeInDown.delay(400).springify()}>
            <Button
              title="Add Device"
              onPress={handleAddDevice}
              loading={loading}
              style={styles.addButton}
            />
            <Button
              title="Cancel"
              onPress={() => router.back()}
              variant="outline"
              style={styles.cancelButton}
            />
          </Animated.View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.lg,
  },
  instructionCard: {
    backgroundColor: Colors.light.primaryLight,
    borderColor: Colors.light.primary,
    marginBottom: Layout.spacing.xl,
    alignItems: "center",
  },
  instructionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: Layout.spacing.sm,
  },
  instructionText: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.textSecondary,
    lineHeight: 22,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: Layout.spacing.md,
  },
  formCard: {
    marginBottom: Layout.spacing.xl,
  },
  inputGroup: {
    marginBottom: Layout.spacing.md,
  },
  label: {
    fontSize: Layout.fontSize.sm,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: Layout.spacing.xs,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: Colors.light.border,
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
    fontSize: Layout.fontSize.md,
    backgroundColor: "#FFFFFF",
    color: Colors.light.text,
  },
  helperText: {
    fontSize: 12,
    color: Colors.light.textTertiary,
    marginTop: 4,
  },
  previewCard: {
    marginBottom: Layout.spacing.xl,
  },
  previewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Layout.spacing.md,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.light.textTertiary,
    marginRight: Layout.spacing.sm,
  },
  previewInfo: {
    flex: 1,
  },
  previewName: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
  },
  previewLocationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  previewLocation: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.textSecondary,
    marginLeft: 4,
  },
  previewDivider: {
    height: 1,
    backgroundColor: Colors.light.borderLight,
    marginVertical: Layout.spacing.md,
  },
  previewFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  previewLabel: {
    fontSize: 12,
    color: Colors.light.textTertiary,
  },
  previewValue: {
    fontSize: Layout.fontSize.sm,
    fontWeight: "600",
    color: Colors.light.text,
  },
  addButton: {
    marginBottom: Layout.spacing.md,
  },
  cancelButton: {},
});
