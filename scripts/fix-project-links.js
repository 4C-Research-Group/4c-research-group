import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixProjectLinks() {
  try {
    console.log("Fetching projects with problematic links...");

    // First, let's see what we have
    const { data: projects, error: fetchError } = await supabase
      .from("projects")
      .select("id, title, link");

    if (fetchError) {
      console.error("Error fetching projects:", fetchError);
      return;
    }

    console.log("Current projects and their links:");
    projects.forEach((project) => {
      console.log(`- ${project.title}: ${project.link || "NULL"}`);
    });

    // Update projects with problematic links (relative paths or malformed https:/// links)
    const { data: updateData, error: updateError } = await supabase
      .from("projects")
      .update({ link: null })
      .or("link.like./research/%,link.like./%,link.eq.,link.like.https:///%")
      .select("id, title, link");

    if (updateError) {
      console.error("Error updating projects:", updateError);
      return;
    }

    console.log("\nUpdated projects:");
    updateData.forEach((project) => {
      console.log(`- ${project.title}: ${project.link || "NULL"}`);
    });

    console.log("\nProject links have been fixed!");
  } catch (error) {
    console.error("Script error:", error);
  }
}

fixProjectLinks();
