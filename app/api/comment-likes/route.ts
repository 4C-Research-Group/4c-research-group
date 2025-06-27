import { NextRequest, NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const commentId = searchParams.get("commentId");

  if (!commentId) {
    return NextResponse.json(
      { error: "Comment ID is required" },
      { status: 400 }
    );
  }

  try {
    const supabase = createServerComponentClient({ cookies });

    // Get total likes count for this comment
    const { count: totalLikes, error: countError } = await supabase
      .from("comment_likes")
      .select("*", { count: "exact", head: true })
      .eq("comment_id", commentId);

    if (countError) {
      console.error("Error getting comment like count:", countError);
      return NextResponse.json({ total_likes: 0, is_liked_by_user: false });
    }

    // Check if current user has liked this comment
    const {
      data: { user },
    } = await supabase.auth.getUser();

    let isLikedByUser = false;
    if (user) {
      const { data: userLike } = await supabase
        .from("comment_likes")
        .select("id")
        .eq("comment_id", commentId)
        .eq("user_id", user.id)
        .single();

      isLikedByUser = !!userLike;
    }

    return NextResponse.json({
      total_likes: totalLikes || 0,
      is_liked_by_user: isLikedByUser,
    });
  } catch (error) {
    console.error("Error in comment likes API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerComponentClient({ cookies });

    // Check if user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "You must be logged in to like comments" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { comment_id } = body;

    if (!comment_id) {
      return NextResponse.json(
        { error: "Comment ID is required" },
        { status: 400 }
      );
    }

    // Check if the comment exists
    const { data: comment, error: commentError } = await supabase
      .from("blog_comments")
      .select("id")
      .eq("id", comment_id)
      .single();

    if (commentError || !comment) {
      console.error("Comment not found:", commentError);
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    // Check if user already liked this comment
    const { data: existingLike } = await supabase
      .from("comment_likes")
      .select("id")
      .eq("comment_id", comment_id)
      .eq("user_id", user.id)
      .single();

    if (existingLike) {
      // Unlike the comment
      const { error } = await supabase
        .from("comment_likes")
        .delete()
        .eq("comment_id", comment_id)
        .eq("user_id", user.id);

      if (error) {
        console.error("Error unliking comment:", error);
        return NextResponse.json(
          { error: "Failed to unlike comment" },
          { status: 500 }
        );
      }
    } else {
      // Like the comment
      const { error } = await supabase.from("comment_likes").insert({
        comment_id,
        user_id: user.id,
      });

      if (error) {
        console.error("Error liking comment:", error);
        return NextResponse.json(
          { error: "Failed to like comment" },
          { status: 500 }
        );
      }
    }

    // Return updated stats
    const { count: totalLikes } = await supabase
      .from("comment_likes")
      .select("*", { count: "exact", head: true })
      .eq("comment_id", comment_id);

    return NextResponse.json({
      total_likes: totalLikes || 0,
      is_liked_by_user: !existingLike, // Toggle the state
    });
  } catch (error) {
    console.error("Error in comment likes API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
