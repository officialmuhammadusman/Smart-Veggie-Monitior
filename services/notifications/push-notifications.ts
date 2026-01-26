// services/notifications/push-notifications.ts
import { Alert, AlertSeverity } from "@/types/alert.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const pushNotificationService = {
  // Request permissions
  requestPermissions: async (): Promise<boolean> => {
    try {
      if (!Device.isDevice) {
        console.log("Must use physical device for Push Notifications");
        return false;
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        console.log("Failed to get push token for push notification!");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error requesting notification permissions:", error);
      return false;
    }
  },

  // Get push token
  getPushToken: async (): Promise<string | null> => {
    try {
      const hasPermission = await pushNotificationService.requestPermissions();
      if (!hasPermission) return null;

      const token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
        })
      ).data;

      // Save token to storage
      await AsyncStorage.setItem("pushToken", token);

      // Configure for Android
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#10B981",
        });
      }

      return token;
    } catch (error) {
      console.error("Error getting push token:", error);
      return null;
    }
  },

  // Schedule local notification
  scheduleLocalNotification: async (
    title: string,
    body: string,
    data?: any,
  ): Promise<string | null> => {
    try {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: null, // Show immediately
      });

      return id;
    } catch (error) {
      console.error("Error scheduling notification:", error);
      return null;
    }
  },

  // Send alert notification
  sendAlertNotification: async (alert: Alert): Promise<void> => {
    try {
      const hasPermission = await pushNotificationService.requestPermissions();
      if (!hasPermission) return;

      // Get notification icon based on severity
      const getIcon = (severity: AlertSeverity): string => {
        switch (severity) {
          case "critical":
            return "🚨";
          case "high":
            return "⚠️";
          case "medium":
            return "⚡";
          default:
            return "ℹ️";
        }
      };

      const icon = getIcon(alert.severity);
      const title = `${icon} ${alert.severity.toUpperCase()} Alert`;

      await pushNotificationService.scheduleLocalNotification(
        title,
        alert.message,
        {
          alertId: alert.id,
          deviceId: alert.device_id,
          severity: alert.severity,
        },
      );
    } catch (error) {
      console.error("Error sending alert notification:", error);
    }
  },

  // Cancel notification
  cancelNotification: async (notificationId: string): Promise<void> => {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch (error) {
      console.error("Error canceling notification:", error);
    }
  },

  // Cancel all notifications
  cancelAllNotifications: async (): Promise<void> => {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
    } catch (error) {
      console.error("Error canceling all notifications:", error);
    }
  },

  // Get badge count
  getBadgeCount: async (): Promise<number> => {
    try {
      return await Notifications.getBadgeCountAsync();
    } catch (error) {
      console.error("Error getting badge count:", error);
      return 0;
    }
  },

  // Set badge count
  setBadgeCount: async (count: number): Promise<void> => {
    try {
      await Notifications.setBadgeCountAsync(count);
    } catch (error) {
      console.error("Error setting badge count:", error);
    }
  },

  // Add notification received listener
  addNotificationReceivedListener: (
    callback: (notification: Notifications.Notification) => void,
  ) => {
    return Notifications.addNotificationReceivedListener(callback);
  },

  // Add notification response listener (when user taps notification)
  addNotificationResponseListener: (
    callback: (response: Notifications.NotificationResponse) => void,
  ) => {
    return Notifications.addNotificationResponseReceivedListener(callback);
  },

  // Remove listeners
  removeNotificationListeners: (
    subscription: Notifications.Subscription,
  ): void => {
    subscription.remove();
  },

  // Check if notifications are enabled
  areNotificationsEnabled: async (): Promise<boolean> => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      return status === "granted";
    } catch (error) {
      console.error("Error checking notification status:", error);
      return false;
    }
  },

  // Send spoilage detection notification
  sendSpoilageNotification: async (
    deviceName: string,
    spoilageLevel: string,
    confidence: number,
  ): Promise<void> => {
    await pushNotificationService.scheduleLocalNotification(
      "🥬 Spoilage Detected!",
      `${deviceName}: ${spoilageLevel} spoilage detected (${confidence.toFixed(1)}% confidence)`,
      {
        type: "spoilage_detection",
        deviceName,
        spoilageLevel,
        confidence,
      },
    );
  },

  // Send gas level warning
  sendGasLevelWarning: async (
    deviceName: string,
    gasLevel: number,
    threshold: number,
  ): Promise<void> => {
    await pushNotificationService.scheduleLocalNotification(
      "💨 High Gas Level Warning",
      `${deviceName}: Gas level at ${gasLevel.toFixed(1)} ppm (threshold: ${threshold} ppm)`,
      {
        type: "gas_level_warning",
        deviceName,
        gasLevel,
        threshold,
      },
    );
  },

  // Send device offline notification
  sendDeviceOfflineNotification: async (deviceName: string): Promise<void> => {
    await pushNotificationService.scheduleLocalNotification(
      "📱 Device Offline",
      `${deviceName} has gone offline. Check your device connection.`,
      {
        type: "device_offline",
        deviceName,
      },
    );
  },
};
