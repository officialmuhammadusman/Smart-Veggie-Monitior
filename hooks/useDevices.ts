// // // hooks/useDevices.ts
// // import { Config } from "@/constants/Config";
// // import { devicesService } from "@/services/supabase/devices";
// // import { useAuthStore } from "@/store/authStore";
// // import { useDeviceStore } from "@/store/deviceStore";
// // import { Device, DeviceWithReading, SensorReading } from "@/types/device.types";
// // import { MOCK_DEVICES, MOCK_SENSOR_READINGS } from "@/utils/mockData";
// // import { useCallback, useEffect, useState } from "react";

// // export function useDevices() {
// //   const { user } = useAuthStore();
// //   const {
// //     devices,
// //     setDevices,
// //     addDevice: addDeviceToStore,
// //     updateDevice: updateDeviceInStore,
// //     removeDevice: removeDeviceFromStore,
// //     setLoading,
// //     setError,
// //     loading,
// //     error,
// //   } = useDeviceStore();

// //   const [refreshing, setRefreshing] = useState(false);

// //   // Fetch all devices
// //   const fetchDevices = useCallback(async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);

// //       // Use mock data if configured
// //       if (Config.dev.mockData) {
// //         await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
// //         setDevices(MOCK_DEVICES);
// //         return;
// //       }

// //       // Fetch from Supabase
// //       if (!user?.id) {
// //         setDevices([]);
// //         return;
// //       }

// //       const data = await devicesService.getDevices(user.id);
// //       setDevices(data);
// //     } catch (err) {
// //       const error = err as Error;
// //       setError(error.message);
// //       console.error("Error fetching devices:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [user?.id, setDevices, setLoading, setError]);

// //   // Fetch single device
// //   const getDeviceById = useCallback(
// //     (id: string): Device | undefined => {
// //       return devices.find((d) => d.id === id);
// //     },
// //     [devices],
// //   );

// //   // Get latest reading for device
// //   const getLatestReading = useCallback(
// //     (deviceId: string): SensorReading | undefined => {
// //       // Use mock data if configured
// //       if (Config.dev.mockData) {
// //         return MOCK_SENSOR_READINGS.find((r) => r.device_id === deviceId);
// //       }

// //       // In production, this would fetch from Supabase
// //       // For now, return undefined when not using mock data
// //       return undefined;
// //     },
// //     [],
// //   );

// //   // Get device with latest reading
// //   const getDeviceWithReading = useCallback(
// //     async (deviceId: string): Promise<DeviceWithReading | null> => {
// //       try {
// //         const device = getDeviceById(deviceId);
// //         if (!device) return null;

// //         if (Config.dev.mockData) {
// //           const reading = getLatestReading(deviceId);
// //           return { ...device, latest_reading: reading };
// //         }

// //         // Fetch latest reading from Supabase
// //         const reading = await devicesService.getLatestReading(deviceId);
// //         return { ...device, latest_reading: reading };
// //       } catch (err) {
// //         console.error("Error getting device with reading:", err);
// //         return null;
// //       }
// //     },
// //     [getDeviceById, getLatestReading],
// //   );

// //   // Add new device
// //   const addDevice = useCallback(
// //     async (deviceInput: Omit<Device, "id" | "created_at" | "updated_at">) => {
// //       try {
// //         setLoading(true);
// //         setError(null);

// //         if (Config.dev.mockData) {
// //           // Mock add device
// //           const newDevice: Device = {
// //             ...deviceInput,
// //             id: Math.random().toString(36).substr(2, 9),
// //             created_at: new Date().toISOString(),
// //             updated_at: new Date().toISOString(),
// //           };
// //           addDeviceToStore(newDevice);
// //           return newDevice;
// //         }

// //         // Add to Supabase
// //         const newDevice = await devicesService.addDevice(deviceInput);
// //         addDeviceToStore(newDevice);
// //         return newDevice;
// //       } catch (err) {
// //         const error = err as Error;
// //         setError(error.message);
// //         console.error("Error adding device:", error);
// //         throw error;
// //       } finally {
// //         setLoading(false);
// //       }
// //     },
// //     [addDeviceToStore, setLoading, setError],
// //   );

// //   // Update device
// //   const updateDevice = useCallback(
// //     async (deviceId: string, updates: Partial<Device>) => {
// //       try {
// //         setLoading(true);
// //         setError(null);

// //         if (Config.dev.mockData) {
// //           // Mock update
// //           updateDeviceInStore(deviceId, updates);
// //           return;
// //         }

// //         // Update in Supabase
// //         await devicesService.updateDevice(deviceId, updates);
// //         updateDeviceInStore(deviceId, updates);
// //       } catch (err) {
// //         const error = err as Error;
// //         setError(error.message);
// //         console.error("Error updating device:", error);
// //         throw error;
// //       } finally {
// //         setLoading(false);
// //       }
// //     },
// //     [updateDeviceInStore, setLoading, setError],
// //   );

// //   // Delete device
// //   const deleteDevice = useCallback(
// //     async (deviceId: string) => {
// //       try {
// //         setLoading(true);
// //         setError(null);

// //         if (Config.dev.mockData) {
// //           // Mock delete
// //           removeDeviceFromStore(deviceId);
// //           return;
// //         }

// //         // Delete from Supabase
// //         await devicesService.deleteDevice(deviceId);
// //         removeDeviceFromStore(deviceId);
// //       } catch (err) {
// //         const error = err as Error;
// //         setError(error.message);
// //         console.error("Error deleting device:", error);
// //         throw error;
// //       } finally {
// //         setLoading(false);
// //       }
// //     },
// //     [removeDeviceFromStore, setLoading, setError],
// //   );

// //   // Refresh devices (with loading indicator)
// //   const refetch = useCallback(async () => {
// //     setRefreshing(true);
// //     await fetchDevices();
// //     setRefreshing(false);
// //   }, [fetchDevices]);

// //   // Subscribe to real-time updates
// //   useEffect(() => {
// //     if (Config.dev.mockData || !user?.id) return;

// //     // Subscribe to device changes
// //     const subscription = devicesService.subscribeToDevices(
// //       user.id,
// //       (payload) => {
// //         console.log("Device change:", payload);
// //         // Refetch devices on change
// //         fetchDevices();
// //       },
// //     );

// //     return () => {
// //       subscription.unsubscribe();
// //     };
// //   }, [user?.id, fetchDevices]);

// //   // Initial fetch
// //   useEffect(() => {
// //     fetchDevices();
// //   }, [fetchDevices]);

// //   return {
// //     devices,
// //     loading,
// //     error,
// //     refreshing,
// //     getDeviceById,
// //     getLatestReading,
// //     getDeviceWithReading,
// //     addDevice,
// //     updateDevice,
// //     deleteDevice,
// //     refetch,
// //   };
// // }

// // hooks/useDevices.ts - UPDATED VERSION WITH AI INTEGRATION
// // 🚀 Seamlessly switches between mock data and real AI-enhanced data

// import { Config } from "@/constants/Config";
// import { devicesService } from "@/services/supabase/devices";
// import spoilageDataService from "@/services/supabase/spoilageData";
// import { useAuthStore } from "@/store/authStore";
// import { useDeviceStore } from "@/store/deviceStore";
// import { Device, DeviceWithReading, SensorReading } from "@/types/device.types";
// import { MOCK_DEVICES, MOCK_SENSOR_READINGS } from "@/utils/mockData";
// import { useCallback, useEffect, useState } from "react";

// export function useDevices() {
//   const { user } = useAuthStore();
//   const {
//     devices,
//     setDevices,
//     addDevice: addDeviceToStore,
//     updateDevice: updateDeviceInStore,
//     removeDevice: removeDeviceFromStore,
//     setLoading,
//     setError,
//     loading,
//     error,
//   } = useDeviceStore();

//   const [refreshing, setRefreshing] = useState(false);

//   // Fetch all devices
//   const fetchDevices = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       // Use mock data if configured
//       if (Config.dev.mockData) {
//         await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
//         setDevices(MOCK_DEVICES);
//         return;
//       }

//       // 🆕 Fetch from Supabase with real-time status sync
//       if (!user?.id) {
//         setDevices([]);
//         return;
//       }

//       const data = await devicesService.getDevices(user.id);

//       // 🆕 Sync each device status with latest spoilage data
//       const syncedDevices = await Promise.all(
//         data.map(async (device) => {
//           try {
//             const status = await spoilageDataService.getDeviceStatus(device.id);
//             const latestReading = await spoilageDataService.getLatestReading(
//               device.id,
//             );

//             return {
//               ...device,
//               status,
//               last_reading_at:
//                 latestReading?.created_at || device.last_reading_at,
//             };
//           } catch (err) {
//             console.error(`Error syncing device ${device.id}:`, err);
//             return device;
//           }
//         }),
//       );

//       setDevices(syncedDevices);
//     } catch (err) {
//       const error = err as Error;
//       setError(error.message);
//       console.error("Error fetching devices:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [user?.id, setDevices, setLoading, setError]);

//   // Fetch single device
//   const getDeviceById = useCallback(
//     (id: string): Device | undefined => {
//       return devices.find((d) => d.id === id);
//     },
//     [devices],
//   );

//   // 🆕 Get latest reading for device (with AI enhancement)
//   const getLatestReading = useCallback(
//     async (deviceId: string): Promise<SensorReading | undefined> => {
//       // Use mock data if configured
//       if (Config.dev.mockData) {
//         return MOCK_SENSOR_READINGS.find((r) => r.device_id === deviceId);
//       }

//       // 🆕 Fetch from spoilage_data with AI enhancement
//       try {
//         const reading = await spoilageDataService.getLatestReading(deviceId);
//         return reading || undefined;
//       } catch (err) {
//         console.error("Error getting latest reading:", err);
//         return undefined;
//       }
//     },
//     [],
//   );

//   // 🆕 Get device with latest AI-enhanced reading
//   const getDeviceWithReading = useCallback(
//     async (deviceId: string): Promise<DeviceWithReading | null> => {
//       try {
//         const device = getDeviceById(deviceId);
//         if (!device) return null;

//         if (Config.dev.mockData) {
//           const reading = await getLatestReading(deviceId);
//           return { ...device, latest_reading: reading };
//         }

//         // 🆕 Fetch latest AI-enhanced reading from spoilage_data
//         const reading = await spoilageDataService.getLatestReading(deviceId);
//         return { ...device, latest_reading: reading || undefined };
//       } catch (err) {
//         console.error("Error getting device with reading:", err);
//         return null;
//       }
//     },
//     [getDeviceById, getLatestReading],
//   );

//   // 🆕 Get readings history with AI enhancement
//   const getReadingsHistory = useCallback(
//     async (deviceId: string, limit: number = 100): Promise<SensorReading[]> => {
//       if (Config.dev.mockData) {
//         // Return mock historical data
//         return MOCK_SENSOR_READINGS.filter(
//           (r) => r.device_id === deviceId,
//         ).slice(0, limit);
//       }

//       // 🆕 Fetch from spoilage_data with AI enhancement
//       try {
//         return await spoilageDataService.getReadingsHistory(deviceId, limit);
//       } catch (err) {
//         console.error("Error getting readings history:", err);
//         return [];
//       }
//     },
//     [],
//   );

//   // 🆕 Get device statistics
//   const getDeviceStatistics = useCallback(async (deviceId: string) => {
//     if (Config.dev.mockData) {
//       return {
//         totalReadings: 156,
//         averageGasLevel: 45.2,
//         spoilageRate: 12.5,
//         freshCount: 136,
//         spoiledCount: 20,
//       };
//     }

//     try {
//       return await spoilageDataService.getStatistics(deviceId);
//     } catch (err) {
//       console.error("Error getting device statistics:", err);
//       return {
//         totalReadings: 0,
//         averageGasLevel: 0,
//         spoilageRate: 0,
//         freshCount: 0,
//         spoiledCount: 0,
//       };
//     }
//   }, []);

//   // Add new device
//   const addDevice = useCallback(
//     async (deviceInput: Omit<Device, "id" | "created_at" | "updated_at">) => {
//       try {
//         setLoading(true);
//         setError(null);

//         if (Config.dev.mockData) {
//           // Mock add device
//           const newDevice: Device = {
//             ...deviceInput,
//             id: Math.random().toString(36).substr(2, 9),
//             created_at: new Date().toISOString(),
//             updated_at: new Date().toISOString(),
//           };
//           addDeviceToStore(newDevice);
//           return newDevice;
//         }

//         // Add to Supabase
//         const newDevice = await devicesService.addDevice(deviceInput);
//         addDeviceToStore(newDevice);
//         return newDevice;
//       } catch (err) {
//         const error = err as Error;
//         setError(error.message);
//         console.error("Error adding device:", error);
//         throw error;
//       } finally {
//         setLoading(false);
//       }
//     },
//     [addDeviceToStore, setLoading, setError],
//   );

//   // Update device
//   const updateDevice = useCallback(
//     async (deviceId: string, updates: Partial<Device>) => {
//       try {
//         setLoading(true);
//         setError(null);

//         if (Config.dev.mockData) {
//           // Mock update
//           updateDeviceInStore(deviceId, updates);
//           return;
//         }

//         // Update in Supabase
//         await devicesService.updateDevice(deviceId, updates);
//         updateDeviceInStore(deviceId, updates);
//       } catch (err) {
//         const error = err as Error;
//         setError(error.message);
//         console.error("Error updating device:", error);
//         throw error;
//       } finally {
//         setLoading(false);
//       }
//     },
//     [updateDeviceInStore, setLoading, setError],
//   );

//   // Delete device
//   const deleteDevice = useCallback(
//     async (deviceId: string) => {
//       try {
//         setLoading(true);
//         setError(null);

//         if (Config.dev.mockData) {
//           // Mock delete
//           removeDeviceFromStore(deviceId);
//           return;
//         }

//         // Delete from Supabase
//         await devicesService.deleteDevice(deviceId);
//         removeDeviceFromStore(deviceId);
//       } catch (err) {
//         const error = err as Error;
//         setError(error.message);
//         console.error("Error deleting device:", error);
//         throw error;
//       } finally {
//         setLoading(false);
//       }
//     },
//     [removeDeviceFromStore, setLoading, setError],
//   );

//   // Refresh devices (with loading indicator)
//   const refetch = useCallback(async () => {
//     setRefreshing(true);
//     await fetchDevices();
//     setRefreshing(false);
//   }, [fetchDevices]);

//   // 🆕 Subscribe to real-time updates from spoilage_data
//   useEffect(() => {
//     if (Config.dev.mockData || !user?.id) return;

//     // Subscribe to device changes
//     const deviceSub = devicesService.subscribeToDevices(user.id, (payload) => {
//       console.log("Device change:", payload);
//       fetchDevices();
//     });

//     // 🆕 Subscribe to spoilage_data changes for all user's devices
//     const spoilageSubs = devices.map((device) =>
//       spoilageDataService.subscribeToSpoilageData(
//         device.id,
//         user.id,
//         async (reading) => {
//           console.log("New reading for device:", device.id, reading);

//           // Update device status
//           await devicesService.syncDeviceStatus(device.id);

//           // Check for alerts
//           await spoilageDataService.checkAndGenerateAlerts(device.id, user.id);

//           // Refresh devices to show updated status
//           fetchDevices();
//         },
//       ),
//     );

//     return () => {
//       deviceSub.unsubscribe();
//       spoilageSubs.forEach((sub) => sub.unsubscribe());
//     };
//   }, [user?.id, devices.length, fetchDevices]);

//   // Initial fetch
//   useEffect(() => {
//     fetchDevices();
//   }, [fetchDevices]);

//   return {
//     devices,
//     loading,
//     error,
//     refreshing,
//     getDeviceById,
//     getLatestReading,
//     getDeviceWithReading,
//     getReadingsHistory, // 🆕 New method
//     getDeviceStatistics, // 🆕 New method
//     addDevice,
//     updateDevice,
//     deleteDevice,
//     refetch,
//   };
// }

// export default useDevices;

// hooks/useDevices.ts - HYBRID SOLUTION
// Uses MOCK devices for UI, but fetches REAL spoilage data from Supabase

import spoilageDataService from "@/services/supabase/spoilageData";
import { useAuthStore } from "@/store/authStore";
import { useDeviceStore } from "@/store/deviceStore";
import { Device, DeviceWithReading, SensorReading } from "@/types/device.types";
import { useCallback, useEffect, useState } from "react";

/**
 * 🆕 HYBRID APPROACH:
 * - Creates a VIRTUAL device for UI purposes (no Supabase devices table needed)
 * - Fetches REAL data from spoilage_data table
 * - Perfect for single hardware device setup
 */

// 🎯 Your virtual device (appears in UI, but doesn't need database)
const VIRTUAL_DEVICE: Device = {
  id: "virtual-device-001", // This matches your spoilage_data.device_id
  user_id: "virtual-user",
  name: "Smart Veggie Monitor",
  location: "Kitchen",
  device_id: "virtual-device-001",
  status: "active",
  last_reading_at: new Date().toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export function useDevices() {
  const { user } = useAuthStore();
  const { devices, setDevices, setLoading, setError, loading, error } =
    useDeviceStore();

  const [refreshing, setRefreshing] = useState(false);
  const [realStats, setRealStats] = useState({
    totalReadings: 0,
    freshCount: 0,
    spoiledCount: 0,
  });

  /**
   * 🆕 Fetch virtual device with REAL statistics
   */
  const fetchDevices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get REAL statistics from spoilage_data
      const stats = await spoilageDataService.getAllStatistics();
      const latestReading = await spoilageDataService.getLatestReadingGlobal();

      // Update stats
      setRealStats({
        totalReadings: stats.totalReadings || 0,
        freshCount: stats.freshCount || 0,
        spoiledCount: stats.spoiledCount || 0,
      });

      // Determine status based on real data
      let status: "active" | "warning" | "critical" | "inactive" = "active";
      if (stats.spoiledCount > 0) {
        status = stats.spoiledCount > 5 ? "critical" : "warning";
      }
      if (stats.totalReadings === 0) {
        status = "inactive";
      }

      // Create virtual device with real data
      const virtualDeviceWithData: Device = {
        ...VIRTUAL_DEVICE,
        user_id: user?.id || "virtual-user",
        status,
        last_reading_at: latestReading?.created_at || new Date().toISOString(),
      };

      // Set single device
      setDevices([virtualDeviceWithData]);

      console.log("✅ Virtual device loaded with real stats:", {
        device: virtualDeviceWithData,
        stats: realStats,
      });
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      console.error("Error fetching virtual device:", error);

      // Fallback: still show device even if stats fail
      setDevices([VIRTUAL_DEVICE]);
    } finally {
      setLoading(false);
    }
  }, [user?.id, setDevices, setLoading, setError]);

  /**
   * Get device by ID (always returns our virtual device)
   */
  const getDeviceById = useCallback(
    (id: string): Device | undefined => {
      return devices.find((d) => d.id === id) || VIRTUAL_DEVICE;
    },
    [devices],
  );

  /**
   * 🆕 Get latest reading (from real Supabase data)
   */
  const getLatestReading = useCallback(
    async (deviceId: string): Promise<SensorReading | undefined> => {
      try {
        const reading = await spoilageDataService.getLatestReadingGlobal();
        return reading || undefined;
      } catch (err) {
        console.error("Error getting latest reading:", err);
        return undefined;
      }
    },
    [],
  );

  /**
   * 🆕 Get device with latest REAL reading
   */
  const getDeviceWithReading = useCallback(
    async (deviceId: string): Promise<DeviceWithReading | null> => {
      try {
        const device = getDeviceById(deviceId);
        if (!device) return null;

        const reading = await spoilageDataService.getLatestReadingGlobal();
        return { ...device, latest_reading: reading || undefined };
      } catch (err) {
        console.error("Error getting device with reading:", err);
        return null;
      }
    },
    [getDeviceById],
  );

  /**
   * 🆕 Get readings history (real data from Supabase)
   */
  const getReadingsHistory = useCallback(
    async (deviceId: string, limit: number = 100): Promise<SensorReading[]> => {
      try {
        return await spoilageDataService.getAllReadings(limit);
      } catch (err) {
        console.error("Error getting readings history:", err);
        return [];
      }
    },
    [],
  );

  /**
   * 🆕 Get device statistics (real data)
   */
  const getDeviceStatistics = useCallback(async (deviceId: string) => {
    try {
      return await spoilageDataService.getAllStatistics();
    } catch (err) {
      console.error("Error getting device statistics:", err);
      return {
        totalReadings: 0,
        averageGasLevel: 0,
        spoilageRate: 0,
        freshCount: 0,
        spoiledCount: 0,
      };
    }
  }, []);

  /**
   * Add device (creates additional virtual device if needed)
   */
  const addDevice = useCallback(
    async (deviceInput: Omit<Device, "id" | "created_at" | "updated_at">) => {
      try {
        setLoading(true);
        setError(null);

        // Create new virtual device
        const newDevice: Device = {
          ...deviceInput,
          id: `virtual-device-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        // Add to local state
        setDevices([...devices, newDevice]);

        console.log("✅ Virtual device added:", newDevice);
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
    [devices, setDevices, setLoading, setError],
  );

  /**
   * Update device (updates local virtual device)
   */
  const updateDevice = useCallback(
    async (deviceId: string, updates: Partial<Device>) => {
      try {
        setLoading(true);
        setError(null);

        const updatedDevices = devices.map((d) =>
          d.id === deviceId
            ? { ...d, ...updates, updated_at: new Date().toISOString() }
            : d,
        );

        setDevices(updatedDevices);
        console.log("✅ Virtual device updated:", deviceId);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        console.error("Error updating device:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [devices, setDevices, setLoading, setError],
  );

  /**
   * Delete device (removes from local state)
   */
  const deleteDevice = useCallback(
    async (deviceId: string) => {
      try {
        setLoading(true);
        setError(null);

        const filteredDevices = devices.filter((d) => d.id !== deviceId);
        setDevices(filteredDevices);

        console.log("✅ Virtual device deleted:", deviceId);
      } catch (err) {
        const error = err as Error;
        setError(error.message);
        console.error("Error deleting device:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [devices, setDevices, setLoading, setError],
  );

  /**
   * Refresh devices (reloads stats from Supabase)
   */
  const refetch = useCallback(async () => {
    setRefreshing(true);
    await fetchDevices();
    setRefreshing(false);
  }, [fetchDevices]);

  /**
   * Initial fetch on mount
   */
  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  return {
    devices,
    loading,
    error,
    refreshing,
    realStats, // 🆕 Expose real statistics
    getDeviceById,
    getLatestReading,
    getDeviceWithReading,
    getReadingsHistory,
    getDeviceStatistics,
    addDevice,
    updateDevice,
    deleteDevice,
    refetch,
  };
}

export default useDevices;
