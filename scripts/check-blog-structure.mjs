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

async function checkBlogStructure() {
  console.log("🔍 Checking blog posts table structure...");

  try {
    // Get all blog posts with all fields
    const { data: blogs, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error("❌ Error fetching blog posts:", error);
      return;
    }

    console.log(`📊 Found ${blogs.length} blog posts:`);
    console.log("");

    if (blogs.length > 0) {
      console.log("🏗️  Table structure (from first blog post):");
      const firstBlog = blogs[0];
      Object.keys(firstBlog).forEach((key) => {
        console.log(`   ${key}: ${typeof firstBlog[key]} = ${firstBlog[key]}`);
      });

      console.log("\n📝 Sample blog posts:");
      blogs.forEach((blog, index) => {
        console.log(`\n${index + 1}. ${blog.title}`);
        console.log(`   Slug: ${blog.slug}`);
        console.log(`   Category: ${blog.category}`);
        console.log(`   Tags: ${blog.tags || "No tags"}`);
        console.log(`   Created: ${blog.created_at}`);
      });
    } else {
      console.log("No blog posts found in database.");
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

checkBlogStructure();
