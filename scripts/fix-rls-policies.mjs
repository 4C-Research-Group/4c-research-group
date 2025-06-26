import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

// Load environment variables
config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables");
  process.exit(1);
}

// Use service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixRLSPolicies() {
  try {
    console.log("🔧 Checking and fixing RLS policies...");

    // Test current access
    console.log("1. Testing current access to users table...");
    const { data: testUsers, error: testError } = await supabase
      .from("users")
      .select("*")
      .limit(1);

    if (testError) {
      console.error("❌ Current access error:", testError);
    } else {
      console.log("✅ Current access works:", testUsers.length, "users found");
    }

    // Try to insert a test record
    console.log("2. Testing insert capability...");
    const testUser = {
      id: "test-insert-" + Date.now(),
      email: "test-insert@example.com",
      name: "Test Insert",
      role: "user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: insertData, error: insertError } = await supabase
      .from("users")
      .insert([testUser])
      .select();

    if (insertError) {
      console.error("❌ Insert error:", insertError);
      console.error("Error code:", insertError.code);
      console.error("Error details:", insertError.details);
    } else {
      console.log("✅ Insert successful:", insertData);

      // Clean up test record
      await supabase.from("users").delete().eq("id", testUser.id);
      console.log("🧹 Test record cleaned up");
    }

    // Check if we can query the specific user that was created
    console.log("3. Testing query for the new user...");
    const { data: newUser, error: queryError } = await supabase
      .from("users")
      .select("*")
      .eq("email", "pranav.jhaqqqqq@mail.concordia.ca")
      .single();

    if (queryError) {
      console.error("❌ Query error for new user:", queryError);
    } else {
      console.log("✅ New user query successful:", newUser);
    }
  } catch (error) {
    console.error("❌ Error in fixRLSPolicies:", error);
  }
}

fixRLSPolicies();
