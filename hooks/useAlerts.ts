// hooks/useAlerts.ts - FRONTEND-ONLY ALERTS FROM SPOILAGE DATA
// Generates alerts from AI-enhanced readings, no database storage

import spoilageDataService from "@/services/supabase/spoilageData";
import { useAuthStore } from "@/store/authStore";
import { useCallback, useEffect, useState } from "react";

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

export function useAlerts() {
  const { user } = useAuthStore();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Generate alerts from spoilage data (frontend only)
   */
  const checkForNewAlerts = useCallback(async () => {
    if (!user?.id) {
      setAlerts([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Generate alerts from spoilage data
      const generatedAlerts =
        await spoilageDataService.generateAlertsForFrontend(user.id);

      console.log(`🚨 Generated ${generatedAlerts.length} alerts for display`);

      // Sort by severity and date
      const sortedAlerts = generatedAlerts.sort((a, b) => {
        const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        const severityDiff =
          severityOrder[a.severity] - severityOrder[b.severity];

        if (severityDiff !== 0) return severityDiff;

        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });

      setAlerts(sortedAlerts);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error("❌ Error generating alerts:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  /**
   * Check critical conditions (for dashboard)
   */
  const checkCriticalAlerts = useCallback(async () => {
    if (!user?.id) return [];

    try {
      const criticalAlerts = await spoilageDataService.checkCriticalConditions(
        user.id,
      );

      console.log(`⚠️ Found ${criticalAlerts.length} critical alerts`);

      return criticalAlerts;
    } catch (err) {
      console.error("❌ Error checking critical alerts:", err);
      return [];
    }
  }, [user?.id]);

  /**
   * Mark alert as read (local state only)
   */
  const markAsRead = useCallback((alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, is_read: true } : alert,
      ),
    );
    console.log(`✅ Alert ${alertId} marked as read (local)`);
  }, []);

  /**
   * Mark all alerts as read (local state only)
   */
  const markAllAsRead = useCallback(() => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, is_read: true })));
    console.log("✅ All alerts marked as read (local)");
  }, []);

  /**
   * Dismiss alert (remove from local state)
   */
  const dismissAlert = useCallback((alertId: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== alertId));
    console.log(`🗑️ Alert ${alertId} dismissed (local)`);
  }, []);

  /**
   * Clear all alerts (local state only)
   */
  const clearAllAlerts = useCallback(() => {
    setAlerts([]);
    console.log("🗑️ All alerts cleared (local)");
  }, []);

  /**
   * Get unread count
   */
  const unreadCount = alerts.filter((alert) => !alert.is_read).length;

  /**
   * Get alerts by severity
   */
  const getAlertsBySeverity = useCallback(
    (severity: Alert["severity"]) => {
      return alerts.filter((alert) => alert.severity === severity);
    },
    [alerts],
  );

  /**
   * Get alerts by type
   */
  const getAlertsByType = useCallback(
    (type: Alert["alert_type"]) => {
      return alerts.filter((alert) => alert.alert_type === type);
    },
    [alerts],
  );

  /**
   * Refresh alerts
   */
  const refetch = useCallback(async () => {
    await checkForNewAlerts();
  }, [checkForNewAlerts]);

  /**
   * Auto-fetch alerts on mount and when user changes
   */
  useEffect(() => {
    checkForNewAlerts();
  }, [checkForNewAlerts]);

  /**
   * Subscribe to real-time spoilage data changes
   */
  useEffect(() => {
    if (!user?.id) return;

    const subscription = spoilageDataService.subscribeToSpoilageData(
      "virtual-device-001",
      user.id,
      async (reading, newAlerts) => {
        console.log("🔔 New reading received, checking for alerts...");

        if (newAlerts && newAlerts.length > 0) {
          // Add new alerts to the beginning
          setAlerts((prev) => [...newAlerts, ...prev]);
          console.log(`🚨 ${newAlerts.length} new alerts added`);
        }
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [user?.id]);

  return {
    alerts,
    loading,
    error,
    unreadCount,
    checkForNewAlerts,
    checkCriticalAlerts,
    markAsRead,
    markAllAsRead,
    dismissAlert,
    clearAllAlerts,
    getAlertsBySeverity,
    getAlertsByType,
    refetch,
  };
}

export default useAlerts;
