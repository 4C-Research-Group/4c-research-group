import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testNormalUser() {
  console.log("🧪 Testing normal user authentication flow...");

  try {
    // Test with a normal user (you'll need to create this user first)
    const testEmail = "normaluser@example.com";
    const testPassword = "password123";

    console.log("1. Testing sign in for normal user...");
    const { data: authData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: testEmail,
        password: testPassword,
      });

    if (signInError) {
      console.log(
        "⚠️  Normal user sign in failed (user might not exist):",
        signInError.message
      );
      console.log("   This is expected if the test user doesn't exist yet.");
      return;
    }

    console.log(
      "✅ Normal user sign in successful, user ID:",
      authData.user.id
    );

    console.log("2. Testing users table query for normal user...");
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    if (userError) {
      console.error("❌ Users table query failed:", userError);
      return;
    }

    console.log("✅ Users table query successful:", userData);

    console.log("3. Checking normal user status...");
    if (userData.role === "user") {
      console.log("✅ User is normal user, should redirect to /dashboard");
    } else if (userData.role === "admin") {
      console.log("⚠️  User is admin, should redirect to /admin");
    } else {
      console.log("❓ Unknown user role:", userData.role);
    }
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

testNormalUser();
