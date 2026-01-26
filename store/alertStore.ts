// store/alertStore.ts
import { Alert } from "@/types/alert.types";
import { create } from "zustand";

interface AlertState {
  alerts: Alert[];
  unreadCount: number;
  loading: boolean;
  error: string | null;

  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  markAsRead: (alertId: string) => void;
  markAllAsRead: () => void;
  removeAlert: (alertId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  alerts: [],
  unreadCount: 0,
  loading: false,
  error: null,

  setAlerts: (alerts) =>
    set({
      alerts,
      unreadCount: alerts.filter((a) => !a.is_read).length,
      error: null,
    }),

  addAlert: (alert) =>
    set((state) => {
      const newAlerts = [alert, ...state.alerts];
      return {
        alerts: newAlerts,
        unreadCount: newAlerts.filter((a) => !a.is_read).length,
        error: null,
      };
    }),

  markAsRead: (alertId) =>
    set((state) => {
      const newAlerts = state.alerts.map((a) =>
        a.id === alertId ? { ...a, is_read: true } : a,
      );
      return {
        alerts: newAlerts,
        unreadCount: newAlerts.filter((a) => !a.is_read).length,
        error: null,
      };
    }),

  markAllAsRead: () =>
    set((state) => ({
      alerts: state.alerts.map((a) => ({ ...a, is_read: true })),
      unreadCount: 0,
      error: null,
    })),

  removeAlert: (alertId) =>
    set((state) => {
      const newAlerts = state.alerts.filter((a) => a.id !== alertId);
      return {
        alerts: newAlerts,
        unreadCount: newAlerts.filter((a) => !a.is_read).length,
        error: null,
      };
    }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),
}));
