"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface CommentLikeButtonProps {
  commentId: string;
  initialLikes?: number;
  initialIsLiked?: boolean;
  className?: string;
  onLikeChange?: (stats: {
    total_likes: number;
    is_liked_by_user: boolean;
  }) => void;
}

function CommentLikeButton({
  commentId,
  initialLikes = 0,
  initialIsLiked = false,
  className,
  onLikeChange,
}: CommentLikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);

  // Get localStorage key for this comment
  const getStorageKey = useCallback((id: string) => `comment_like_${id}`, []);

  // Load like state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(getStorageKey(commentId));
      if (stored) {
        const storedData = JSON.parse(stored);
        setLikes(storedData.total_likes);
        setIsLiked(storedData.is_liked_by_user);
      } else {
        // If no stored data, use the initial props
        setLikes(initialLikes);
        setIsLiked(initialIsLiked);
      }
    } catch (error) {
      console.error("Error loading like state from localStorage:", error);
      setLikes(initialLikes);
      setIsLiked(initialIsLiked);
    } finally {
      setHasHydrated(true);
    }
  }, [commentId, getStorageKey, initialLikes, initialIsLiked]);

  const handleLike = useCallback(async () => {
    if (isLoading || !hasHydrated) return;

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

        // Update local state
        setLikes(data.total_likes);
        setIsLiked(data.is_liked_by_user);

        // Store in localStorage
        try {
          localStorage.setItem(getStorageKey(commentId), JSON.stringify(data));
        } catch (error) {
          console.error("Error saving like state to localStorage:", error);
        }

        // Notify parent component of the change
        if (onLikeChange) {
          onLikeChange(data);
        }

        // Trigger animation
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 300);
        return () => clearTimeout(timer);
      } else {
        const errorData = await response.json();
        console.error("Failed to like comment:", errorData);
      }
    } catch (error) {
      console.error("Error liking comment:", error);
    } finally {
      setIsLoading(false);
    }
  }, [commentId, isLoading, onLikeChange, getStorageKey, hasHydrated]);

  // Don't render anything until hydration is complete
  if (!hasHydrated) {
    return (
      <div className="flex items-center gap-1.5 px-2 py-1 text-sm opacity-50">
        <Heart className="w-4 h-4" />
        {likes > 0 && <span className="text-xs font-medium">{likes}</span>}
      </div>
    );
  }

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

export default memo(CommentLikeButton);
