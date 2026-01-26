import { Layout } from "@/constants/Layout";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

interface OnboardingSlideProps {
  title: string;
  description: string;
  icon: string;
  gradient: readonly [string, string, ...string[]];
}

export function OnboardingSlide({
  title,
  description,
  icon,
  gradient,
}: OnboardingSlideProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradient}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.iconContainer}
        >
          <Text style={styles.icon}>{icon}</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(400).springify()}
          style={styles.textContainer}
        >
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Layout.spacing.xl,
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Layout.spacing.xxl,
  },
  icon: {
    fontSize: 100,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: Layout.spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: Layout.spacing.md,
  },
  description: {
    fontSize: 18,
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    lineHeight: 26,
  },
});
