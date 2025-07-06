import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testCommentCount() {
  console.log("Testing comment count functionality...");

  // Get all blog posts
  const { data: posts, error: postsError } = await supabase
    .from("blog_posts")
    .select("id, title");

  if (postsError) {
    console.error("Error fetching posts:", postsError);
    return;
  }

  console.log(`Found ${posts.length} posts to test`);

  for (const post of posts) {
    try {
      // Test 1: Count all comments (no filters)
      const { count: totalCount, error: totalError } = await supabase
        .from("blog_comments")
        .select("*", { count: "exact", head: true })
        .eq("blog_post_id", post.id);

      // Test 2: Count approved comments (with filters)
      const { count: approvedCount, error: approvedError } = await supabase
        .from("blog_comments")
        .select("*", { count: "exact", head: true })
        .eq("blog_post_id", post.id)
        .eq("is_approved", true)
        .eq("is_spam", false);

      // Test 3: Check comment fields
      const { data: sampleComment, error: sampleError } = await supabase
        .from("blog_comments")
        .select("*")
        .eq("blog_post_id", post.id)
        .limit(1)
        .single();

      console.log(`\n📝 ${post.title}:`);
      console.log(`   Total comments: ${totalCount || 0}`);
      console.log(`   Approved comments: ${approvedCount || 0}`);

      if (sampleComment) {
        console.log(`   Sample comment fields:`, {
          is_approved: sampleComment.is_approved,
          is_spam: sampleComment.is_spam,
          has_author_name: !!sampleComment.author_name,
          has_content: !!sampleComment.content,
        });
      }

      if (totalError) console.error("   Total count error:", totalError);
      if (approvedError)
        console.error("   Approved count error:", approvedError);
      if (sampleError) console.error("   Sample comment error:", sampleError);
    } catch (err) {
      console.error(`Error testing post "${post.title}":`, err);
    }
  }

  console.log("\nFinished testing comment counts!");
}

// Run the script
testCommentCount().catch(console.error);
