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
  !process.env.SUPABASE_SERVICE_ROLE_KEY
) {
  throw new Error("Missing Supabase environment variables");
}

// Use service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function disableRLS() {
  try {
    console.log("🔧 Disabling RLS on users table...");

    // Disable RLS on users table
    const { error } = await supabase.rpc("exec_sql", {
      sql: "ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;",
    });

    if (error) {
      console.error("❌ Error disabling RLS:", error);
    } else {
      console.log("✅ RLS disabled on users table");
    }

    // Test query after disabling RLS
    console.log("🧪 Testing query after disabling RLS...");
    const { data: testUser, error: testError } = await supabase
      .from("users")
      .select("*")
      .limit(1);

    if (testError) {
      console.error("❌ Test query failed:", testError);
    } else {
      console.log("✅ Test query successful:", testUser);
    }
  } catch (error) {
    console.error("❌ Error in disableRLS:", error.message);
  }
}

disableRLS();
