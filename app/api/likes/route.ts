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

    // Get total likes count
    const { count: totalLikes, error: countError } = await supabase
      .from("blog_likes")
      .select("*", { count: "exact", head: true })
      .eq("blog_post_id", blogPostId);

    if (countError) {
      console.error("Error getting like count:", countError);
      return NextResponse.json({ total_likes: 0, is_liked_by_user: false });
    }

    // Check if current user has liked the post
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let isLikedByUser = false;
    if (user) {
      const { data: userLike } = await supabase
        .from("blog_likes")
        .select("id")
        .eq("blog_post_id", blogPostId)
        .eq("user_id", user.id)
        .single();

      isLikedByUser = !!userLike;
    }

    return NextResponse.json({
      total_likes: totalLikes || 0,
      is_liked_by_user: isLikedByUser,
    });
  } catch (error) {
    console.error("Error in likes API:", error);
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
        { error: "You must be logged in to like posts" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { blog_post_id } = body;

    if (!blog_post_id) {
      return NextResponse.json(
        { error: "Blog post ID is required" },
        { status: 400 }
      );
    }

    // Check if user already liked the post
    const { data: existingLike } = await supabase
      .from("blog_likes")
      .select("id")
      .eq("blog_post_id", blog_post_id)
      .eq("user_id", user.id)
      .single();

    if (existingLike) {
      // Unlike the post
      const { error } = await supabase
        .from("blog_likes")
        .delete()
        .eq("blog_post_id", blog_post_id)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error unliking post:", error);
        return NextResponse.json(
          { error: "Failed to unlike post" },
          { status: 500 }
        );
      }
    } else {
      // Like the post
      const { error } = await supabase.from("blog_likes").insert({
        blog_post_id,
        user_id: user.id,
      });

      if (error) {
        console.error("Error liking post:", error);
        return NextResponse.json(
          { error: "Failed to like post" },
          { status: 500 }
        );
      }
    }

    // Return updated stats
    const { count: totalLikes } = await supabase
      .from("blog_likes")
      .select("*", { count: "exact", head: true })
      .eq("blog_post_id", blog_post_id);

    return NextResponse.json({
      total_likes: totalLikes || 0,
      is_liked_by_user: !existingLike, // Toggle the state
    });
  } catch (error) {
    console.error("Error in likes API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
