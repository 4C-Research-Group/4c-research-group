import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

// Load environment variables
config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("🧪 Testing Login Flow...");

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLoginFlow() {
  try {
    // Test 1: Check if admin user exists
    console.log("\n🔍 Step 1: Checking admin user in database...");
    const { data: adminUsers, error: adminError } = await supabase
      .from("users")
      .select("id, email, role")
      .eq("role", "admin");

    if (adminError) {
      console.error("❌ Error checking admin users:", adminError);
      return;
    }

    if (adminUsers.length === 0) {
      console.error("❌ No admin users found in database");
      return;
    }

    const adminUser = adminUsers[0];
    console.log("✅ Admin user found:", adminUser.email);
    console.log("👤 Admin ID:", adminUser.id);
    console.log("👑 Role:", adminUser.role);

    // Test 2: Simulate login (you'll need to provide the password)
    console.log("\n🔍 Step 2: Testing login process...");
    console.log("⚠️  Note: This test requires the admin password");
    console.log("📧 Email:", adminUser.email);

    // For testing, we'll just check if the user can be authenticated
    // In a real scenario, you would use the actual password
    console.log("🔐 Login simulation: Would authenticate with password");

    // Test 3: Check what happens after login
    console.log("\n🔍 Step 3: Testing post-login flow...");

    // Simulate the role check that happens after login
    const { data: userData, error: roleError } = await supabase
      .from("users")
      .select("role")
      .eq("id", adminUser.id)
      .single();

    if (roleError) {
      console.error("❌ Role check error:", roleError);
      return;
    }

    console.log("✅ Role check successful:", userData.role);

    if (userData.role === "admin") {
      console.log("✅ User is admin - should redirect to /admin");
    } else {
      console.log("❌ User is not admin - should redirect to /dashboard");
    }

    // Test 4: Test server-side auth simulation
    console.log("\n🔍 Step 4: Testing server-side auth simulation...");

    // This simulates what happens in the admin layout
    const {
      data: { user: serverUser },
      error: serverAuthError,
    } = await supabase.auth.getUser();

    if (serverAuthError) {
      console.error("❌ Server auth error:", serverAuthError);
    } else if (serverUser) {
      console.log("✅ Server-side auth successful:", serverUser.id);

      // Test role check again
      const { data: serverUserData, error: serverRoleError } = await supabase
        .from("users")
        .select("role")
        .eq("id", serverUser.id)
        .single();

      if (serverRoleError) {
        console.error("❌ Server role check error:", serverRoleError);
      } else {
        console.log("✅ Server role check successful:", serverUserData.role);
      }
    } else {
      console.log(
        "❌ Server-side auth failed - no user found (expected if not logged in)"
      );
    }

    console.log("\n🎉 Login flow test completed!");
    console.log("\n📝 Next steps:");
    console.log("1. Go to http://localhost:3000/login");
    console.log("2. Log in with admin credentials");
    console.log("3. Check browser console for client-side logs");
    console.log("4. Check server console for server-side logs");
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

testLoginFlow();
