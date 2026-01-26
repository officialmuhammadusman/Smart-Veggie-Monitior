// app/+not-found.tsx
import { Button } from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🤔</Text>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>This page doesn&apos;t exist.</Text>

      <Link href="/(tabs)" asChild>
        <Button title="Go to Dashboard" variant="primary" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Layout.spacing.xl,
    backgroundColor: Colors.light.background,
  },
  emoji: {
    fontSize: 80,
    marginBottom: Layout.spacing.lg,
  },
  title: {
    fontSize: Layout.fontSize.xxl,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: Layout.spacing.sm,
  },
  message: {
    fontSize: Layout.fontSize.lg,
    color: Colors.light.textSecondary,
    textAlign: "center",
    marginBottom: Layout.spacing.xl,
  },
});
