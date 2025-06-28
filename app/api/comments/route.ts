import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const blogPostId = searchParams.get("blogPostId");

  if (!blogPostId) {
    return NextResponse.json(
      { error: "Blog post ID is required" },
      { status: 400 }
    );
  }

  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // For now, show all comments (including unapproved) for testing
    // Later you can change this back to only approved comments
    const { data, error } = await supabase
      .from("blog_comments")
      .select("*")
      .eq("blog_post_id", blogPostId)
      // .eq("is_approved", true) // Comment this out for testing
      .eq("is_spam", false)
      .is("parent_id", null)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
      return NextResponse.json(
        { error: "Failed to fetch comments" },
        { status: 500 }
      );
    }

    // Get replies for each comment
    const commentsWithReplies = await Promise.all(
      (data || []).map(async (comment: any) => {
        const { data: replies } = await supabase
          .from("blog_comments")
          .select("*")
          .eq("parent_id", comment.id)
          // .eq("is_approved", true) // Comment this out for testing
          .eq("is_spam", false)
          .order("created_at", { ascending: true });

        return {
          ...comment,
          replies: replies || [],
        };
      })
    );

    return NextResponse.json(commentsWithReplies);
  } catch (error) {
    console.error("Error in comments API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to comment" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { blog_post_id, content, parent_id } = body;

    if (!blog_post_id || !content) {
      return NextResponse.json(
        { error: "Blog post ID and content are required" },
        { status: 400 }
      );
    }

    // Validate content length
    if (content.trim().length < 3) {
      return NextResponse.json(
        { error: "Comment must be at least 3 characters long" },
        { status: 400 }
      );
    }

    if (content.trim().length > 1000) {
      return NextResponse.json(
        { error: "Comment must be less than 1000 characters" },
        { status: 400 }
      );
    }

    // Check if the blog post exists
    const { data: blogPost, error: blogPostError } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("id", blog_post_id)
      .single();

    if (blogPostError || !blogPost) {
      console.error("Blog post not found:", blogPostError);
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    // Check if parent comment exists (if replying)
    if (parent_id) {
      const { data: parentComment, error: parentError } = await supabase
        .from("blog_comments")
        .select("id")
        .eq("id", parent_id)
        .single();

      if (parentError || !parentComment) {
        console.error("Parent comment not found:", parentError);
        return NextResponse.json(
          { error: "Parent comment not found" },
          { status: 404 }
        );
      }
    }

    // Get user details for the comment
    const { data: userProfile } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    const commentData = {
      blog_post_id,
      user_id: user.id,
      author_name:
        user.user_metadata?.name || user.email?.split("@")[0] || "Anonymous",
      author_email: user.email,
      content: content.trim(),
      parent_id: parent_id || null,
      is_approved: true, // Set to true for testing - no approval needed
      is_spam: false,
    };

    console.log("Attempting to insert comment:", commentData);

    const { data, error } = await supabase
      .from("blog_comments")
      .insert(commentData)
      .select()
      .single();

    if (error) {
      console.error("Error creating comment:", error);
      console.error("Error details:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });
      return NextResponse.json(
        {
          error: "Failed to create comment",
          details: error.message,
        },
        { status: 500 }
      );
    }

    console.log("Comment created successfully:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in comments API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
