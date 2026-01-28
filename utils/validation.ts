// // utils/validation.ts

// export const validateEmail = (email: string): boolean => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// export const validatePassword = (
//   password: string,
// ): {
//   isValid: boolean;
//   message?: string;
// } => {
//   if (password.length < 6) {
//     return {
//       isValid: false,
//       message: "Password must be at least 6 characters",
//     };
//   }
//   if (password.length > 50) {
//     return { isValid: false, message: "Password is too long" };
//   }
//   return { isValid: true };
// };

// export const validateName = (name: string): boolean => {
//   return name.trim().length >= 2;
// };

// export const validateDeviceId = (deviceId: string): boolean => {
//   // Example format: XXXX-XXXX-XXXX or 12 alphanumeric characters
//   const deviceIdRegex = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$|^[A-Z0-9]{12}$/;
//   return deviceIdRegex.test(deviceId.toUpperCase());
// };

// export const validateRequired = (
//   value: string,
//   fieldName: string,
// ): {
//   isValid: boolean;
//   message?: string;
// } => {
//   if (!value || value.trim().length === 0) {
//     return { isValid: false, message: `${fieldName} is required` };
//   }
//   return { isValid: true };
// };

// // utils/formatters.ts
// export const formatDate = (dateString: string): string => {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//   });
// };

// export const formatDateTime = (dateString: string): string => {
//   const date = new Date(dateString);
//   return date.toLocaleString("en-US", {
//     year: "numeric",
//     month: "short",
//     day: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// };

// export const formatTimeAgo = (dateString: string): string => {
//   const date = new Date(dateString);
//   const now = new Date();
//   const diffMs = now.getTime() - date.getTime();
//   const diffMins = Math.floor(diffMs / 60000);

//   if (diffMins < 1) return "Just now";
//   if (diffMins < 60) return `${diffMins}m ago`;

//   const diffHours = Math.floor(diffMins / 60);
//   if (diffHours < 24) return `${diffHours}h ago`;

//   const diffDays = Math.floor(diffHours / 24);
//   if (diffDays === 1) return "Yesterday";
//   if (diffDays < 7) return `${diffDays}d ago`;
//   if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;

//   return formatDate(dateString);
// };

// export const formatNumber = (num: number, decimals: number = 1): string => {
//   return num.toFixed(decimals);
// };

// export const formatPercentage = (num: number, decimals: number = 1): string => {
//   return `${num.toFixed(decimals)}%`;
// };

// // utils/helpers.ts
// export const delay = (ms: number): Promise<void> => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

// export const truncate = (str: string, length: number): string => {
//   if (str.length <= length) return str;
//   return str.substring(0, length) + "...";
// };

// export const capitalize = (str: string): string => {
//   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
// };

// export const generateRandomId = (): string => {
//   return Math.random().toString(36).substring(2, 9);
// };

// utils/validation.ts

// Email validation with proper regex
export const validateEmail = (
  email: string,
): {
  isValid: boolean;
  message?: string;
} => {
  if (!email || email.trim().length === 0) {
    return { isValid: false, message: "Email is required" };
  }

  // Comprehensive email regex
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Please enter a valid email address" };
  }

  // Check for common email mistakes
  if (email.includes("..") || email.startsWith(".") || email.endsWith(".")) {
    return { isValid: false, message: "Invalid email format" };
  }

  return { isValid: true };
};

// Password validation with multiple checks
export const validatePassword = (
  password: string,
): {
  isValid: boolean;
  message?: string;
} => {
  if (!password || password.trim().length === 0) {
    return { isValid: false, message: "Password is required" };
  }

  if (password.length < 6) {
    return {
      isValid: false,
      message: "Password must be at least 6 characters long",
    };
  }

  if (password.length > 128) {
    return {
      isValid: false,
      message: "Password is too long (max 128 characters)",
    };
  }

  // Check for at least one letter
  if (!/[a-zA-Z]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one letter",
    };
  }

  // Check for at least one number
  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one number",
    };
  }

  // Check for spaces
  if (/\s/.test(password)) {
    return { isValid: false, message: "Password cannot contain spaces" };
  }

  return { isValid: true };
};

// Name validation
export const validateName = (
  name: string,
): {
  isValid: boolean;
  message?: string;
} => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, message: "Name is required" };
  }

  if (name.trim().length < 2) {
    return {
      isValid: false,
      message: "Name must be at least 2 characters long",
    };
  }

  if (name.trim().length > 50) {
    return { isValid: false, message: "Name is too long (max 50 characters)" };
  }

  // Check for valid name characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(name)) {
    return {
      isValid: false,
      message:
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    };
  }

  return { isValid: true };
};

// Confirm password validation
export const validateConfirmPassword = (
  password: string,
  confirmPassword: string,
): {
  isValid: boolean;
  message?: string;
} => {
  if (!confirmPassword || confirmPassword.trim().length === 0) {
    return { isValid: false, message: "Please confirm your password" };
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: "Passwords do not match" };
  }

  return { isValid: true };
};

// OTP validation
export const validateOTP = (
  otp: string,
): {
  isValid: boolean;
  message?: string;
} => {
  if (!otp || otp.trim().length === 0) {
    return { isValid: false, message: "OTP is required" };
  }

  if (otp.length !== 6) {
    return { isValid: false, message: "OTP must be 6 digits" };
  }

  if (!/^\d{6}$/.test(otp)) {
    return { isValid: false, message: "OTP must contain only numbers" };
  }

  return { isValid: true };
};

// Generic required field validation
export const validateRequired = (
  value: string,
  fieldName: string,
): {
  isValid: boolean;
  message?: string;
} => {
  if (!value || value.trim().length === 0) {
    return { isValid: false, message: `${fieldName} is required` };
  }
  return { isValid: true };
};

// utils/formatters.ts
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;

  return formatDate(dateString);
};

export const formatNumber = (num: number, decimals: number = 1): string => {
  return num.toFixed(decimals);
};

export const formatPercentage = (num: number, decimals: number = 1): string => {
  return `${num.toFixed(decimals)}%`;
};

// utils/helpers.ts
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.substring(0, length) + "...";
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const generateRandomId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
