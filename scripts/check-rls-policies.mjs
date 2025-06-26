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

async function checkRLSPolicies() {
  console.log("🔍 Checking RLS policies on users table...");

  try {
    // Test delete permission directly
    console.log("🧪 Testing delete permission...");

    // First, get a list of users
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, name, email, role")
      .limit(5);

    if (usersError) {
      console.error("❌ Error fetching users:", usersError);
      return;
    }

    console.log("👥 Found users:", users?.length || 0);
    users?.forEach((user) => {
      console.log(`  - ${user.name} (${user.email}) - ${user.role}`);
    });

    if (users && users.length > 0) {
      // Try to delete the first user (for testing)
      const testUser = users[0];
      console.log(
        `🧪 Attempting to delete test user: ${testUser.name} (${testUser.id})`
      );

      const { data: deleteResult, error: deleteError } = await supabase
        .from("users")
        .delete()
        .eq("id", testUser.id)
        .select();

      if (deleteError) {
        console.error("❌ Delete test failed:", deleteError);
        console.error("❌ Error details:", deleteError.details);
        console.error("❌ Error hint:", deleteError.hint);
      } else {
        console.log("✅ Delete test successful:", deleteResult);

        // Re-insert the user to restore the data
        console.log("🔄 Re-inserting test user...");
        const { error: reinsertError } = await supabase.from("users").insert([
          {
            id: testUser.id,
            name: testUser.name,
            email: testUser.email,
            role: testUser.role,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);

        if (reinsertError) {
          console.error("❌ Re-insert failed:", reinsertError);
        } else {
          console.log("✅ Test user restored");
        }
      }
    }
  } catch (error) {
    console.error("❌ Error checking RLS policies:", error);
  }
}

checkRLSPolicies();
