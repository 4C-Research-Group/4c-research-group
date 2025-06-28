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

async function updateProjectLinks() {
  console.log("🔄 Updating project links in database...");

  try {
    // Get all projects
    const { data: projects, error: fetchError } = await supabase
      .from("projects")
      .select("id, slug, link");

    if (fetchError) {
      console.error("❌ Error fetching projects:", fetchError);
      return;
    }

    if (!projects || projects.length === 0) {
      console.log("No projects found in database.");
      return;
    }

    console.log(`Found ${projects.length} projects to update:`);

    // Update each project's link
    for (const project of projects) {
      const oldLink = project.link;
      const newLink = `/research/${project.slug}`;

      if (oldLink !== newLink) {
        console.log(`Updating ${project.slug}: ${oldLink} → ${newLink}`);

        const { error: updateError } = await supabase
          .from("projects")
          .update({ link: newLink })
          .eq("id", project.id);

        if (updateError) {
          console.error(`❌ Error updating ${project.slug}:`, updateError);
        } else {
          console.log(`✅ Updated ${project.slug}`);
        }
      } else {
        console.log(`✓ ${project.slug} already has correct link`);
      }
    }

    console.log("🎉 Project links update completed!");
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

updateProjectLinks();
