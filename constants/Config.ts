// constants/Config.ts

export const Config = {
  // App Information
  app: {
    name: "Smart Veggie Monitor",
    version: "1.0.0",
    buildNumber: 1,
  },

  // API Configuration
  api: {
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  },

  // Sensor Thresholds
  sensors: {
    gasLevel: {
      low: 50,
      medium: 70,
      high: 85,
      critical: 95,
    },
    temperature: {
      min: 0,
      max: 40,
      optimal: { min: 4, max: 10 },
    },
    humidity: {
      min: 0,
      max: 100,
      optimal: { min: 50, max: 70 },
    },
  },

  // Spoilage Detection
  spoilage: {
    confidenceThreshold: 75, // Minimum confidence percentage
    checkInterval: 300000, // 5 minutes in milliseconds
    alertDelayMinutes: 5, // Don't spam alerts
  },

  // Notifications
  notifications: {
    enabled: true,
    sound: true,
    vibrate: true,
    badge: true,
  },

  // Data Sync
  sync: {
    enabled: true,
    interval: 60000, // 1 minute
    offlineQueueSize: 100,
  },

  // Cache
  cache: {
    enabled: true,
    ttl: 300000, // 5 minutes
    maxSize: 50, // MB
  },

  // Feature Flags
  features: {
    realTimeUpdates: true,
    pushNotifications: true,
    darkMode: false, // Coming soon
    exportReports: true,
    multiLanguage: false, // Coming soon
  },

  // Links
  links: {
    website: "https://smartveggiemonitor.com",
    support: "mailto:support@smartveggiemonitor.com",
    privacyPolicy: "https://smartveggiemonitor.com/privacy",
    termsOfService: "https://smartveggiemonitor.com/terms",
    documentation: "https://docs.smartveggiemonitor.com",
  },

  // Development
  dev: {
    showLogs: __DEV__,
    mockData: true, // Set to false when using real Supabase
    skipOnboarding: false,
  },
};
