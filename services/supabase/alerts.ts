// // services/supabase/alerts.ts
// import { Alert } from "@/types/alert.types";
// import { supabase } from "./client";

// export const alertsService = {
//   // Get all alerts for user
//   getAlerts: async (userId: string) => {
//     const { data, error } = await supabase
//       .from("alerts")
//       .select(
//         `
//         *,
//         device:devices(*)
//       `,
//       )
//       .eq("user_id", userId)
//       .order("created_at", { ascending: false });

//     if (error) throw error;
//     return data as Alert[];
//   },

//   // Get unread alerts count
//   getUnreadCount: async (userId: string) => {
//     const { count, error } = await supabase
//       .from("alerts")
//       .select("*", { count: "exact", head: true })
//       .eq("user_id", userId)
//       .eq("is_read", false);

//     if (error) throw error;
//     return count || 0;
//   },

//   // Mark alert as read
//   markAsRead: async (alertId: string) => {
//     const { error } = await supabase
//       .from("alerts")
//       .update({ is_read: true } as any)
//       .eq("id", alertId);

//     if (error) throw error;
//   },

//   // Mark all alerts as read
//   markAllAsRead: async (userId: string) => {
//     const { error } = await supabase
//       .from("alerts")
//       .update({ is_read: true } as any)
//       .eq("user_id", userId)
//       .eq("is_read", false);

//     if (error) throw error;
//   },

//   // Create new alert
//   createAlert: async (alert: Omit<Alert, "id" | "created_at" | "is_read">) => {
//     const { data, error } = await supabase
//       .from("alerts")
//       .insert(alert as any)
//       .select()
//       .single();

//     if (error) throw error;
//     return data as Alert;
//   },

//   // Subscribe to new alerts
//   subscribeToAlerts: (userId: string, callback: (payload: any) => void) => {
//     return supabase
//       .channel("alerts_changes")
//       .on(
//         "postgres_changes",
//         {
//           event: "INSERT",
//           schema: "public",
//           table: "alerts",
//           filter: `user_id=eq.${userId}`,
//         },
//         callback,
//       )
//       .subscribe();
//   },

//   // Delete alert
//   deleteAlert: async (alertId: string) => {
//     const { error } = await supabase.from("alerts").delete().eq("id", alertId);

//     if (error) throw error;
//   },
// };

// services/supabase/alerts.ts
// 🔔 UPDATED - Now fetches AI-generated alerts based on real spoilage data

import { Alert } from "@/types/alert.types";
import { supabase } from "./client";
import spoilageDataService from "./spoilageData";

export const alertsService = {
  /**
   * 🆕 Get all alerts for user (combines stored + AI-generated)
   */
  getAlerts: async (userId: string): Promise<Alert[]> => {
    try {
      // Fetch stored alerts from database
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return (data as Alert[]) || [];
    } catch (err) {
      console.error("Error fetching alerts:", err);
      return [];
    }
  },

  /**
   * 🆕 Generate fresh alerts for all user devices
   * Checks latest spoilage data and creates new alerts
   */
  generateAlertsForAllDevices: async (
    userId: string,
    deviceIds: string[],
  ): Promise<Alert[]> => {
    const newAlerts: Alert[] = [];

    for (const deviceId of deviceIds) {
      try {
        // Check for new alerts based on latest spoilage data
        const alert = await spoilageDataService.checkAndGenerateAlerts(
          deviceId,
          userId,
        );

        if (alert) {
          newAlerts.push(alert);
        }
      } catch (err) {
        console.error(`Error generating alerts for device ${deviceId}:`, err);
      }
    }

    return newAlerts;
  },

  /**
   * 🆕 Get all alerts (stored + freshly generated)
   */
  getAllAlertsWithGenerated: async (
    userId: string,
    deviceIds: string[],
  ): Promise<Alert[]> => {
    try {
      // Get stored alerts
      const storedAlerts = await alertsService.getAlerts(userId);

      // Generate new alerts from latest spoilage data
      const generatedAlerts = await alertsService.generateAlertsForAllDevices(
        userId,
        deviceIds,
      );

      // Combine and sort by created_at
      const allAlerts = [...storedAlerts, ...generatedAlerts].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );

      // Remove duplicates (same message within 1 hour)
      const uniqueAlerts = allAlerts.filter(
        (alert, index, self) =>
          index ===
          self.findIndex(
            (a) =>
              a.message === alert.message &&
              Math.abs(
                new Date(a.created_at).getTime() -
                  new Date(alert.created_at).getTime(),
              ) < 3600000, // 1 hour
          ),
      );

      return uniqueAlerts;
    } catch (err) {
      console.error("Error getting all alerts:", err);
      return [];
    }
  },

  /**
   * Get unread alerts count
   */
  getUnreadCount: async (userId: string): Promise<number> => {
    try {
      const { count, error } = await supabase
        .from("alerts")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("is_read", false);

      if (error) throw error;
      return count || 0;
    } catch (err) {
      console.error("Error getting unread count:", err);
      return 0;
    }
  },

  /**
   * Mark alert as read
   */
  markAsRead: async (alertId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from("alerts")
        .update({ is_read: true } as any)
        .eq("id", alertId);

      if (error) throw error;
    } catch (err) {
      console.error("Error marking alert as read:", err);
    }
  },

  /**
   * Mark all alerts as read
   */
  markAllAsRead: async (userId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from("alerts")
        .update({ is_read: true } as any)
        .eq("user_id", userId)
        .eq("is_read", false);

      if (error) throw error;
    } catch (err) {
      console.error("Error marking all alerts as read:", err);
    }
  },

  /**
   * Create new alert (used internally by AI engine)
   */
  createAlert: async (
    alert: Omit<Alert, "id" | "created_at" | "is_read">,
  ): Promise<Alert | null> => {
    try {
      const { data, error } = await supabase
        .from("alerts")
        .insert(alert as any)
        .select()
        .single();

      if (error) throw error;
      return data as Alert;
    } catch (err) {
      console.error("Error creating alert:", err);
      return null;
    }
  },

  /**
   * Subscribe to new alerts (real-time)
   */
  subscribeToAlerts: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel("alerts_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "alerts",
          filter: `user_id=eq.${userId}`,
        },
        callback,
      )
      .subscribe();
  },

  /**
   * Delete alert
   */
  deleteAlert: async (alertId: string): Promise<void> => {
    try {
      const { error } = await supabase
        .from("alerts")
        .delete()
        .eq("id", alertId);

      if (error) throw error;
    } catch (err) {
      console.error("Error deleting alert:", err);
    }
  },

  /**
   * 🆕 Delete old alerts (older than 7 days)
   */
  deleteOldAlerts: async (userId: string, daysToKeep: number = 7) => {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

      const { error } = await supabase
        .from("alerts")
        .delete()
        .eq("user_id", userId)
        .lt("created_at", cutoffDate.toISOString());

      if (error) throw error;
    } catch (err) {
      console.error("Error deleting old alerts:", err);
    }
  },
};

export default alertsService;
