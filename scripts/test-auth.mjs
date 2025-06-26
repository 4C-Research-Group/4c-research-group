import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, "../.env.local") });

if (
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  throw new Error("Missing Supabase environment variables");
}

// Use anon key to simulate client-side behavior
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testAuth() {
  try {
    console.log("🧪 Testing authentication flow...");

    // Test 1: Sign in
    console.log("1. Testing sign in...");
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: "admin@example.com",
        password: "admin123",
      });

    if (authError) {
      console.error("❌ Sign in failed:", authError);
      return;
    }

    console.log("✅ Sign in successful, user ID:", authData.user.id);

    // Test 2: Query users table
    console.log("2. Testing users table query...");
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", authData.user.id)
      .single();

    if (userError) {
      console.error("❌ Users table query failed:", userError);
    } else {
      console.log("✅ Users table query successful:", userData);
    }

    // Test 3: Check if user is admin
    console.log("3. Checking admin status...");
    if (userData?.role === "admin") {
      console.log("✅ User is admin, should redirect to /admin");
    } else {
      console.log("❌ User is not admin, role:", userData?.role);
    }
  } catch (error) {
    console.error("❌ Error in testAuth:", error.message);
  }
}

testAuth();
