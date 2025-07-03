"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBlogPost } from "@/lib/supabase/admin/blog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface DeleteBlogButtonProps {
  postId: string;
  postTitle: string;
  className?: string;
}

export default function DeleteBlogButton({
  postId,
  postTitle,
  className = "",
}: DeleteBlogButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      await deleteBlogPost(postId);
      router.push("/4c-blogs");
    } catch (err) {
      console.error("Error deleting blog post:", err);
      setError(
        err instanceof Error ? err.message : "Failed to delete blog post"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className={`px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs transition-colors ${className}`}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{postTitle}&quot;? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
