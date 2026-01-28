import { AIEngine, SupabaseToAppTransformer } from "@/utils/aiEngine";
import { supabase } from "./client";

interface SupabaseRawData {
  id: number;
  gas_level: number;
  spoiled: boolean;
  image_url: string;
}

class SpoilageDataService {
  private deviceId = "virtual-device-001";

  private transformAIFields(reading: any) {
    if (!reading) return reading;

    return {
      ...reading,
      ai_temperature: reading.temperature,
      ai_humidity: reading.humidity,
      ai_spoilage_prediction: reading.spoilage_prediction,
      ai_confidence: reading.confidence,
      ai_freshness_score: reading.freshness_score,
      ai_days_until_spoilage: reading.days_until_spoilage,
      ai_vegetable_type: reading.vegetable_type,
      ai_risk_level: reading.risk_level,
    };
  }

  async getAllStatistics() {
    try {
      const { data, error } = await supabase.from("spoilage_data").select("*");

      if (error) throw error;

      const enhancedData = SupabaseToAppTransformer.transformSpoilageData(
        data as SupabaseRawData[],
        this.deviceId,
      );

      const totalReadings = enhancedData.length;
      const freshCount = enhancedData.filter((d) => !d.spoiled).length;
      const spoiledCount = enhancedData.filter((d) => d.spoiled).length;
      const averageGasLevel =
        enhancedData.reduce((sum, d) => sum + (d.gas_level || 0), 0) /
          totalReadings || 0;
      const spoilageRate = (spoiledCount / totalReadings) * 100 || 0;

      return {
        totalReadings,
        freshCount,
        spoiledCount,
        averageGasLevel,
        spoilageRate,
      };
    } catch (error) {
      return {
        totalReadings: 0,
        freshCount: 0,
        spoiledCount: 0,
        averageGasLevel: 0,
        spoilageRate: 0,
      };
    }
  }

  async getLatestReadingGlobal() {
    try {
      const { data, error } = await supabase
        .from("spoilage_data")
        .select("*")
        .order("id", { ascending: false })
        .limit(1);

      if (error) throw error;
      if (!data || data.length === 0) return null;

      const enhanced = SupabaseToAppTransformer.getLatestReading(
        data as SupabaseRawData[],
        this.deviceId,
      );

      const transformed = this.transformAIFields(enhanced);

      return transformed;
    } catch (error) {
      return null;
    }
  }

  async getChartDataGlobal(days: number = 7) {
    try {
      const limit = days * 5;

      const { data, error } = await supabase
        .from("spoilage_data")
        .select("*")
        .order("id", { ascending: false })
        .limit(limit);

      if (error) throw error;
      if (!data || data.length === 0) return [];

      const enhancedReadings = SupabaseToAppTransformer.transformSpoilageData(
        data as SupabaseRawData[],
        this.deviceId,
      );

      const chartData = AIEngine.generateChartData(enhancedReadings);

      return chartData;
    } catch (error) {
      return [];
    }
  }

  async getAllReadings(limit: number = 100, offset: number = 0) {
    try {
      const { data, error } = await supabase
        .from("spoilage_data")
        .select("*")
        .order("id", { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      const enhanced = SupabaseToAppTransformer.transformSpoilageData(
        data as SupabaseRawData[],
        this.deviceId,
      );

      const transformed = enhanced.map((reading) =>
        this.transformAIFields(reading),
      );

      return transformed;
    } catch (error) {
      return [];
    }
  }

  async getReadingsHistory(deviceId: string, limit: number = 100) {
    return this.getAllReadings(limit);
  }

  async getStatistics(deviceId: string) {
    return this.getAllStatistics();
  }

  async getLatestReading(deviceId: string) {
    return this.getLatestReadingGlobal();
  }

  async getChartData(deviceId: string, days: number = 7) {
    return this.getChartDataGlobal(days);
  }

  async getDeviceStatus(deviceId: string): Promise<string> {
    try {
      const latestReadings = await this.getAllReadings(5);

      if (latestReadings.length === 0) return "inactive";

      const spoiledCount = latestReadings.filter((r) => r.spoiled).length;
      const avgRiskLevel = latestReadings[0]?.ai_risk_level || "low";

      if (avgRiskLevel === "critical" || spoiledCount >= 3) return "critical";
      if (avgRiskLevel === "high" || spoiledCount >= 1) return "warning";

      return "active";
    } catch (error) {
      return "inactive";
    }
  }

  async generateAlertsForFrontend(userId: string) {
    try {
      const readings = await this.getAllReadings(10);

      if (readings.length === 0) return [];

      const alerts = [];

      for (let i = 0; i < readings.length; i++) {
        const currentReading = readings[i];
        const previousReading =
          i < readings.length - 1 ? readings[i + 1] : null;

        const currentForAI = {
          ...currentReading,
          temperature: currentReading.ai_temperature,
          humidity: currentReading.ai_humidity,
          spoilage_prediction: currentReading.ai_spoilage_prediction,
          confidence: currentReading.ai_confidence,
          freshness_score: currentReading.ai_freshness_score,
          days_until_spoilage: currentReading.ai_days_until_spoilage,
          vegetable_type: currentReading.ai_vegetable_type,
          risk_level: currentReading.ai_risk_level,
        };

        const previousForAI = previousReading
          ? {
              ...previousReading,
              temperature: previousReading.ai_temperature,
              humidity: previousReading.ai_humidity,
              spoilage_prediction: previousReading.ai_spoilage_prediction,
              confidence: previousReading.ai_confidence,
              freshness_score: previousReading.ai_freshness_score,
              days_until_spoilage: previousReading.ai_days_until_spoilage,
              vegetable_type: previousReading.ai_vegetable_type,
              risk_level: previousReading.ai_risk_level,
            }
          : null;

        const alert = AIEngine.generateAlert(
          currentForAI as any,
          previousForAI as any,
          userId,
        );

        if (alert) {
          alerts.push(alert);
        }

        if (alerts.length >= 10) break;
      }

      return alerts;
    } catch (error) {
      return [];
    }
  }

  async checkCriticalConditions(userId: string) {
    try {
      const latestReading = await this.getLatestReadingGlobal();

      if (!latestReading) return [];

      const criticalAlerts = [];

      if (latestReading.gas_level > 70) {
        criticalAlerts.push({
          id: `critical_gas_${Date.now()}`,
          device_id: latestReading.device_id,
          user_id: userId,
          severity: "critical",
          message: `🚨 Critical gas levels (${latestReading.gas_level})! ${latestReading.ai_vegetable_type} requires immediate attention.`,
          is_read: false,
          created_at: new Date().toISOString(),
          alert_type: "gas",
          data: latestReading,
        });
      }

      if (latestReading.spoiled) {
        criticalAlerts.push({
          id: `critical_spoilage_${Date.now()}`,
          device_id: latestReading.device_id,
          user_id: userId,
          severity: "critical",
          message: `🚨 Spoilage detected in ${latestReading.ai_vegetable_type}! Remove immediately.`,
          is_read: false,
          created_at: new Date().toISOString(),
          alert_type: "spoilage",
          data: latestReading,
        });
      }

      if (latestReading.ai_temperature > 26) {
        criticalAlerts.push({
          id: `critical_temp_${Date.now()}`,
          device_id: latestReading.device_id,
          user_id: userId,
          severity: "high",
          message: `⚠️ Temperature too high (${latestReading.ai_temperature.toFixed(1)}°C). Check cooling system.`,
          is_read: false,
          created_at: new Date().toISOString(),
          alert_type: "temperature",
          data: latestReading,
        });
      }

      if (latestReading.ai_freshness_score < 30 && !latestReading.spoiled) {
        criticalAlerts.push({
          id: `warning_freshness_${Date.now()}`,
          device_id: latestReading.device_id,
          user_id: userId,
          severity: "medium",
          message: `⚠️ Low freshness (${latestReading.ai_freshness_score}%) for ${latestReading.ai_vegetable_type}. Use soon.`,
          is_read: false,
          created_at: new Date().toISOString(),
          alert_type: "spoilage",
          data: latestReading,
        });
      }

      return criticalAlerts;
    } catch (error) {
      return [];
    }
  }

  subscribeToSpoilageData(
    deviceId: string,
    userId: string,
    callback: (reading: any, alerts?: any[]) => void,
  ) {
    const subscription = supabase
      .channel(`spoilage_data_all`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "spoilage_data",
        },
        async (payload) => {
          const enhanced = AIEngine.enhanceReading(
            payload.new as SupabaseRawData,
            deviceId,
          );

          const transformed = this.transformAIFields(enhanced);

          const previousReading = await this.getLatestReadingGlobal();

          const currentForAI = {
            ...enhanced,
            temperature: enhanced.temperature,
            humidity: enhanced.humidity,
            spoilage_prediction: enhanced.spoilage_prediction,
            confidence: enhanced.confidence,
            freshness_score: enhanced.freshness_score,
            days_until_spoilage: enhanced.days_until_spoilage,
            vegetable_type: enhanced.vegetable_type,
            risk_level: enhanced.risk_level,
          };

          const alert = AIEngine.generateAlert(
            currentForAI as any,
            previousReading,
            userId,
          );

          const alerts = alert ? [alert] : [];

          callback(transformed, alerts);
        },
      )
      .subscribe();

    return subscription;
  }

  async generateHistoricalTrend(deviceId: string, days: number = 7) {
    try {
      const latestReading = await this.getLatestReadingGlobal();

      if (!latestReading) return [];

      const readingForAI = {
        ...latestReading,
        temperature: latestReading.ai_temperature,
        humidity: latestReading.ai_humidity,
        spoilage_prediction: latestReading.ai_spoilage_prediction,
        confidence: latestReading.ai_confidence,
        freshness_score: latestReading.ai_freshness_score,
        days_until_spoilage: latestReading.ai_days_until_spoilage,
        vegetable_type: latestReading.ai_vegetable_type,
        risk_level: latestReading.ai_risk_level,
      };

      const trend = AIEngine.generateHistoricalTrend(readingForAI as any, days);

      const transformedTrend = trend.map((reading) =>
        this.transformAIFields(reading),
      );

      return transformedTrend;
    } catch (error) {
      return [];
    }
  }
}

export default new SpoilageDataService();
