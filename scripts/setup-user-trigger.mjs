import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

// Load environment variables
config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables");
  process.exit(1);
}

// Use service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupUserTrigger() {
  try {
    console.log("🔧 Setting up user trigger...");

    // SQL to create the trigger function
    const createFunctionSQL = `
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS TRIGGER AS $$
      BEGIN
        INSERT INTO public.users (id, email, name, role, created_at, updated_at)
        VALUES (
          NEW.id,
          NEW.email,
          COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
          'user',
          NOW(),
          NOW()
        );
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `;

    // SQL to create the trigger
    const createTriggerSQL = `
      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW
        EXECUTE PROCEDURE public.handle_new_user();
    `;

    // SQL to grant permissions
    const grantPermissionsSQL = `
      GRANT USAGE ON SCHEMA public TO anon, authenticated;
      GRANT ALL ON public.users TO anon, authenticated;
    `;

    console.log("1. Creating trigger function...");
    const { error: functionError } = await supabase.rpc("exec_sql", {
      sql: createFunctionSQL,
    });

    if (functionError) {
      console.error("❌ Error creating function:", functionError);
      return;
    }
    console.log("✅ Trigger function created");

    console.log("2. Creating trigger...");
    const { error: triggerError } = await supabase.rpc("exec_sql", {
      sql: createTriggerSQL,
    });

    if (triggerError) {
      console.error("❌ Error creating trigger:", triggerError);
      return;
    }
    console.log("✅ Trigger created");

    console.log("3. Granting permissions...");
    const { error: permissionError } = await supabase.rpc("exec_sql", {
      sql: grantPermissionsSQL,
    });

    if (permissionError) {
      console.error("❌ Error granting permissions:", permissionError);
      return;
    }
    console.log("✅ Permissions granted");

    console.log("🎉 User trigger setup completed successfully!");
    console.log(
      "ℹ️  New users will now automatically get a record in the users table"
    );
  } catch (error) {
    console.error("❌ Error in setupUserTrigger:", error);
  }
}

setupUserTrigger();
