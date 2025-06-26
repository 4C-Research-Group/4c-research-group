import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

// Load environment variables
config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testCurrentUser() {
  try {
    console.log("🧪 Testing current user authentication...");

    // Test 1: Sign in with the user account
    console.log("1. Testing sign in with user account...");
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: "pranav.jhaqqqqq@mail.concordia.ca",
        password: "your-password-here", // You'll need to provide the actual password
      });

    if (authError) {
      console.error("❌ Sign in failed:", authError);
      console.log("ℹ️  Please provide the correct password for testing");
      return;
    }

    console.log("✅ Sign in successful, user ID:", authData.user.id);

    // Test 2: Query user data
    console.log("2. Testing user data query...");
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("id, email, name, role, created_at")
      .eq("id", authData.user.id)
      .single();

    if (userError) {
      console.error("❌ User data query failed:", userError);
      return;
    }

    console.log("✅ User data query successful:");
    console.log("  - ID:", userData.id);
    console.log("  - Email:", userData.email);
    console.log("  - Name:", userData.name);
    console.log("  - Role:", userData.role);
    console.log("  - Created:", userData.created_at);

    // Test 3: Check if user should see name in navbar
    console.log("3. Testing navbar display...");
    if (userData.name) {
      console.log(
        "✅ User has a name, should display in navbar as:",
        userData.name
      );
    } else {
      console.log(
        "⚠️  User has no name, will display email in navbar:",
        userData.email
      );
    }

    // Test 4: Check redirect path
    console.log("4. Testing redirect path...");
    if (userData.role === "admin") {
      console.log("✅ User is admin, should redirect to /admin");
    } else {
      console.log("✅ User is regular user, should redirect to /dashboard");
    }

    console.log("\n🎉 Current user test completed successfully!");
  } catch (error) {
    console.error("❌ Error in testCurrentUser:", error);
  }
}

testCurrentUser();
