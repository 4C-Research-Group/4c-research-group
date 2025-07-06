import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function addTestEngagement() {
  console.log("Starting to add test engagement...");

  // Get all blog posts
  const { data: posts, error: postsError } = await supabase
    .from("blog_posts")
    .select("id, title");

  if (postsError) {
    console.error("Error fetching posts:", postsError);
    return;
  }

  console.log(`Found ${posts.length} posts to add engagement to`);

  // Add some likes and comments to each post
  for (const post of posts) {
    try {
      // Add random number of likes (1-15)
      const likeCount = Math.floor(Math.random() * 15) + 1;

      for (let i = 0; i < likeCount; i++) {
        const { error: likeError } = await supabase.from("blog_likes").insert({
          blog_post_id: post.id,
          user_id: `test-user-${i}-${Date.now()}`, // Generate unique test user IDs
          created_at: new Date().toISOString(),
        });

        if (likeError && likeError.code !== "23505") {
          // Ignore duplicate key errors
          console.error(`Error adding like to "${post.title}":`, likeError);
        }
      }

      // Add random number of comments (0-8)
      const commentCount = Math.floor(Math.random() * 9);

      const sampleComments = [
        "This is fascinating research! Thank you for sharing.",
        "I've been following this topic for years. Great insights!",
        "This has important implications for clinical practice.",
        "Looking forward to more research in this area.",
        "Excellent overview of the current state of research.",
        "This connects well with other studies I've read.",
        "Very well-written and accessible to non-experts.",
        "The methodology seems sound. Great work!",
        "This could have significant impact on patient care.",
        "Interesting perspective on this complex topic.",
      ];

      for (let i = 0; i < commentCount; i++) {
        const commentText =
          sampleComments[Math.floor(Math.random() * sampleComments.length)];
        const authorName = `Reader${Math.floor(Math.random() * 1000)}`;

        const { error: commentError } = await supabase.from("comments").insert({
          blog_post_id: post.id,
          author_name: authorName,
          content: commentText,
          created_at: new Date().toISOString(),
        });

        if (commentError) {
          console.error(
            `Error adding comment to "${post.title}":`,
            commentError
          );
        }
      }

      console.log(
        `✅ Added ${likeCount} likes and ${commentCount} comments to: ${post.title}`
      );
    } catch (err) {
      console.error(`Error processing post "${post.title}":`, err);
    }
  }

  console.log("Finished adding test engagement!");
}

// Run the script
addTestEngagement().catch(console.error);
