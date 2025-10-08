import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Supabase client with service role key
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function addTestComments() {
  console.log("Starting to add test comments...");

  // Get all blog posts
  const { data: posts, error: postsError } = await supabase
    .from("blog_posts")
    .select("id, title");

  if (postsError) {
    console.error("Error fetching posts:", postsError);
    return;
  }

  console.log(`Found ${posts.length} posts to add comments to`);

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
    "The findings are quite compelling. Well done!",
    "This research addresses an important gap in the field.",
    "I appreciate the practical applications discussed.",
    "The interdisciplinary approach is refreshing.",
    "Looking forward to seeing follow-up studies.",
  ];

  // Add comments to each post
  for (const post of posts) {
    try {
      // Add random number of comments (2-8)
      const commentCount = Math.floor(Math.random() * 7) + 2;

      for (let i = 0; i < commentCount; i++) {
        const commentText =
          sampleComments[Math.floor(Math.random() * sampleComments.length)];
        const authorName = `Reader${Math.floor(Math.random() * 1000)}`;

        const { error: commentError } = await supabase
          .from("blog_comments")
          .insert({
            blog_post_id: post.id,
            author_name: authorName,
            content: commentText,
            is_approved: true,
            is_spam: false,
            created_at: new Date().toISOString(),
          });

        if (commentError) {
          console.error(
            `Error adding comment to "${post.title}":`,
            commentError
          );
        }
      }

      console.log(`✅ Added ${commentCount} comments to: ${post.title}`);
    } catch (err) {
      console.error(`Error processing post "${post.title}":`, err);
    }
  }

  console.log("Finished adding test comments!");
}

// Run the script
addTestComments().catch(console.error);
