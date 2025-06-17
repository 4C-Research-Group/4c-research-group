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

async function createAdminUser() {
  try {
    // Check if admin user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select()
      .eq("email", "admin@example.com")
      .single();

    if (existingUser) {
      console.log("Admin user already exists");
      return;
    }

    // Create admin user
    const { data: authUser, error: authError } =
      await supabase.auth.admin.createUser({
        email: "admin@example.com",
        password: "admin123",
        email_confirm: true,
      });

    if (authError) {
      throw authError;
    }

    if (!authUser.user) {
      throw new Error("Failed to create auth user");
    }

    // Create user profile
    const { error: profileError } = await supabase.from("users").insert({
      id: authUser.user.id,
      email: "admin@example.com",
      name: "Admin User",
      role: "admin",
      created_at: new Date().toISOString(),
    });

    if (profileError) {
      throw profileError;
    }

    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

createAdminUser();
