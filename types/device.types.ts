// types/device.types.ts
import type { Database } from "./supabase.types";

// Use types directly from Database schema
export type Device = Database["public"]["Tables"]["devices"]["Row"];
export type SensorReading =
  Database["public"]["Tables"]["sensor_readings"]["Row"];

// Type aliases for convenience
export type DeviceStatus = Device["status"];
export type SpoilagePrediction = SensorReading["spoilage_prediction"];

// Device with latest reading
export interface DeviceWithReading extends Device {
  latest_reading?: SensorReading;
}

// Add device input
export interface AddDeviceInput {
  name: string;
  location: string;
  device_id: string;
}

// Update device input
export interface UpdateDeviceInput {
  name?: string;
  location?: string;
  status?: DeviceStatus;
}

// Sensor thresholds
export interface SensorThresholds {
  gas_level: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  temperature: {
    min: number;
    max: number;
    optimal: { min: number; max: number };
  };
  humidity: {
    min: number;
    max: number;
    optimal: { min: number; max: number };
  };
}

// Chart data point
export interface ChartDataPoint {
  timestamp: string;
  value: number;
  label?: string;
}

// Device statistics
export interface DeviceStatistics {
  total_readings: number;
  average_gas_level: number;
  average_temperature: number;
  average_humidity: number;
  spoilage_rate: number;
  uptime_percentage: number;
}
