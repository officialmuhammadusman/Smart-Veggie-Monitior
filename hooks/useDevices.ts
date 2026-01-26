// hooks/useDevices.ts
import { Config } from "@/constants/Config";
import { devicesService } from "@/services/supabase/devices";
import { useAuthStore } from "@/store/authStore";
import { useDeviceStore } from "@/store/deviceStore";
import { Device, DeviceWithReading, SensorReading } from "@/types/device.types";
import { MOCK_DEVICES, MOCK_SENSOR_READINGS } from "@/utils/mockData";
import { useCallback, useEffect, useState } from "react";

export function useDevices() {
  const { user } = useAuthStore();
  const {
    devices,
    setDevices,
    addDevice: addDeviceToStore,
    updateDevice: updateDeviceInStore,
    removeDevice: removeDeviceFromStore,
    setLoading,
    setError,
    loading,
    error,
  } = useDeviceStore();

  const [refreshing, setRefreshing] = useState(false);

  // Fetch all devices
  const fetchDevices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Use mock data if configured
      if (Config.dev.mockData) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
        setDevices(MOCK_DEVICES);
        return;
      }

      // Fetch from Supabase
      if (!user?.id) {
        setDevices([]);
        return;
      }

      const data = await devicesService.getDevices(user.id);
      setDevices(data);
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error("Error fetching devices:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.id, setDevices, setLoading, setError]);

  // Fetch single device
  const getDeviceById = useCallback(
    (id: string): Device | undefined => {
      return devices.find((d) => d.id === id);
    },
    [devices],
  );

  // Get latest reading for device
  const getLatestReading = useCallback(
    (deviceId: string): SensorReading | undefined => {
      // Use mock data if configured
      if (Config.dev.mockData) {
        return MOCK_SENSOR_READINGS.find((r) => r.device_id === deviceId);
      }

      // In production, this would fetch from Supabase
      // For now, return undefined when not using mock data
      return undefined;
    },
    [],
  );

  // Get device with latest reading
  const getDeviceWithReading = useCallback(
    async (deviceId: string): Promise<DeviceWithReading | null> => {
      try {
        const device = getDeviceById(deviceId);
        if (!device) return null;

        if (Config.dev.mockData) {
          const reading = getLatestReading(deviceId);
          return { ...device, latest_reading: reading };
        }

        // Fetch latest reading from Supabase
        const reading = await devicesService.getLatestReading(deviceId);
        return { ...device, latest_reading: reading };
      } catch (err) {
        console.error("Error getting device with reading:", err);
        return null;
      }
    },
    [getDeviceById, getLatestReading],
  );

  // Add new device
  const addDevice = useCallback(
    async (deviceInput: Omit<Device, "id" | "created_at" | "updated_at">) => {
      try {
        setLoading(true);
        setError(null);

        if (Config.dev.mockData) {
          // Mock add device
          const newDevice: Device = {
            ...deviceInput,
            id: Math.random().toString(36).substr(2, 9),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          addDeviceToStore(newDevice);
          return newDevice;
        }

        // Add to Supabase
        const newDevice = await devicesService.addDevice(deviceInput);
        addDeviceToStore(newDevice);
        return newDevice;
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        console.error("Error adding device:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [addDeviceToStore, setLoading, setError],
  );

  // Update device
  const updateDevice = useCallback(
    async (deviceId: string, updates: Partial<Device>) => {
      try {
        setLoading(true);
        setError(null);

        if (Config.dev.mockData) {
          // Mock update
          updateDeviceInStore(deviceId, updates);
          return;
        }

        // Update in Supabase
        await devicesService.updateDevice(deviceId, updates);
        updateDeviceInStore(deviceId, updates);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        console.error("Error updating device:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [updateDeviceInStore, setLoading, setError],
  );

  // Delete device
  const deleteDevice = useCallback(
    async (deviceId: string) => {
      try {
        setLoading(true);
        setError(null);

        if (Config.dev.mockData) {
          // Mock delete
          removeDeviceFromStore(deviceId);
          return;
        }

        // Delete from Supabase
        await devicesService.deleteDevice(deviceId);
        removeDeviceFromStore(deviceId);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        console.error("Error deleting device:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [removeDeviceFromStore, setLoading, setError],
  );

  // Refresh devices (with loading indicator)
  const refetch = useCallback(async () => {
    setRefreshing(true);
    await fetchDevices();
    setRefreshing(false);
  }, [fetchDevices]);

  // Subscribe to real-time updates
  useEffect(() => {
    if (Config.dev.mockData || !user?.id) return;

    // Subscribe to device changes
    const subscription = devicesService.subscribeToDevices(
      user.id,
      (payload) => {
        console.log("Device change:", payload);
        // Refetch devices on change
        fetchDevices();
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [user?.id, fetchDevices]);

  // Initial fetch
  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  return {
    devices,
    loading,
    error,
    refreshing,
    getDeviceById,
    getLatestReading,
    getDeviceWithReading,
    addDevice,
    updateDevice,
    deleteDevice,
    refetch,
  };
}
