import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

// Load environment variables
config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("🔧 Testing Database Connection...");
console.log("URL:", supabaseUrl ? "✅ Set" : "❌ Missing");
console.log("Key:", supabaseKey ? "✅ Set" : "❌ Missing");

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabaseConnection() {
  try {
    console.log("\n📊 Testing database queries...");

    // Test 1: Check if users table is accessible
    console.log("👥 Testing users table access...");
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, email, role")
      .limit(3);

    if (usersError) {
      console.error("❌ Error accessing users table:", usersError);
      return;
    }

    console.log(`✅ Users table accessible. Found ${users.length} users:`);
    users.forEach((user) => {
      console.log(`  - ${user.email} (${user.role})`);
    });

    // Test 2: Check for admin users
    console.log("\n👑 Checking for admin users...");
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

    // Test 3: Test pages table
    console.log("\n📄 Testing pages table access...");
    const { data: pages, error: pagesError } = await supabase
      .from("pages")
      .select("id, title, slug")
      .limit(3);

    if (pagesError) {
      console.error("❌ Error accessing pages table:", pagesError);
      return;
    }

    console.log(`✅ Pages table accessible. Found ${pages.length} pages:`);
    pages.forEach((page) => {
      console.log(`  - ${page.title} (${page.slug})`);
    });

    // Test 4: Performance test
    console.log("\n⏱️ Testing query performance...");
    const startTime = Date.now();
    const { data: perfTest, error: perfError } = await supabase
      .from("users")
      .select("role")
      .eq("role", "admin")
      .single();

    const duration = Date.now() - startTime;
    console.log(`⏱️ Role query took ${duration}ms`);

    if (perfError) {
      console.error("❌ Performance test failed:", perfError);
    } else {
      console.log("✅ Performance test successful");
    }

    console.log("\n🎉 Database connection test completed successfully!");
  } catch (error) {
    console.error("❌ Database test failed:", error);
  }
}

testDatabaseConnection();
