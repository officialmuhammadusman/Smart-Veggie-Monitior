// utils/mockData.ts
import { Alert, Device, SensorReading } from "@/types/device.types";

export const MOCK_DEVICES: Device[] = [
  {
    id: "1",
    user_id: "user_1",
    name: "Storage Room A",
    location: "Main Warehouse",
    status: "active",
    last_reading_at: new Date().toISOString(),
    created_at: "2024-01-15T10:00:00Z",
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    user_id: "user_1",
    name: "Cold Storage B",
    location: "Basement",
    status: "warning",
    last_reading_at: new Date(Date.now() - 3600000).toISOString(),
    created_at: "2024-01-20T14:30:00Z",
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    user_id: "user_1",
    name: "Display Counter",
    location: "Store Front",
    status: "active",
    last_reading_at: new Date(Date.now() - 300000).toISOString(),
    created_at: "2024-02-01T09:15:00Z",
    updated_at: new Date().toISOString(),
  },
];

export const MOCK_SENSOR_READINGS: SensorReading[] = [
  {
    id: "sr_1",
    device_id: "1",
    gas_level: 45.2,
    temperature: 18.5,
    humidity: 65.0,
    image_url:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400",
    spoilage_prediction: "fresh",
    confidence: 95.5,
    created_at: new Date().toISOString(),
  },
  {
    id: "sr_2",
    device_id: "2",
    gas_level: 78.5,
    temperature: 22.3,
    humidity: 72.0,
    image_url:
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=400",
    spoilage_prediction: "warning",
    confidence: 82.3,
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "sr_3",
    device_id: "3",
    gas_level: 52.1,
    temperature: 19.8,
    humidity: 68.0,
    image_url:
      "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400",
    spoilage_prediction: "good",
    confidence: 88.7,
    created_at: new Date(Date.now() - 300000).toISOString(),
  },
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: "alert_1",
    device_id: "2",
    user_id: "user_1",
    severity: "high",
    message:
      "High ethylene levels detected in Cold Storage B. Vegetables may spoil soon.",
    is_read: false,
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "alert_2",
    device_id: "2",
    user_id: "user_1",
    severity: "medium",
    message: "Temperature rising in Cold Storage B. Check cooling system.",
    is_read: false,
    created_at: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: "alert_3",
    device_id: "1",
    user_id: "user_1",
    severity: "low",
    message: "Storage Room A sensor calibration recommended.",
    is_read: true,
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "alert_4",
    device_id: "3",
    user_id: "user_1",
    severity: "critical",
    message:
      "Visual spoilage detected in Display Counter. Immediate action required!",
    is_read: false,
    created_at: new Date(Date.now() - 1800000).toISOString(),
  },
];

// Chart data for dashboard
export const MOCK_CHART_DATA = [
  { date: "Mon", fresh: 85, warning: 10, spoiled: 5 },
  { date: "Tue", fresh: 82, warning: 13, spoiled: 5 },
  { date: "Wed", fresh: 78, warning: 15, spoiled: 7 },
  { date: "Thu", fresh: 80, warning: 12, spoiled: 8 },
  { date: "Fri", fresh: 75, warning: 18, spoiled: 7 },
  { date: "Sat", fresh: 88, warning: 8, spoiled: 4 },
  { date: "Sun", fresh: 90, warning: 7, spoiled: 3 },
];
