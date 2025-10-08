import { createClient } from "@supabase/supabase-js";
import * as dotenv from 'dotenv';
import * as path from 'path';
import readline from "readline";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Missing required environment variables');
  console.log('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
  },
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function createAdminUser() {
  try {
    console.log("\n🛠️  Creating Admin User\n");

    // Get admin user details
    const email = await prompt("Enter admin email: ");
    const password = await prompt("Enter admin password (min 8 characters): ");

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    console.log("\n🚀 Creating admin user...");

    // Create auth user
    const { data: authData, error: signUpError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Skip email confirmation
      });

    if (signUpError) {
      throw new Error(`Error creating auth user: ${signUpError.message}`);
    }

    const userId = authData.user.id;
    console.log(`✅ Auth user created with ID: ${userId}`);

    // Create user profile with admin role
    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .insert([
        {
          id: userId,
          email,
          role: "admin",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (profileError) {
      // Try to delete the auth user if profile creation fails
      await supabase.auth.admin.deleteUser(userId);
      throw new Error(`Error creating user profile: ${profileError.message}`);
    }

    console.log("✅ Admin user profile created successfully");
    console.log("\n🎉 Admin user created successfully!");
    console.log(`\nEmail: ${email}`);
    console.log("Role: admin");
    console.log("\nYou can now log in to the admin dashboard.");
  } catch (error) {
    console.error("\n❌ Error creating admin user:");
    if (error instanceof Error) {
      console.error(error.message);
      if (error.stack) {
        console.error("\nStack trace:");
        console.error(error.stack);
      }
    } else {
      console.error("An unknown error occurred");
    }
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run the function
createAdminUser();
