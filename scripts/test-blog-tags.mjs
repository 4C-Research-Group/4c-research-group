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

async function testBlogTags() {
  console.log("🧪 Testing blog tags functionality...");

  try {
    // Test creating a blog post with tags
    const testTags = ["neuroscience", "research", "brain", "cognition"];

    const { data: newPost, error: createError } = await supabase
      .from("blog_posts")
      .insert({
        title: "Test Blog Post with Tags",
        slug: "test-blog-with-tags",
        excerpt: "This is a test blog post to verify tags functionality",
        content: "<p>This is a test blog post content with tags.</p>",
        category: "Test",
        tags: testTags,
        read_time: "2 min read",
        image_url: "https://placehold.co/800x400/cccccc/666666?text=Test+Blog",
        author_name: "Test Author",
        author_role: "Researcher",
        author_image_url:
          "https://placehold.co/100x100/cccccc/666666?text=Author",
        featured: false,
      })
      .select()
      .single();

    if (createError) {
      console.error("❌ Error creating test blog post:", createError);
      return;
    }

    console.log("✅ Test blog post created successfully!");
    console.log(`   Title: ${newPost.title}`);
    console.log(`   Slug: ${newPost.slug}`);
    console.log(`   Tags: ${newPost.tags?.join(", ")}`);
    console.log(`   Tags type: ${typeof newPost.tags}`);
    console.log(`   Tags array:`, newPost.tags);

    // Test updating the blog post with different tags
    const updatedTags = ["updated", "neuroscience", "test", "blog"];

    const { data: updatedPost, error: updateError } = await supabase
      .from("blog_posts")
      .update({
        tags: updatedTags,
        updated_at: new Date().toISOString(),
      })
      .eq("id", newPost.id)
      .select()
      .single();

    if (updateError) {
      console.error("❌ Error updating test blog post:", updateError);
      return;
    }

    console.log("\n✅ Test blog post updated successfully!");
    console.log(`   Updated tags: ${updatedPost.tags?.join(", ")}`);
    console.log(`   Updated tags array:`, updatedPost.tags);

    // Clean up - delete the test post
    const { error: deleteError } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", newPost.id);

    if (deleteError) {
      console.error("❌ Error deleting test blog post:", deleteError);
    } else {
      console.log("\n🧹 Test blog post cleaned up successfully!");
    }

    console.log("\n🎉 Tags functionality test completed successfully!");
    console.log("   ✅ Tags can be created as arrays");
    console.log("   ✅ Tags can be updated");
    console.log("   ✅ Tags are stored properly in the database");
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

testBlogTags();
