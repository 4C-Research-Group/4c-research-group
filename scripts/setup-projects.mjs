import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupProjects() {
  console.log("Setting up projects table...\n");

  try {
    // Read the SQL file
    const sqlPath = path.join(
      process.cwd(),
      "scripts",
      "setup-projects-table.sql"
    );
    const sqlContent = fs.readFileSync(sqlPath, "utf8");

    // Split the SQL into individual statements
    const statements = sqlContent
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"));

    console.log(`Found ${statements.length} SQL statements to execute\n`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`Executing statement ${i + 1}/${statements.length}...`);

        const { error } = await supabase.rpc("exec_sql", { sql: statement });

        if (error) {
          console.error(`Error executing statement ${i + 1}:`, error);
          // Continue with other statements
        } else {
          console.log(`✅ Statement ${i + 1} executed successfully`);
        }
      }
    }

    // Verify the table was created
    console.log("\nVerifying projects table...");
    const { data: projects, error: verifyError } = await supabase
      .from("projects")
      .select("slug, title, status")
      .limit(5);

    if (verifyError) {
      console.error("❌ Error verifying projects table:", verifyError);
      return;
    }

    console.log("✅ Projects table created successfully!");
    console.log(`Found ${projects.length} projects:`);
    projects.forEach((project) => {
      console.log(`  - ${project.title} (${project.status})`);
    });
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

setupProjects();
