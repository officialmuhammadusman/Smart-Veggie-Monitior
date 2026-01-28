// import { Badge } from "@/components/ui/Badge";
// import { Card } from "@/components/ui/Card";
// import { Colors } from "@/constants/Colors";
// import { Layout } from "@/constants/Layout";
// import { Alert } from "@/types/alert.types";
// import { formatTimeAgo } from "@/utils/formatters";
// import React from "react";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// interface RecentAlertsProps {
//   alerts: Alert[];
//   onAlertPress?: (alert: Alert) => void;
//   onViewAllPress?: () => void;
// }

// export function RecentAlerts({
//   alerts,
//   onAlertPress,
//   onViewAllPress,
// }: RecentAlertsProps) {
//   const getSeverityVariant = (severity: string) => {
//     switch (severity) {
//       case "critical":
//         return "danger" as const;
//       case "high":
//         return "danger" as const;
//       case "medium":
//         return "warning" as const;
//       default:
//         return "info" as const;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Recent Alerts</Text>
//         {onViewAllPress && (
//           <TouchableOpacity onPress={onViewAllPress}>
//             <Text style={styles.viewAll}>View All</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {alerts.length === 0 ? (
//         <Card style={styles.emptyCard}>
//           <Text style={styles.emptyIcon}>✅</Text>
//           <Text style={styles.emptyText}>No recent alerts</Text>
//         </Card>
//       ) : (
//         alerts.slice(0, 3).map((alert) => (
//           <TouchableOpacity
//             key={alert.id}
//             onPress={() => onAlertPress?.(alert)}
//             activeOpacity={0.7}
//           >
//             <Card
//               style={[
//                 styles.alertCard,
//                 !alert.is_read && styles.alertCardUnread,
//               ]}
//             >
//               <View style={styles.alertHeader}>
//                 <Badge
//                   label={alert.severity}
//                   variant={getSeverityVariant(alert.severity)}
//                   size="sm"
//                 />
//                 <Text style={styles.alertTime}>
//                   {formatTimeAgo(alert.created_at)}
//                 </Text>
//               </View>
//               <Text style={styles.alertMessage} numberOfLines={2}>
//                 {alert.message}
//               </Text>
//               {!alert.is_read && (
//                 <View style={styles.unreadIndicator}>
//                   <View style={styles.unreadDot} />
//                   <Text style={styles.unreadText}>New</Text>
//                 </View>
//               )}
//             </Card>
//           </TouchableOpacity>
//         ))
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {},
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: Layout.spacing.md,
//   },
//   title: {
//     fontSize: Layout.fontSize.lg,
//     fontWeight: "700",
//     color: Colors.light.text,
//   },
//   viewAll: {
//     fontSize: Layout.fontSize.sm,
//     color: Colors.light.primary,
//     fontWeight: "600",
//   },
//   alertCard: {
//     marginBottom: Layout.spacing.sm,
//   },
//   alertCardUnread: {
//     borderLeftWidth: 4,
//     borderLeftColor: Colors.light.primary,
//   },
//   alertHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: Layout.spacing.xs,
//   },
//   alertTime: {
//     fontSize: 12,
//     color: Colors.light.textTertiary,
//   },
//   alertMessage: {
//     fontSize: Layout.fontSize.sm,
//     color: Colors.light.text,
//     lineHeight: 20,
//     marginBottom: 8,
//   },
//   unreadIndicator: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },
//   unreadDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: Colors.light.primary,
//   },
//   unreadText: {
//     fontSize: 12,
//     fontWeight: "600",
//     color: Colors.light.primary,
//   },
//   emptyCard: {
//     alignItems: "center",
//     paddingVertical: Layout.spacing.xl,
//   },
//   emptyIcon: {
//     fontSize: 48,
//     marginBottom: Layout.spacing.sm,
//   },
//   emptyText: {
//     fontSize: Layout.fontSize.md,
//     color: Colors.light.textSecondary,
//   },
// });
// components/dashboard/RecentAlerts.tsx
// ✅ Updated to display AI-generated alerts from real spoilage data

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Layout } from "@/constants/Layout";
import { useAlerts } from "@/hooks/useAlerts";
import { useRouter } from "expo-router";
import { AlertCircle, AlertTriangle, ChevronRight } from "lucide-react-native";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface RecentAlertsProps {
  maxAlerts?: number;
}

export function RecentAlerts({ maxAlerts = 3 }: RecentAlertsProps) {
  const router = useRouter();
  const { alerts, loading } = useAlerts();

  // Get the most recent alerts
  const recentAlerts = alerts.slice(0, maxAlerts);

  if (loading) {
    return (
      <Card style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>Loading alerts...</Text>
        </View>
      </Card>
    );
  }

  if (recentAlerts.length === 0) {
    return (
      <Card style={styles.container}>
        <View style={styles.emptyContainer}>
          <AlertCircle size={48} color="#A5D6A7" strokeWidth={1.5} />
          <Text style={styles.emptyTitle}>No Recent Alerts</Text>
          <Text style={styles.emptyText}>
            Everything is running smoothly! 🎉
          </Text>
        </View>
      </Card>
    );
  }

  return (
    <View style={styles.wrapper}>
      {recentAlerts.map((alert, index) => (
        <TouchableOpacity
          key={alert.id}
          activeOpacity={0.7}
          onPress={() => router.push("/(tabs)/alerts")}
        >
          <Card style={styles.alertCard}>
            <View style={styles.alertContent}>
              <View style={styles.alertLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: getSeverityColor(alert.severity) + "20",
                    },
                  ]}
                >
                  {alert.severity === "critical" ||
                  alert.severity === "high" ? (
                    <AlertCircle
                      size={20}
                      color={getSeverityColor(alert.severity)}
                      strokeWidth={2}
                    />
                  ) : (
                    <AlertTriangle
                      size={20}
                      color={getSeverityColor(alert.severity)}
                      strokeWidth={2}
                    />
                  )}
                </View>

                <View style={styles.alertInfo}>
                  <View style={styles.alertHeader}>
                    <Badge
                      label={alert.severity}
                      variant={getSeverityVariant(alert.severity) as any}
                      size="sm"
                    />
                    {!alert.is_read && <View style={styles.unreadDot} />}
                  </View>

                  <Text style={styles.alertMessage} numberOfLines={2}>
                    {alert.message}
                  </Text>

                  <Text style={styles.alertTime}>
                    {formatTime(alert.created_at)}
                  </Text>
                </View>
              </View>

              <ChevronRight size={20} color="#A5D6A7" strokeWidth={2} />
            </View>
          </Card>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.viewAllButton}
        onPress={() => router.push("/(tabs)/alerts")}
        activeOpacity={0.7}
      >
        <Text style={styles.viewAllText}>View All Alerts</Text>
        <ChevronRight size={16} color="#4CAF50" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
}

// Helper Functions
function getSeverityColor(severity: string): string {
  switch (severity) {
    case "critical":
      return "#EF5350";
    case "high":
      return "#FF7043";
    case "medium":
      return "#FFA726";
    case "low":
      return "#42A5F5";
    default:
      return "#81C784";
  }
}

function getSeverityVariant(
  severity: string,
): "danger" | "warning" | "info" | "default" {
  switch (severity) {
    case "critical":
    case "high":
      return "danger";
    case "medium":
      return "warning";
    case "low":
      return "info";
    default:
      return "default";
  }
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

const styles = StyleSheet.create({
  wrapper: {
    gap: Layout.spacing.sm,
  },
  container: {
    padding: Layout.spacing.lg,
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: Layout.spacing.xl,
  },
  loadingText: {
    marginTop: Layout.spacing.sm,
    fontSize: Layout.fontSize.sm,
    color: "#81C784",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: Layout.spacing.xl,
  },
  emptyTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "600",
    color: "#2E7D32",
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.xs,
  },
  emptyText: {
    fontSize: Layout.fontSize.sm,
    color: "#81C784",
    textAlign: "center",
  },
  alertCard: {
    padding: Layout.spacing.md,
  },
  alertContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  alertLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
    gap: Layout.spacing.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  alertInfo: {
    flex: 1,
  },
  alertHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Layout.spacing.xs,
    marginBottom: 4,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4CAF50",
  },
  alertMessage: {
    fontSize: Layout.fontSize.sm,
    color: "#1B5E20",
    lineHeight: 18,
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 11,
    color: "#81C784",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Layout.spacing.md,
    gap: 4,
  },
  viewAllText: {
    fontSize: Layout.fontSize.sm,
    fontWeight: "600",
    color: "#4CAF50",
  },
});

export default RecentAlerts;
