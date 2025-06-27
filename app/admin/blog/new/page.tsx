"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost } from "@/lib/supabase/admin/blog";
import { supabase } from "@/lib/supabase/client";

export default function NewBlogPost() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [readTime, setReadTime] = useState("");

  // Check admin status and get user info
  useState(() => {
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) {
        setCheckedAuth(true);
        return;
      }
      setUser(session.user);
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();
      if (!error && data?.role === "admin") setIsAdmin(true);
      setCheckedAuth(true);
    })();
  });

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTitle(value);
    if (!slug) {
      setSlug(
        value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
      );
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      const formData = new FormData();
      formData.set("title", title);
      formData.set("slug", slug);
      formData.set("excerpt", excerpt);
      formData.set("content", content);
      formData.set("category", category || "General");
      formData.set(
        "image_url",
        imageUrl || "https://via.placeholder.com/800x400?text=Blog+Post"
      );
      formData.set("read_time", readTime || "1 min read");
      // Auto-fill author info if available
      if (user) {
        formData.set(
          "author_name",
          user.user_metadata?.name || user.email || ""
        );
        formData.set("author_image_url", user.user_metadata?.avatar_url || "");
        formData.set("author_role", "Admin");
      }
      const result = await createBlogPost(formData);
      if (result) {
        router.push(`/admin/blog/edit/${result.id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
      console.error("Error creating post:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!checkedAuth) {
    return <div className="text-center py-12">Checking admin status...</div>;
  }
  if (!isAdmin) {
    return (
      <div className="container mx-auto p-6 max-w-2xl text-center">
        <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          You do not have permission to create a blog post.
        </p>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">New Blog Post</h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
      </div>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={handleTitleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            URL Slug
          </label>
          <input
            type="text"
            name="slug"
            id="slug"
            required
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm"
            placeholder="my-awesome-post"
          />
        </div>
        <div>
          <label
            htmlFor="excerpt"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Excerpt
          </label>
          <textarea
            name="excerpt"
            id="excerpt"
            rows={3}
            required
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            rows={10}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category (optional)
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Image URL (optional)
          </label>
          <input
            type="url"
            name="image_url"
            id="image_url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="read_time"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Read Time
          </label>
          <input
            type="text"
            name="read_time"
            id="read_time"
            required
            value={readTime}
            onChange={(e) => setReadTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="5 min read"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSubmitting
                ? "bg-blue-400"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }`}
          >
            {isSubmitting ? "Creating..." : "Create Blog Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
