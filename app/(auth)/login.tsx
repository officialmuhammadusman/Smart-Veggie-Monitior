// app/(auth)/login.tsx
import { Button } from "@/components/ui/Button";
import { Layout } from "@/constants/Layout";
import { useAuth } from "@/hooks/useAuth";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import Toast from "react-native-toast-message"; // Add this import

export default function LoginScreen() {
  const router = useRouter();
  const { login, sendOTP } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">(
    "password",
  );
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields",
      });
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to login",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendOTP = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter your email",
      });
      return;
    }

    try {
      setLoading(true);
      await sendOTP(email);
      router.push({
        pathname: "/(auth)/verify-otp",
        params: { email },
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to send OTP",
      });
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
          <View style={styles.headerImageContainer}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
              }}
              style={styles.headerBackgroundImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.5)"]}
              style={styles.headerOverlay}
            />
            <View style={styles.headerContent}>
              <Text style={styles.title}>Smart Veggie Monitor</Text>
              <Text style={styles.subtitle}>
                Keep your vegetables fresh with AI-powered monitoring
              </Text>
            </View>
          </View>
        </Animated.View>

        {/* Login Method Toggle */}
        <Animated.View
          entering={FadeInUp.delay(150).springify()}
          style={styles.toggleContainer}
        >
          <TouchableOpacity
            style={[
              styles.toggleButton,
              loginMethod === "password" && styles.toggleButtonActive,
            ]}
            onPress={() => setLoginMethod("password")}
          >
            <Text
              style={[
                styles.toggleText,
                loginMethod === "password" && styles.toggleTextActive,
              ]}
            >
              Password
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              loginMethod === "otp" && styles.toggleButtonActive,
            ]}
            onPress={() => setLoginMethod("otp")}
          >
            <Text
              style={[
                styles.toggleText,
                loginMethod === "otp" && styles.toggleTextActive,
              ]}
            >
              OTP
            </Text>
          </TouchableOpacity>
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
                  placeholderTextColor="#9E9E9E"
                  editable={!loading}
                />
              </View>
              {loginMethod === "password" ? (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordInputContainer}>
                      <TextInput
                        style={[styles.input, styles.passwordInput]}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        placeholderTextColor="#9E9E9E"
                        editable={!loading}
                      />
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setShowPassword(!showPassword)}
                        disabled={loading}
                      >
                        {showPassword ? (
                          <EyeOff size={20} color="#4CAF50" />
                        ) : (
                          <Eye size={20} color="#4CAF50" />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Link href="/(auth)/forgot-password" asChild>
                    <TouchableOpacity disabled={loading}>
                      <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                  </Link>

                  <Button
                    title="Sign In"
                    onPress={handleLogin}
                    loading={loading}
                    style={styles.loginButton}
                    disabled={loading}
                  />
                </>
              ) : (
                <Button
                  title="Send OTP"
                  onPress={handleSendOTP}
                  loading={loading}
                  style={styles.loginButton}
                  disabled={loading}
                />
              )}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>
                  Don&apos;t have an account?{" "}
                </Text>
                <Link href="/(auth)/signup" asChild>
                  <TouchableOpacity disabled={loading}>
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
    marginBottom: Layout.spacing.lg,
  },
  headerImageContainer: {
    width: "100%",
    height: 280,
    borderRadius: Layout.borderRadius.xl,
    overflow: "hidden",
    shadowColor: "#4CAF50",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerBackgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  headerOverlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  headerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Layout.spacing.lg,
  },
  title: {
    fontSize: Layout.fontSize.xxl,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: Layout.spacing.xs,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: Layout.fontSize.md,
    color: "#FFFFFF",
    textAlign: "center",
    paddingHorizontal: Layout.spacing.md,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: Layout.spacing.lg,
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderRadius: Layout.borderRadius.md,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: Layout.borderRadius.sm,
  },
  toggleButtonActive: {
    backgroundColor: "#4CAF50",
  },
  toggleText: {
    fontSize: Layout.fontSize.md,
    fontWeight: "600",
    color: "#4CAF50",
  },
  toggleTextActive: {
    color: "#FFFFFF",
  },
  formContainer: {
    marginBottom: Layout.spacing.xl,
  },
  formBlur: {
    borderRadius: Layout.borderRadius.xl,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
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
  passwordInputContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: Layout.spacing.xl + 10,
  },
  eyeIcon: {
    position: "absolute",
    right: Layout.spacing.md,
    top: "50%",
    transform: [{ translateY: -10 }],
  },
  forgotText: {
    fontSize: Layout.fontSize.sm,
    color: "#4CAF50",
    fontWeight: "600",
    textAlign: "right",
    marginBottom: Layout.spacing.lg,
  },
  loginButton: {
    marginBottom: Layout.spacing.md,
    backgroundColor: "#4CAF50",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: Layout.fontSize.md,
    color: "#66BB6A",
  },
  signupLink: {
    fontSize: Layout.fontSize.md,
    color: "#4CAF50",
    fontWeight: "600",
  },
});
