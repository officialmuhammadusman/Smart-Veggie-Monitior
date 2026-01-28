// hooks/useAuth.ts
import { supabase } from "@/services/supabase/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

// Define user type
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  sendOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, token: string) => Promise<void>;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    checkUser();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const userData: User = {
            id: session.user.id,
            email: session.user.email || "",
            name:
              session.user.user_metadata?.name ||
              session.user.user_metadata?.full_name,
            avatar_url: session.user.user_metadata?.avatar_url,
            created_at: session.user.created_at,
          };
          setUser(userData);
          await AsyncStorage.setItem("user", JSON.stringify(userData));
        } else {
          setUser(null);
          await AsyncStorage.removeItem("user");
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    try {
      setLoading(true);

      // Check Supabase session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const userData: User = {
          id: session.user.id,
          email: session.user.email || "",
          name:
            session.user.user_metadata?.name ||
            session.user.user_metadata?.full_name,
          avatar_url: session.user.user_metadata?.avatar_url,
          created_at: session.user.created_at,
        };
        setUser(userData);
        await AsyncStorage.setItem("user", JSON.stringify(userData));
      } else {
        // Check AsyncStorage as fallback
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Auth Error",
        text2: error.message || "Error checking user",
      });
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
  ): Promise<void> => {
    try {
      setLoading(true);

      // Validation
      if (!email || !password || !name) {
        throw new Error("Please fill in all fields");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      if (!email.includes("@")) {
        throw new Error("Please enter a valid email address");
      }

      // Sign up with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            full_name: name,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Check if email confirmation is required
        if (data.user.identities && data.user.identities.length === 0) {
          Toast.show({
            type: "error",
            text1: "Account Already Exists",
            text2:
              "An account with this email already exists. Please login instead.",
          });
          router.push("/(auth)/login");
          return;
        }

        // Show success message
        Toast.show({
          type: "success",
          text1: "Success",
          text2:
            "Account created successfully! Please check your email to verify your account.",
        });
        router.replace("/(auth)/login");
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Signup Error",
        text2: error.message || "Failed to create account",
      });
      throw new Error(error.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);

      // Validation
      if (!email || !password) {
        throw new Error("Please enter email and password");
      }

      // Sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        const userData: User = {
          id: data.user.id,
          email: data.user.email || "",
          name:
            data.user.user_metadata?.name || data.user.user_metadata?.full_name,
          avatar_url: data.user.user_metadata?.avatar_url,
          created_at: data.user.created_at,
        };

        setUser(userData);
        await AsyncStorage.setItem("user", JSON.stringify(userData));

        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Logged in successfully!",
        });
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      // Provide user-friendly error messages
      let errorMessage = "Failed to login";
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Please verify your email before logging in";
      }

      Toast.show({
        type: "error",
        text1: "Login Error",
        text2: errorMessage,
      });

      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "smartveggiemonitor://auth/callback", // Fixed: Matches your scheme
        },
      });

      if (error) {
        throw error;
      }

      // The auth state change listener will handle the rest
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Google Login Error",
        text2: "Failed to login with Google. Please try again.",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);

      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setUser(null);
      await AsyncStorage.removeItem("user");

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Logged out successfully!",
      });
      router.replace("/(auth)/login");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Logout Error",
        text2: error.message || "Failed to logout",
      });
      throw new Error(error.message || "Failed to logout");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    try {
      setLoading(true);

      if (!email) {
        throw new Error("Please enter your email address");
      }

      if (!email.includes("@")) {
        throw new Error("Please enter a valid email address");
      }

      // Send password reset email
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "smartveggiemonitor://auth/reset-password", // Fixed: Matches scheme
      });

      if (error) {
        throw error;
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2:
          "Password reset link has been sent to your email. Please check your inbox.",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Reset Password Error",
        text2: error.message || "Failed to send reset email",
      });
      throw new Error(error.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  const sendOTP = async (email: string): Promise<void> => {
    try {
      setLoading(true);

      if (!email || !email.includes("@")) {
        throw new Error("Please enter a valid email address");
      }

      // Send OTP via Supabase
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) {
        throw error;
      }

      Toast.show({
        type: "success",
        text1: "OTP Sent",
        text2:
          "A one-time password has been sent to your email. Please check your inbox.",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Send OTP Error",
        text2: error.message || "Failed to send OTP",
      });
      throw new Error(error.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email: string, token: string): Promise<void> => {
    try {
      setLoading(true);

      if (!email || !token) {
        throw new Error("Please enter email and OTP");
      }

      // Verify OTP with Supabase
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "email",
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "OTP verified successfully!",
        });
        router.replace("/(tabs)");
      }
    } catch (error: any) {
      // Provide user-friendly error messages
      let errorMessage = "Invalid or expired OTP";
      if (error.message.includes("Token has expired")) {
        errorMessage = "OTP has expired. Please request a new one.";
      }

      Toast.show({
        type: "error",
        text1: "Verify OTP Error",
        text2: errorMessage,
      });

      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<void> => {
    try {
      if (!user) {
        throw new Error("No user logged in");
      }

      setLoading(true);

      // Update user metadata in Supabase
      const { error } = await supabase.auth.updateUser({
        data: {
          name: data.name,
          avatar_url: data.avatar_url,
        },
      });

      if (error) {
        throw error;
      }

      // Update local user state
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Profile updated successfully!",
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Update Profile Error",
        text2: error.message || "Failed to update profile",
      });
      throw new Error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    updateProfile,
    sendOTP,
    verifyOTP,
  };
}
