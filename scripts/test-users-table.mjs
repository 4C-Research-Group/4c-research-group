import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// Load environment variables
config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("Environment check:");
console.log("URL:", supabaseUrl ? "✅ Set" : "❌ Missing");
console.log("Key:", supabaseKey ? "✅ Set" : "❌ Missing");

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const createServerSupabase = () =>
  createServerComponentClient({ cookies });

async function testUsersTable() {
  console.log("🔧 Testing users table...");

  try {
    // Test 1: Try to query users table directly
    console.log("📋 Testing direct users table query...");
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*")
      .limit(1);

    if (usersError) {
      console.error("❌ Error querying users table:", usersError);
      return;
    }

    console.log("✅ Users table is accessible");
    console.log("📊 Sample user data:", users[0]);

    // Test 2: Check for admin users
    console.log("👥 Checking for admin users...");
    const { data: adminUsers, error: adminError } = await supabase
      .from("users")
      .select("id, email, role")
      .eq("role", "admin");

    if (adminError) {
      console.error("❌ Error querying admin users:", adminError);
      return;
    }

    console.log(`✅ Found ${adminUsers.length} admin users:`);
    adminUsers.forEach((user) => {
      console.log(`  - ${user.email} (${user.id})`);
    });

    // Test 3: Test role query with timeout
    console.log("⏱️ Testing role query with timeout...");
    const testUserId = adminUsers[0]?.id;
    if (testUserId) {
      const startTime = Date.now();
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", testUserId)
        .single();

      const duration = Date.now() - startTime;
      console.log(`⏱️ Query took ${duration}ms`);

      if (error) {
        console.error("❌ Role query failed:", error);
      } else {
        console.log(`✅ Role query successful: ${data.role}`);
      }
    }

    // Test 4: Test with a specific user ID (if you know one)
    console.log("🔍 Testing with specific user ID...");
    const { data: specificUser, error: specificError } = await supabase
      .from("users")
      .select("id, email, role")
      .limit(1);

    if (specificError) {
      console.error("❌ Error querying specific user:", specificError);
    } else if (specificUser && specificUser.length > 0) {
      const userId = specificUser[0].id;
      console.log(`Testing with user ID: ${userId}`);

      const startTime = Date.now();
      const { data: roleData, error: roleError } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();

      const duration = Date.now() - startTime;
      console.log(`⏱️ Role query for ${userId} took ${duration}ms`);

      if (roleError) {
        console.error("❌ Role query failed:", roleError);
      } else {
        console.log(`✅ Role query successful: ${roleData.role}`);
      }
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

testUsersTable();
