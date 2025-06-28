import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing required environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkProjectsStructure() {
  console.log("🔍 Checking projects table structure and data...");

  try {
    // Get all projects with all fields
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .order("title");

    if (error) {
      console.error("❌ Error fetching projects:", error);
      return;
    }

    console.log(`📊 Found ${projects.length} projects:`);
    console.log("");

    projects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
      console.log(`   Slug: ${project.slug}`);
      console.log(`   ID: ${project.id}`);
      console.log(`   is_active: ${project.is_active}`);
      console.log(`   created_at: ${project.created_at}`);
      console.log(`   updated_at: ${project.updated_at}`);
      console.log("");
    });

    // Check if is_active field exists and count active vs inactive
    const activeCount = projects.filter((p) => p.is_active === true).length;
    const inactiveCount = projects.filter((p) => p.is_active === false).length;
    const nullCount = projects.filter((p) => p.is_active === null).length;

    console.log("📈 Summary:");
    console.log(`   Active projects: ${activeCount}`);
    console.log(`   Inactive projects: ${inactiveCount}`);
    console.log(`   Projects with null is_active: ${nullCount}`);
    console.log(`   Total projects: ${projects.length}`);

    // Show table structure
    if (projects.length > 0) {
      console.log("");
      console.log("🏗️  Table structure (from first project):");
      const firstProject = projects[0];
      Object.keys(firstProject).forEach((key) => {
        console.log(
          `   ${key}: ${typeof firstProject[key]} = ${firstProject[key]}`
        );
      });
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

checkProjectsStructure();
