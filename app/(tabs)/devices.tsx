// // app/(tabs)/devices.tsx
// import { Badge } from "@/components/ui/Badge";
// import { Button } from "@/components/ui/Button";
// import { Card } from "@/components/ui/Card";
// import { Layout } from "@/constants/Layout";
// import { useDevices } from "@/hooks/useDevices";
// import { Device } from "@/types/device.types";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import { ChevronRight, MapPin, Smartphone } from "lucide-react-native";
// import React from "react";
// import {
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Animated, { FadeInDown } from "react-native-reanimated";

// export default function DevicesScreen() {
//   const router = useRouter();
//   const { devices, loading, refetch } = useDevices();
//   const [refreshing, setRefreshing] = React.useState(false);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await refetch();
//     setRefreshing(false);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <LinearGradient
//         colors={["#66BB6A", "#4CAF50", "#388E3C"]}
//         style={styles.header}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <Text style={styles.headerTitle}>My Devices</Text>
//         <Text style={styles.headerSubtitle}>
//           {devices.length} device{devices.length !== 1 ? "s" : ""} registered
//         </Text>
//       </LinearGradient>

//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             tintColor="#4CAF50"
//             colors={["#4CAF50"]}
//           />
//         }
//       >
//         <View style={styles.content}>
//           {/* Add Device Button */}
//           <Animated.View entering={FadeInDown.delay(100).springify()}>
//             <Button
//               title="+ Add New Device"
//               onPress={() => router.push("/device/add-device")}
//               variant="outline"
//               style={styles.addButton}
//             />
//           </Animated.View>

//           {/* Devices List */}
//           {devices.map((device: Device, index: number) => (
//             <DeviceCard
//               key={device.id}
//               device={device}
//               delay={index * 100 + 200}
//               onPress={() => router.push(`/device/${device.id}`)}
//             />
//           ))}

//           {devices.length === 0 && !loading && (
//             <Animated.View
//               entering={FadeInDown.delay(300).springify()}
//               style={styles.emptyState}
//             >
//               <Smartphone size={80} color="#A5D6A7" strokeWidth={1.5} />
//               <Text style={styles.emptyTitle}>No Devices Yet</Text>
//               <Text style={styles.emptyText}>
//                 Add your first ESP32-CAM device to start monitoring your
//                 vegetables
//               </Text>
//             </Animated.View>
//           )}
//         </View>

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </View>
//   );
// }

// // Device Card Component
// function DeviceCard({
//   device,
//   delay,
//   onPress,
// }: {
//   device: Device;
//   delay: number;
//   onPress: () => void;
// }) {
//   const getStatusBadge = () => {
//     switch (device.status) {
//       case "active":
//         return { variant: "success", label: "Active" };
//       case "warning":
//         return { variant: "warning", label: "Warning" };
//       case "critical":
//         return { variant: "danger", label: "Critical" };
//       default:
//         return { variant: "default", label: "Inactive" };
//     }
//   };

//   const getStatusColor = () => {
//     switch (device.status) {
//       case "active":
//         return "#4CAF50";
//       case "warning":
//         return "#FFA726";
//       case "critical":
//         return "#EF5350";
//       default:
//         return "#9E9E9E";
//     }
//   };

//   const badge = getStatusBadge();

//   return (
//     <Animated.View entering={FadeInDown.delay(delay).springify()}>
//       <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
//         <Card style={styles.deviceCard}>
//           <View style={styles.deviceHeader}>
//             <View style={styles.deviceInfo}>
//               <View
//                 style={[
//                   styles.statusDot,
//                   { backgroundColor: getStatusColor() },
//                 ]}
//               />
//               <View style={styles.deviceDetails}>
//                 <Text style={styles.deviceName}>{device.name}</Text>
//                 <View style={styles.locationRow}>
//                   <MapPin size={14} color="#66BB6A" strokeWidth={2} />
//                   <Text style={styles.deviceLocation}>{device.location}</Text>
//                 </View>
//               </View>
//             </View>
//             <Badge
//               label={badge.label}
//               variant={badge.variant as any}
//               size="sm"
//             />
//           </View>

//           <View style={styles.divider} />

//           <View style={styles.deviceFooter}>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoLabel}>Device ID</Text>
//               <Text style={styles.infoValue}>{device.id.slice(0, 8)}...</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoLabel}>Last Update</Text>
//               <Text style={styles.infoValue}>
//                 {device.last_reading_at
//                   ? formatTimeAgo(device.last_reading_at)
//                   : "Never"}
//               </Text>
//             </View>
//           </View>

//           <View style={styles.actionRow}>
//             <View style={styles.viewDetailsRow}>
//               <Text style={styles.viewDetails}>View Details</Text>
//               <ChevronRight size={16} color="#4CAF50" strokeWidth={2.5} />
//             </View>
//           </View>
//         </Card>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// }

// // Helper function
// function formatTimeAgo(dateString: string): string {
//   const date = new Date(dateString);
//   const now = new Date();
//   const diffMs = now.getTime() - date.getTime();
//   const diffMins = Math.floor(diffMs / 60000);

//   if (diffMins < 1) return "Just now";
//   if (diffMins < 60) return `${diffMins}m ago`;

//   const diffHours = Math.floor(diffMins / 60);
//   if (diffHours < 24) return `${diffHours}h ago`;

//   const diffDays = Math.floor(diffHours / 24);
//   return `${diffDays}d ago`;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F1F8E9",
//   },
//   header: {
//     paddingTop: 60,
//     paddingBottom: 30,
//     paddingHorizontal: Layout.spacing.lg,
//   },
//   headerTitle: {
//     fontSize: Layout.fontSize.xxl,
//     fontWeight: "700",
//     color: "#FFFFFF",
//     marginBottom: 4,
//   },
//   headerSubtitle: {
//     fontSize: Layout.fontSize.md,
//     color: "rgba(255,255,255,0.95)",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   content: {
//     paddingHorizontal: Layout.spacing.lg,
//     paddingTop: Layout.spacing.lg,
//   },
//   addButton: {
//     marginBottom: Layout.spacing.lg,
//   },
//   deviceCard: {
//     marginBottom: Layout.spacing.md,
//     padding: Layout.spacing.md,
//   },
//   deviceHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: Layout.spacing.md,
//   },
//   deviceInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   statusDot: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     marginRight: Layout.spacing.sm,
//   },
//   deviceDetails: {
//     flex: 1,
//   },
//   deviceName: {
//     fontSize: Layout.fontSize.lg,
//     fontWeight: "700",
//     color: "#1B5E20",
//     marginBottom: 4,
//   },
//   locationRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },
//   deviceLocation: {
//     fontSize: Layout.fontSize.sm,
//     color: "#558B2F",
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#C8E6C9",
//     marginVertical: Layout.spacing.md,
//   },
//   deviceFooter: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   infoItem: {
//     flex: 1,
//   },
//   infoLabel: {
//     fontSize: 12,
//     color: "#81C784",
//     marginBottom: 4,
//   },
//   infoValue: {
//     fontSize: Layout.fontSize.sm,
//     fontWeight: "600",
//     color: "#2E7D32",
//   },
//   actionRow: {
//     marginTop: Layout.spacing.md,
//     alignItems: "flex-end",
//   },
//   viewDetailsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },
//   viewDetails: {
//     fontSize: Layout.fontSize.sm,
//     color: "#4CAF50",
//     fontWeight: "600",
//   },
//   emptyState: {
//     alignItems: "center",
//     paddingVertical: Layout.spacing.xxl * 2,
//   },
//   emptyTitle: {
//     fontSize: Layout.fontSize.xl,
//     fontWeight: "700",
//     color: "#2E7D32",
//     marginBottom: Layout.spacing.xs,
//     marginTop: Layout.spacing.lg,
//   },
//   emptyText: {
//     fontSize: Layout.fontSize.md,
//     color: "#558B2F",
//     textAlign: "center",
//     paddingHorizontal: Layout.spacing.xl,
//   },
// });

// // app/(tabs)/devices.tsx - UPDATED TO SHOW REAL SUPABASE DATA
// import { Badge } from "@/components/ui/Badge";
// import { Button } from "@/components/ui/Button";
// import { Card } from "@/components/ui/Card";
// import { Layout } from "@/constants/Layout";
// import { useDevices } from "@/hooks/useDevices";
// import spoilageDataService from "@/services/supabase/spoilageData";
// import { Device } from "@/types/device.types";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import {
//   Activity,
//   ChevronRight,
//   MapPin,
//   Smartphone,
//   Thermometer,
// } from "lucide-react-native";
// import React, { useCallback, useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Animated, { FadeInDown } from "react-native-reanimated";

// interface DeviceWithStats extends Device {
//   totalReadings?: number;
//   freshCount?: number;
//   spoiledCount?: number;
//   lastTemperature?: number;
//   lastHumidity?: number;
// }

// export default function DevicesScreen() {
//   const router = useRouter();
//   const { devices, loading, refetch } = useDevices();
//   const [refreshing, setRefreshing] = useState(false);
//   const [devicesWithStats, setDevicesWithStats] = useState<DeviceWithStats[]>(
//     [],
//   );
//   const [statsLoading, setStatsLoading] = useState(false);

//   /**
//    * 🆕 Load statistics for each device from Supabase
//    */
//   const loadDeviceStatistics = useCallback(async () => {
//     if (devices.length === 0) {
//       setDevicesWithStats([]);
//       return;
//     }

//     setStatsLoading(true);
//     try {
//       const devicesWithData = await Promise.all(
//         devices.map(async (device) => {
//           try {
//             // Get statistics for this device
//             const stats = await spoilageDataService.getStatistics(device.id);

//             // Get latest reading for temperature/humidity
//             const latestReading = await spoilageDataService.getLatestReading(
//               device.id,
//             );

//             return {
//               ...device,
//               totalReadings: stats.totalReadings || 0,
//               freshCount: stats.freshCount || 0,
//               spoiledCount: stats.spoiledCount || 0,
//               lastTemperature: latestReading?.ai_temperature,
//               lastHumidity: latestReading?.ai_humidity,
//             };
//           } catch (err) {
//             console.error(`Error loading stats for device ${device.id}:`, err);
//             return {
//               ...device,
//               totalReadings: 0,
//               freshCount: 0,
//               spoiledCount: 0,
//             };
//           }
//         }),
//       );

//       setDevicesWithStats(devicesWithData);
//       console.log("📊 Device statistics loaded:", devicesWithData);
//     } catch (err) {
//       console.error("❌ Error loading device statistics:", err);
//       setDevicesWithStats(devices);
//     } finally {
//       setStatsLoading(false);
//     }
//   }, [devices]);

//   /**
//    * Enhanced refresh
//    */
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await refetch(); // This will trigger useEffect to reload stats
//     setRefreshing(false);
//   };

//   /**
//    * Load statistics when devices change
//    */
//   useEffect(() => {
//     loadDeviceStatistics();
//   }, [loadDeviceStatistics]);

//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <LinearGradient
//         colors={["#66BB6A", "#4CAF50", "#388E3C"]}
//         style={styles.header}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <Text style={styles.headerTitle}>My Devices</Text>
//         <Text style={styles.headerSubtitle}>
//           {devices.length} device{devices.length !== 1 ? "s" : ""} registered
//           {devicesWithStats.length > 0 &&
//             ` · ${devicesWithStats.reduce((sum, d) => sum + (d.totalReadings || 0), 0)} total readings`}
//         </Text>
//       </LinearGradient>

//       <ScrollView
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             tintColor="#4CAF50"
//             colors={["#4CAF50"]}
//           />
//         }
//       >
//         <View style={styles.content}>
//           {/* Add Device Button */}
//           <Animated.View entering={FadeInDown.delay(100).springify()}>
//             <Button
//               title="+ Add New Device"
//               onPress={() => router.push("/device/add-device")}
//               variant="outline"
//               style={styles.addButton}
//             />
//           </Animated.View>

//           {/* Loading State */}
//           {statsLoading && devices.length > 0 && (
//             <View style={styles.loadingContainer}>
//               <ActivityIndicator size="small" color="#4CAF50" />
//               <Text style={styles.loadingText}>
//                 Loading device statistics...
//               </Text>
//             </View>
//           )}

//           {/* Devices List with REAL DATA */}
//           {devicesWithStats.map((device: DeviceWithStats, index: number) => (
//             <DeviceCard
//               key={device.id}
//               device={device}
//               delay={index * 100 + 200}
//               onPress={() => router.push(`/device/${device.id}`)}
//             />
//           ))}

//           {/* Empty State */}
//           {devices.length === 0 && !loading && (
//             <Animated.View
//               entering={FadeInDown.delay(300).springify()}
//               style={styles.emptyState}
//             >
//               <Smartphone size={80} color="#A5D6A7" strokeWidth={1.5} />
//               <Text style={styles.emptyTitle}>No Devices Yet</Text>
//               <Text style={styles.emptyText}>
//                 Add your first ESP32-CAM device to start monitoring your
//                 vegetables
//               </Text>
//             </Animated.View>
//           )}
//         </View>

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </View>
//   );
// }

// // Enhanced Device Card Component - Shows REAL Supabase Data
// function DeviceCard({
//   device,
//   delay,
//   onPress,
// }: {
//   device: DeviceWithStats;
//   delay: number;
//   onPress: () => void;
// }) {
//   const getStatusBadge = () => {
//     switch (device.status) {
//       case "active":
//         return { variant: "success", label: "Active" };
//       case "warning":
//         return { variant: "warning", label: "Warning" };
//       case "critical":
//         return { variant: "danger", label: "Critical" };
//       default:
//         return { variant: "default", label: "Inactive" };
//     }
//   };

//   const getStatusColor = () => {
//     switch (device.status) {
//       case "active":
//         return "#4CAF50";
//       case "warning":
//         return "#FFA726";
//       case "critical":
//         return "#EF5350";
//       default:
//         return "#9E9E9E";
//     }
//   };

//   const badge = getStatusBadge();
//   const hasData = (device.totalReadings || 0) > 0;

//   return (
//     <Animated.View entering={FadeInDown.delay(delay).springify()}>
//       <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
//         <Card style={styles.deviceCard}>
//           {/* Header */}
//           <View style={styles.deviceHeader}>
//             <View style={styles.deviceInfo}>
//               <View
//                 style={[
//                   styles.statusDot,
//                   { backgroundColor: getStatusColor() },
//                 ]}
//               />
//               <View style={styles.deviceDetails}>
//                 <Text style={styles.deviceName}>{device.name}</Text>
//                 <View style={styles.locationRow}>
//                   <MapPin size={14} color="#66BB6A" strokeWidth={2} />
//                   <Text style={styles.deviceLocation}>{device.location}</Text>
//                 </View>
//               </View>
//             </View>
//             <Badge
//               label={badge.label}
//               variant={badge.variant as any}
//               size="sm"
//             />
//           </View>

//           {/* 🆕 Real-time Statistics Row */}
//           {hasData && (
//             <View style={styles.statsRow}>
//               <View style={styles.statItem}>
//                 <Activity size={16} color="#4CAF50" />
//                 <Text style={styles.statValue}>
//                   {device.totalReadings || 0}
//                 </Text>
//                 <Text style={styles.statLabel}>readings</Text>
//               </View>

//               <View style={styles.statDivider} />

//               <View style={styles.statItem}>
//                 <View
//                   style={[styles.statDot, { backgroundColor: "#66BB6A" }]}
//                 />
//                 <Text style={styles.statValue}>{device.freshCount || 0}</Text>
//                 <Text style={styles.statLabel}>fresh</Text>
//               </View>

//               <View style={styles.statDivider} />

//               <View style={styles.statItem}>
//                 <View
//                   style={[styles.statDot, { backgroundColor: "#EF5350" }]}
//                 />
//                 <Text style={styles.statValue}>{device.spoiledCount || 0}</Text>
//                 <Text style={styles.statLabel}>spoiled</Text>
//               </View>
//             </View>
//           )}

//           {/* 🆕 Latest Sensor Readings (if available) */}
//           {device.lastTemperature !== undefined &&
//             device.lastHumidity !== undefined && (
//               <View style={styles.sensorsRow}>
//                 <View style={styles.sensorItem}>
//                   <Thermometer size={14} color="#FF9800" />
//                   <Text style={styles.sensorValue}>
//                     {device.lastTemperature.toFixed(1)}°C
//                   </Text>
//                 </View>
//                 <View style={styles.sensorItem}>
//                   <Text style={styles.sensorIcon}>💧</Text>
//                   <Text style={styles.sensorValue}>
//                     {device.lastHumidity.toFixed(1)}%
//                   </Text>
//                 </View>
//               </View>
//             )}

//           <View style={styles.divider} />

//           {/* Footer */}
//           <View style={styles.deviceFooter}>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoLabel}>Device ID</Text>
//               <Text style={styles.infoValue}>{device.id.slice(0, 8)}...</Text>
//             </View>
//             <View style={styles.infoItem}>
//               <Text style={styles.infoLabel}>Last Update</Text>
//               <Text style={styles.infoValue}>
//                 {device.last_reading_at
//                   ? formatTimeAgo(device.last_reading_at)
//                   : "Never"}
//               </Text>
//             </View>
//           </View>

//           <View style={styles.actionRow}>
//             <View style={styles.viewDetailsRow}>
//               <Text style={styles.viewDetails}>View Details</Text>
//               <ChevronRight size={16} color="#4CAF50" strokeWidth={2.5} />
//             </View>
//           </View>
//         </Card>
//       </TouchableOpacity>
//     </Animated.View>
//   );
// }

// // Helper function
// function formatTimeAgo(dateString: string): string {
//   const date = new Date(dateString);
//   const now = new Date();
//   const diffMs = now.getTime() - date.getTime();
//   const diffMins = Math.floor(diffMs / 60000);

//   if (diffMins < 1) return "Just now";
//   if (diffMins < 60) return `${diffMins}m ago`;

//   const diffHours = Math.floor(diffMins / 60);
//   if (diffHours < 24) return `${diffHours}h ago`;

//   const diffDays = Math.floor(diffHours / 24);
//   if (diffDays < 7) return `${diffDays}d ago`;

//   return date.toLocaleDateString();
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F1F8E9",
//   },
//   header: {
//     paddingTop: 60,
//     paddingBottom: 30,
//     paddingHorizontal: Layout.spacing.lg,
//   },
//   headerTitle: {
//     fontSize: Layout.fontSize.xxl,
//     fontWeight: "700",
//     color: "#FFFFFF",
//     marginBottom: 4,
//   },
//   headerSubtitle: {
//     fontSize: Layout.fontSize.sm,
//     color: "rgba(255,255,255,0.95)",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   content: {
//     paddingHorizontal: Layout.spacing.lg,
//     paddingTop: Layout.spacing.lg,
//   },
//   addButton: {
//     marginBottom: Layout.spacing.lg,
//   },
//   loadingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: Layout.spacing.md,
//     gap: Layout.spacing.sm,
//   },
//   loadingText: {
//     fontSize: Layout.fontSize.sm,
//     color: "#558B2F",
//   },
//   deviceCard: {
//     marginBottom: Layout.spacing.md,
//     padding: Layout.spacing.md,
//   },
//   deviceHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     marginBottom: Layout.spacing.md,
//   },
//   deviceInfo: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   statusDot: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     marginRight: Layout.spacing.sm,
//   },
//   deviceDetails: {
//     flex: 1,
//   },
//   deviceName: {
//     fontSize: Layout.fontSize.lg,
//     fontWeight: "700",
//     color: "#1B5E20",
//     marginBottom: 4,
//   },
//   locationRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },
//   deviceLocation: {
//     fontSize: Layout.fontSize.sm,
//     color: "#558B2F",
//   },
//   statsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-around",
//     backgroundColor: "#F1F8E9",
//     borderRadius: 8,
//     padding: Layout.spacing.sm,
//     marginBottom: Layout.spacing.sm,
//   },
//   statItem: {
//     flex: 1,
//     alignItems: "center",
//     gap: 4,
//   },
//   statDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#2E7D32",
//   },
//   statLabel: {
//     fontSize: 10,
//     color: "#81C784",
//   },
//   statDivider: {
//     width: 1,
//     height: 30,
//     backgroundColor: "#C8E6C9",
//   },
//   sensorsRow: {
//     flexDirection: "row",
//     gap: Layout.spacing.md,
//     marginBottom: Layout.spacing.sm,
//   },
//   sensorItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//     backgroundColor: "#FFFFFF",
//     paddingHorizontal: Layout.spacing.sm,
//     paddingVertical: 6,
//     borderRadius: 6,
//     borderWidth: 1,
//     borderColor: "#E8F5E9",
//   },
//   sensorIcon: {
//     fontSize: 14,
//   },
//   sensorValue: {
//     fontSize: Layout.fontSize.sm,
//     fontWeight: "600",
//     color: "#2E7D32",
//   },
//   divider: {
//     height: 1,
//     backgroundColor: "#C8E6C9",
//     marginVertical: Layout.spacing.md,
//   },
//   deviceFooter: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   infoItem: {
//     flex: 1,
//   },
//   infoLabel: {
//     fontSize: 12,
//     color: "#81C784",
//     marginBottom: 4,
//   },
//   infoValue: {
//     fontSize: Layout.fontSize.sm,
//     fontWeight: "600",
//     color: "#2E7D32",
//   },
//   actionRow: {
//     marginTop: Layout.spacing.md,
//     alignItems: "flex-end",
//   },
//   viewDetailsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 4,
//   },
//   viewDetails: {
//     fontSize: Layout.fontSize.sm,
//     color: "#4CAF50",
//     fontWeight: "600",
//   },
//   emptyState: {
//     alignItems: "center",
//     paddingVertical: Layout.spacing.xxl * 2,
//   },
//   emptyTitle: {
//     fontSize: Layout.fontSize.xl,
//     fontWeight: "700",
//     color: "#2E7D32",
//     marginBottom: Layout.spacing.xs,
//     marginTop: Layout.spacing.lg,
//   },
//   emptyText: {
//     fontSize: Layout.fontSize.md,
//     color: "#558B2F",
//     textAlign: "center",
//     paddingHorizontal: Layout.spacing.xl,
//   },
// });

// app/(tabs)/devices.tsx - HYBRID DEVICES SCREEN
// Shows device UI with REAL spoilage statistics

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Layout } from "@/constants/Layout";
import { useDevices } from "@/hooks/useDevices";
import spoilageDataService from "@/services/supabase/spoilageData";
import { Device } from "@/types/device.types";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Activity,
  ChevronRight,
  MapPin,
  Smartphone,
  Thermometer,
} from "lucide-react-native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface DeviceWithStats extends Device {
  totalReadings?: number;
  freshCount?: number;
  spoiledCount?: number;
  lastTemperature?: number;
  lastHumidity?: number;
  vegetableType?: string;
  freshnessScore?: number;
}

export default function DevicesScreen() {
  const router = useRouter();
  const { devices, loading, refetch, realStats } = useDevices();
  const [refreshing, setRefreshing] = useState(false);
  const [devicesWithStats, setDevicesWithStats] = useState<DeviceWithStats[]>(
    [],
  );
  const [statsLoading, setStatsLoading] = useState(false);

  /**
   * Load real statistics for devices
   */
  const loadDeviceStatistics = useCallback(async () => {
    if (devices.length === 0) {
      setDevicesWithStats([]);
      return;
    }

    setStatsLoading(true);
    try {
      // Get latest reading for AI data
      const latestReading = await spoilageDataService.getLatestReadingGlobal();

      // Enrich devices with real stats
      const enrichedDevices = devices.map((device) => ({
        ...device,
        totalReadings: realStats.totalReadings || 0,
        freshCount: realStats.freshCount || 0,
        spoiledCount: realStats.spoiledCount || 0,
        lastTemperature: latestReading?.ai_temperature,
        lastHumidity: latestReading?.ai_humidity,
        vegetableType: latestReading?.ai_vegetable_type,
        freshnessScore: latestReading?.ai_freshness_score,
      }));

      setDevicesWithStats(enrichedDevices);
      console.log("📊 Devices enriched with real stats:", enrichedDevices);
    } catch (err) {
      console.error("❌ Error loading device statistics:", err);
      setDevicesWithStats(devices);
    } finally {
      setStatsLoading(false);
    }
  }, [devices, realStats]);

  /**
   * Enhanced refresh
   */
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  /**
   * Load statistics when devices or realStats change
   */
  useEffect(() => {
    loadDeviceStatistics();
  }, [loadDeviceStatistics]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#66BB6A", "#4CAF50", "#388E3C"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>My Devices</Text>
        <Text style={styles.headerSubtitle}>
          {devices.length} device{devices.length !== 1 ? "s" : ""} registered
          {realStats.totalReadings > 0 &&
            ` · ${realStats.totalReadings} total readings`}
        </Text>
      </LinearGradient>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#4CAF50"
            colors={["#4CAF50"]}
          />
        }
      >
        <View style={styles.content}>
          {/* Add Device Button */}
          <Animated.View entering={FadeInDown.delay(100).springify()}>
            <Button
              title="+ Add New Device"
              onPress={() => router.push("/device/add-device")}
              variant="outline"
              style={styles.addButton}
            />
          </Animated.View>

          {/* Loading State */}
          {statsLoading && devices.length > 0 && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#4CAF50" />
              <Text style={styles.loadingText}>
                Loading device statistics...
              </Text>
            </View>
          )}

          {/* Devices List with REAL DATA */}
          {devicesWithStats.map((device: DeviceWithStats, index: number) => (
            <DeviceCard
              key={device.id}
              device={device}
              delay={index * 100 + 200}
              onPress={() => router.push(`/device/${device.id}`)}
            />
          ))}

          {/* Empty State */}
          {devices.length === 0 && !loading && (
            <Animated.View
              entering={FadeInDown.delay(300).springify()}
              style={styles.emptyState}
            >
              <Smartphone size={80} color="#A5D6A7" strokeWidth={1.5} />
              <Text style={styles.emptyTitle}>No Devices Yet</Text>
              <Text style={styles.emptyText}>
                Add your first device to start monitoring your vegetables
              </Text>
            </Animated.View>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// Enhanced Device Card Component - Shows REAL Supabase Data
function DeviceCard({
  device,
  delay,
  onPress,
}: {
  device: DeviceWithStats;
  delay: number;
  onPress: () => void;
}) {
  const getStatusBadge = () => {
    switch (device.status) {
      case "active":
        return { variant: "success", label: "Active" };
      case "warning":
        return { variant: "warning", label: "Warning" };
      case "critical":
        return { variant: "danger", label: "Critical" };
      default:
        return { variant: "default", label: "Inactive" };
    }
  };

  const getStatusColor = () => {
    switch (device.status) {
      case "active":
        return "#4CAF50";
      case "warning":
        return "#FFA726";
      case "critical":
        return "#EF5350";
      default:
        return "#9E9E9E";
    }
  };

  const badge = getStatusBadge();
  const hasData = (device.totalReadings || 0) > 0;

  return (
    <Animated.View entering={FadeInDown.delay(delay).springify()}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Card style={styles.deviceCard}>
          {/* Header */}
          <View style={styles.deviceHeader}>
            <View style={styles.deviceInfo}>
              <View
                style={[
                  styles.statusDot,
                  { backgroundColor: getStatusColor() },
                ]}
              />
              <View style={styles.deviceDetails}>
                <Text style={styles.deviceName}>{device.name}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={14} color="#66BB6A" strokeWidth={2} />
                  <Text style={styles.deviceLocation}>{device.location}</Text>
                </View>
              </View>
            </View>
            <Badge
              label={badge.label}
              variant={badge.variant as any}
              size="sm"
            />
          </View>

          {/* Real-time Statistics Row */}
          {hasData && (
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Activity size={16} color="#4CAF50" />
                <Text style={styles.statValue}>
                  {device.totalReadings || 0}
                </Text>
                <Text style={styles.statLabel}>readings</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <View
                  style={[styles.statDot, { backgroundColor: "#66BB6A" }]}
                />
                <Text style={styles.statValue}>{device.freshCount || 0}</Text>
                <Text style={styles.statLabel}>fresh</Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.statItem}>
                <View
                  style={[styles.statDot, { backgroundColor: "#EF5350" }]}
                />
                <Text style={styles.statValue}>{device.spoiledCount || 0}</Text>
                <Text style={styles.statLabel}>spoiled</Text>
              </View>
            </View>
          )}

          {/* Latest Sensor Readings (AI Generated) */}
          {device.lastTemperature !== undefined &&
            device.lastHumidity !== undefined && (
              <View style={styles.sensorsRow}>
                <View style={styles.sensorItem}>
                  <Thermometer size={14} color="#FF9800" />
                  <Text style={styles.sensorValue}>
                    {device.lastTemperature.toFixed(1)}°C
                  </Text>
                </View>
                <View style={styles.sensorItem}>
                  <Text style={styles.sensorIcon}>💧</Text>
                  <Text style={styles.sensorValue}>
                    {device.lastHumidity.toFixed(1)}%
                  </Text>
                </View>
              </View>
            )}

          {/* Vegetable Info (if available) */}
          {device.vegetableType && (
            <View style={styles.vegetableRow}>
              <Text style={styles.vegetableLabel}>Monitoring:</Text>
              <Text style={styles.vegetableValue}>{device.vegetableType}</Text>
              {device.freshnessScore && (
                <View style={styles.freshnessContainer}>
                  <Text style={styles.freshnessLabel}>Freshness:</Text>
                  <Text style={styles.freshnessValue}>
                    {device.freshnessScore}%
                  </Text>
                </View>
              )}
            </View>
          )}

          <View style={styles.divider} />

          {/* Footer */}
          <View style={styles.deviceFooter}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Device ID</Text>
              <Text style={styles.infoValue}>{device.id.slice(0, 12)}...</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Last Update</Text>
              <Text style={styles.infoValue}>
                {device.last_reading_at
                  ? formatTimeAgo(device.last_reading_at)
                  : "Never"}
              </Text>
            </View>
          </View>

          <View style={styles.actionRow}>
            <View style={styles.viewDetailsRow}>
              <Text style={styles.viewDetails}>View Details</Text>
              <ChevronRight size={16} color="#4CAF50" strokeWidth={2.5} />
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );
}

// Helper function
function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F8E9",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: Layout.spacing.lg,
  },
  headerTitle: {
    fontSize: Layout.fontSize.xxl,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: Layout.fontSize.sm,
    color: "rgba(255,255,255,0.95)",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: Layout.spacing.lg,
  },
  addButton: {
    marginBottom: Layout.spacing.lg,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Layout.spacing.md,
    gap: Layout.spacing.sm,
  },
  loadingText: {
    fontSize: Layout.fontSize.sm,
    color: "#558B2F",
  },
  deviceCard: {
    marginBottom: Layout.spacing.md,
    padding: Layout.spacing.md,
  },
  deviceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Layout.spacing.md,
  },
  deviceInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: Layout.spacing.sm,
  },
  deviceDetails: {
    flex: 1,
  },
  deviceName: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  deviceLocation: {
    fontSize: Layout.fontSize.sm,
    color: "#558B2F",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#F1F8E9",
    borderRadius: 8,
    padding: Layout.spacing.sm,
    marginBottom: Layout.spacing.sm,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  statDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
  },
  statLabel: {
    fontSize: 10,
    color: "#81C784",
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#C8E6C9",
  },
  sensorsRow: {
    flexDirection: "row",
    gap: Layout.spacing.md,
    marginBottom: Layout.spacing.sm,
  },
  sensorItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E8F5E9",
  },
  sensorIcon: {
    fontSize: 14,
  },
  sensorValue: {
    fontSize: Layout.fontSize.sm,
    fontWeight: "600",
    color: "#2E7D32",
  },
  vegetableRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: Layout.spacing.sm,
    backgroundColor: "#E8F5E9",
    padding: Layout.spacing.sm,
    borderRadius: 8,
  },
  vegetableLabel: {
    fontSize: Layout.fontSize.sm,
    color: "#558B2F",
  },
  vegetableValue: {
    fontSize: Layout.fontSize.sm,
    fontWeight: "700",
    color: "#2E7D32",
  },
  freshnessContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: "auto",
  },
  freshnessLabel: {
    fontSize: Layout.fontSize.sm,
    color: "#558B2F",
  },
  freshnessValue: {
    fontSize: Layout.fontSize.sm,
    fontWeight: "700",
    color: "#4CAF50",
  },
  divider: {
    height: 1,
    backgroundColor: "#C8E6C9",
    marginVertical: Layout.spacing.md,
  },
  deviceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#81C784",
    marginBottom: 4,
  },
  infoValue: {
    fontSize: Layout.fontSize.sm,
    fontWeight: "600",
    color: "#2E7D32",
  },
  actionRow: {
    marginTop: Layout.spacing.md,
    alignItems: "flex-end",
  },
  viewDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  viewDetails: {
    fontSize: Layout.fontSize.sm,
    color: "#4CAF50",
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: Layout.spacing.xxl * 2,
  },
  emptyTitle: {
    fontSize: Layout.fontSize.xl,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: Layout.spacing.xs,
    marginTop: Layout.spacing.lg,
  },
  emptyText: {
    fontSize: Layout.fontSize.md,
    color: "#558B2F",
    textAlign: "center",
    paddingHorizontal: Layout.spacing.xl,
  },
});
