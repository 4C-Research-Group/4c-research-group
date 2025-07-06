"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost } from "@/lib/supabase/admin/blog";
import { supabase } from "@/lib/supabase/client";
import RichTextEditor from "@/components/ui/rich-text-editor";

export default function NewBlogPost() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [readTime, setReadTime] = useState("");
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [authorRole, setAuthorRole] = useState("Admin");
  const [isFeatured, setIsFeatured] = useState(false);

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

      // Set default author info
      if (session.user) {
        let defaultAuthorName = "";
        if (session.user.user_metadata?.name) {
          defaultAuthorName = session.user.user_metadata.name;
        } else if (session.user.email) {
          const emailName = session.user.email.split("@")[0];
          defaultAuthorName = emailName
            .split(/[._-]/)
            .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ");
        } else {
          defaultAuthorName = "Admin User";
        }
        setAuthorName(defaultAuthorName);
      }
    })();
  });

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTitle(value);

    // Only auto-generate slug if it hasn't been manually edited
    if (!isSlugManuallyEdited) {
      const generatedSlug = value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      setSlug(generatedSlug);
    }
  }

  function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSlug(value);
    setIsSlugManuallyEdited(true);
  }

  function generateSlugFromTitle() {
    const generatedSlug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    setSlug(generatedSlug);
    setIsSlugManuallyEdited(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      console.log("Submitting blog post with data:", {
        title,
        slug,
        excerpt,
        content: content.substring(0, 100) + "...", // Log first 100 chars
        category,
        tags,
        imageUrl,
        readTime,
      });

      const formData = new FormData();
      formData.set("title", title);
      formData.set("slug", slug);
      formData.set("excerpt", excerpt);
      formData.set("content", content);
      formData.set("category", category || "General");
      formData.set("tags", tags);
      formData.set(
        "image_url",
        imageUrl || "https://placehold.co/800x400/cccccc/666666?text=Blog+Post"
      );
      formData.set("read_time", readTime || "1 min read");

      // Auto-fill author info if available
      if (user) {
        formData.set("author_name", authorName || "Admin User");
        formData.set("author_image_url", user.user_metadata?.avatar_url || "");
        formData.set("author_role", authorRole || "Admin");
      }

      // Set featured status
      formData.set("featured", isFeatured.toString());

      console.log("Calling createBlogPost...");
      const result = (await createBlogPost(formData)) as Array<{
        id: string;
      }> | null;
      console.log("Blog post created successfully:", result);

      if (Array.isArray(result) && result[0]?.id) {
        setSuccess("Blog post created successfully! Redirecting...");
        console.log(
          "Redirecting to edit page:",
          `/admin/blog/edit/${result[0].id}`
        );

        // Use setTimeout to ensure the success message is shown
        setTimeout(() => {
          router.replace(`/admin/blog/edit/${result[0].id}`);
        }, 1000);
      } else {
        setSuccess(
          "Blog post created successfully! Redirecting to blog list..."
        );
        console.log("No result or no ID, redirecting to blog list");

        setTimeout(() => {
          router.replace("/4c-blogs");
        }, 1000);
      }
    } catch (err) {
      console.error("Error creating blog post:", err);
      setError(err instanceof Error ? err.message : "Failed to create post");
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
    <div className="container mx-auto p-6 max-w-4xl">
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
      {success && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
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
              <p className="text-sm text-green-700">{success}</p>
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
          <div className="flex gap-2">
            <input
              type="text"
              name="slug"
              id="slug"
              required
              value={slug}
              onChange={handleSlugChange}
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white font-mono text-sm"
              placeholder="my-awesome-post"
            />
            <button
              type="button"
              onClick={generateSlugFromTitle}
              disabled={!title.trim()}
              className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
              title="Generate slug from title"
            >
              Generate
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {isSlugManuallyEdited
              ? "Slug has been manually edited. Click 'Generate' to create a new one from the title."
              : "Slug will be auto-generated from the title. You can edit it manually if needed."}
          </p>
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
        <RichTextEditor
          value={content}
          onChange={setContent}
          label="Content"
          placeholder="Write your blog post content here. Use the toolbar to format headings, subheadings, lists, and more..."
          required
        />
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
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Tags (optional)
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="neuroscience, research, brain, cognition (comma-separated)"
          />
          <p className="mt-1 text-sm text-gray-500">
            Enter tags separated by commas (e.g., neuroscience, research, brain,
            cognition)
          </p>
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

        {/* Featured Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="featured"
            className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Mark as Featured Post
          </label>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 -mt-4">
          Featured posts will be prominently displayed at the top of the blog
          page
        </p>

        {/* Author Information */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Author Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="author_name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Author Name
              </label>
              <input
                type="text"
                name="author_name"
                id="author_name"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Author Name"
              />
            </div>
            <div>
              <label
                htmlFor="author_role"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Author Role
              </label>
              <input
                type="text"
                name="author_role"
                id="author_role"
                required
                value={authorRole}
                onChange={(e) => setAuthorRole(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="e.g., Admin, Researcher, Author"
              />
            </div>
          </div>
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
