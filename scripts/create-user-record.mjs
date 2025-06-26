import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
const envPath = join(__dirname, "..", ".env.local");
const envContent = readFileSync(envPath, "utf8");
const envVars = {};

envContent.split("\n").forEach((line) => {
  const [key, ...valueParts] = line.split("=");
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join("=").trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("❌ Missing required environment variables");
  console.log("Required:", {
    supabaseUrl: !!supabaseUrl,
    serviceRoleKey: !!serviceRoleKey,
  });
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function createUserRecord() {
  try {
    // User ID from the logs
    const userId = "d4a7f354-387f-4091-8bcc-bb5555149631";
    const userEmail = "pranav.jha12@mail.concordia.ca";

    console.log("🔍 Creating user record for:", userEmail);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          id: userId,
          email: userEmail,
          name: "Pranav Jha",
          role: "user",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("❌ Error creating user record:", error);
      return;
    }

    console.log("✅ User record created successfully:", data);
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

createUserRecord();
