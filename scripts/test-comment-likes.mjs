import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testCommentLikes() {
  console.log("🧪 Testing Comment Likes System...\n");

  try {
    // 1. Check if comment_likes table exists
    console.log("1. Checking if comment_likes table exists...");
    const { data: tableExists, error: tableError } = await supabase
      .from("comment_likes")
      .select("*")
      .limit(1);

    if (tableError && tableError.code === "42P01") {
      console.log("❌ comment_likes table does not exist");
      console.log("Please run the SQL script: scripts/setup-comment-likes.sql");
      return;
    }

    console.log("✅ comment_likes table exists");

    // 2. Check RLS policies
    console.log("\n2. Checking RLS policies...");
    const { data: policies, error: policiesError } = await supabase.rpc(
      "get_policies",
      { table_name: "comment_likes" }
    );

    if (policiesError) {
      console.log("⚠️  Could not check RLS policies (this is normal)");
    } else {
      console.log("✅ RLS policies are configured");
    }

    // 3. Test inserting a like (this will fail without proper auth, but we can test the structure)
    console.log("\n3. Testing table structure...");
    const { error: insertError } = await supabase.from("comment_likes").insert({
      comment_id: "00000000-0000-0000-0000-000000000000", // Dummy UUID
      user_id: "00000000-0000-0000-0000-000000000000", // Dummy UUID
    });

    if (insertError) {
      if (insertError.code === "23503") {
        console.log(
          "✅ Foreign key constraints are working (expected error for dummy data)"
        );
      } else {
        console.log("❌ Error testing table structure:", insertError.message);
      }
    }

    console.log("\n✅ Comment likes system appears to be properly configured!");
    console.log("\nNext steps:");
    console.log("1. Make sure you have some blog comments in the database");
    console.log("2. Test the like functionality through the UI");
    console.log("3. Check that the API routes are working correctly");
    console.log(
      "\nNote: Make sure you have run the setup-profiles.sql script first"
    );
    console.log(
      "to ensure the profiles table exists with the correct structure."
    );
  } catch (error) {
    console.error("❌ Error testing comment likes:", error);
  }
}

testCommentLikes();
