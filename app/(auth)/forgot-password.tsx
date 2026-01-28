// app/(auth)/forgot-password.tsx
import { Button } from "@/components/ui/Button";
import { Layout } from "@/constants/Layout";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Lock } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    try {
      setLoading(true);
      // TODO: Implement with Supabase
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSent(true);
      Alert.alert(
        "Success",
        "Password reset link has been sent to your email",
        [{ text: "OK", onPress: () => router.back() }],
      );
    } catch {
      Alert.alert("Error", "Failed to send reset email");
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
        colors={["#E8F5E9", "#FFFFFF", "#F1F8E9"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        {/* Header */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={styles.header}
        >
          <View style={styles.iconContainer}>
            <Lock size={50} color="#4CAF50" />
          </View>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter your email and we&apos;ll send you a link to reset your
            password
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
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  placeholder="your@email.com"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholderTextColor="#9E9E9E"
                  editable={!sent}
                />
              </View>
              <Button
                title={sent ? "Resend Email" : "Send Reset Link"}
                onPress={handleResetPassword}
                loading={loading}
                style={styles.submitButton}
              />
              <TouchableOpacity
                style={styles.backToLogin}
                onPress={() => router.back()}
              >
                <Text style={styles.backToLoginText}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(76, 175, 80, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  backIcon: {
    fontSize: 24,
    color: "#2E7D32",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Layout.spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: Layout.spacing.xl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Layout.spacing.md,
    shadowColor: "#4CAF50",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: Layout.fontSize.xxl,
    fontWeight: "700",
    color: "#2E7D32",
    marginBottom: Layout.spacing.xs,
    textAlign: "center",
  },
  subtitle: {
    fontSize: Layout.fontSize.md,
    color: "#558B2F",
    textAlign: "center",
    paddingHorizontal: Layout.spacing.xl,
    lineHeight: 22,
  },
  formContainer: {},
  formBlur: {
    borderRadius: Layout.borderRadius.xl,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
  },
  form: {
    padding: Layout.spacing.lg,
  },
  inputGroup: {
    marginBottom: Layout.spacing.lg,
  },
  label: {
    fontSize: Layout.fontSize.sm,
    fontWeight: "600",
    color: "#2E7D32",
    marginBottom: Layout.spacing.xs,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderColor: "#C8E6C9",
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: Layout.spacing.md,
    fontSize: Layout.fontSize.md,
    backgroundColor: "#FFFFFF",
    color: "#1B5E20",
  },
  submitButton: {
    marginBottom: Layout.spacing.md,
    backgroundColor: "#4CAF50",
  },
  backToLogin: {
    alignItems: "center",
    paddingVertical: Layout.spacing.sm,
  },
  backToLoginText: {
    fontSize: Layout.fontSize.md,
    color: "#4CAF50",
    fontWeight: "600",
  },
});
