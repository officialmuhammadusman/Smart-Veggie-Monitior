// types/alert.types.ts
import { Device } from "./device.types";

// Alert severity levels
export type AlertSeverity = "low" | "medium" | "high" | "critical";

// Alert types
export type AlertType =
  | "spoilage_detected"
  | "high_gas_level"
  | "temperature_warning"
  | "humidity_warning"
  | "device_offline"
  | "sensor_error"
  | "maintenance_required";

// Alert interface
export interface Alert {
  id: string;
  device_id: string;
  user_id: string;
  severity: AlertSeverity;
  type?: AlertType;
  message: string;
  is_read: boolean;
  created_at: string;
  device?: Device;
}

// Alert with device details
export interface AlertWithDevice extends Alert {
  device: Device;
}

// Create alert input
export interface CreateAlertInput {
  device_id: string;
  user_id: string;
  severity: AlertSeverity;
  type?: AlertType;
  message: string;
}

// Alert filter options
export interface AlertFilterOptions {
  severity?: AlertSeverity;
  is_read?: boolean;
  device_id?: string;
  type?: AlertType;
  from_date?: string;
  to_date?: string;
}

// Alert statistics
export interface AlertStatistics {
  total: number;
  unread: number;
  by_severity: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
  by_type: Record<AlertType, number>;
  recent_count: number;
}

// Alert notification settings
export interface AlertNotificationSettings {
  enabled: boolean;
  push_notifications: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
  severity_threshold: AlertSeverity;
  quiet_hours: {
    enabled: boolean;
    start: string; // HH:mm format
    end: string; // HH:mm format
  };
}
