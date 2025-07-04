"use client";

import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase/client";

interface LikeButtonProps {
  blogPostId: string;
  className?: string;
  showCount?: boolean;
}

export default function LikeButton({
  blogPostId,
  className = "",
  showCount = true,
}: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const fetchLikeStats = async () => {
    try {
      const response = await fetch(`/api/likes?blogPostId=${blogPostId}`);
      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.total_likes);
        setIsLiked(data.is_liked_by_user);
      }
    } catch (error) {
      console.error("Error fetching like stats:", error);
    }
  };

  useEffect(() => {
    checkUser();
    fetchLikeStats();
  }, [blogPostId, fetchLikeStats]);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  const handleLike = async () => {
    if (!user) {
      // Redirect to login or show login prompt
      window.location.href = "/login";
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blog_post_id: blogPostId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikeCount(data.total_likes);
        setIsLiked(data.is_liked_by_user);
      } else {
        const errorData = await response.json();
        console.error("Error toggling like:", errorData.error);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLike}
      disabled={isLoading}
      variant="ghost"
      size="sm"
      className={`flex items-center gap-2 transition-all duration-200 ${
        isLiked
          ? "text-red-500 hover:text-red-600"
          : "text-gray-500 hover:text-red-500"
      } ${className}`}
    >
      <FaHeart
        className={`text-lg transition-all duration-200 ${
          isLiked ? "fill-current animate-pulse" : "fill-none stroke-current"
        }`}
      />
      {showCount && (
        <span className="text-sm font-medium">
          {likeCount > 0 ? likeCount : ""}
        </span>
      )}
    </Button>
  );
}
