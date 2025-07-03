"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteBlogPost } from "@/lib/supabase/admin/blog";

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
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");

    try {
      await deleteBlogPost(postId);
      setShowConfirm(false);
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
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className={`px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs transition-colors ${className}`}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Delete Blog Post
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete "{postTitle}"? This action cannot
              be undone.
            </p>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
