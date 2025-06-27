"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase/client";

interface CommentFormProps {
  blogPostId: string;
  parentId?: string;
  onCommentAdded: () => void;
  onCancel?: () => void;
  placeholder?: string;
}

export default function CommentForm({
  blogPostId,
  parentId,
  onCommentAdded,
  onCancel,
  placeholder = "Write your comment...",
}: CommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("Please enter a comment");
      return;
    }

    if (content.trim().length < 3) {
      setError("Comment must be at least 3 characters long");
      return;
    }

    if (content.trim().length > 1000) {
      setError("Comment must be less than 1000 characters");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blog_post_id: blogPostId,
          content: content.trim(),
          parent_id: parentId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to post comment");
      }

      setContent("");
      onCommentAdded();
      if (onCancel) onCancel();
    } catch (err: any) {
      setError(err.message || "Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="min-h-[100px] resize-none"
          maxLength={1000}
        />
        <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
          <span>{content.length}/1000 characters</span>
          {error && <span className="text-red-500">{error}</span>}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="bg-cognition-600 hover:bg-cognition-700"
        >
          {isSubmitting ? "Posting..." : "Post Comment"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
