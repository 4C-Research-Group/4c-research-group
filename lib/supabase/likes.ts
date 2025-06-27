import { supabase } from "./client";
import type { BlogLike, LikeStats } from "@/lib/types/likes";

export async function getLikeStats(blogPostId: string): Promise<LikeStats> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get total likes count
  const { count: totalLikes, error: countError } = await supabase
    .from("blog_likes")
    .select("*", { count: "exact", head: true })
    .eq("blog_post_id", blogPostId);

  if (countError) {
    console.error("Error getting like count:", countError);
    return { total_likes: 0, is_liked_by_user: false };
  }

  // Check if current user has liked the post
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

  return {
    total_likes: totalLikes || 0,
    is_liked_by_user: isLikedByUser,
  };
}

export async function toggleLike(blogPostId: string): Promise<LikeStats> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to like posts");
  }

  // Check if user already liked the post
  const { data: existingLike } = await supabase
    .from("blog_likes")
    .select("id")
    .eq("blog_post_id", blogPostId)
    .eq("user_id", user.id)
    .single();

  if (existingLike) {
    // Unlike the post
    const { error } = await supabase
      .from("blog_likes")
      .delete()
      .eq("blog_post_id", blogPostId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Error unliking post:", error);
      throw error;
    }
  } else {
    // Like the post
    const { error } = await supabase.from("blog_likes").insert({
      blog_post_id: blogPostId,
      user_id: user.id,
    });

    if (error) {
      console.error("Error liking post:", error);
      throw error;
    }
  }

  // Return updated stats
  return getLikeStats(blogPostId);
}

export async function getLikedUsers(blogPostId: string): Promise<BlogLike[]> {
  const { data, error } = await supabase
    .from("blog_likes")
    .select(
      `
      *,
      user:user_id(
        id,
        email,
        user_metadata
      )
    `
    )
    .eq("blog_post_id", blogPostId)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching liked users:", error);
    return [];
  }

  return data as BlogLike[];
}
