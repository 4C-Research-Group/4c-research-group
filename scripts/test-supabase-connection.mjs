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

console.log("🔧 Testing Supabase connection...");
console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Key length:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);

// Use anon key to simulate client-side behavior
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function testConnection() {
  try {
    console.log("🧪 Testing basic connection...");

    // Test 1: Basic connection
    const { data: healthData, error: healthError } = await supabase
      .from("users")
      .select("count")
      .limit(1);

    if (healthError) {
      console.error("❌ Connection test failed:", healthError);
    } else {
      console.log("✅ Connection test successful");
    }

    // Test 2: Authentication
    console.log("🔐 Testing authentication...");
    const startTime = Date.now();

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email: "admin@example.com",
        password: "admin123",
      });

    const endTime = Date.now();
    console.log(`⏱️ Authentication took ${endTime - startTime}ms`);

    if (authError) {
      console.error("❌ Authentication failed:", authError);
    } else {
      console.log("✅ Authentication successful:", authData.user?.id);
    }
  } catch (error) {
    console.error("💥 Error in testConnection:", error.message);
  }
}

testConnection();
