// app/(onboarding)/index.tsx
import { Button } from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { BarChart3, Bell, Leaf } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
    Dimensions,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    title: "Real-Time Monitoring",
    description:
      "Track your vegetables 24/7 with AI-powered image analysis and gas sensors",
    icon: BarChart3,
    gradient: ["#10B981", "#059669", "#ffffff"],
  },
  {
    id: "2",
    title: "Smart Alerts",
    description:
      "Get instant notifications when spoilage is detected so you can act fast",
    icon: Bell,
    gradient: ["#3B82F6", "#2563EB", "#ffffff"],
  },
  {
    id: "3",
    title: "Reduce Waste",
    description: "Save money and help the environment by minimizing food waste",
    icon: Leaf,
    gradient: ["#10B981", "#059669", "#ffffff"],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    router.replace("/(auth)/login");
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      {currentIndex < SLIDES.length - 1 && (
        <Animated.View
          entering={FadeInDown.delay(300)}
          style={styles.skipContainer}
        >
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Slide {...item} />}
      />

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Pagination */}
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                index === currentIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>

        {/* Next/Get Started Button */}
        <Animated.View
          entering={FadeInUp.delay(400)}
          style={styles.buttonContainer}
        >
          <Button
            title={currentIndex === SLIDES.length - 1 ? "Get Started" : "Next"}
            onPress={handleNext}
            variant="primary"
            size="lg"
          />
        </Animated.View>
      </View>
    </View>
  );
}

// Slide Component
function Slide({ title, description, icon: IconComponent, gradient }: any) {
  return (
    <View style={styles.slide}>
      <LinearGradient
        colors={gradient}
        style={styles.slideGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          style={styles.iconContainer}
        >
          <IconComponent size={100} color="#FFFFFF" strokeWidth={1.5} />
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
    backgroundColor: "#FFFFFF",
  },
  skipContainer: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
  },
  skipButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  skipText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.primary,
  },
  slide: {
    width,
    height,
  },
  slideGradient: {
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
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: 50,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Layout.spacing.xl,
    gap: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  paginationDotActive: {
    width: 24,
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    width: "100%",
  },
});
