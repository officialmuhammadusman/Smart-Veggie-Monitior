// import type { Device, SensorReading } from "@/types/device.types";
// import type { Database } from "@/types/supabase.types";
// import { supabase } from "./client";

// type DeviceInsert = Database["public"]["Tables"]["devices"]["Insert"];
// type DeviceUpdate = Database["public"]["Tables"]["devices"]["Update"];

// export const devicesService = {
//   // Get all devices for current user
//   getDevices: async (userId: string): Promise<Device[]> => {
//     const { data, error } = await supabase
//       .from("devices")
//       .select("*")
//       .eq("user_id", userId)
//       .order("created_at", { ascending: false });

//     if (error) throw error;
//     return data;
//   },

//   // Get single device
//   getDevice: async (deviceId: string): Promise<Device> => {
//     const { data, error } = await supabase
//       .from("devices")
//       .select("*")
//       .eq("id", deviceId)
//       .single();

//     if (error) throw error;
//     return data;
//   },

//   // Add new device
//   addDevice: async (
//     device: Omit<Device, "id" | "created_at" | "updated_at">,
//   ): Promise<Device> => {
//     const insertData: DeviceInsert = {
//       user_id: device.user_id,
//       name: device.name,
//       location: device.location,
//       status: device.status,
//       last_reading_at: device.last_reading_at,
//     };

//     const { data, error } = await supabase
//       .from("devices")
//       .insert(insertData)
//       .select()
//       .single();

//     if (error) throw error;
//     return data;
//   },

//   // Update device
//   updateDevice: async (
//     deviceId: string,
//     updates: Partial<Omit<Device, "id" | "created_at" | "updated_at">>,
//   ): Promise<Device> => {
//     const updateData: DeviceUpdate = {
//       updated_at: new Date().toISOString(),
//     };

//     if (updates.name !== undefined) updateData.name = updates.name;
//     if (updates.location !== undefined) updateData.location = updates.location;
//     if (updates.status !== undefined) updateData.status = updates.status;
//     if (updates.user_id !== undefined) updateData.user_id = updates.user_id;
//     if (updates.last_reading_at !== undefined) {
//       updateData.last_reading_at = updates.last_reading_at;
//     }

//     const { data, error } = await supabase
//       .from("devices")
//       .update(updateData)
//       .eq("id", deviceId)
//       .select()
//       .single();

//     if (error) throw error;
//     return data;
//   },

//   // Delete device
//   deleteDevice: async (deviceId: string): Promise<void> => {
//     const { error } = await supabase
//       .from("devices")
//       .delete()
//       .eq("id", deviceId);

//     if (error) throw error;
//   },

//   // Subscribe to device changes
//   subscribeToDevices: (userId: string, callback: (payload: any) => void) => {
//     return supabase
//       .channel("devices_changes")
//       .on(
//         "postgres_changes",
//         {
//           event: "*",
//           schema: "public",
//           table: "devices",
//           filter: `user_id=eq.${userId}`,
//         },
//         callback,
//       )
//       .subscribe();
//   },

//   // Get latest reading for device
//   getLatestReading: async (deviceId: string): Promise<SensorReading | null> => {
//     const { data, error } = await supabase
//       .from("sensor_readings")
//       .select("*")
//       .eq("device_id", deviceId)
//       .order("created_at", { ascending: false })
//       .limit(1)
//       .maybeSingle();

//     if (error) throw error;
//     return data;
//   },

//   // Get readings history
//   getReadingsHistory: async (
//     deviceId: string,
//     limit = 100,
//   ): Promise<SensorReading[]> => {
//     const { data, error } = await supabase
//       .from("sensor_readings")
//       .select("*")
//       .eq("device_id", deviceId)
//       .order("created_at", { ascending: false })
//       .limit(limit);

//     if (error) throw error;
//     return data;
//   },
// };

// services/supabase/devices.ts - UPDATED VERSION
// 🔄 Enhanced to work with spoilage_data table and AI predictions

import type { Device, SensorReading } from "@/types/device.types";
import type { Database } from "@/types/supabase.types";
import { supabase } from "./client";
import spoilageDataService from "./spoilageData";

type DeviceInsert = Database["public"]["Tables"]["devices"]["Insert"];
type DeviceUpdate = Database["public"]["Tables"]["devices"]["Update"];

export const devicesService = {
  // Get all devices for current user
  getDevices: async (userId: string): Promise<Device[]> => {
    const { data, error } = await supabase
      .from("devices")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get single device
  getDevice: async (deviceId: string): Promise<Device> => {
    const { data, error } = await supabase
      .from("devices")
      .select("*")
      .eq("id", deviceId)
      .single();

    if (error) throw error;
    return data;
  },

  // Add new device
  addDevice: async (
    device: Omit<Device, "id" | "created_at" | "updated_at">,
  ): Promise<Device> => {
    const insertData: DeviceInsert = {
      user_id: device.user_id,
      name: device.name,
      location: device.location,
      status: device.status,
      last_reading_at: device.last_reading_at,
    };

    const { data, error } = await supabase
      .from("devices")
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update device
  updateDevice: async (
    deviceId: string,
    updates: Partial<Omit<Device, "id" | "created_at" | "updated_at">>,
  ): Promise<Device> => {
    const updateData: DeviceUpdate = {
      updated_at: new Date().toISOString(),
    };

    if (updates.name !== undefined) updateData.name = updates.name;
    if (updates.location !== undefined) updateData.location = updates.location;
    if (updates.status !== undefined) updateData.status = updates.status;
    if (updates.user_id !== undefined) updateData.user_id = updates.user_id;
    if (updates.last_reading_at !== undefined) {
      updateData.last_reading_at = updates.last_reading_at;
    }

    const { data, error } = await supabase
      .from("devices")
      .update(updateData)
      .eq("id", deviceId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete device
  deleteDevice: async (deviceId: string): Promise<void> => {
    const { error } = await supabase
      .from("devices")
      .delete()
      .eq("id", deviceId);

    if (error) throw error;
  },

  // Subscribe to device changes
  subscribeToDevices: (userId: string, callback: (payload: any) => void) => {
    return supabase
      .channel("devices_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "devices",
          filter: `user_id=eq.${userId}`,
        },
        callback,
      )
      .subscribe();
  },

  // 🆕 Get latest reading for device (from spoilage_data table with AI enhancement)
  getLatestReading: async (deviceId: string): Promise<SensorReading | null> => {
    return await spoilageDataService.getLatestReading(deviceId);
  },

  // 🆕 Get readings history (from spoilage_data table with AI enhancement)
  getReadingsHistory: async (
    deviceId: string,
    limit = 100,
  ): Promise<SensorReading[]> => {
    return await spoilageDataService.getReadingsHistory(deviceId, limit);
  },

  // 🆕 Get device with enhanced latest reading
  getDeviceWithLatestReading: async (deviceId: string) => {
    try {
      const device = await devicesService.getDevice(deviceId);
      const latestReading =
        await spoilageDataService.getLatestReading(deviceId);

      return {
        ...device,
        latest_reading: latestReading,
      };
    } catch (err) {
      console.error("Error getting device with reading:", err);
      return null;
    }
  },

  // 🆕 Update device status based on latest spoilage data
  syncDeviceStatus: async (deviceId: string): Promise<void> => {
    try {
      const status = await spoilageDataService.getDeviceStatus(deviceId);
      const latestReading =
        await spoilageDataService.getLatestReading(deviceId);

      await devicesService.updateDevice(deviceId, {
        status,
        last_reading_at: latestReading?.created_at || new Date().toISOString(),
      });
    } catch (err) {
      console.error("Error syncing device status:", err);
    }
  },

  // 🆕 Get device statistics
  getDeviceStatistics: async (deviceId: string) => {
    return await spoilageDataService.getStatistics(deviceId);
  },

  // 🆕 Subscribe to spoilage data updates for a device
  subscribeToDeviceReadings: (
    deviceId: string,
    userId: string,
    callback: (reading: SensorReading) => void,
  ) => {
    return spoilageDataService.subscribeToSpoilageData(
      deviceId,
      userId,
      async (reading) => {
        // Auto-sync device status when new reading arrives
        await devicesService.syncDeviceStatus(deviceId);

        // Call the callback
        callback(reading);
      },
    );
  },
};

export default devicesService;
