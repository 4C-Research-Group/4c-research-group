import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

// Load environment variables
config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("🧪 Testing Authentication Flow...");

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuthFlow() {
  try {
    // Test 1: Check current session
    console.log("\n🔍 Step 1: Checking current session...");
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("❌ Session error:", sessionError);
      return;
    }

    if (session) {
      console.log("✅ Session found:", session.user.email);
      console.log("👤 User ID:", session.user.id);
    } else {
      console.log("❌ No active session found");
      return;
    }

    // Test 2: Check user role
    console.log("\n🔍 Step 2: Checking user role...");
    const { data: userData, error: roleError } = await supabase
      .from("users")
      .select("id, email, role")
      .eq("id", session.user.id)
      .single();

    if (roleError) {
      console.error("❌ Role check error:", roleError);
      return;
    }

    console.log("✅ User data:", userData);
    console.log("👑 Role:", userData.role);

    // Test 3: Test admin access
    console.log("\n🔍 Step 3: Testing admin access...");
    if (userData.role === "admin") {
      console.log("✅ User is admin - should access /admin");
    } else {
      console.log("❌ User is not admin - should access /dashboard");
    }

    // Test 4: Test server-side auth simulation
    console.log("\n🔍 Step 4: Testing server-side auth simulation...");
    const {
      data: { user: serverUser },
      error: serverAuthError,
    } = await supabase.auth.getUser();

    if (serverAuthError) {
      console.error("❌ Server auth error:", serverAuthError);
      return;
    }

    if (serverUser) {
      console.log("✅ Server-side auth successful:", serverUser.id);

      // Test role check again
      const { data: serverUserData, error: serverRoleError } = await supabase
        .from("users")
        .select("role")
        .eq("id", serverUser.id)
        .single();

      if (serverRoleError) {
        console.error("❌ Server role check error:", serverRoleError);
        return;
      }

      console.log("✅ Server role check successful:", serverUserData.role);
    } else {
      console.log("❌ Server-side auth failed - no user found");
    }

    console.log("\n🎉 Authentication flow test completed!");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

testAuthFlow();
