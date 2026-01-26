// // app/(tabs)/_layout.tsx
// import { Colors } from "@/constants/Colors";
// import { useAlerts } from "@/hooks/useAlerts";
// import { Tabs } from "expo-router";
// import { StyleSheet, Text, View } from "react-native";

// // Icon component (using text emojis for simplicity - replace with proper icons)
// function TabBarIcon({ name, focused }: { name: string; focused: boolean }) {
//   const icons: Record<string, string> = {
//     index: "🏠",
//     devices: "📱",
//     alerts: "🔔",
//     profile: "👤",
//   };

//   return (
//     <View
//       style={[styles.iconContainer, focused && styles.iconContainerFocused]}
//     >
//       <Text style={styles.iconText}>{icons[name]}</Text>
//     </View>
//   );
// }

// export default function TabLayout() {
//   const { unreadCount } = useAlerts();

//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: Colors.light.primary,
//         tabBarInactiveTintColor: Colors.light.textTertiary,
//         tabBarStyle: {
//           backgroundColor: "#FFFFFF",
//           borderTopWidth: 1,
//           borderTopColor: Colors.light.borderLight,
//           height: 65,
//           paddingBottom: 8,
//           paddingTop: 8,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: "600",
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Dashboard",
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon name="index" focused={focused} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="devices"
//         options={{
//           title: "Devices",
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon name="devices" focused={focused} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="alerts"
//         options={{
//           title: "Alerts",
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon name="alerts" focused={focused} />
//           ),
//           tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
//         }}
//       />
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: "Profile",
//           tabBarIcon: ({ focused }) => (
//             <TabBarIcon name="profile" focused={focused} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

// const styles = StyleSheet.create({
//   iconContainer: {
//     width: 40,
//     height: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 12,
//   },
//   iconContainerFocused: {
//     backgroundColor: Colors.light.primaryLight,
//   },
//   iconText: {
//     fontSize: 24,
//   },
// });

// app/(tabs)/_layout.tsx
import { Colors } from "@/constants/Colors";
import { useAlerts } from "@/hooks/useAlerts";
import { Tabs } from "expo-router";
import { Bell, Home, Smartphone, User } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

// Icon component with Lucide icons
function TabBarIcon({ name, focused }: { name: string; focused: boolean }) {
  const iconSize = 24;
  const iconColor = focused ? Colors.light.primary : Colors.light.textTertiary;

  const icons: Record<string, React.ReactNode> = {
    index: <Home size={iconSize} color={iconColor} />,
    devices: <Smartphone size={iconSize} color={iconColor} />,
    alerts: <Bell size={iconSize} color={iconColor} />,
    profile: <User size={iconSize} color={iconColor} />,
  };

  return (
    <View
      style={[styles.iconContainer, focused && styles.iconContainerFocused]}
    >
      {icons[name]}
    </View>
  );
}

export default function TabLayout() {
  const { unreadCount } = useAlerts();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.textTertiary,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: Colors.light.borderLight,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="index" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="devices"
        options={{
          title: "Devices",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="devices" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: "Alerts",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="alerts" focused={focused} />
          ),
          tabBarBadge: unreadCount > 0 ? unreadCount : undefined,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  iconContainerFocused: {
    backgroundColor: Colors.light.primaryLight,
  },
});
