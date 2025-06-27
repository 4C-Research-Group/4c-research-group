import { supabase } from "./client";
import type {
  BlogComment,
  CreateCommentData,
  UpdateCommentData,
} from "@/lib/types/comments";

export async function getCommentsByBlogPost(
  blogPostId: string
): Promise<BlogComment[]> {
  const { data, error } = await supabase
    .from("blog_comments")
    .select("*")
    .eq("blog_post_id", blogPostId)
    .eq("is_approved", true)
    .eq("is_spam", false)
    .is("parent_id", null) // Only get top-level comments
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching comments:", error);
    return [];
  }

  // Get replies for each comment
  const commentsWithReplies = await Promise.all(
    (data || []).map(async (comment: any) => {
      const { data: replies } = await supabase
        .from("blog_comments")
        .select("*")
        .eq("parent_id", comment.id)
        .eq("is_approved", true)
        .eq("is_spam", false)
        .order("created_at", { ascending: true });

      // Get user data for the comment
      let userData = null;
      if (comment.user_id) {
        const { data: user } = await supabase
          .from("users")
          .select("id, email, name")
          .eq("id", comment.user_id)
          .single();
        userData = user;
      }

      // Get user data for replies
      const repliesWithUsers = await Promise.all(
        (replies || []).map(async (reply: any) => {
          let replyUserData = null;
          if (reply.user_id) {
            const { data: user } = await supabase
              .from("users")
              .select("id, email, name")
              .eq("id", reply.user_id)
              .single();
            replyUserData = user;
          }
          return {
            ...reply,
            user: replyUserData,
          };
        })
      );

      return {
        ...comment,
        user: userData,
        replies: repliesWithUsers,
      };
    })
  );

  return commentsWithReplies as BlogComment[];
}

export async function createComment(
  commentData: CreateCommentData
): Promise<BlogComment | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to comment");
  }

  const { data, error } = await supabase
    .from("blog_comments")
    .insert({
      blog_post_id: commentData.blog_post_id,
      user_id: user.id,
      author_name:
        commentData.author_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Anonymous",
      author_email: commentData.author_email || user.email,
      content: commentData.content,
      parent_id: commentData.parent_id || null,
      is_approved: false, // Comments need approval by default
      is_spam: false,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating comment:", error);
    throw error;
  }

  return data as unknown as BlogComment;
}

export async function updateComment(
  commentId: string,
  updateData: UpdateCommentData
): Promise<BlogComment | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to update comments");
  }

  const { data, error } = await supabase
    .from("blog_comments")
    .update({
      content: updateData.content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", commentId)
    .eq("user_id", user.id) // Users can only update their own comments
    .select()
    .single();

  if (error) {
    console.error("Error updating comment:", error);
    throw error;
  }

  return data as unknown as BlogComment;
}

export async function deleteComment(commentId: string): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to delete comments");
  }

  const { error } = await supabase
    .from("blog_comments")
    .delete()
    .eq("id", commentId)
    .eq("user_id", user.id); // Users can only delete their own comments

  if (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}

export async function getCommentCount(blogPostId: string): Promise<number> {
  const { count, error } = await supabase
    .from("blog_comments")
    .select("*", { count: "exact", head: true })
    .eq("blog_post_id", blogPostId)
    .eq("is_approved", true)
    .eq("is_spam", false);

  if (error) {
    console.error("Error getting comment count:", error);
    return 0;
  }

  return count || 0;
}
