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

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables."
  );
  process.exit(1);
}

// Use service role key for admin operations
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function createAdminUser() {
  const email = "admin@example.com";
  const password = "admin123";

  // Create user
  const { data: user, error: signUpError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

  if (signUpError) {
    console.error("Error creating user:", signUpError.message);
    process.exit(1);
  }

  const userId = user.user?.id;
  if (!userId) {
    console.error("User ID not found after creation.");
    process.exit(1);
  }

  // Set role to admin in users table
  const { error: updateError } = await supabase
    .from("users")
    .update({ role: "admin" })
    .eq("id", userId);

  if (updateError) {
    console.error("Error updating user role:", updateError.message);
    process.exit(1);
  }

  console.log("Admin user created successfully:", email);
}

createAdminUser();
