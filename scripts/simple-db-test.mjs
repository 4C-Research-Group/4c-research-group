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

async function testDatabase() {
  try {
    console.log("🔍 Testing database access...");

    // Test 1: Check users table
    console.log("1. Testing users table...");
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*")
      .limit(5);

    if (usersError) {
      console.error("❌ Users table error:", usersError);
    } else {
      console.log("✅ Users table accessible");
      console.log("📊 Users found:", users.length);
      users.forEach((user) => {
        console.log(`  - ${user.email} (${user.role})`);
      });
    }

    // Test 2: Check if profiles table exists
    console.log("2. Testing profiles table...");
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .limit(5);

    if (profilesError) {
      console.log("❌ Profiles table error:", profilesError.message);
      console.log("ℹ️  Profiles table doesn't exist or is not accessible");
    } else {
      console.log("✅ Profiles table accessible");
      console.log("📊 Profiles found:", profiles.length);
    }

    // Test 3: Try to insert a test user (this will help identify the issue)
    console.log("3. Testing user insertion...");
    const testUser = {
      id: "test-user-id-123",
      email: "test@example.com",
      name: "Test User",
      role: "user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: insertData, error: insertError } = await supabase
      .from("users")
      .insert([testUser]);

    if (insertError) {
      console.error("❌ Insert error:", insertError);
      console.error("❌ Error details:", insertError.details);
      console.error("❌ Error hint:", insertError.hint);
    } else {
      console.log("✅ Insert successful");

      // Clean up - delete the test user
      await supabase.from("users").delete().eq("id", testUser.id);
      console.log("🧹 Test user cleaned up");
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

testDatabase();
