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

async function checkProjectsData() {
  console.log("🔍 Checking projects in database...");
  try {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("id, slug, title")
      .order("slug");
    if (error) {
      console.error("❌ Error fetching projects:", error);
      return;
    }
    if (!projects || projects.length === 0) {
      console.log("No projects found in the database.");
      return;
    }
    console.log(`Found ${projects.length} projects:`);
    projects.forEach((p, i) => {
      console.log(`${i + 1}. ${p.title} (slug: ${p.slug})`);
    });
  } catch (err) {
    console.error("❌ Unexpected error:", err);
  }
}

checkProjectsData();
