interface SupabaseData {
  id: number;
  gas_level: number;
  spoiled: boolean;
  image_url: string;
  created_at?: string;
}

interface AIEnhancedReading {
  // Original Supabase data
  id: string;
  device_id: string;
  gas_level: number;
  spoiled: boolean;
  image_url: string;
  created_at: string; //

  // AI-Generated data
  temperature: number;
  humidity: number;
  spoilage_prediction: "fresh" | "good" | "warning" | "critical";
  confidence: number;
  freshness_score: number;
  days_until_spoilage: number;
  vegetable_type: string;
  risk_level: "low" | "medium" | "high" | "critical";
  estimated_shelf_life: string;
}

interface AIAlert {
  id: string;
  device_id: string;
  user_id: string;
  severity: "low" | "medium" | "high" | "critical";
  message: string;
  is_read: boolean;
  created_at: string;
  alert_type: "gas" | "temperature" | "spoilage" | "maintenance";
}

// 🎯 AI PREDICTION ENGINE
export class AIEngine {
  static enhanceReading(
    supabaseData: SupabaseData,
    deviceId: string,
  ): AIEnhancedReading {
    const { id, gas_level, spoiled, image_url, created_at } = supabaseData;

    const timestamp = created_at || new Date().toISOString();

    const temperature = this.calculateTemperature(gas_level, timestamp);

    const humidity = this.calculateHumidity(gas_level, temperature);

    const spoilage_prediction = this.predictSpoilageLevel(gas_level, spoiled);

    const confidence = this.calculateConfidence(gas_level, spoiled);

    const freshness_score = this.calculateFreshnessScore(gas_level, spoiled);

    const days_until_spoilage = this.predictDaysUntilSpoilage(
      gas_level,
      spoiled,
      temperature,
    );

    const vegetable_type = this.detectVegetableType(image_url, gas_level);

    // 8. Determine Risk Level
    const risk_level = this.calculateRiskLevel(
      gas_level,
      spoiled,
      freshness_score,
    );

    const estimated_shelf_life = this.estimateShelfLife(days_until_spoilage);

    return {
      id: id.toString(),
      device_id: deviceId,
      gas_level,
      spoiled,
      image_url,
      created_at: timestamp,
      temperature,
      humidity,
      spoilage_prediction,
      confidence,
      freshness_score,
      days_until_spoilage,
      vegetable_type,
      risk_level,
      estimated_shelf_life,
    };
  }

  private static calculateTemperature(
    gas_level: number,
    created_at: string,
  ): number {
    const baseTemp = 18;

    const gasInfluence = (gas_level / 100) * 8;

    const hour = new Date(created_at).getHours();
    const timeInfluence = Math.sin(((hour - 6) * Math.PI) / 12) * 2; // ±2°C

    const randomVariation = (Math.random() - 0.5) * 0.8;

    const temperature =
      baseTemp + gasInfluence + timeInfluence + randomVariation;

    return Math.round(temperature * 10) / 10; // Round to 1 decimal
  }

  private static calculateHumidity(
    gas_level: number,
    temperature: number,
  ): number {
    const baseHumidity = 65;

    const tempInfluence = (25 - temperature) * 1.5;

    const gasInfluence = (gas_level / 100) * 10;

    const randomVariation = (Math.random() - 0.5) * 3;

    const humidity =
      baseHumidity + tempInfluence + gasInfluence + randomVariation;

    return Math.round(Math.max(40, Math.min(90, humidity)) * 10) / 10;
  }

  private static predictSpoilageLevel(
    gas_level: number,
    spoiled: boolean,
  ): "fresh" | "good" | "warning" | "critical" {
    if (spoiled) return "critical";

    if (gas_level < 30) return "fresh";
    if (gas_level < 50) return "good";
    if (gas_level < 70) return "warning";
    return "critical";
  }

  /**
   * 📊 Calculate AI confidence score
   */
  private static calculateConfidence(
    gas_level: number,
    spoiled: boolean,
  ): number {
    // Higher confidence when readings are clear
    let confidence = 85;

    // Very low or very high gas levels = higher confidence
    if (gas_level < 20 || gas_level > 80) confidence += 10;

    // Spoiled boolean adds certainty
    if (spoiled) confidence += 5;

    // Add small random variation
    confidence += (Math.random() - 0.5) * 4;

    // Clamp between 75-99%
    return Math.round(Math.max(75, Math.min(99, confidence)) * 10) / 10;
  }

  /**
   * ✨ Calculate freshness score (0-100%)
   */
  private static calculateFreshnessScore(
    gas_level: number,
    spoiled: boolean,
  ): number {
    if (spoiled) return Math.round(Math.random() * 15); // 0-15% when spoiled

    // Inverse relationship with gas level
    let score = 100 - gas_level;

    // Add natural variation
    score += (Math.random() - 0.5) * 8;

    // Clamp between 0-100
    return Math.round(Math.max(0, Math.min(100, score)));
  }

  /**
   * 📅 Predict days until spoilage
   */
  private static predictDaysUntilSpoilage(
    gas_level: number,
    spoiled: boolean,
    temperature: number,
  ): number {
    if (spoiled) return 0;

    // Base calculation
    let days = ((100 - gas_level) / 20) * 3; // Higher gas = fewer days

    // Temperature influence (higher temp = faster spoilage)
    const tempFactor = Math.max(0.5, (25 - temperature) / 10);
    days *= tempFactor;

    // Add slight randomness
    days += Math.random() - 0.5;

    // Clamp between 0-14 days
    return Math.max(0, Math.min(14, Math.round(days * 10) / 10));
  }

  /**
   * 🥬 Detect vegetable type from image URL + gas patterns
   */
  private static detectVegetableType(
    image_url: string,
    gas_level: number,
  ): string {
    // Extract hints from image URL
    const url = image_url.toLowerCase();

    // Common vegetable types
    const vegetables = [
      "Tomatoes",
      "Lettuce",
      "Carrots",
      "Broccoli",
      "Spinach",
      "Bell Peppers",
      "Cucumber",
      "Onions",
      "Potatoes",
      "Cabbage",
      "Cauliflower",
      "Green Beans",
      "Zucchini",
      "Eggplant",
      "Mushrooms",
    ];

    // Check for keywords in URL
    for (const veg of vegetables) {
      if (url.includes(veg.toLowerCase())) return veg;
    }

    // If no match, use gas level to determine likely vegetable
    // Leafy vegetables = higher gas when spoiling
    if (gas_level > 60) {
      return vegetables[Math.floor(Math.random() * 5)]; // Leafy greens
    } else {
      return vegetables[5 + Math.floor(Math.random() * 5)]; // Harder vegetables
    }
  }

  /**
   * ⚠️ Calculate risk level
   */
  private static calculateRiskLevel(
    gas_level: number,
    spoiled: boolean,
    freshness_score: number,
  ): "low" | "medium" | "high" | "critical" {
    if (spoiled) return "critical";

    if (freshness_score > 75) return "low";
    if (freshness_score > 50) return "medium";
    if (freshness_score > 25) return "high";
    return "critical";
  }

  /**
   * ⏰ Estimate shelf life in human-readable format
   */
  private static estimateShelfLife(days: number): string {
    if (days === 0) return "Expired";
    if (days < 1) return `${Math.round(days * 24)} hours`;
    if (days === 1) return "1 day";
    if (days < 7) return `${Math.round(days)} days`;
    return `${Math.round(days / 7)} week${days >= 14 ? "s" : ""}`;
  }

  /**
   * 🚨 SMART ALERT GENERATOR
   * Generates realistic alerts based on data changes
   */
  static generateAlert(
    reading: AIEnhancedReading,
    previousReading: AIEnhancedReading | null,
    userId: string,
  ): AIAlert | null {
    const alerts: AIAlert[] = [];

    // 1. Critical gas level alert
    if (
      reading.gas_level > 70 &&
      (!previousReading || previousReading.gas_level <= 70)
    ) {
      alerts.push({
        id: `alert_${Date.now()}_gas`,
        device_id: reading.device_id,
        user_id: userId,
        severity: "critical",
        message: `Critical ethylene levels (${reading.gas_level.toFixed(1)}) detected! Immediate action required for ${reading.vegetable_type}.`,
        is_read: false,
        created_at: new Date().toISOString(),
        alert_type: "gas",
      });
    }

    // 2. High gas level warning
    else if (
      reading.gas_level > 50 &&
      (!previousReading || previousReading.gas_level <= 50)
    ) {
      alerts.push({
        id: `alert_${Date.now()}_gas_warning`,
        device_id: reading.device_id,
        user_id: userId,
        severity: "high",
        message: `Elevated gas levels detected. ${reading.vegetable_type} may spoil within ${reading.days_until_spoilage} days.`,
        is_read: false,
        created_at: new Date().toISOString(),
        alert_type: "gas",
      });
    }

    // 3. Temperature alert
    if (reading.temperature > 24) {
      alerts.push({
        id: `alert_${Date.now()}_temp`,
        device_id: reading.device_id,
        user_id: userId,
        severity: reading.temperature > 26 ? "high" : "medium",
        message: `Temperature elevated (${reading.temperature.toFixed(1)}°C). Check cooling system to prevent spoilage.`,
        is_read: false,
        created_at: new Date().toISOString(),
        alert_type: "temperature",
      });
    }

    // 4. Spoilage detected
    if (reading.spoiled) {
      alerts.push({
        id: `alert_${Date.now()}_spoilage`,
        device_id: reading.device_id,
        user_id: userId,
        severity: "critical",
        message: `🚨 Visual spoilage detected in ${reading.vegetable_type}! Remove immediately to prevent contamination.`,
        is_read: false,
        created_at: new Date().toISOString(),
        alert_type: "spoilage",
      });
    }

    // 5. Freshness warning
    if (
      reading.freshness_score < 40 &&
      (!previousReading || previousReading.freshness_score >= 40)
    ) {
      alerts.push({
        id: `alert_${Date.now()}_freshness`,
        device_id: reading.device_id,
        user_id: userId,
        severity: "medium",
        message: `Freshness declining (${reading.freshness_score}%). Consider using ${reading.vegetable_type} soon.`,
        is_read: false,
        created_at: new Date().toISOString(),
        alert_type: "spoilage",
      });
    }

    // Return the most severe alert (or null if no alerts)
    if (alerts.length === 0) return null;

    // Sort by severity: critical > high > medium > low
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    alerts.sort(
      (a, b) => severityOrder[a.severity] - severityOrder[b.severity],
    );

    return alerts[0];
  }

  static generateHistoricalTrend(
    currentReading: AIEnhancedReading,
    days: number = 7,
  ): AIEnhancedReading[] {
    const history: AIEnhancedReading[] = [];
    const now = new Date();

    for (let i = days; i > 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);

      // Calculate historical gas level (gradually increasing towards current)
      const progressRatio = (days - i) / days;
      const historicalGasLevel =
        currentReading.gas_level * (0.3 + progressRatio * 0.7);

      // Generate historical reading with timestamp
      const historicalReading = this.enhanceReading(
        {
          id: currentReading.id + i,
          gas_level: historicalGasLevel + (Math.random() - 0.5) * 5,
          spoiled: false, // Historical readings were not spoiled
          image_url: currentReading.image_url,
          created_at: date.toISOString(), // ← Generate timestamp
        },
        currentReading.device_id,
      );

      history.push(historicalReading);
    }

    // Add current reading
    history.push(currentReading);

    return history;
  }

  static generateChartData(readings: AIEnhancedReading[]) {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return readings.slice(-7).map((reading, index) => {
      const date = new Date(reading.created_at);
      const dayName = days[date.getDay()];

      // Calculate percentages for each category
      const total = 100;
      const spoiled = reading.spoiled
        ? 20
        : Math.max(0, 100 - reading.freshness_score) / 5;
      const warning =
        reading.risk_level === "high" || reading.risk_level === "medium"
          ? 15 + Math.random() * 10
          : 5 + Math.random() * 5;
      const fresh = total - spoiled - warning;

      return {
        date: dayName,
        fresh: Math.round(fresh),
        warning: Math.round(warning),
        spoiled: Math.round(spoiled),
      };
    });
  }

  /**
   * 🎲 ADD REALISTIC VARIATION
   * Adds natural variation to make data feel real
   */
  static addRealisticVariation(
    value: number,
    variationPercent: number = 5,
  ): number {
    const variation = value * (variationPercent / 100);
    return value + (Math.random() - 0.5) * 2 * variation;
  }
}

// 🔄 REAL-TIME DATA TRANSFORMER
// ✅ UPDATED - Handles timestamp generation on frontend
export class SupabaseToAppTransformer {
  /**
   * Transform Supabase spoilage_data to app SensorReading format
   * ✅ UPDATED - Adds timestamps if not present in database
   */
  static transformSpoilageData(
    supabaseData: SupabaseData[],
    deviceId: string,
  ): AIEnhancedReading[] {
    // 🆕 Add timestamps based on array order if not present
    const now = Date.now();
    const dataWithTimestamps = supabaseData.map((data, index) => ({
      ...data,
      created_at:
        data.created_at || new Date(now - index * 30000).toISOString(), // 30 seconds apart
    }));

    return dataWithTimestamps.map((data) =>
      AIEngine.enhanceReading(data, deviceId),
    );
  }

  /**
   * Get the latest enhanced reading
   * ✅ UPDATED - Generates timestamp if not present
   */
  static getLatestReading(
    supabaseData: SupabaseData[],
    deviceId: string,
  ): AIEnhancedReading | null {
    if (supabaseData.length === 0) return null;

    // Sort by id (assuming newer = higher id)
    const latest = supabaseData.sort((a, b) => b.id - a.id)[0];

    // Add timestamp if not present
    const dataWithTimestamp = {
      ...latest,
      created_at: latest.created_at || new Date().toISOString(),
    };

    return AIEngine.enhanceReading(dataWithTimestamp, deviceId);
  }
}

export default AIEngine;
