"use client";

import { useState, useEffect } from "react";
import { FaReply, FaEdit, FaTrash, FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import CommentForm from "./CommentForm";
import { supabase } from "@/lib/supabase/client";
import type { BlogComment } from "@/lib/types/comments";
import { formatDistanceToNow } from "date-fns";
import { UserAvatar } from "@/components/user-avatar";
import { Textarea } from "@/components/ui/textarea";
import CommentLikeButton from "@/components/CommentLikeButton";
import { CommentLikeStats } from "@/lib/types/comment-likes";

interface CommentItemProps {
  comment: BlogComment;
  onCommentUpdated: () => void;
  onCommentDeleted: () => void;
  depth?: number;
  currentUserId?: string;
  isAdmin?: boolean;
}

export default function CommentItem({
  comment,
  onCommentUpdated,
  onCommentDeleted,
  depth = 0,
  currentUserId,
  isAdmin = false,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [likeStats, setLikeStats] = useState<CommentLikeStats>({
    total_likes: 0,
    is_liked_by_user: false,
  });

  // Check if current user is the comment author
  useState(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    })();
  });

  const isAuthor = currentUser?.id === comment.user_id;
  const maxDepth = 3; // Limit nesting depth

  const canDelete = isAdmin || comment.user_id === currentUserId;

  useEffect(() => {
    // Fetch like stats for this comment
    const fetchLikeStats = async () => {
      try {
        const response = await fetch(
          `/api/comment-likes?commentId=${comment.id}`
        );
        if (response.ok) {
          const stats = await response.json();
          setLikeStats(stats);
        }
      } catch (error) {
        console.error("Error fetching comment like stats:", error);
      }
    };

    fetchLikeStats();
  }, [comment.id]);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/comments/${comment.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      onCommentDeleted();
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment");
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleLikeChange = (newStats: {
    total_likes: number;
    is_liked_by_user: boolean;
  }) => {
    setLikeStats(newStats);
  };

  return (
    <div
      className={`border-l-2 border-gray-200 pl-4 ${depth > 0 ? "ml-4" : ""}`}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-cognition-600 flex items-center justify-center text-white text-sm font-semibold">
            {comment.author_name ? (
              comment.author_name[0].toUpperCase()
            ) : (
              <FaUser />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                {comment.author_name}
              </span>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(comment.created_at), {
                  addSuffix: true,
                })}
              </span>
              {comment.updated_at !== comment.created_at && (
                <span className="text-xs text-gray-400">(edited)</span>
              )}
            </div>

            <div className="text-gray-700 dark:text-gray-300 mb-3">
              {comment.content}
            </div>

            <div className="flex items-center gap-2 text-sm">
              <CommentLikeButton
                commentId={comment.id}
                initialLikes={likeStats.total_likes}
                initialIsLiked={likeStats.is_liked_by_user}
                onLikeChange={handleLikeChange}
              />

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsReplying(!isReplying)}
                disabled={depth >= maxDepth}
                className="text-gray-500 hover:text-cognition-600"
              >
                <FaReply className="mr-1" />
                Reply
              </Button>

              {isAuthor && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <FaEdit className="mr-1" />
                    Edit
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="text-gray-500 hover:text-red-600"
                  >
                    <FaTrash className="mr-1" />
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Reply Form */}
        {isReplying && depth < maxDepth && (
          <div className="mt-4">
            <CommentForm
              blogPostId={comment.blog_post_id}
              parentId={comment.id}
              onCommentAdded={() => {
                setIsReplying(false);
                onCommentUpdated();
              }}
              onCancel={() => setIsReplying(false)}
              placeholder={`Reply to ${comment.author_name}...`}
            />
          </div>
        )}
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onCommentUpdated={onCommentUpdated}
              onCommentDeleted={onCommentDeleted}
              depth={depth + 1}
              currentUserId={currentUserId}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      )}
    </div>
  );
}
