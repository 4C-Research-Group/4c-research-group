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
    const adminEmail = "admin3@example.com";
    const adminPassword = "admin123";

    console.log("Checking for existing auth user...");
    const {
      data: { users },
    } = await supabase.auth.admin.listUsers();
    const existingAuthUser = users.find((user) => user.email === adminEmail);

    let userId;

    if (existingAuthUser) {
      console.log("✅ Auth user already exists, updating password...");
      userId = existingAuthUser.id;
      // Update password for existing user
      const { error: updateError } = await supabase.auth.admin.updateUserById(
        userId,
        { password: adminPassword }
      );
      if (updateError) throw updateError;
    } else {
      console.log("🆕 Creating new auth user...");
      const { data: authUser, error: authError } =
        await supabase.auth.admin.createUser({
          email: adminEmail,
          password: adminPassword,
          email_confirm: true,
        });
      if (authError) throw authError;
      if (!authUser.user) throw new Error("Failed to create auth user");
      userId = authUser.user.id;
      console.log("✅ Auth user created with ID:", userId);
    }

    // Check and update/insert user profile
    console.log("Checking user profile...");
    const { data: existingProfile } = await supabase
      .from("users")
      .select()
      .eq("email", adminEmail)
      .single();

    const userData = {
      id: userId,
      email: adminEmail,
      name: "Admin User",
      role: "admin", // Explicitly set role to admin
      updated_at: new Date().toISOString(),
    };

    if (existingProfile) {
      console.log("🔄 Updating existing user profile...");
      const { error: updateError } = await supabase
        .from("users")
        .update(userData)
        .eq("id", userId);
      if (updateError) throw updateError;
      console.log("✅ User profile updated");
    } else {
      console.log("➕ Creating new user profile...");
      const { error: insertError } = await supabase.from("users").insert([
        {
          ...userData,
          created_at: new Date().toISOString(),
        },
      ]);
      if (insertError) throw insertError;
      console.log("✅ User profile created");
    }

    // Verify the role was set correctly
    console.log("🔍 Verifying user role...");
    const { data: verifyUser, error: verifyError } = await supabase
      .from("users")
      .select("id, email, role, created_at, updated_at")
      .eq("id", userId)
      .single();

    if (verifyError) {
      console.error("❌ Error verifying user role:", verifyError);
    } else {
      console.log("✅ User verification successful:", {
        id: verifyUser.id,
        email: verifyUser.email,
        role: verifyUser.role,
        created: verifyUser.created_at,
        updated: verifyUser.updated_at,
      });

      if (verifyUser.role !== "admin") {
        console.warn("⚠️  Warning: User role is not 'admin'");
        console.log(
          "Please check your database for triggers or RLS policies that might be modifying the role."
        );
      } else {
        console.log("🎉 Admin user setup completed successfully!");
        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);
      }
    }
  } catch (error) {
    console.error("❌ Error in createAdminUser:", error.message);
    if (error.details) console.error("Details:", error.details);
    if (error.hint) console.error("Hint:", error.hint);
    process.exit(1);
  }
}

createAdminUser();
