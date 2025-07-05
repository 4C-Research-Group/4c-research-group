"use client";

import { useState, useEffect, useCallback } from "react";
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
import { memo } from "react";

interface CommentItemProps {
  comment: BlogComment;
  onCommentUpdated: () => void;
  onCommentDeleted: () => void;
  depth?: number;
  currentUserId?: string;
  isAdmin?: boolean;
  likeStats?: CommentLikeStats;
}

const MemoizedCommentLikeButton = memo(CommentLikeButton);

export default function CommentItem({
  comment,
  onCommentUpdated,
  onCommentDeleted,
  depth = 0,
  currentUserId,
  isAdmin = false,
  likeStats,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [localLikeStats, setLocalLikeStats] = useState<CommentLikeStats>(
    likeStats || { total_likes: 0, is_liked_by_user: false }
  );

  useEffect(() => {
    if (likeStats) setLocalLikeStats(likeStats);
  }, [likeStats]);

  // Get current user on mount
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getUser();
  }, []);

  const isAuthor = currentUser?.id === comment.user_id;
  const maxDepth = 3; // Limit nesting depth
  const canDelete = isAdmin || comment.user_id === currentUserId;

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

  const handleLikeChange = useCallback(
    (newStats: { total_likes: number; is_liked_by_user: boolean }) => {
      setLocalLikeStats(newStats);
    },
    []
  );

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
              <div className="mt-2 flex items-center">
                <MemoizedCommentLikeButton
                  key={`like-${comment.id}`}
                  commentId={comment.id}
                  initialLikes={localLikeStats.total_likes}
                  initialIsLiked={localLikeStats.is_liked_by_user}
                  onLikeChange={handleLikeChange}
                />
              </div>

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
              // Don't pass parent's likeStats - let each reply get its own stats
            />
          ))}
        </div>
      )}
    </div>
  );
}
