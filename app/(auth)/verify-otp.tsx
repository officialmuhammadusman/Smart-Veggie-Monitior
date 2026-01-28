// app/(auth)/verify-otp.tsx
import { Button } from "@/components/ui/Button";
import { Layout } from "@/constants/Layout";
import { useAuth } from "@/hooks/useAuth";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Mail } from "lucide-react-native";
import React, { useRef, useState } from "react";
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

export default function VerifyOTPScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const { verifyOTP, sendOTP } = useAuth();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      Alert.alert("Error", "Please enter the complete 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      await verifyOTP(email, otpCode);
    } catch (error: any) {
      Alert.alert("Error", error.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResending(true);
      await sendOTP(email);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to resend OTP");
    } finally {
      setResending(false);
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
        <ArrowLeft size={24} color="#2E7D32" />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Header */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          style={styles.header}
        >
          <View style={styles.iconContainer}>
            <Mail size={50} color="#4CAF50" />
          </View>
          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            We&apos;ve sent a 6-digit code to{"\n"}
            <Text style={styles.email}>{email}</Text>
          </Text>
        </Animated.View>

        {/* OTP Input */}
        <Animated.View
          entering={FadeInUp.delay(200).springify()}
          style={styles.formContainer}
        >
          <BlurView intensity={80} style={styles.formBlur}>
            <View style={styles.form}>
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => {
                      inputRefs.current[index] = ref;
                    }}
                    style={[styles.otpInput, digit && styles.otpInputFilled]}
                    value={digit}
                    onChangeText={(text) => handleChangeText(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                    editable={!loading && !resending}
                  />
                ))}
              </View>

              <Button
                title="Verify OTP"
                onPress={handleVerify}
                loading={loading}
                style={styles.verifyButton}
                disabled={loading || resending}
              />

              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>
                  Didn&apos;t receive the code?{" "}
                </Text>
                <TouchableOpacity
                  onPress={handleResendOTP}
                  disabled={resending || loading}
                >
                  <Text
                    style={[
                      styles.resendLink,
                      (resending || loading) && styles.resendLinkDisabled,
                    ]}
                  >
                    {resending ? "Sending..." : "Resend"}
                  </Text>
                </TouchableOpacity>
              </View>
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
  email: {
    fontWeight: "700",
    color: "#2E7D32",
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
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Layout.spacing.xl,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: "#C8E6C9",
    borderRadius: Layout.borderRadius.md,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    color: "#1B5E20",
  },
  otpInputFilled: {
    borderColor: "#4CAF50",
    backgroundColor: "#E8F5E9",
  },
  verifyButton: {
    marginBottom: Layout.spacing.md,
    backgroundColor: "#4CAF50",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  resendText: {
    fontSize: Layout.fontSize.md,
    color: "#66BB6A",
  },
  resendLink: {
    fontSize: Layout.fontSize.md,
    color: "#4CAF50",
    fontWeight: "600",
  },
  resendLinkDisabled: {
    opacity: 0.5,
  },
});
