// // app/(tabs)/profile.tsx
// import { Button } from "@/components/ui/Button";
// import { Card } from "@/components/ui/Card";
// import { Colors } from "@/constants/Colors";
// import { Layout } from "@/constants/Layout";
// import { useAuth } from "@/hooks/useAuth";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import React from "react";
// import {
//     Alert,
//     ScrollView,
//     StyleSheet,
//     Switch,
//     Text,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import Animated, { FadeInDown } from "react-native-reanimated";

// export default function ProfileScreen() {
//   const router = useRouter();
//   const { user, logout } = useAuth();
//   const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
//   const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

//   const handleLogout = () => {
//     Alert.alert("Logout", "Are you sure you want to logout?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Logout",
//         style: "destructive",
//         onPress: async () => {
//           await logout();
//           router.replace("/(auth)/login");
//         },
//       },
//     ]);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <LinearGradient
//         colors={["#4c669f", "#3b5998", "#ffffff"]}
//         style={styles.header}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <View style={styles.profileCard}>
//           <View style={styles.avatar}>
//             <Text style={styles.avatarText}>
//               {user?.name?.charAt(0).toUpperCase() || "U"}
//             </Text>
//           </View>
//           <Text style={styles.userName}>{user?.name || "User"}</Text>
//           <Text style={styles.userEmail}>{user?.email}</Text>
//         </View>
//       </LinearGradient>

//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.content}>
//           {/* Account Section */}
//           <Animated.View entering={FadeInDown.delay(100).springify()}>
//             <Text style={styles.sectionTitle}>Account</Text>
//             <Card style={styles.menuCard}>
//               <MenuItem
//                 icon="👤"
//                 label="Edit Profile"
//                 onPress={() => {}}
//                 showArrow
//               />
//               <Divider />
//               <MenuItem
//                 icon="🔔"
//                 label="Notifications"
//                 onPress={() => {}}
//                 rightComponent={
//                   <Switch
//                     value={notificationsEnabled}
//                     onValueChange={setNotificationsEnabled}
//                     trackColor={{
//                       false: Colors.light.border,
//                       true: Colors.light.primary,
//                     }}
//                   />
//                 }
//               />
//               <Divider />
//               <MenuItem
//                 icon="🔒"
//                 label="Privacy & Security"
//                 onPress={() => {}}
//                 showArrow
//               />
//             </Card>
//           </Animated.View>

//           {/* Preferences Section */}
//           <Animated.View entering={FadeInDown.delay(200).springify()}>
//             <Text style={styles.sectionTitle}>Preferences</Text>
//             <Card style={styles.menuCard}>
//               <MenuItem
//                 icon="🌙"
//                 label="Dark Mode"
//                 onPress={() => {}}
//                 rightComponent={
//                   <Switch
//                     value={darkModeEnabled}
//                     onValueChange={setDarkModeEnabled}
//                     trackColor={{
//                       false: Colors.light.border,
//                       true: Colors.light.primary,
//                     }}
//                   />
//                 }
//               />
//               <Divider />
//               <MenuItem
//                 icon="🌍"
//                 label="Language"
//                 value="English"
//                 onPress={() => {}}
//                 showArrow
//               />
//               <Divider />
//               <MenuItem
//                 icon="📊"
//                 label="Data & Storage"
//                 onPress={() => {}}
//                 showArrow
//               />
//             </Card>
//           </Animated.View>

//           {/* Devices Section */}
//           <Animated.View entering={FadeInDown.delay(300).springify()}>
//             <Text style={styles.sectionTitle}>Devices</Text>
//             <Card style={styles.menuCard}>
//               <MenuItem
//                 icon="📱"
//                 label="Manage Devices"
//                 value="3 active"
//                 onPress={() => router.push("/(tabs)/devices")}
//                 showArrow
//               />
//               <Divider />
//               <MenuItem
//                 icon="➕"
//                 label="Add New Device"
//                 onPress={() => router.push("/device/add-device")}
//                 showArrow
//               />
//             </Card>
//           </Animated.View>

//           {/* Support Section */}
//           <Animated.View entering={FadeInDown.delay(400).springify()}>
//             <Text style={styles.sectionTitle}>Support</Text>
//             <Card style={styles.menuCard}>
//               <MenuItem
//                 icon="❓"
//                 label="Help & FAQ"
//                 onPress={() => {}}
//                 showArrow
//               />
//               <Divider />
//               <MenuItem
//                 icon="📧"
//                 label="Contact Support"
//                 onPress={() => {}}
//                 showArrow
//               />
//               <Divider />
//               <MenuItem
//                 icon="⭐"
//                 label="Rate App"
//                 onPress={() => {}}
//                 showArrow
//               />
//             </Card>
//           </Animated.View>

//           {/* About Section */}
//           <Animated.View entering={FadeInDown.delay(500).springify()}>
//             <Text style={styles.sectionTitle}>About</Text>
//             <Card style={styles.menuCard}>
//               <MenuItem icon="ℹ️" label="App Version" value="1.0.0" />
//               <Divider />
//               <MenuItem
//                 icon="📜"
//                 label="Terms of Service"
//                 onPress={() => {}}
//                 showArrow
//               />
//               <Divider />
//               <MenuItem
//                 icon="🔐"
//                 label="Privacy Policy"
//                 onPress={() => {}}
//                 showArrow
//               />
//             </Card>
//           </Animated.View>

//           {/* Logout Button */}
//           <Animated.View entering={FadeInDown.delay(600).springify()}>
//             <Button
//               title="Logout"
//               onPress={handleLogout}
//               variant="outline"
//               style={styles.logoutButton}
//             />
//           </Animated.View>

//           <Text style={styles.footer}>
//             Smart Veggie Monitor v1.0.0{"\n"}
//             Made with 🥬 for fresh vegetables
//           </Text>
//         </View>

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </View>
//   );
// }

// // Menu Item Component
// function MenuItem({
//   icon,
//   label,
//   value,
//   onPress,
//   showArrow,
//   rightComponent,
// }: any) {
//   const content = (
//     <View style={styles.menuItem}>
//       <View style={styles.menuLeft}>
//         <View style={styles.menuIcon}>
//           <Text style={styles.menuIconText}>{icon}</Text>
//         </View>
//         <Text style={styles.menuLabel}>{label}</Text>
//       </View>
//       <View style={styles.menuRight}>
//         {rightComponent || (
//           <>
//             {value && <Text style={styles.menuValue}>{value}</Text>}
//             {showArrow && <Text style={styles.menuArrow}>›</Text>}
//           </>
//         )}
//       </View>
//     </View>
//   );

//   if (onPress) {
//     return (
//       <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
//         {content}
//       </TouchableOpacity>
//     );
//   }

//   return content;
// }

// // Divider Component
// function Divider() {
//   return <View style={styles.divider} />;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: Colors.light.backgroundSecondary,
//   },
//   header: {
//     paddingTop: 60,
//     paddingBottom: 40,
//     paddingHorizontal: Layout.spacing.lg,
//     alignItems: "center",
//   },
//   profileCard: {
//     alignItems: "center",
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     backgroundColor: "rgba(255,255,255,0.3)",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: Layout.spacing.md,
//     borderWidth: 4,
//     borderColor: "rgba(255,255,255,0.5)",
//   },
//   avatarText: {
//     fontSize: 40,
//     fontWeight: "700",
//     color: "#FFFFFF",
//   },
//   userName: {
//     fontSize: Layout.fontSize.xl,
//     fontWeight: "700",
//     color: "#FFFFFF",
//     marginBottom: 4,
//   },
//   userEmail: {
//     fontSize: Layout.fontSize.md,
//     color: "rgba(255,255,255,0.9)",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   content: {
//     paddingHorizontal: Layout.spacing.lg,
//     paddingTop: Layout.spacing.lg,
//   },
//   sectionTitle: {
//     fontSize: Layout.fontSize.sm,
//     fontWeight: "700",
//     color: Colors.light.textSecondary,
//     textTransform: "uppercase",
//     letterSpacing: 0.5,
//     marginBottom: Layout.spacing.sm,
//     marginTop: Layout.spacing.lg,
//   },
//   menuCard: {
//     padding: 0,
//     overflow: "hidden",
//   },
//   menuItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: Layout.spacing.md,
//   },
//   menuLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   menuIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: Colors.light.backgroundSecondary,
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: Layout.spacing.md,
//   },
//   menuIconText: {
//     fontSize: 20,
//   },
//   menuLabel: {
//     fontSize: Layout.fontSize.md,
//     fontWeight: "500",
//     color: Colors.light.text,
//     flex: 1,
//   },
//   menuRight: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   menuValue: {
//     fontSize: Layout.fontSize.sm,
//     color: Colors.light.textSecondary,
//   },
//   menuArrow: {
//     fontSize: 24,
//     color: Colors.light.textTertiary,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: Colors.light.borderLight,
//     marginLeft: 68,
//   },
//   logoutButton: {
//     marginTop: Layout.spacing.xl,
//     borderColor: Colors.light.danger,
//   },
//   footer: {
//     textAlign: "center",
//     fontSize: 12,
//     color: Colors.light.textTertiary,
//     marginTop: Layout.spacing.xl,
//     lineHeight: 18,
//   },
// });

// app/(tabs)/profile.tsx
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { useAuth } from "@/hooks/useAuth";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
    BarChart3,
    Bell,
    ChevronRight,
    FileText,
    Globe,
    HelpCircle,
    Info,
    Lock,
    Mail,
    Moon,
    Plus,
    Shield,
    Smartphone,
    Star,
    User,
} from "lucide-react-native";
import React from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#ffffff"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </Text>
          </View>
          <Text style={styles.userName}>{user?.name || "User"}</Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Account Section */}
          <Animated.View entering={FadeInDown.delay(100).springify()}>
            <Text style={styles.sectionTitle}>Account</Text>
            <Card style={styles.menuCard}>
              <MenuItem
                icon={<User size={20} color={Colors.light.primary} />}
                label="Edit Profile"
                onPress={() => {}}
                showArrow
              />
              <Divider />
              <MenuItem
                icon={<Bell size={20} color={Colors.light.primary} />}
                label="Notifications"
                onPress={() => {}}
                rightComponent={
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{
                      false: Colors.light.border,
                      true: Colors.light.primary,
                    }}
                  />
                }
              />
              <Divider />
              <MenuItem
                icon={<Lock size={20} color={Colors.light.primary} />}
                label="Privacy & Security"
                onPress={() => {}}
                showArrow
              />
            </Card>
          </Animated.View>

          {/* Preferences Section */}
          <Animated.View entering={FadeInDown.delay(200).springify()}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <Card style={styles.menuCard}>
              <MenuItem
                icon={<Moon size={20} color={Colors.light.primary} />}
                label="Dark Mode"
                onPress={() => {}}
                rightComponent={
                  <Switch
                    value={darkModeEnabled}
                    onValueChange={setDarkModeEnabled}
                    trackColor={{
                      false: Colors.light.border,
                      true: Colors.light.primary,
                    }}
                  />
                }
              />
              <Divider />
              <MenuItem
                icon={<Globe size={20} color={Colors.light.primary} />}
                label="Language"
                value="English"
                onPress={() => {}}
                showArrow
              />
              <Divider />
              <MenuItem
                icon={<BarChart3 size={20} color={Colors.light.primary} />}
                label="Data & Storage"
                onPress={() => {}}
                showArrow
              />
            </Card>
          </Animated.View>

          {/* Devices Section */}
          <Animated.View entering={FadeInDown.delay(300).springify()}>
            <Text style={styles.sectionTitle}>Devices</Text>
            <Card style={styles.menuCard}>
              <MenuItem
                icon={<Smartphone size={20} color={Colors.light.primary} />}
                label="Manage Devices"
                value="3 active"
                onPress={() => router.push("/(tabs)/devices")}
                showArrow
              />
              <Divider />
              <MenuItem
                icon={<Plus size={20} color={Colors.light.primary} />}
                label="Add New Device"
                onPress={() => router.push("/device/add-device")}
                showArrow
              />
            </Card>
          </Animated.View>

          {/* Support Section */}
          <Animated.View entering={FadeInDown.delay(400).springify()}>
            <Text style={styles.sectionTitle}>Support</Text>
            <Card style={styles.menuCard}>
              <MenuItem
                icon={<HelpCircle size={20} color={Colors.light.primary} />}
                label="Help & FAQ"
                onPress={() => {}}
                showArrow
              />
              <Divider />
              <MenuItem
                icon={<Mail size={20} color={Colors.light.primary} />}
                label="Contact Support"
                onPress={() => {}}
                showArrow
              />
              <Divider />
              <MenuItem
                icon={<Star size={20} color={Colors.light.primary} />}
                label="Rate App"
                onPress={() => {}}
                showArrow
              />
            </Card>
          </Animated.View>

          {/* About Section */}
          <Animated.View entering={FadeInDown.delay(500).springify()}>
            <Text style={styles.sectionTitle}>About</Text>
            <Card style={styles.menuCard}>
              <MenuItem
                icon={<Info size={20} color={Colors.light.primary} />}
                label="App Version"
                value="1.0.0"
              />
              <Divider />
              <MenuItem
                icon={<FileText size={20} color={Colors.light.primary} />}
                label="Terms of Service"
                onPress={() => {}}
                showArrow
              />
              <Divider />
              <MenuItem
                icon={<Shield size={20} color={Colors.light.primary} />}
                label="Privacy Policy"
                onPress={() => {}}
                showArrow
              />
            </Card>
          </Animated.View>

          {/* Logout Button */}
          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <Button
              title="Logout"
              onPress={handleLogout}
              variant="outline"
              style={styles.logoutButton}
            />
          </Animated.View>

          <Text style={styles.footer}>
            Smart Veggie Monitor v1.0.0{"\n"}
            Made with 🥬 for fresh vegetables
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// Menu Item Component
function MenuItem({
  icon,
  label,
  value,
  onPress,
  showArrow,
  rightComponent,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onPress?: () => void;
  showArrow?: boolean;
  rightComponent?: React.ReactNode;
}) {
  const content = (
    <View style={styles.menuItem}>
      <View style={styles.menuLeft}>
        <View style={styles.menuIcon}>{icon}</View>
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      <View style={styles.menuRight}>
        {rightComponent || (
          <>
            {value && <Text style={styles.menuValue}>{value}</Text>}
            {showArrow && (
              <ChevronRight size={20} color={Colors.light.textTertiary} />
            )}
          </>
        )}
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

// Divider Component
function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.backgroundSecondary,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: Layout.spacing.lg,
    alignItems: "center",
  },
  profileCard: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Layout.spacing.md,
    borderWidth: 4,
    borderColor: "rgba(255,255,255,0.5)",
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  userName: {
    fontSize: Layout.fontSize.xl,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: Layout.fontSize.md,
    color: "rgba(255,255,255,0.9)",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.lg,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.sm,
    fontWeight: "700",
    color: Colors.light.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: Layout.spacing.sm,
    marginTop: Layout.spacing.lg,
  },
  menuCard: {
    padding: 0,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Layout.spacing.md,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Layout.spacing.md,
  },
  menuLabel: {
    fontSize: Layout.fontSize.md,
    fontWeight: "500",
    color: Colors.light.text,
    flex: 1,
  },
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  menuValue: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.borderLight,
    marginLeft: 68,
  },
  logoutButton: {
    marginTop: Layout.spacing.xl,
    borderColor: Colors.light.danger,
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.light.textTertiary,
    marginTop: Layout.spacing.xl,
    lineHeight: 18,
  },
});
