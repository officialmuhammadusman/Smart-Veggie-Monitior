// app/(auth)/signup.tsx - COMPLETE WITH VALIDATION
import { Button } from "@/components/ui/Button";
import { Layout } from "@/constants/Layout";
import { useAuth } from "@/hooks/useAuth";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "@/utils/validation";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
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
import Toast from "react-native-toast-message"; // Add this import (same as login)

export default function SignupScreen() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error states
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Real-time validation handlers
  const handleNameChange = (text: string) => {
    setName(text);
    setNameError("");
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError("");
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError("");
  };

  const handleSignup = async () => {
    // Clear all errors
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    let hasError = false;

    // Validate name
    const nameValidation = validateName(name);
    if (!nameValidation.isValid) {
      setNameError(nameValidation.message || "Invalid name");
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: nameValidation.message || "Invalid name",
      });
      hasError = true;
    }

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.message || "Invalid email");
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: emailValidation.message || "Invalid email",
      });
      hasError = true;
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.message || "Invalid password");
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: passwordValidation.message || "Invalid password",
      });
      hasError = true;
    }

    // Validate confirm password
    const confirmPasswordValidation = validateConfirmPassword(
      password,
      confirmPassword,
    );
    if (!confirmPasswordValidation.isValid) {
      setConfirmPasswordError(
        confirmPasswordValidation.message || "Passwords do not match",
      );
      Toast.show({
        type: "error",
        text1: "Validation Error",
        text2: confirmPasswordValidation.message || "Passwords do not match",
      });
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      setIsLoading(true);
      await signup(email.trim(), password, name.trim());
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Account created! Check your email to verify.",
      });
    } catch (error: any) {
      // Removed console.error
      Toast.show({
        type: "error",
        text1: "Signup Failed",
        text2: error.message || "Failed to create account",
      });
    } finally {
      setIsLoading(false);
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

        {/* Form */}
        <Animated.View
          entering={FadeInUp.delay(200).springify()}
          style={styles.formContainer}
        >
          <BlurView intensity={80} style={styles.formBlur}>
            <View style={styles.form}>
              {/* Name Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name *</Text>
                <TextInput
                  style={[styles.input, nameError && styles.inputError]}
                  placeholder="John Doe"
                  value={name}
                  onChangeText={handleNameChange}
                  autoCapitalize="words"
                  placeholderTextColor="#9E9E9E"
                  editable={!isLoading}
                  autoCorrect={false}
                />
                {nameError ? (
                  <Text style={styles.errorText}>{nameError}</Text>
                ) : null}
              </View>

              {/* Email Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email *</Text>
                <TextInput
                  style={[styles.input, emailError && styles.inputError]}
                  placeholder="your@email.com"
                  value={email}
                  onChangeText={handleEmailChange}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  placeholderTextColor="#9E9E9E"
                  editable={!isLoading}
                  autoCorrect={false}
                />
                {emailError ? (
                  <Text style={styles.errorText}>{emailError}</Text>
                ) : null}
              </View>

              {/* Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password *</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,
                      passwordError && styles.inputError,
                    ]}
                    placeholder="Min 6 chars, letters + numbers"
                    value={password}
                    onChangeText={handlePasswordChange}
                    secureTextEntry={!showPassword}
                    placeholderTextColor="#9E9E9E"
                    editable={!isLoading}
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color="#4CAF50" />
                    ) : (
                      <Eye size={20} color="#4CAF50" />
                    )}
                  </TouchableOpacity>
                </View>
                {passwordError ? (
                  <Text style={styles.errorText}>{passwordError}</Text>
                ) : null}
              </View>

              {/* Confirm Password Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirm Password *</Text>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,
                      confirmPasswordError && styles.inputError,
                    ]}
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                    secureTextEntry={!showConfirmPassword}
                    placeholderTextColor="#9E9E9E"
                    editable={!isLoading}
                    autoCorrect={false}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} color="#4CAF50" />
                    ) : (
                      <Eye size={20} color="#4CAF50" />
                    )}
                  </TouchableOpacity>
                </View>
                {confirmPasswordError ? (
                  <Text style={styles.errorText}>{confirmPasswordError}</Text>
                ) : null}
              </View>

              <Button
                title="Create Account"
                onPress={handleSignup}
                loading={isLoading}
                style={styles.signupButton}
                disabled={isLoading}
              />

              <View style={styles.terms}>
                <Text style={styles.termsText}>
                  By signing up, you agree to our{" "}
                  <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an account? </Text>
                <Link href="/(auth)/login" asChild>
                  <TouchableOpacity disabled={isLoading}>
                    <Text
                      style={[
                        styles.loginLink,
                        isLoading && styles.disabledLink,
                      ]}
                    >
                      Sign In
                    </Text>
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
    paddingHorizontal: Layout.spacing.lg,
    paddingTop: 60,
    paddingBottom: Layout.spacing.xl,
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
  logoImage: {
    width: 70,
    height: 70,
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
  inputError: {
    borderColor: "#D32F2F",
  },
  errorText: {
    fontSize: 12,
    color: "#D32F2F",
    marginTop: 4,
  },
  signupButton: {
    marginTop: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    backgroundColor: "#4CAF50",
  },
  terms: {
    marginBottom: Layout.spacing.md,
  },
  termsText: {
    fontSize: 12,
    color: "#66BB6A",
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Layout.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#C8E6C9",
  },
  dividerText: {
    marginHorizontal: Layout.spacing.md,
    color: "#66BB6A",
    fontSize: Layout.fontSize.sm,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: Layout.fontSize.md,
    color: "#66BB6A",
  },
  loginLink: {
    fontSize: Layout.fontSize.md,
    color: "#4CAF50",
    fontWeight: "600",
  },
  disabledLink: {
    opacity: 0.5,
  },
});
