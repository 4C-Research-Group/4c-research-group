import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testResearchPages() {
  console.log("🔍 Testing research project pages...\n");

  try {
    // Fetch all active projects
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_active", true);

    if (error) {
      console.error("❌ Error fetching projects:", error);
      return;
    }

    console.log(`📊 Found ${projects.length} active projects:\n`);

    projects.forEach((project, index) => {
      console.log(`${index + 1}. ${project.title}`);
      console.log(`   Slug: ${project.slug}`);
      console.log(`   Status: ${project.status}`);
      console.log(`   URL: /research/${project.slug}`);
      console.log("");
    });

    // Test each project slug
    console.log("🧪 Testing project access...\n");

    for (const project of projects) {
      try {
        const { data: testProject, error: testError } = await supabase
          .from("projects")
          .select("*")
          .eq("slug", project.slug)
          .single();

        if (testError) {
          console.error(`❌ Error accessing ${project.slug}:`, testError);
        } else {
          console.log(`✅ ${project.slug} - Accessible`);
        }
      } catch (error) {
        console.error(`❌ Error testing ${project.slug}:`, error);
      }
    }

    console.log("\n🎯 Test Summary:");
    console.log(`- Total projects: ${projects.length}`);
    console.log(`- All projects should be accessible at /research/[slug]`);
    console.log(
      "- If you see 404 errors, check the generateStaticParams function"
    );
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

testResearchPages();
