// app/index.tsx
import { useAuth } from "@/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { user, loading } = useAuth();

  // Check if user has completed onboarding
  const checkOnboarding = async () => {
    try {
      const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
      return hasSeenOnboarding === "true";
    } catch {
      return false;
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  // Routing logic:
  // 1. Not authenticated → Go to Auth
  // 2. Authenticated but no onboarding → Show onboarding
  // 3. Authenticated with onboarding → Go to main app

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  // For now, check onboarding in useEffect and redirect
  // In production, you'd use a more sophisticated state management
  return <Redirect href="/(tabs)" />;
}
