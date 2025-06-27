"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommentLikeButtonProps {
  commentId: string;
  initialLikes?: number;
  initialIsLiked?: boolean;
  className?: string;
}

export default function CommentLikeButton({
  commentId,
  initialLikes = 0,
  initialIsLiked = false,
  className,
}: CommentLikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLike = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/comment-likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment_id: commentId }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.total_likes);
        setIsLiked(data.is_liked_by_user);

        // Trigger animation
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 300);
      } else {
        const error = await response.json();
        console.error("Failed to like comment:", error);
      }
    } catch (error) {
      console.error("Error liking comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isLoading}
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded-full text-sm transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50",
        isLiked && "text-red-500",
        !isLiked &&
          "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
        className
      )}
    >
      <Heart
        className={cn(
          "w-4 h-4 transition-all duration-200",
          isLiked && "fill-current",
          isAnimating && "scale-125"
        )}
      />
      {likes > 0 && <span className="text-xs font-medium">{likes}</span>}
    </button>
  );
}
