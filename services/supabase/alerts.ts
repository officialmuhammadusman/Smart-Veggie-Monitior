// services/supabase/alerts.ts
import { Alert } from "@/types/alert.types";
import { supabase } from "./client";

export const alertsService = {
  // Get all alerts for user
  getAlerts: async (userId: string) => {
    const { data, error } = await supabase
      .from("alerts")
      .select(
        `
        *,
        device:devices(*)
      `,
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data as Alert[];
  },

  // Get unread alerts count
  getUnreadCount: async (userId: string) => {
    const { count, error } = await supabase
      .from("alerts")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_read", false);

    if (error) throw error;
    return count || 0;
  },

  // Mark alert as read
  markAsRead: async (alertId: string) => {
    const { error } = await supabase
      .from("alerts")
      .update({ is_read: true } as any)
      .eq("id", alertId);

    if (error) throw error;
  },

  // Mark all alerts as read
  markAllAsRead: async (userId: string) => {
    const { error } = await supabase
      .from("alerts")
      .update({ is_read: true } as any)
      .eq("user_id", userId)
      .eq("is_read", false);

    if (error) throw error;
  },

  // Create new alert
  createAlert: async (alert: Omit<Alert, "id" | "created_at" | "is_read">) => {
    const { data, error } = await supabase
      .from("alerts")
      .insert(alert as any)
      .select()
      .single();

    if (error) throw error;
    return data as Alert;
  },

  // Subscribe to new alerts
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

  // Delete alert
  deleteAlert: async (alertId: string) => {
    const { error } = await supabase.from("alerts").delete().eq("id", alertId);

    if (error) throw error;
  },
};
