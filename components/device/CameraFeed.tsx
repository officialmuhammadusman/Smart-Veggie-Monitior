import { Card } from "@/components/ui/Card";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface CameraFeedProps {
  imageUrl?: string;
  isLive?: boolean;
}

export function CameraFeed({ imageUrl, isLive = false }: CameraFeedProps) {
  return (
    <Card style={styles.card}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderIcon}>📷</Text>
          <Text style={styles.placeholderText}>No image available</Text>
        </View>
      )}

      {isLive && (
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 0,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 240,
  },
  placeholder: {
    width: "100%",
    height: 240,
    backgroundColor: Colors.light.backgroundSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.textTertiary,
  },
  liveIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(239, 68, 68, 0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    marginRight: 6,
  },
  liveText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },
});
