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

async function checkHomeContent() {
  console.log("🔍 Checking home page content in database...");

  try {
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", "home")
      .single();

    if (error) {
      console.error("❌ Error fetching home page:", error);
      return;
    }

    if (!data) {
      console.log("No home page found in database.");
      return;
    }

    console.log("📄 Home page found:");
    console.log(`Title: ${data.title || "No title"}`);
    console.log(`Slug: ${data.slug}`);
    console.log(`Content type: ${typeof data.content}`);

    if (data.content) {
      try {
        const parsedContent =
          typeof data.content === "string"
            ? JSON.parse(data.content)
            : data.content;

        console.log("\n📋 Content sections:");
        Object.keys(parsedContent).forEach((key) => {
          console.log(`- ${key}: ${typeof parsedContent[key]}`);
        });

        console.log("\n📝 Full content:");
        console.log(JSON.stringify(parsedContent, null, 2));
      } catch (parseError) {
        console.log("Raw content:", data.content);
      }
    } else {
      console.log("No content found.");
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

checkHomeContent();
