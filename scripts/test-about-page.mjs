import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  console.log(
    "NEXT_PUBLIC_SUPABASE_URL:",
    process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing"
  );
  console.log(
    "SUPABASE_SERVICE_ROLE_KEY:",
    process.env.SUPABASE_SERVICE_ROLE_KEY ? "Set" : "Missing"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAboutPage() {
  console.log("Testing about page access...\n");

  try {
    // Test 1: Check if pages table exists by trying to query it
    console.log("1. Checking pages table...");
    const { data: allPages, error: tableError } = await supabase
      .from("pages")
      .select("slug, title, updated_at")
      .limit(1);

    if (tableError) {
      console.error("❌ Error accessing pages table:", tableError);
      console.log("This might mean:");
      console.log("- The pages table does not exist");
      console.log("- There are permission issues");
      console.log("- The database connection is not working");
      return;
    }
    console.log("✅ Pages table exists and is accessible");

    // Test 2: Check if about page exists
    console.log("\n2. Checking if about page exists...");
    const { data: aboutPage, error: pageError } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", "about")
      .single();

    if (pageError) {
      if (pageError.code === "PGRST116") {
        console.log(
          "ℹ️  About page does not exist yet (this is normal for new installations)"
        );

        // Test 3: Try to create the about page
        console.log("\n3. Testing about page creation...");
        const { data: newPage, error: createError } = await supabase
          .from("pages")
          .insert({
            slug: "about",
            title: "About Page",
            content: JSON.stringify({
              hero: {
                title: "About 4C Research",
                subtitle:
                  "Advancing the frontiers of Cognition, Consciousness, and Critical Care through innovative research",
              },
              mission: {
                title: "Our Mission",
                whatTitle: "What?",
                howTitle: "How?",
                whyTitle: "Why?",
                whatDescription:
                  "To improve outcomes for critically ill patients...",
                howDescription: "Through the development and validation...",
                whyDescription: "The long-term consequences of brain injury...",
              },
            }),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (createError) {
          console.error("❌ Error creating about page:", createError);
          return;
        }
        console.log("✅ About page created successfully");
        console.log("Page ID:", newPage.id);
      } else {
        console.error("❌ Error checking about page:", pageError);
        return;
      }
    } else {
      console.log("✅ About page exists");
      console.log("Page ID:", aboutPage.id);
      console.log("Last updated:", aboutPage.updated_at);
    }

    // Test 4: Check all pages
    console.log("\n4. Checking all pages...");
    const { data: allPagesFinal, error: allPagesError } = await supabase
      .from("pages")
      .select("slug, title, updated_at")
      .order("updated_at", { ascending: false });

    if (allPagesError) {
      console.error("❌ Error fetching all pages:", allPagesError);
      return;
    }

    console.log("✅ All pages:");
    allPagesFinal.forEach((page) => {
      console.log(`  - ${page.slug}: ${page.title} (${page.updated_at})`);
    });
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

testAboutPage();
