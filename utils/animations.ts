// utils/animations.ts
import {
    Easing,
    withDelay,
    withSequence,
    withSpring,
    withTiming,
} from "react-native-reanimated";

// Spring animation config
export const springConfig = {
  damping: 15,
  stiffness: 100,
  mass: 1,
};

// Timing animation config
export const timingConfig = {
  duration: 300,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

// Animation presets
export const animations = {
  // Fade in
  fadeIn: (delay = 0) => ({
    opacity: withDelay(delay, withTiming(1, timingConfig)),
  }),

  // Fade out
  fadeOut: (delay = 0) => ({
    opacity: withDelay(delay, withTiming(0, timingConfig)),
  }),

  // Slide up
  slideUp: (distance = 50, delay = 0) => ({
    transform: [
      {
        translateY: withDelay(delay, withSpring(0, springConfig)),
      },
    ],
    opacity: withDelay(delay, withTiming(1, timingConfig)),
  }),

  // Slide down
  slideDown: (distance = 50, delay = 0) => ({
    transform: [
      {
        translateY: withDelay(delay, withSpring(distance, springConfig)),
      },
    ],
    opacity: withDelay(delay, withTiming(0, timingConfig)),
  }),

  // Scale in
  scaleIn: (delay = 0) => ({
    transform: [
      {
        scale: withDelay(delay, withSpring(1, springConfig)),
      },
    ],
    opacity: withDelay(delay, withTiming(1, timingConfig)),
  }),

  // Scale out
  scaleOut: (delay = 0) => ({
    transform: [
      {
        scale: withDelay(delay, withSpring(0, springConfig)),
      },
    ],
    opacity: withDelay(delay, withTiming(0, timingConfig)),
  }),

  // Bounce
  bounce: () => ({
    transform: [
      {
        scale: withSequence(
          withTiming(1.2, { duration: 150 }),
          withSpring(1, springConfig),
        ),
      },
    ],
  }),

  // Shake
  shake: () => ({
    transform: [
      {
        translateX: withSequence(
          withTiming(-10, { duration: 50 }),
          withTiming(10, { duration: 50 }),
          withTiming(-10, { duration: 50 }),
          withTiming(10, { duration: 50 }),
          withTiming(0, { duration: 50 }),
        ),
      },
    ],
  }),

  // Pulse
  pulse: () => ({
    transform: [
      {
        scale: withSequence(
          withTiming(1.05, { duration: 300 }),
          withTiming(1, { duration: 300 }),
        ),
      },
    ],
  }),
};

// Layout animation presets
export const layoutAnimations = {
  entering: {
    opacity: 0,
    transform: [{ translateY: 20 }, { scale: 0.95 }],
  },
  exiting: {
    opacity: 0,
    transform: [{ translateY: -20 }, { scale: 0.95 }],
  },
};
