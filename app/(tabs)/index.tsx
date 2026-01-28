// // app/(tabs)/index.tsx
// import { Badge } from "@/components/ui/Badge";
// import { Card } from "@/components/ui/Card";
// import { Layout } from "@/constants/Layout";
// import { useAlerts } from "@/hooks/useAlerts";
// import { useDevices } from "@/hooks/useDevices";
// import { Device } from "@/types/device.types";
// import { MOCK_CHART_DATA } from "@/utils/mockData";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import {
//   AlertOctagon,
//   AlertTriangle,
//   BarChart3,
//   Bell,
//   CheckCircle,
//   Plus,
//   Settings,
//   Smartphone,
// } from "lucide-react-native";
// import React from "react";
// import {
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

// export default function DashboardScreen() {
//   const router = useRouter();
//   const { devices, refetch } = useDevices();
//   const { alerts, unreadCount } = useAlerts();
//   const [refreshing, setRefreshing] = React.useState(false);

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await refetch();
//     setRefreshing(false);
//   };

//   const stats = {
//     totalDevices: devices.length,
//     activeDevices: devices.filter((d: Device) => d.status === "active").length,
//     criticalAlerts: alerts.filter(
//       (a) => a.severity === "critical" && !a.is_read,
//     ).length,
//     warningDevices: devices.filter((d: Device) => d.status === "warning")
//       .length,
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
//         <View style={styles.headerContent}>
//           <View>
//             <View style={styles.greetingContainer}></View>
//             <Text style={styles.headerTitle}>Dashboard</Text>
//           </View>
//           <TouchableOpacity style={styles.notificationBadge}>
//             <Bell size={20} color="#FFFFFF" />
//             {unreadCount > 0 && (
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>{unreadCount}</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>
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
//         {/* Stats Cards */}
//         <View style={styles.statsContainer}>
//           <Animated.View
//             entering={FadeInRight.delay(100).springify()}
//             style={styles.statRow}
//           >
//             <StatCard
//               Icon={Smartphone}
//               label="Total Devices"
//               value={stats.totalDevices}
//               color="#4CAF50"
//               onPress={() => router.push("/(tabs)/devices")}
//             />
//             <StatCard
//               Icon={CheckCircle}
//               label="Active"
//               value={stats.activeDevices}
//               color="#66BB6A"
//               onPress={() => router.push("/(tabs)/devices")}
//             />
//           </Animated.View>

//           <Animated.View
//             entering={FadeInRight.delay(200).springify()}
//             style={styles.statRow}
//           >
//             <StatCard
//               Icon={AlertTriangle}
//               label="Warnings"
//               value={stats.warningDevices}
//               color="#FFA726"
//               onPress={() => router.push("/(tabs)/alerts")}
//             />
//             <StatCard
//               Icon={AlertOctagon}
//               label="Critical"
//               value={stats.criticalAlerts}
//               color="#EF5350"
//               onPress={() => router.push("/(tabs)/alerts")}
//             />
//           </Animated.View>
//         </View>

//         {/* Spoilage Trends */}
//         <Animated.View entering={FadeInDown.delay(300).springify()}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Spoilage Trends</Text>
//             <TouchableOpacity>
//               <Text style={styles.seeAll}>This Week</Text>
//             </TouchableOpacity>
//           </View>

//           <Card style={styles.chartCard}>
//             <SimpleBarChart data={MOCK_CHART_DATA} />
//           </Card>
//         </Animated.View>

//         {/* Recent Alerts */}
//         <Animated.View entering={FadeInDown.delay(400).springify()}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Recent Alerts</Text>
//             <TouchableOpacity onPress={() => router.push("/(tabs)/alerts")}>
//               <Text style={styles.seeAll}>See All</Text>
//             </TouchableOpacity>
//           </View>

//           {alerts.slice(0, 3).map((alert, index) => (
//             <AlertCard key={alert.id} alert={alert} delay={index * 100} />
//           ))}
//         </Animated.View>

//         {/* Quick Actions */}
//         <Animated.View entering={FadeInDown.delay(500).springify()}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Quick Actions</Text>
//           </View>

//           <View style={styles.actionsContainer}>
//             <ActionButton
//               Icon={Plus}
//               label="Add Device"
//               onPress={() => router.push("/device/add-device")}
//             />
//             <ActionButton Icon={BarChart3} label="Reports" onPress={() => {}} />
//             <ActionButton
//               Icon={Settings}
//               label="Settings"
//               onPress={() => router.push("/(tabs)/profile")}
//             />
//           </View>
//         </Animated.View>

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </View>
//   );
// }

// // Stat Card Component
// function StatCard({ Icon, label, value, color, onPress }: any) {
//   return (
//     <TouchableOpacity
//       style={styles.statCard}
//       onPress={onPress}
//       activeOpacity={0.7}
//     >
//       <Card style={styles.statCardInner}>
//         <View style={[styles.statIcon, { backgroundColor: color + "20" }]}>
//           <Icon size={24} color={color} />
//         </View>
//         <Text style={styles.statValue}>{value}</Text>
//         <Text style={styles.statLabel}>{label}</Text>
//       </Card>
//     </TouchableOpacity>
//   );
// }

// // Alert Card Component
// function AlertCard({ alert, delay }: any) {
//   const getSeverityColor = () => {
//     switch (alert.severity) {
//       case "critical":
//         return "danger";
//       case "high":
//         return "warning";
//       case "medium":
//         return "info";
//       default:
//         return "default";
//     }
//   };

//   return (
//     <Animated.View entering={FadeInDown.delay(delay).springify()}>
//       <Card style={styles.alertCard}>
//         <View style={styles.alertHeader}>
//           <Badge
//             label={alert.severity}
//             variant={getSeverityColor()}
//             size="sm"
//           />
//           <Text style={styles.alertTime}>
//             {new Date(alert.created_at).toLocaleTimeString("en-US", {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </Text>
//         </View>
//         <Text style={styles.alertMessage} numberOfLines={2}>
//           {alert.message}
//         </Text>
//       </Card>
//     </Animated.View>
//   );
// }

// // Action Button
// function ActionButton({ Icon, label, onPress }: any) {
//   return (
//     <TouchableOpacity
//       style={styles.actionButton}
//       onPress={onPress}
//       activeOpacity={0.7}
//     >
//       <View style={styles.actionIcon}>
//         <Icon size={28} color="#2E7D32" />
//       </View>
//       <Text style={styles.actionLabel}>{label}</Text>
//     </TouchableOpacity>
//   );
// }

// // Simple Bar Chart
// function SimpleBarChart({ data }: any) {
//   const maxValue = Math.max(
//     ...data.map((d: any) => d.fresh + d.warning + d.spoiled),
//   );

//   return (
//     <View style={styles.chart}>
//       {data.map((item: any, index: number) => {
//         const freshHeight = (item.fresh / maxValue) * 120;
//         const warningHeight = (item.warning / maxValue) * 120;
//         const spoiledHeight = (item.spoiled / maxValue) * 120;

//         return (
//           <View key={index} style={styles.chartBar}>
//             <View style={styles.barStack}>
//               {spoiledHeight > 0 && (
//                 <View
//                   style={[
//                     styles.barSegment,
//                     {
//                       height: spoiledHeight,
//                       backgroundColor: "#EF5350",
//                     },
//                   ]}
//                 />
//               )}
//               {warningHeight > 0 && (
//                 <View
//                   style={[
//                     styles.barSegment,
//                     {
//                       height: warningHeight,
//                       backgroundColor: "#FFA726",
//                     },
//                   ]}
//                 />
//               )}
//               {freshHeight > 0 && (
//                 <View
//                   style={[
//                     styles.barSegment,
//                     {
//                       height: freshHeight,
//                       backgroundColor: "#66BB6A",
//                     },
//                   ]}
//                 />
//               )}
//             </View>
//             <Text style={styles.chartLabel}>{item.date}</Text>
//           </View>
//         );
//       })}
//     </View>
//   );
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
//   headerContent: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   greetingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   greeting: {
//     fontSize: Layout.fontSize.sm,
//     color: "rgba(255,255,255,0.95)",
//   },
//   headerTitle: {
//     fontSize: Layout.fontSize.xxl,
//     fontWeight: "700",
//     color: "#FFFFFF",
//   },
//   notificationBadge: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: "rgba(255,255,255,0.25)",
//     alignItems: "center",
//     justifyContent: "center",
//     position: "relative",
//   },
//   badge: {
//     position: "absolute",
//     top: -4,
//     right: -4,
//     backgroundColor: "#EF5350",
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   badgeText: {
//     color: "#FFFFFF",
//     fontSize: 10,
//     fontWeight: "700",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   statsContainer: {
//     paddingHorizontal: Layout.spacing.lg,
//     marginTop: -20,
//   },
//   statRow: {
//     flexDirection: "row",
//     gap: Layout.spacing.md,
//     marginBottom: Layout.spacing.md,
//   },
//   statCard: {
//     flex: 1,
//   },
//   statCardInner: {
//     alignItems: "center",
//     paddingVertical: Layout.spacing.lg,
//   },
//   statIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: Layout.spacing.sm,
//   },
//   statValue: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#1B5E20",
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: Layout.fontSize.sm,
//     color: "#558B2F",
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: Layout.spacing.lg,
//     marginTop: Layout.spacing.xl,
//     marginBottom: Layout.spacing.md,
//   },
//   sectionTitle: {
//     fontSize: Layout.fontSize.lg,
//     fontWeight: "700",
//     color: "#2E7D32",
//   },
//   seeAll: {
//     fontSize: Layout.fontSize.sm,
//     color: "#4CAF50",
//     fontWeight: "600",
//   },
//   chartCard: {
//     marginHorizontal: Layout.spacing.lg,
//     padding: Layout.spacing.lg,
//   },
//   chart: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     height: 150,
//   },
//   chartBar: {
//     alignItems: "center",
//     flex: 1,
//   },
//   barStack: {
//     width: "70%",
//     flexDirection: "column-reverse",
//     alignItems: "center",
//     gap: 2,
//   },
//   barSegment: {
//     width: "100%",
//     borderRadius: 4,
//   },
//   chartLabel: {
//     fontSize: 10,
//     color: "#81C784",
//     marginTop: 8,
//   },
//   alertCard: {
//     marginHorizontal: Layout.spacing.lg,
//     marginBottom: Layout.spacing.sm,
//   },
//   alertHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: Layout.spacing.xs,
//   },
//   alertTime: {
//     fontSize: 12,
//     color: "#81C784",
//   },
//   alertMessage: {
//     fontSize: Layout.fontSize.sm,
//     color: "#558B2F",
//     lineHeight: 20,
//   },
//   actionsContainer: {
//     flexDirection: "row",
//     paddingHorizontal: Layout.spacing.lg,
//     gap: Layout.spacing.md,
//   },
//   actionButton: {
//     flex: 1,
//     alignItems: "center",
//   },
//   actionIcon: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: Layout.spacing.xs,
//     borderWidth: 2,
//     borderColor: "#C8E6C9",
//   },
//   actionLabel: {
//     fontSize: 12,
//     color: "#558B2F",
//     fontWeight: "500",
//     textAlign: "center",
//   },
// });
// app/(tabs)/index.tsx
// ✅ Updated to use AI-generated alerts and dynamic data from spoilage readings

// actual

// import ConnectionTest from "@/components/dashboard/ConnectionTest";
// import { Badge } from "@/components/ui/Badge";
// import { Card } from "@/components/ui/Card";
// import { Config } from "@/constants/Config";
// import { Layout } from "@/constants/Layout";

// import { useAlerts } from "@/hooks/useAlerts";
// import { useDevices } from "@/hooks/useDevices";
// import spoilageDataService from "@/services/supabase/spoilageData";
// import { Device } from "@/types/device.types";
// import { MOCK_CHART_DATA } from "@/utils/mockData";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import {
//   AlertOctagon,
//   AlertTriangle,
//   BarChart3,
//   Bell,
//   CheckCircle,
//   Plus,
//   Settings,
//   Smartphone,
// } from "lucide-react-native";
// import React, { useCallback, useEffect, useState } from "react";
// import {
//   RefreshControl,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

// export default function DashboardScreen() {
//   const router = useRouter();
//   const { devices, refetch } = useDevices();
//   const { alerts, unreadCount, checkForNewAlerts } = useAlerts();
//   const [refreshing, setRefreshing] = useState(false);
//   const [chartData, setChartData] = useState(MOCK_CHART_DATA);

//   /**
//    * 🆕 Load chart data from real spoilage readings
//    */
//   const loadChartData = useCallback(async () => {
//     if (Config.dev.mockData || devices.length === 0) {
//       setChartData(MOCK_CHART_DATA);
//       return;
//     }

//     try {
//       // Get chart data from first device (or combine multiple devices)
//       const data = await spoilageDataService.getChartData(devices[0].id, 7);
//       if (data && data.length > 0) {
//         setChartData(data);
//       }
//     } catch (err) {
//       console.error("Error loading chart data:", err);
//     }
//   }, [devices]);

//   /**
//    * 🆕 Enhanced refresh - fetches devices + checks for new alerts + updates chart
//    */
//   const onRefresh = async () => {
//     setRefreshing(true);
//     await refetch(); // Fetch devices
//     await checkForNewAlerts(); // Check for new AI-generated alerts
//     await loadChartData(); // Update chart data
//     setRefreshing(false);
//   };

//   /**
//    * Load chart data on mount and when devices change
//    */
//   useEffect(() => {
//     loadChartData();
//   }, [loadChartData]);

//   const stats = {
//     totalDevices: devices.length,
//     activeDevices: devices.filter((d: Device) => d.status === "active").length,
//     criticalAlerts: alerts.filter(
//       (a) => a.severity === "critical" && !a.is_read,
//     ).length,
//     warningDevices: devices.filter((d: Device) => d.status === "warning")
//       .length,
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
//         <View style={styles.headerContent}>
//           <View>
//             <View style={styles.greetingContainer}></View>
//             <Text style={styles.headerTitle}>Dashboard</Text>
//           </View>
//           <TouchableOpacity
//             style={styles.notificationBadge}
//             onPress={() => router.push("/(tabs)/alerts")}
//           >
//             <Bell size={20} color="#FFFFFF" />
//             {unreadCount > 0 && (
//               <View style={styles.badge}>
//                 <Text style={styles.badgeText}>{unreadCount}</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>
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
//         {/* Stats Cards */}
//         <View style={styles.statsContainer}>
//           <Animated.View
//             entering={FadeInRight.delay(100).springify()}
//             style={styles.statRow}
//           >
//             <StatCard
//               Icon={Smartphone}
//               label="Total Devices"
//               value={stats.totalDevices}
//               color="#4CAF50"
//               onPress={() => router.push("/(tabs)/devices")}
//             />
//             <StatCard
//               Icon={CheckCircle}
//               label="Active"
//               value={stats.activeDevices}
//               color="#66BB6A"
//               onPress={() => router.push("/(tabs)/devices")}
//             />
//           </Animated.View>

//           <Animated.View
//             entering={FadeInRight.delay(200).springify()}
//             style={styles.statRow}
//           >
//             <StatCard
//               Icon={AlertTriangle}
//               label="Warnings"
//               value={stats.warningDevices}
//               color="#FFA726"
//               onPress={() => router.push("/(tabs)/alerts")}
//             />
//             <StatCard
//               Icon={AlertOctagon}
//               label="Critical"
//               value={stats.criticalAlerts}
//               color="#EF5350"
//               onPress={() => router.push("/(tabs)/alerts")}
//             />
//           </Animated.View>
//         </View>

//         <ConnectionTest />

//         {/* Spoilage Trends - 🆕 Now uses real data */}
//         <Animated.View entering={FadeInDown.delay(300).springify()}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Spoilage Trends</Text>
//             <TouchableOpacity onPress={loadChartData}>
//               <Text style={styles.seeAll}>This Week</Text>
//             </TouchableOpacity>
//           </View>

//           <Card style={styles.chartCard}>
//             <SimpleBarChart data={chartData} />
//           </Card>
//         </Animated.View>

//         {/* Recent Alerts - 🆕 Shows AI-generated alerts */}
//         <Animated.View entering={FadeInDown.delay(400).springify()}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Recent Alerts</Text>
//             <TouchableOpacity onPress={() => router.push("/(tabs)/alerts")}>
//               <Text style={styles.seeAll}>See All</Text>
//             </TouchableOpacity>
//           </View>

//           {alerts.length === 0 ? (
//             <Card style={styles.emptyAlerts}>
//               <Text style={styles.emptyAlertsText}>
//                 No recent alerts. Everything looks good! 🎉
//               </Text>
//             </Card>
//           ) : (
//             alerts
//               .slice(0, 3)
//               .map((alert, index) => (
//                 <AlertCard key={alert.id} alert={alert} delay={index * 100} />
//               ))
//           )}
//         </Animated.View>

//         {/* Quick Actions */}
//         <Animated.View entering={FadeInDown.delay(500).springify()}>
//           <View style={styles.sectionHeader}>
//             <Text style={styles.sectionTitle}>Quick Actions</Text>
//           </View>

//           <View style={styles.actionsContainer}>
//             <ActionButton
//               Icon={Plus}
//               label="Add Device"
//               onPress={() => router.push("/device/add-device")}
//             />
//             <ActionButton Icon={BarChart3} label="Reports" onPress={() => {}} />
//             <ActionButton
//               Icon={Settings}
//               label="Settings"
//               onPress={() => router.push("/(tabs)/profile")}
//             />
//           </View>
//         </Animated.View>

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </View>
//   );
// }

// // Stat Card Component
// function StatCard({ Icon, label, value, color, onPress }: any) {
//   return (
//     <TouchableOpacity
//       style={styles.statCard}
//       onPress={onPress}
//       activeOpacity={0.7}
//     >
//       <Card style={styles.statCardInner}>
//         <View style={[styles.statIcon, { backgroundColor: color + "20" }]}>
//           <Icon size={24} color={color} />
//         </View>
//         <Text style={styles.statValue}>{value}</Text>
//         <Text style={styles.statLabel}>{label}</Text>
//       </Card>
//     </TouchableOpacity>
//   );
// }

// // Alert Card Component
// function AlertCard({ alert, delay }: any) {
//   const getSeverityColor = () => {
//     switch (alert.severity) {
//       case "critical":
//         return "danger";
//       case "high":
//         return "warning";
//       case "medium":
//         return "info";
//       default:
//         return "default";
//     }
//   };

//   const formatTime = (dateString: string) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffMs = now.getTime() - date.getTime();
//     const diffMins = Math.floor(diffMs / 60000);

//     if (diffMins < 1) return "Just now";
//     if (diffMins < 60) return `${diffMins}m ago`;

//     const diffHours = Math.floor(diffMins / 60);
//     if (diffHours < 24) return `${diffHours}h ago`;

//     return date.toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <Animated.View entering={FadeInDown.delay(delay).springify()}>
//       <Card style={styles.alertCard}>
//         <View style={styles.alertHeader}>
//           <Badge
//             label={alert.severity}
//             variant={getSeverityColor()}
//             size="sm"
//           />
//           <Text style={styles.alertTime}>{formatTime(alert.created_at)}</Text>
//         </View>
//         <Text style={styles.alertMessage} numberOfLines={2}>
//           {alert.message}
//         </Text>
//       </Card>
//     </Animated.View>
//   );
// }

// // Action Button
// function ActionButton({ Icon, label, onPress }: any) {
//   return (
//     <TouchableOpacity
//       style={styles.actionButton}
//       onPress={onPress}
//       activeOpacity={0.7}
//     >
//       <View style={styles.actionIcon}>
//         <Icon size={28} color="#2E7D32" />
//       </View>
//       <Text style={styles.actionLabel}>{label}</Text>
//     </TouchableOpacity>
//   );
// }

// // Simple Bar Chart
// function SimpleBarChart({ data }: any) {
//   const maxValue = Math.max(
//     ...data.map((d: any) => d.fresh + d.warning + d.spoiled),
//   );

//   return (
//     <View style={styles.chart}>
//       {data.map((item: any, index: number) => {
//         const freshHeight = (item.fresh / maxValue) * 120;
//         const warningHeight = (item.warning / maxValue) * 120;
//         const spoiledHeight = (item.spoiled / maxValue) * 120;

//         return (
//           <View key={index} style={styles.chartBar}>
//             <View style={styles.barStack}>
//               {spoiledHeight > 0 && (
//                 <View
//                   style={[
//                     styles.barSegment,
//                     {
//                       height: spoiledHeight,
//                       backgroundColor: "#EF5350",
//                     },
//                   ]}
//                 />
//               )}
//               {warningHeight > 0 && (
//                 <View
//                   style={[
//                     styles.barSegment,
//                     {
//                       height: warningHeight,
//                       backgroundColor: "#FFA726",
//                     },
//                   ]}
//                 />
//               )}
//               {freshHeight > 0 && (
//                 <View
//                   style={[
//                     styles.barSegment,
//                     {
//                       height: freshHeight,
//                       backgroundColor: "#66BB6A",
//                     },
//                   ]}
//                 />
//               )}
//             </View>
//             <Text style={styles.chartLabel}>{item.date}</Text>
//           </View>
//         );
//       })}
//     </View>
//   );
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
//   headerContent: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   greetingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   greeting: {
//     fontSize: Layout.fontSize.sm,
//     color: "rgba(255,255,255,0.95)",
//   },
//   headerTitle: {
//     fontSize: Layout.fontSize.xxl,
//     fontWeight: "700",
//     color: "#FFFFFF",
//   },
//   notificationBadge: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     backgroundColor: "rgba(255,255,255,0.25)",
//     alignItems: "center",
//     justifyContent: "center",
//     position: "relative",
//   },
//   badge: {
//     position: "absolute",
//     top: -4,
//     right: -4,
//     backgroundColor: "#EF5350",
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   badgeText: {
//     color: "#FFFFFF",
//     fontSize: 10,
//     fontWeight: "700",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   statsContainer: {
//     paddingHorizontal: Layout.spacing.lg,
//     marginTop: -20,
//   },
//   statRow: {
//     flexDirection: "row",
//     gap: Layout.spacing.md,
//     marginBottom: Layout.spacing.md,
//   },
//   statCard: {
//     flex: 1,
//   },
//   statCardInner: {
//     alignItems: "center",
//     paddingVertical: Layout.spacing.lg,
//   },
//   statIcon: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: Layout.spacing.sm,
//   },
//   statValue: {
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#1B5E20",
//     marginBottom: 4,
//   },
//   statLabel: {
//     fontSize: Layout.fontSize.sm,
//     color: "#558B2F",
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingHorizontal: Layout.spacing.lg,
//     marginTop: Layout.spacing.xl,
//     marginBottom: Layout.spacing.md,
//   },
//   sectionTitle: {
//     fontSize: Layout.fontSize.lg,
//     fontWeight: "700",
//     color: "#2E7D32",
//   },
//   seeAll: {
//     fontSize: Layout.fontSize.sm,
//     color: "#4CAF50",
//     fontWeight: "600",
//   },
//   chartCard: {
//     marginHorizontal: Layout.spacing.lg,
//     padding: Layout.spacing.lg,
//   },
//   chart: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-end",
//     height: 150,
//   },
//   chartBar: {
//     alignItems: "center",
//     flex: 1,
//   },
//   barStack: {
//     width: "70%",
//     flexDirection: "column-reverse",
//     alignItems: "center",
//     gap: 2,
//   },
//   barSegment: {
//     width: "100%",
//     borderRadius: 4,
//   },
//   chartLabel: {
//     fontSize: 10,
//     color: "#81C784",
//     marginTop: 8,
//   },
//   emptyAlerts: {
//     marginHorizontal: Layout.spacing.lg,
//     padding: Layout.spacing.lg,
//     alignItems: "center",
//   },
//   emptyAlertsText: {
//     fontSize: Layout.fontSize.sm,
//     color: "#558B2F",
//     textAlign: "center",
//   },
//   alertCard: {
//     marginHorizontal: Layout.spacing.lg,
//     marginBottom: Layout.spacing.sm,
//   },
//   alertHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: Layout.spacing.xs,
//   },
//   alertTime: {
//     fontSize: 12,
//     color: "#81C784",
//   },
//   alertMessage: {
//     fontSize: Layout.fontSize.sm,
//     color: "#558B2F",
//     lineHeight: 20,
//   },
//   actionsContainer: {
//     flexDirection: "row",
//     paddingHorizontal: Layout.spacing.lg,
//     gap: Layout.spacing.md,
//   },
//   actionButton: {
//     flex: 1,
//     alignItems: "center",
//   },
//   actionIcon: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     backgroundColor: "#FFFFFF",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: Layout.spacing.xs,
//     borderWidth: 2,
//     borderColor: "#C8E6C9",
//   },
//   actionLabel: {
//     fontSize: 12,
//     color: "#558B2F",
//     fontWeight: "500",
//     textAlign: "center",
//   },
// });

// app/(tabs)/index.tsx - HYBRID DASHBOARD
// Shows beautiful UI with devices, but uses real Supabase spoilage data

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Layout } from "@/constants/Layout";
import { useAlerts } from "@/hooks/useAlerts";
import { useDevices } from "@/hooks/useDevices";
import spoilageDataService from "@/services/supabase/spoilageData";
import { Device } from "@/types/device.types";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  AlertOctagon,
  AlertTriangle,
  BarChart3,
  Bell,
  CheckCircle,
  Plus,
  Settings,
  Smartphone,
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
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

interface ChartDataPoint {
  date: string;
  fresh: number;
  warning: number;
  spoiled: number;
}

export default function DashboardScreen() {
  const router = useRouter();
  const { devices, refetch, realStats } = useDevices(); // 🆕 Get real stats from hook
  const { alerts, unreadCount, checkForNewAlerts } = useAlerts();
  const [refreshing, setRefreshing] = useState(false);
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [chartLoading, setChartLoading] = useState(false);

  /**
   * 🆕 Load chart data from real Supabase data
   */
  const loadChartData = useCallback(async () => {
    setChartLoading(true);
    try {
      const data = await spoilageDataService.getChartDataGlobal(7);

      console.log("📊 Chart data loaded:", data);

      if (data && data.length > 0) {
        setChartData(data);
      } else {
        setChartData([]);
      }
    } catch (err) {
      console.error("❌ Error loading chart data:", err);
      setChartData([]);
    } finally {
      setChartLoading(false);
    }
  }, []);

  /**
   * Enhanced refresh - updates everything
   */
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch(); // Fetches device with real stats
      await checkForNewAlerts();
      await loadChartData();
      console.log("✅ Dashboard refreshed successfully!");
    } catch (err) {
      console.error("❌ Error refreshing dashboard:", err);
    } finally {
      setRefreshing(false);
    }
  };

  /**
   * Load chart on mount
   */
  useEffect(() => {
    loadChartData();
  }, [loadChartData]);

  // Calculate dashboard stats
  const stats = {
    totalDevices: devices.length,
    activeDevices: devices.filter((d: Device) => d.status === "active").length,
    criticalAlerts: alerts.filter(
      (a) => a.severity === "critical" && !a.is_read,
    ).length,
    warningDevices: devices.filter((d: Device) => d.status === "warning")
      .length,
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
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Dashboard</Text>
            <Text style={styles.headerSubtitle}>
              {realStats.totalReadings > 0
                ? `${realStats.totalReadings} total readings`
                : "Welcome! Pull down to load data"}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.notificationBadge}
            onPress={() => router.push("/(tabs)/alerts")}
          >
            <Bell size={20} color="#FFFFFF" />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
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
        {/* Stats Cards - Shows REAL data */}
        <View style={styles.statsContainer}>
          <Animated.View
            entering={FadeInRight.delay(100).springify()}
            style={styles.statRow}
          >
            <StatCard
              Icon={Smartphone}
              label="Total Devices"
              value={stats.totalDevices}
              color="#4CAF50"
              onPress={() => router.push("/(tabs)/devices")}
              subtitle="Monitoring active"
            />
            <StatCard
              Icon={CheckCircle}
              label="Fresh Items"
              value={realStats.freshCount}
              color="#66BB6A"
              subtitle={`${realStats.totalReadings} readings`}
            />
          </Animated.View>

          <Animated.View
            entering={FadeInRight.delay(200).springify()}
            style={styles.statRow}
          >
            <StatCard
              Icon={AlertTriangle}
              label="Warnings"
              value={stats.warningDevices}
              color="#FFA726"
              onPress={() => router.push("/(tabs)/alerts")}
            />
            <StatCard
              Icon={AlertOctagon}
              label="Spoiled"
              value={realStats.spoiledCount}
              color="#EF5350"
              subtitle={`${((realStats.spoiledCount / (realStats.totalReadings || 1)) * 100).toFixed(1)}%`}
            />
          </Animated.View>
        </View>

        {/* Spoilage Trends - Real data */}
        <Animated.View entering={FadeInDown.delay(300).springify()}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Spoilage Trends</Text>
            <TouchableOpacity onPress={loadChartData}>
              <Text style={styles.seeAll}>
                {chartLoading ? "Loading..." : "Last 7 Days"}
              </Text>
            </TouchableOpacity>
          </View>

          <Card style={styles.chartCard}>
            {chartLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.loadingText}>Loading chart data...</Text>
              </View>
            ) : chartData.length > 0 ? (
              <SimpleBarChart data={chartData} />
            ) : (
              <View style={styles.emptyChart}>
                <BarChart3 size={48} color="#C8E6C9" />
                <Text style={styles.emptyChartText}>
                  No data for last 7 days. Check back after more readings!
                </Text>
              </View>
            )}
          </Card>
        </Animated.View>

        {/* Recent Alerts */}
        <Animated.View entering={FadeInDown.delay(400).springify()}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Alerts</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/alerts")}>
              <Text style={styles.seeAll}>See All ({alerts.length})</Text>
            </TouchableOpacity>
          </View>

          {alerts.length === 0 ? (
            <Card style={styles.emptyAlerts}>
              <CheckCircle size={48} color="#66BB6A" />
              <Text style={styles.emptyAlertsText}>
                No recent alerts. Everything looks good! 🎉
              </Text>
            </Card>
          ) : (
            alerts
              .slice(0, 3)
              .map((alert, index) => (
                <AlertCard key={alert.id} alert={alert} delay={index * 100} />
              ))
          )}
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View entering={FadeInDown.delay(500).springify()}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
          </View>

          <View style={styles.actionsContainer}>
            <ActionButton
              Icon={Plus}
              label="Add Device"
              onPress={() => router.push("/device/add-device")}
            />
            <ActionButton
              Icon={BarChart3}
              label="View Stats"
              onPress={() => router.push("/(tabs)/devices")}
            />
            <ActionButton
              Icon={Settings}
              label="Settings"
              onPress={() => router.push("/(tabs)/profile")}
            />
          </View>
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// Stat Card Component
function StatCard({ Icon, label, value, color, onPress, subtitle }: any) {
  return (
    <TouchableOpacity
      style={styles.statCard}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <Card style={styles.statCardInner}>
        <View style={[styles.statIcon, { backgroundColor: color + "20" }]}>
          <Icon size={24} color={color} />
        </View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
        {subtitle && <Text style={styles.statSubtitle}>{subtitle}</Text>}
      </Card>
    </TouchableOpacity>
  );
}

// Alert Card Component
function AlertCard({ alert, delay }: any) {
  const getSeverityColor = () => {
    switch (alert.severity) {
      case "critical":
        return "danger";
      case "high":
        return "warning";
      case "medium":
        return "info";
      default:
        return "default";
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    return date.toLocaleDateString();
  };

  return (
    <Animated.View entering={FadeInDown.delay(delay).springify()}>
      <Card style={styles.alertCard}>
        <View style={styles.alertHeader}>
          <Badge
            label={alert.severity}
            variant={getSeverityColor()}
            size="sm"
          />
          <Text style={styles.alertTime}>{formatTime(alert.created_at)}</Text>
        </View>
        <Text style={styles.alertMessage} numberOfLines={2}>
          {alert.message}
        </Text>
      </Card>
    </Animated.View>
  );
}

// Action Button
function ActionButton({ Icon, label, onPress }: any) {
  return (
    <TouchableOpacity
      style={styles.actionButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.actionIcon}>
        <Icon size={28} color="#2E7D32" />
      </View>
      <Text style={styles.actionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

// Simple Bar Chart
function SimpleBarChart({ data }: { data: ChartDataPoint[] }) {
  const maxValue = Math.max(
    ...data.map((d) => d.fresh + d.warning + d.spoiled),
    1,
  );

  return (
    <View style={styles.chart}>
      {data.map((item, index) => {
        const total = item.fresh + item.warning + item.spoiled;
        const freshHeight = (item.fresh / maxValue) * 120;
        const warningHeight = (item.warning / maxValue) * 120;
        const spoiledHeight = (item.spoiled / maxValue) * 120;

        return (
          <View key={index} style={styles.chartBar}>
            <View style={styles.barStack}>
              {spoiledHeight > 0 && (
                <View
                  style={[
                    styles.barSegment,
                    {
                      height: spoiledHeight,
                      backgroundColor: "#EF5350",
                    },
                  ]}
                />
              )}
              {warningHeight > 0 && (
                <View
                  style={[
                    styles.barSegment,
                    {
                      height: warningHeight,
                      backgroundColor: "#FFA726",
                    },
                  ]}
                />
              )}
              {freshHeight > 0 && (
                <View
                  style={[
                    styles.barSegment,
                    {
                      height: freshHeight,
                      backgroundColor: "#66BB6A",
                    },
                  ]}
                />
              )}
            </View>
            <Text style={styles.chartLabel}>{item.date}</Text>
            <Text style={styles.chartValue}>{total}</Text>
          </View>
        );
      })}
    </View>
  );
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
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: Layout.fontSize.xxl,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: Layout.fontSize.sm,
    color: "rgba(255,255,255,0.9)",
    marginTop: 4,
  },
  notificationBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#EF5350",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    paddingHorizontal: Layout.spacing.lg,
    marginTop: -20,
  },
  statRow: {
    flexDirection: "row",
    gap: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
  },
  statCard: {
    flex: 1,
  },
  statCardInner: {
    alignItems: "center",
    paddingVertical: Layout.spacing.lg,
  },
  statIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Layout.spacing.sm,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1B5E20",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: Layout.fontSize.sm,
    color: "#558B2F",
    textAlign: "center",
  },
  statSubtitle: {
    fontSize: 10,
    color: "#81C784",
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Layout.spacing.lg,
    marginTop: Layout.spacing.xl,
    marginBottom: Layout.spacing.md,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "700",
    color: "#2E7D32",
  },
  seeAll: {
    fontSize: Layout.fontSize.sm,
    color: "#4CAF50",
    fontWeight: "600",
  },
  chartCard: {
    marginHorizontal: Layout.spacing.lg,
    padding: Layout.spacing.lg,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
  loadingText: {
    marginTop: Layout.spacing.sm,
    fontSize: Layout.fontSize.sm,
    color: "#558B2F",
  },
  emptyChart: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
  emptyChartText: {
    marginTop: Layout.spacing.sm,
    fontSize: Layout.fontSize.sm,
    color: "#81C784",
    textAlign: "center",
    paddingHorizontal: Layout.spacing.lg,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 150,
  },
  chartBar: {
    alignItems: "center",
    flex: 1,
  },
  barStack: {
    width: "70%",
    flexDirection: "column-reverse",
    alignItems: "center",
    gap: 2,
  },
  barSegment: {
    width: "100%",
    borderRadius: 4,
    minHeight: 4,
  },
  chartLabel: {
    fontSize: 10,
    color: "#81C784",
    marginTop: 8,
  },
  chartValue: {
    fontSize: 9,
    color: "#558B2F",
    fontWeight: "600",
    marginTop: 2,
  },
  emptyAlerts: {
    marginHorizontal: Layout.spacing.lg,
    padding: Layout.spacing.xl,
    alignItems: "center",
  },
  emptyAlertsText: {
    fontSize: Layout.fontSize.sm,
    color: "#558B2F",
    textAlign: "center",
    marginTop: Layout.spacing.sm,
  },
  alertCard: {
    marginHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.sm,
  },
  alertHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Layout.spacing.xs,
  },
  alertTime: {
    fontSize: 12,
    color: "#81C784",
  },
  alertMessage: {
    fontSize: Layout.fontSize.sm,
    color: "#558B2F",
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: "row",
    paddingHorizontal: Layout.spacing.lg,
    gap: Layout.spacing.md,
  },
  actionButton: {
    flex: 1,
    alignItems: "center",
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Layout.spacing.xs,
    borderWidth: 2,
    borderColor: "#C8E6C9",
  },
  actionLabel: {
    fontSize: 12,
    color: "#558B2F",
    fontWeight: "500",
    textAlign: "center",
  },
});
