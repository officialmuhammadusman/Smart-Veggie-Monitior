import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ChartData {
  date: string;
  fresh: number;
  warning: number;
  spoiled: number;
}

interface SpoilageChartProps {
  data: ChartData[];
}

export function SpoilageChart({ data }: SpoilageChartProps) {
  const maxValue = Math.max(
    ...data.map((d) => d.fresh + d.warning + d.spoiled),
  );

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Spoilage Trends</Text>
        <Text style={styles.subtitle}>Last 7 days</Text>
      </View>

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
                        backgroundColor: Colors.light.danger,
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
                        backgroundColor: Colors.light.warning,
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
                        backgroundColor: Colors.light.fresh,
                      },
                    ]}
                  />
                )}
              </View>
              <Text style={styles.chartLabel}>{item.date}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.legend}>
        <LegendItem color={Colors.light.fresh} label="Fresh" />
        <LegendItem color={Colors.light.warning} label="Warning" />
        <LegendItem color={Colors.light.danger} label="Spoiled" />
      </View>
    </Card>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {},
  header: {
    marginBottom: Layout.spacing.lg,
  },
  title: {
    fontSize: Layout.fontSize.lg,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.textSecondary,
  },
  chart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 150,
    marginBottom: Layout.spacing.md,
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
  },
  chartLabel: {
    fontSize: 10,
    color: Colors.light.textSecondary,
    marginTop: 8,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Layout.spacing.md,
    paddingTop: Layout.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.light.borderLight,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
});
