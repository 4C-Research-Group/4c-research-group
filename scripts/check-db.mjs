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

async function checkDatabase() {
  try {
    console.log("🔍 Checking database structure...");

    // Check if users table exists
    console.log("1. Checking if users table exists...");
    const { data: tables, error: tablesError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_schema", "public")
      .eq("table_name", "users");

    if (tablesError) {
      console.error("❌ Error checking tables:", tablesError);
    } else {
      console.log("✅ Tables found:", tables);
    }

    // Check users table structure
    console.log("2. Checking users table structure...");
    const { data: columns, error: columnsError } = await supabase
      .from("information_schema.columns")
      .select("column_name, data_type, is_nullable")
      .eq("table_schema", "public")
      .eq("table_name", "users")
      .order("ordinal_position");

    if (columnsError) {
      console.error("❌ Error checking columns:", columnsError);
    } else {
      console.log("✅ Users table columns:", columns);
    }

    // Check RLS policies
    console.log("3. Checking RLS policies...");
    const { data: policies, error: policiesError } = await supabase
      .from("pg_policies")
      .select("*")
      .eq("tablename", "users");

    if (policiesError) {
      console.error("❌ Error checking policies:", policiesError);
    } else {
      console.log("✅ RLS policies:", policies);
    }

    // Try to query users table directly
    console.log("4. Testing direct query to users table...");
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*")
      .limit(5);

    if (usersError) {
      console.error("❌ Error querying users table:", usersError);
    } else {
      console.log("✅ Users table query successful:", users);
    }
  } catch (error) {
    console.error("❌ Error in checkDatabase:", error.message);
    if (error.details) console.error("Details:", error.details);
    if (error.hint) console.error("Hint:", error.hint);
  }
}

checkDatabase();
