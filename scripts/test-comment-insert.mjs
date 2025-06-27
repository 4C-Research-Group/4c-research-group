import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testCommentInsert() {
  try {
    console.log("Testing comment insertion...");

    // First, let's check if the blog_comments table exists and has the right structure
    const { data: tableInfo, error: tableError } = await supabase
      .from("blog_comments")
      .select("*")
      .limit(1);

    if (tableError) {
      console.error("Table error:", tableError);
      return;
    }

    console.log("Table structure looks good");

    // Get a sample blog post ID
    const { data: blogPosts, error: blogError } = await supabase
      .from("blog_posts")
      .select("id")
      .limit(1);

    if (blogError || !blogPosts || blogPosts.length === 0) {
      console.error("No blog posts found:", blogError);
      return;
    }

    const blogPostId = blogPosts[0].id;
    console.log("Using blog post ID:", blogPostId);

    // Get a sample user ID
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("id")
      .limit(1);

    if (userError || !users || users.length === 0) {
      console.error("No users found:", userError);
      return;
    }

    const userId = users[0].id;
    console.log("Using user ID:", userId);

    // Try to insert a test comment
    const testComment = {
      blog_post_id: blogPostId,
      user_id: userId,
      author_name: "Test User",
      author_email: "test@example.com",
      content: "This is a test comment",
      is_approved: true,
      is_spam: false,
    };

    console.log("Attempting to insert test comment:", testComment);

    const { data, error } = await supabase
      .from("blog_comments")
      .insert(testComment)
      .select()
      .single();

    if (error) {
      console.error("Insert error:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
    } else {
      console.log("Comment inserted successfully:", data);

      // Clean up - delete the test comment
      await supabase.from("blog_comments").delete().eq("id", data.id);

      console.log("Test comment cleaned up");
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
}

testCommentInsert();
