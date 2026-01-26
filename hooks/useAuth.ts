// hooks/useAuth.ts
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert } from "react-native";

// Define user type
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// Mock user storage (in a real app, use AsyncStorage or secure storage)
const mockUsers: User[] = [];

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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

      // Check if user already exists
      const existingUser = mockUsers.find((u) => u.email === email);
      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        createdAt: new Date(),
      };

      // Store user (in real app, this would be an API call)
      mockUsers.push(newUser);
      setUser(newUser);

      // Show success message
      Alert.alert("Success", "Account created successfully!");

      // Navigate to main app
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Signup error:", error);
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

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check mock users (in real app, this would be an API call)
      const foundUser = mockUsers.find((u) => u.email === email);

      if (!foundUser) {
        // For demo purposes, auto-create a user if not found
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name: email.split("@")[0],
          createdAt: new Date(),
        };
        mockUsers.push(newUser);
        setUser(newUser);
      } else {
        // In real app, verify password here
        setUser(foundUser);
      }

      // Navigate to main app
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser(null);
      // Navigate to login
      router.replace("/(auth)/login");
    } catch (error: any) {
      console.error("Logout error:", error);
      throw new Error(error.message || "Failed to logout");
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

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Update user data
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);

      // Update in mock storage
      const userIndex = mockUsers.findIndex((u) => u.id === user.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = updatedUser;
      }

      Alert.alert("Success", "Profile updated successfully!");
    } catch (error: any) {
      console.error("Update profile error:", error);
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
    logout,
    updateProfile,
  };
}
