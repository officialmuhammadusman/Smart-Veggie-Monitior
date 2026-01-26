import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";

interface PaginationProps {
  data: any[];
  scrollX: Animated.SharedValue<number>;
  index: number;
}

export function Pagination({ data, scrollX, index }: PaginationProps) {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * 300, idx * 300, (idx + 1) * 300];

        const dotWidth = useAnimatedStyle(() => {
          const width = interpolate(
            scrollX.value,
            inputRange,
            [8, 24, 8],
            Extrapolate.CLAMP,
          );

          return {
            width,
          };
        });

        return (
          <Animated.View
            key={idx}
            style={[styles.dot, dotWidth, idx === index && styles.dotActive]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  dotActive: {
    backgroundColor: "#FFFFFF",
  },
});
