import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Test user credentials
const TEST_EMAIL = `testuser_${Date.now()}@example.com`;
const TEST_PASSWORD = "Test@1234";

async function testAuthFlow() {
  console.log("🚀 Starting authentication flow test...");

  try {
    // Test 1: Sign Up
    console.log("\n🔐 Testing Sign Up...");
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      }
    );

    if (signUpError) {
      throw new Error(`❌ Sign Up Failed: ${signUpError.message}`);
    }

    console.log("✅ Sign Up Successful");
    console.log("User ID:", signUpData.user?.id);

    // Test 2: Sign In
    console.log("\n🔑 Testing Sign In...");
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: TEST_EMAIL,
        password: TEST_PASSWORD,
      });

    if (signInError) {
      throw new Error(`❌ Sign In Failed: ${signInError.message}`);
    }

    console.log("✅ Sign In Successful");
    console.log("Session active:", signInData.session !== null);

    // Test 3: Get User Session
    console.log("\n👤 Testing Get User Session...");
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      throw new Error(`❌ Get User Failed: ${userError.message}`);
    }

    console.log("✅ User Session Verified");
    console.log("User email:", user?.email);

    // Test 4: Sign Out
    console.log("\n🚪 Testing Sign Out...");
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      throw new Error(`❌ Sign Out Failed: ${signOutError.message}`);
    }

    console.log("✅ Sign Out Successful");
    console.log("\n🎉 All authentication tests passed successfully!");
    process.exit(0);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("\n❌ Test Failed:", errorMessage);
    if (error instanceof Error && error.stack) {
      console.error("Stack trace:", error.stack);
    }
    process.exit(1);
  }
}

// Run the tests
testAuthFlow();
