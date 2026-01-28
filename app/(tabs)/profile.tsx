// app/(tabs)/profile.tsx
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
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
        colors={["#66BB6A", "#4CAF50", "#388E3C"]}
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
                icon={<User size={20} color="#4CAF50" />}
                label="Edit Profile"
                onPress={() => {}}
                showArrow
              />
              <Divider />
              <MenuItem
                icon={<Bell size={20} color="#4CAF50" />}
                label="Notifications"
                onPress={() => {}}
                rightComponent={
                  <Switch
                    value={notificationsEnabled}
                    onValueChange={setNotificationsEnabled}
                    trackColor={{
                      false: "#C8E6C9",
                      true: "#4CAF50",
                    }}
                    thumbColor={notificationsEnabled ? "#FFFFFF" : "#F1F8E9"}
                  />
                }
              />
              <Divider />
              <MenuItem
                icon={<Lock size={20} color="#4CAF50" />}
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
                icon={<Moon size={20} color="#4CAF50" />}
                label="Dark Mode"
                onPress={() => {}}
                rightComponent={
                  <Switch
                    value={darkModeEnabled}
                    onValueChange={setDarkModeEnabled}
                    trackColor={{
                      false: "#C8E6C9",
                      true: "#4CAF50",
                    }}
                    thumbColor={darkModeEnabled ? "#FFFFFF" : "#F1F8E9"}
                  />
                }
              />
              <Divider />
              <MenuItem
                icon={<Globe size={20} color="#4CAF50" />}
                label="Language"
                value="English"
                onPress={() => {}}
                showArrow
              />
              <Divider />
              <MenuItem
                icon={<BarChart3 size={20} color="#4CAF50" />}
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
                icon={<Smartphone size={20} color="#4CAF50" />}
                label="Manage Devices"
                value="3 active"
                onPress={() => router.push("/(tabs)/devices")}
                showArrow
              />
              <Divider />
              <MenuItem
                icon={<Plus size={20} color="#4CAF50" />}
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
                icon={<HelpCircle size={20} color="#4CAF50" />}
                label="Help & FAQ"
                onPress={() => {}}
                showArrow
              />
              <Divider />
              <MenuItem
                icon={<Mail size={20} color="#4CAF50" />}
                label="Contact Support"
                onPress={() => {}}
                showArrow
              />
              <Divider />
              <MenuItem
                icon={<Star size={20} color="#4CAF50" />}
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
                icon={<Info size={20} color="#4CAF50" />}
                label="App Version"
                value="1.0.0"
              />
              <Divider />
              <MenuItem
                icon={<FileText size={20} color="#4CAF50" />}
                label="Terms of Service"
                onPress={() => {}}
                showArrow
              />
              <Divider />
              <MenuItem
                icon={<Shield size={20} color="#4CAF50" />}
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
            {showArrow && <ChevronRight size={20} color="#A5D6A7" />}
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
    backgroundColor: "#F1F8E9",
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
    color: "rgba(255,255,255,0.95)",
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
    color: "#558B2F",
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
    backgroundColor: "#E8F5E9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Layout.spacing.md,
  },
  menuLabel: {
    fontSize: Layout.fontSize.md,
    fontWeight: "500",
    color: "#1B5E20",
    flex: 1,
  },
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  menuValue: {
    fontSize: Layout.fontSize.sm,
    color: "#66BB6A",
  },
  divider: {
    height: 1,
    backgroundColor: "#C8E6C9",
    marginLeft: 68,
  },
  logoutButton: {
    marginTop: Layout.spacing.xl,
    borderColor: "#EF5350",
  },
  footer: {
    textAlign: "center",
    fontSize: 12,
    color: "#81C784",
    marginTop: Layout.spacing.xl,
    lineHeight: 18,
  },
});
