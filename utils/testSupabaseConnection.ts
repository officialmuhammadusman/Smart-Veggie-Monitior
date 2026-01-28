// utils/testSupabaseConnection.ts
// 🧪 Test file to verify connection to spoilage_data table

import { supabase } from "@/services/supabase/client";
import spoilageDataService from "@/services/supabase/spoilageData";

/**
 * 🧪 Test 1: Check if we can connect to spoilage_data table
 */
export async function testSpoilageDataConnection() {
  console.log("🧪 Testing Supabase connection to spoilage_data table...");

  try {
    const { data, error, count } = await supabase
      .from("spoilage_data")
      .select("*", { count: "exact" })
      .limit(1);

    if (error) {
      console.error("❌ Connection failed:", error.message);
      return {
        success: false,
        error: error.message,
        data: null,
      };
    }

    console.log("✅ Connection successful!");
    console.log(`📊 Total rows in table: ${count}`);
    console.log("📄 Sample data:", data);

    return {
      success: true,
      error: null,
      totalRows: count,
      sampleData: data,
    };
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return {
      success: false,
      error: String(err),
      data: null,
    };
  }
}

/**
 * 🧪 Test 2: Fetch latest reading with AI enhancement
 */
export async function testAIEnhancement(deviceId: string = "test-device-1") {
  console.log("🧪 Testing AI enhancement on spoilage data...");

  try {
    const reading = await spoilageDataService.getLatestReading(deviceId);

    if (!reading) {
      console.log("⚠️ No data found in spoilage_data table");
      return {
        success: false,
        message: "No data in table",
      };
    }

    console.log("✅ AI Enhancement working!");
    console.log("📊 Original data:");
    console.log(`   - ID: ${reading.id}`);
    console.log(`   - Gas Level: ${reading.gas_level}`);
    console.log(`   - Spoiled: ${reading.spoiled}`);
    console.log(`   - Image URL: ${reading.image_url}`);

    console.log("\n🤖 AI-Generated data:");
    console.log(`   - Temperature: ${reading.temperature}°C`);
    console.log(`   - Humidity: ${reading.humidity}%`);
    console.log(`   - Spoilage Prediction: ${reading.spoilage_prediction}`);
    console.log(`   - Confidence: ${reading.confidence}%`);
    console.log(`   - Freshness Score: ${reading.freshness_score}%`);
    console.log(`   - Days Until Spoilage: ${reading.days_until_spoilage}`);
    console.log(`   - Vegetable Type: ${reading.vegetable_type}`);
    console.log(`   - Risk Level: ${reading.risk_level}`);

    return {
      success: true,
      reading,
    };
  } catch (err) {
    console.error("❌ AI Enhancement failed:", err);
    return {
      success: false,
      error: String(err),
    };
  }
}

/**
 * 🧪 Test 3: Check alert generation
 */
export async function testAlertGeneration(
  deviceId: string = "test-device-1",
  userId: string = "test-user-1",
) {
  console.log("🧪 Testing alert generation...");

  try {
    const alert = await spoilageDataService.checkAndGenerateAlerts(
      deviceId,
      userId,
    );

    if (!alert) {
      console.log("ℹ️ No alert needed - everything is good!");
      return {
        success: true,
        alertGenerated: false,
      };
    }

    console.log("✅ Alert generated successfully!");
    console.log(`🚨 Severity: ${alert.severity}`);
    console.log(`📝 Message: ${alert.message}`);

    return {
      success: true,
      alertGenerated: true,
      alert,
    };
  } catch (err) {
    console.error("❌ Alert generation failed:", err);
    return {
      success: false,
      error: String(err),
    };
  }
}

/**
 * 🧪 Test 4: Get statistics
 */
export async function testStatistics(deviceId: string = "test-device-1") {
  console.log("🧪 Testing statistics calculation...");

  try {
    const stats = await spoilageDataService.getStatistics(deviceId);

    console.log("✅ Statistics calculated!");
    console.log(`📊 Total Readings: ${stats.totalReadings}`);
    console.log(`📈 Average Gas Level: ${stats.averageGasLevel}`);
    console.log(`🔴 Spoilage Rate: ${stats.spoilageRate}%`);
    console.log(`🟢 Fresh Count: ${stats.freshCount}`);
    console.log(`🔴 Spoiled Count: ${stats.spoiledCount}`);

    return {
      success: true,
      stats,
    };
  } catch (err) {
    console.error("❌ Statistics calculation failed:", err);
    return {
      success: false,
      error: String(err),
    };
  }
}

/**
 * 🧪 Run all tests
 */
export async function runAllTests(
  deviceId: string = "test-device-1",
  userId: string = "test-user-1",
) {
  console.log("\n🚀 Running all Supabase connection tests...\n");

  const results = {
    connection: await testSpoilageDataConnection(),
    aiEnhancement: await testAIEnhancement(deviceId),
    alertGeneration: await testAlertGeneration(deviceId, userId),
    statistics: await testStatistics(deviceId),
  };

  console.log("\n📋 Test Results Summary:");
  console.log(
    `✅ Connection: ${results.connection.success ? "PASSED" : "FAILED"}`,
  );
  console.log(
    `✅ AI Enhancement: ${results.aiEnhancement.success ? "PASSED" : "FAILED"}`,
  );
  console.log(
    `✅ Alert Generation: ${results.alertGeneration.success ? "PASSED" : "FAILED"}`,
  );
  console.log(
    `✅ Statistics: ${results.statistics.success ? "PASSED" : "FAILED"}`,
  );

  const allPassed = Object.values(results).every((r) => r.success);
  console.log(
    `\n${allPassed ? "🎉 All tests passed!" : "⚠️ Some tests failed"}`,
  );

  return results;
}

export default {
  testSpoilageDataConnection,
  testAIEnhancement,
  testAlertGeneration,
  testStatistics,
  runAllTests,
};
