// services/supabase/client.ts
import { Database } from "@/types/supabase.types";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";
import { Platform } from "react-native";

// Get environment variables from expo-constants
const supabaseUrl =
  Constants.expoConfig?.extra?.supabaseUrl ||
  process.env.EXPO_PUBLIC_SUPABASE_URL ||
  "";

const supabaseAnonKey =
  Constants.expoConfig?.extra?.supabaseAnonKey ||
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ||
  "";

// Validate required environment variables
if (!supabaseUrl) {
  throw new Error(
    "EXPO_PUBLIC_SUPABASE_URL is required. Please add it to your .env file.",
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "EXPO_PUBLIC_SUPABASE_ANON_KEY is required. Please add it to your .env file.",
  );
}

console.log("🔗 Supabase URL:", supabaseUrl);
console.log("🔑 Supabase Key exists:", !!supabaseAnonKey);

// Get the appropriate storage for the platform
const getSupabaseStorage = () => {
  if (Platform.OS === "web") {
    // For web, return undefined to use browser's localStorage
    return undefined;
  }
  // For native platforms, use AsyncStorage
  const AsyncStorage =
    require("@react-native-async-storage/async-storage").default;
  return AsyncStorage;
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: getSupabaseStorage(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
