// app/(auth)/login.tsx
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { Button } from "@/components/ui/Button";
import { Colors } from "@/constants/Colors";
import { Layout } from "@/constants/Layout";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      // TODO: Implement with Supabase
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.replace("/(tabs)");
    } catch {
      Alert.alert("Error", "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <LinearGradient
        colors={["#3169d9", "#3b5998", "#ffffff"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={styles.header}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>🥬</Text>
          </View>
          <Text style={styles.title}>Smart Veggie Monitor</Text>
          <Text style={styles.subtitle}>
            Keep your vegetables fresh with AI-powered monitoring
          </Text>
        </Animated.View>

        {/* Form */}
        <Animated.View
          entering={FadeInUp.delay(200).springify()}
          style={styles.formContainer}
        >
          <BlurView intensity={80} style={styles.formBlur}>
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="your@email.com"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholderTextColor={Colors.light.textTertiary}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholderTextColor={Colors.light.textTertiary}
                />
              </View>

              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              <Button
                title="Sign In"
                onPress={handleLogin}
                loading={loading}
                style={styles.loginButton}
              />

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>
                  Don&apos;t have an account?{" "}
                </Text>
                <Link href="/(auth)/signup" asChild>
                  <TouchableOpacity>
                    <Text style={styles.signupLink}>Sign Up</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </BlurView>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.xl,
  },
  header: {
    alignItems: "center",
    marginBottom: Layout.spacing.xl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Layout.spacing.md,
  },
  iconText: {
    fontSize: 50,
  },
  title: {
    fontSize: Layout.fontSize.xxl,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: Layout.spacing.xs,
    textAlign: "center",
  },
  subtitle: {
    fontSize: Layout.fontSize.md,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    paddingHorizontal: Layout.spacing.xl,
  },
  formContainer: {
    marginBottom: Layout.spacing.xl,
  },
  formBlur: {
    borderRadius: Layout.borderRadius.xl,
    overflow: "hidden",
  },
  form: {
    padding: Layout.spacing.lg,
  },
  inputGroup: {
    marginBottom: Layout.spacing.md,
  },
  label: {
    fontSize: Layout.fontSize.sm,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: Layout.spacing.xs,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: Colors.light.border,
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
    fontSize: Layout.fontSize.md,
    backgroundColor: "#FFFFFF",
    color: Colors.light.text,
  },
  forgotText: {
    fontSize: Layout.fontSize.sm,
    color: Colors.light.primary,
    fontWeight: "600",
    textAlign: "right",
    marginBottom: Layout.spacing.lg,
  },
  loginButton: {
    marginBottom: Layout.spacing.md,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Layout.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.light.border,
  },
  dividerText: {
    marginHorizontal: Layout.spacing.md,
    color: Colors.light.textSecondary,
    fontSize: Layout.fontSize.sm,
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: Layout.fontSize.md,
    color: Colors.light.textSecondary,
  },
  signupLink: {
    fontSize: Layout.fontSize.md,
    color: Colors.light.primary,
    fontWeight: "600",
  },
});
