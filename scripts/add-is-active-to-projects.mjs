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

async function addIsActiveToProjects() {
  console.log("🔧 Adding is_active field to projects table...");

  try {
    // First, let's check if the field already exists
    const { data: projects, error: checkError } = await supabase
      .from("projects")
      .select("id, title, is_active")
      .limit(1);

    if (checkError) {
      console.error("❌ Error checking projects table:", checkError);
      return;
    }

    if (
      projects &&
      projects.length > 0 &&
      projects[0].hasOwnProperty("is_active")
    ) {
      console.log("✅ is_active field already exists in projects table");

      // Update all projects to be active if they're not already
      const { error: updateError } = await supabase
        .from("projects")
        .update({ is_active: true })
        .is("is_active", null);

      if (updateError) {
        console.error("❌ Error updating projects:", updateError);
      } else {
        console.log("✅ Updated all projects to be active");
      }
    } else {
      console.log(
        "❌ is_active field does not exist. You need to add it manually in Supabase."
      );
      console.log("📝 SQL to run in Supabase SQL Editor:");
      console.log(`
        ALTER TABLE projects 
        ADD COLUMN is_active BOOLEAN DEFAULT true;
        
        UPDATE projects 
        SET is_active = true 
        WHERE is_active IS NULL;
      `);
    }

    // Verify the results
    const { data: finalProjects, error: finalError } = await supabase
      .from("projects")
      .select("id, title, is_active")
      .order("title");

    if (finalError) {
      console.error("❌ Error fetching final results:", finalError);
      return;
    }

    console.log("\n📊 Final projects status:");
    finalProjects.forEach((project) => {
      console.log(`   ${project.title}: is_active = ${project.is_active}`);
    });

    const activeCount = finalProjects.filter(
      (p) => p.is_active === true
    ).length;
    console.log(
      `\n✅ Total active projects: ${activeCount}/${finalProjects.length}`
    );
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

addIsActiveToProjects();
