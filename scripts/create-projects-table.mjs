import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createProjectsTable() {
  console.log("Attempting to create projects table...\n");

  try {
    // Try to insert a test project to see what happens
    console.log("1. Testing table access...");
    const testProject = {
      slug: "test-project",
      title: "Test Project",
      description: "This is a test project",
      category: "Test",
      status: "upcoming",
      start_date: "2024-01-01",
      image: "/images/test.jpg",
      tags: ["test"],
      funding: "Test Funding",
      objectives: ["Test objective"],
      team_members: [{ name: "Test PI", role: "Principal Investigator" }],
    };

    const { data, error } = await supabase
      .from("projects")
      .insert(testProject)
      .select();

    if (error) {
      console.error("❌ Error accessing projects table:", error);
      console.log(
        "\nThe table likely needs to be created manually in the Supabase dashboard."
      );
      console.log(
        'Please create a table named "projects" with the following columns:'
      );
      console.log("- id (uuid, primary key)");
      console.log("- slug (varchar, unique)");
      console.log("- title (varchar)");
      console.log("- description (text)");
      console.log("- long_description (text, nullable)");
      console.log("- category (varchar)");
      console.log("- status (varchar, check: active/completed/upcoming)");
      console.log("- start_date (date)");
      console.log("- end_date (date, nullable)");
      console.log("- image (varchar, nullable)");
      console.log("- images (jsonb, default: [])");
      console.log("- tags (jsonb, default: [])");
      console.log("- link (varchar, nullable)");
      console.log("- funding (varchar, nullable)");
      console.log("- objectives (jsonb, default: [])");
      console.log("- team_members (jsonb, default: [])");
      console.log("- publications (jsonb, default: [])");
      console.log("- additional_info (text, nullable)");
      console.log("- created_at (timestamp with time zone, default: now())");
      console.log("- updated_at (timestamp with time zone, default: now())");
      return;
    }

    console.log("✅ Projects table exists and is accessible!");
    console.log("Created test project:", data[0].title);

    // Clean up the test project
    await supabase.from("projects").delete().eq("slug", "test-project");

    console.log("✅ Test project cleaned up");
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

createProjectsTable();
