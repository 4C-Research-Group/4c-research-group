"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateBlogPost } from "@/lib/supabase/admin/blog";
import RichTextEditor from "@/components/ui/rich-text-editor";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  created_at: string;
  updated_at: string;
  read_time: string;
  image_url: string;
  tags: string[];
  featured: boolean;
  author_name: string;
  author_role: string;
  author_image_url: string;
};

export default function EditBlogForm({ post }: { post: BlogPost }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [content, setContent] = useState(post.content);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      const fd = new FormData(event.currentTarget);
      // Update the content in the form data
      fd.set("content", content);
      await updateBlogPost(post.id, fd);
      setSuccess("Blog post updated successfully");
      router.push(`/4c-blogs/${fd.get("slug")}`);
    } catch (err: any) {
      setError(err.message || "Failed to update post");
    }
  }

  return (
    <>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4">{error}</div>}
      {success && (
        <div className="bg-green-100 text-green-700 p-2 mb-4">{success}</div>
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
            defaultValue={post.title}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Slug
          </label>
          <input
            type="text"
            name="slug"
            id="slug"
            defaultValue={post.slug}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            defaultValue={post.excerpt}
            required
            rows={3}
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

        {/* Hidden input to store the content value for form submission */}
        <input type="hidden" name="content" id="content" value={content} />

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            defaultValue={post.category}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="read_time"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Read Time (e.g., &quot;5 min read&quot;)
          </label>
          <input
            type="text"
            name="read_time"
            id="read_time"
            defaultValue={post.read_time}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Image URL
          </label>
          <input
            type="url"
            name="image_url"
            id="image_url"
            defaultValue={post.image_url}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            defaultValue={post.tags?.join(", ")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="neuroscience, research, brain, cognition (comma-separated)"
          />
          <p className="mt-1 text-sm text-gray-500">
            Enter tags separated by commas (e.g., neuroscience, research, brain,
            cognition)
          </p>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            id="featured"
            defaultChecked={post.featured}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="featured"
            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
          >
            Featured Post
          </label>
        </div>

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
            defaultValue={post.author_name}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
            defaultValue={post.author_role}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="author_image_url"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Author Image URL
          </label>
          <input
            type="url"
            name="author_image_url"
            id="author_image_url"
            defaultValue={post.author_image_url}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </form>
    </>
  );
}
