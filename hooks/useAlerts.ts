import { Alert } from "@/types/alert.types";
import { MOCK_ALERTS } from "@/utils/mockData";
import { useEffect, useState } from "react";

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setAlerts(MOCK_ALERTS);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    } finally {
      setLoading(false);
    }
  };

  const unreadCount = alerts.filter((a) => !a.is_read).length;

  const markAsRead = async (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, is_read: true } : a)),
    );
  };

  return {
    alerts,
    loading,
    unreadCount,
    markAsRead,
    refetch: fetchAlerts,
  };
}
