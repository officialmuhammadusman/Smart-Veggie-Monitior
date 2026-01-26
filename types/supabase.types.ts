// types/supabase.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      devices: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          location: string;
          status: "active" | "inactive" | "warning" | "critical";
          last_reading_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          location: string;
          status: "active" | "inactive" | "warning" | "critical";
          last_reading_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          location?: string;
          status?: "active" | "inactive" | "warning" | "critical";
          last_reading_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      sensor_readings: {
        Row: {
          id: string;
          device_id: string;
          gas_level: number;
          temperature: number;
          humidity: number;
          image_url: string | null;
          spoilage_prediction: "fresh" | "good" | "warning" | "spoiled";
          confidence: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          device_id: string;
          gas_level: number;
          temperature: number;
          humidity: number;
          image_url?: string | null;
          spoilage_prediction: "fresh" | "good" | "warning" | "spoiled";
          confidence: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          device_id?: string;
          gas_level?: number;
          temperature?: number;
          humidity?: number;
          image_url?: string | null;
          spoilage_prediction?: "fresh" | "good" | "warning" | "spoiled";
          confidence?: number;
          created_at?: string;
        };
      };
      alerts: {
        Row: {
          id: string;
          user_id: string;
          device_id: string;
          severity: "low" | "medium" | "high" | "critical";
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          device_id: string;
          severity: "low" | "medium" | "high" | "critical";
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          device_id?: string;
          severity?: "low" | "medium" | "high" | "critical";
          message?: string;
          is_read?: boolean;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          notification_settings: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          avatar_url?: string | null;
          notification_settings?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          avatar_url?: string | null;
          notification_settings?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      device_status: "active" | "inactive" | "warning" | "critical";
      alert_severity: "low" | "medium" | "high" | "critical";
      spoilage_prediction: "fresh" | "good" | "warning" | "spoiled";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Helper types
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
