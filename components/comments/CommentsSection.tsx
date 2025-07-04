"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { FaComments, FaSignInAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { supabase } from "@/lib/supabase/client";
import type { BlogComment } from "@/lib/types/comments";

interface CommentsSectionProps {
  blogPostId: string;
}

export default function CommentsSection({ blogPostId }: CommentsSectionProps) {
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [commentLikeStats, setCommentLikeStats] = useState<{
    [commentId: string]: { total_likes: number; is_liked_by_user: boolean };
  }>({});

  // Cache for in-flight requests to prevent duplicates
  const requestCache = useRef<{
    [key: string]:
      | Promise<{ total_likes: number; is_liked_by_user: boolean }>
      | undefined;
  }>({});

  // Fetch like stats for a single comment with deduplication
  const fetchCommentLikeStats = useCallback(async (commentId: string) => {
    const cacheKey = `comment-${commentId}`;

    // Return existing promise if request is in flight
    const cachedRequest = requestCache.current[cacheKey];
    if (cachedRequest) {
      return cachedRequest;
    }

    // Create and cache the request
    const request = (async () => {
      try {
        const response = await fetch(
          `/api/comment-likes?commentId=${commentId}`
        );
        if (!response.ok) throw new Error("Failed to fetch like stats");
        return await response.json();
      } finally {
        // Clean up the cache after request completes
        delete requestCache.current[cacheKey];
      }
    })();

    requestCache.current[cacheKey] = request;
    return request;
  }, []);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch comments
      const response = await fetch(`/api/comments?blogPostId=${blogPostId}`);
      if (!response.ok) throw new Error("Failed to fetch comments");
      const data = await response.json();
      setComments(data);

      // Collect all comment IDs (including replies)
      const allComments: BlogComment[] = [];
      const flatten = (arr: BlogComment[]) => {
        arr.forEach((c) => {
          allComments.push(c);
          if (c.replies?.length) flatten(c.replies);
        });
      };
      flatten(data);

      // Only fetch stats for comments we don't already have data for
      const commentIds = allComments
        .map((c) => c.id)
        .filter((id) => !commentLikeStats[id]);

      if (commentIds.length === 0) return;

      // Fetch stats in parallel with deduplication
      const statsPromises = commentIds.map((commentId) =>
        fetchCommentLikeStats(commentId)
          .then((stat) => ({ commentId, stat }))
          .catch((error) => {
            console.error(`Failed to fetch stats for comment:`, error);
            return {
              commentId,
              stat: { total_likes: 0, is_liked_by_user: false },
            };
          })
      );

      const statsResults = await Promise.all(statsPromises);

      // Update state with new stats
      setCommentLikeStats((prev) => ({
        ...prev,
        ...Object.fromEntries(
          statsResults
            .filter(Boolean)
            .map(({ commentId, stat }) => [commentId, stat])
        ),
      }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [blogPostId, fetchCommentLikeStats, commentLikeStats]);

  useEffect(() => {
    checkUser();
    fetchComments();
  }, [blogPostId, fetchComments]);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);

    if (user) {
      // Check if user is admin
      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      setIsAdmin(profile?.role === "admin");
    }
  };

  const handleCommentAdded = () => {
    fetchComments();
    setShowLoginPrompt(false);
  };

  const handleCommentUpdated = () => {
    fetchComments();
  };

  const handleCommentDeleted = () => {
    fetchComments();
  };

  const formatCommentCount = (count: number) => {
    if (count === 0) return "No comments yet";
    if (count === 1) return "1 comment";
    return `${count} comments`;
  };

  // Helper to flatten all comments and replies
  const flattenComments = (arr: BlogComment[]): BlogComment[] => {
    let all: BlogComment[] = [];
    arr.forEach((c) => {
      all.push(c);
      if (c.replies && c.replies.length > 0) {
        all = all.concat(flattenComments(c.replies));
      }
    });
    return all;
  };

  // Recursive render for comments and replies
  const renderComments = (commentsArr: BlogComment[]) =>
    commentsArr.map((comment) => (
      <CommentItem
        key={comment.id}
        comment={comment}
        likeStats={commentLikeStats[comment.id]}
        onCommentUpdated={handleCommentUpdated}
        onCommentDeleted={handleCommentDeleted}
        currentUserId={user?.id}
        isAdmin={isAdmin}
        // Recursively render replies
        renderReplies={() =>
          comment.replies && comment.replies.length > 0
            ? renderComments(comment.replies)
            : null
        }
      />
    ));

  if (loading) {
    return (
      <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-4">
                <div className="h-20 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-12 pt-8 pb-16 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <FaComments className="text-cognition-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Comments
            </h2>
            <span className="text-gray-500">
              ({formatCommentCount(comments.length)})
            </span>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Comment Form */}
          {user ? (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Add a Comment
              </h3>
              <CommentForm
                blogPostId={blogPostId}
                onCommentAdded={handleCommentAdded}
              />
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 text-center">
              <FaSignInAlt className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                Sign in to comment
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Join the discussion by signing in to your account.
              </p>
              <Button
                onClick={() => setShowLoginPrompt(true)}
                className="bg-cognition-600 hover:bg-cognition-700"
              >
                Sign In
              </Button>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <FaComments className="mx-auto text-4xl mb-4 opacity-50" />
                <p>Be the first to comment on this post!</p>
              </div>
            ) : (
              renderComments(comments)
            )}
          </div>

          {/* Login Modal (simplified) */}
          {showLoginPrompt && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">Sign In Required</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You need to be signed in to comment on blog posts.
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => (window.location.href = "/login")}
                    className="bg-cognition-600 hover:bg-cognition-700"
                  >
                    Sign In
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowLoginPrompt(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
