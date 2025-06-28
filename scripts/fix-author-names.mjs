import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing required environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Cleans up author names that might be email addresses
 */
function cleanAuthorName(authorName) {
  if (!authorName) return "Admin User";

  // If it looks like an email address, convert it to a readable name
  if (authorName.includes("@")) {
    const emailName = authorName.split("@")[0];
    return emailName
      .split(/[._-]/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  return authorName;
}

async function fixAuthorNames() {
  console.log("Starting to fix author names in blog posts...");

  try {
    // Get all blog posts
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("id, author_name");

    if (error) {
      console.error("Error fetching blog posts:", error);
      return;
    }

    console.log(`Found ${posts.length} blog posts to check`);

    let updatedCount = 0;

    for (const post of posts) {
      const originalName = post.author_name;
      const cleanedName = cleanAuthorName(originalName);

      // Only update if the name has changed
      if (originalName !== cleanedName) {
        console.log(
          `Updating post ${post.id}: "${originalName}" -> "${cleanedName}"`
        );

        const { error: updateError } = await supabase
          .from("blog_posts")
          .update({ author_name: cleanedName })
          .eq("id", post.id);

        if (updateError) {
          console.error(`Error updating post ${post.id}:`, updateError);
        } else {
          updatedCount++;
        }
      }
    }

    console.log(`✅ Successfully updated ${updatedCount} blog posts`);
    console.log("Author names have been cleaned up!");
  } catch (error) {
    console.error("Error during migration:", error);
  }
}

// Run the migration
fixAuthorNames();
