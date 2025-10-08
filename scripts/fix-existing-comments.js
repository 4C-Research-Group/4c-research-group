import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function fixExistingComments() {
  console.log("Starting to fix existing comments...");

  // Update all existing comments to have is_approved = true and is_spam = false
  const { data, error } = await supabase
    .from("blog_comments")
    .update({
      is_approved: true,
      is_spam: false,
    })
    .is("is_approved", null); // Only update comments that don't have is_approved set

  if (error) {
    console.error("Error updating comments:", error);
  } else {
    console.log(`✅ Updated ${data?.length || 0} existing comments`);
  }

  // Also update comments that might have is_approved = false
  const { data: data2, error: error2 } = await supabase
    .from("blog_comments")
    .update({
      is_approved: true,
      is_spam: false,
    })
    .eq("is_approved", false);

  if (error2) {
    console.error("Error updating unapproved comments:", error2);
  } else {
    console.log(`✅ Updated ${data2?.length || 0} unapproved comments`);
  }

  console.log("Finished fixing existing comments!");
}

// Run the script
fixExistingComments().catch(console.error);
