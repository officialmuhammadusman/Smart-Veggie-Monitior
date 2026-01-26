// store/deviceStore.ts
import { Device, SensorReading } from "@/types/device.types";
import { create } from "zustand";

interface DeviceState {
  devices: Device[];
  selectedDevice: Device | null;
  latestReadings: Map<string, SensorReading>;
  loading: boolean;
  error: string | null;

  setDevices: (devices: Device[]) => void;
  addDevice: (device: Device) => void;
  updateDevice: (deviceId: string, updates: Partial<Device>) => void;
  removeDevice: (deviceId: string) => void;
  setSelectedDevice: (device: Device | null) => void;
  setLatestReading: (deviceId: string, reading: SensorReading) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useDeviceStore = create<DeviceState>((set) => ({
  devices: [],
  selectedDevice: null,
  latestReadings: new Map(),
  loading: false,
  error: null,

  setDevices: (devices) => set({ devices, error: null }),

  addDevice: (device) =>
    set((state) => ({
      devices: [...state.devices, device],
      error: null,
    })),

  updateDevice: (deviceId, updates) =>
    set((state) => ({
      devices: state.devices.map((d) =>
        d.id === deviceId ? { ...d, ...updates } : d,
      ),
      selectedDevice:
        state.selectedDevice?.id === deviceId
          ? { ...state.selectedDevice, ...updates }
          : state.selectedDevice,
      error: null,
    })),

  removeDevice: (deviceId) =>
    set((state) => ({
      devices: state.devices.filter((d) => d.id !== deviceId),
      selectedDevice:
        state.selectedDevice?.id === deviceId ? null : state.selectedDevice,
      error: null,
    })),

  setSelectedDevice: (device) => set({ selectedDevice: device }),

  setLatestReading: (deviceId, reading) =>
    set((state) => {
      const newReadings = new Map(state.latestReadings);
      newReadings.set(deviceId, reading);
      return { latestReadings: newReadings };
    }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),
}));
