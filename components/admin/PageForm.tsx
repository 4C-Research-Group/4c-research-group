"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export function PageForm({
  initialData,
}: {
  initialData?: { id: string; title: string; content: string };
}) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(
    initialData?.title
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "") || ""
  );
  const [content, setContent] = useState(initialData?.content || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    setIsSubmitting(true);
    try {
      if (initialData) {
        // Update existing page
        const { error } = await supabase
          .from("pages")
          .update({
            title,
            slug,
            content,
            updated_at: new Date().toISOString(),
          })
          .eq("id", initialData.id);

        if (error) throw error;
        toast.success("Page updated successfully");
      } else {
        // Create new page
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error("Not authenticated");

        const { error } = await supabase.from("pages").insert([
          {
            title,
            slug,
            content,
            created_by: user.id,
          },
        ]);

        if (error) throw error;
        toast.success("Page created successfully");
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Error saving page:", error);
      toast.error("Failed to save page");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!initialData) {
              setSlug(
                e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, "-")
                  .replace(/[^a-z0-9-]/g, "")
              );
            }
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="slug"
          className="block text-sm font-medium text-gray-700"
        >
          Slug (URL)
        </label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono text-sm"
          required
          pattern="[a-z0-9-]+"
          title="Only lowercase letters, numbers, and hyphens are allowed"
        />
      </div>

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={15}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono text-sm"
          required
        />
        <p className="mt-1 text-sm text-gray-500">
          Supports Markdown formatting
        </p>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isSubmitting
              ? "bg-indigo-400"
              : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          }`}
        >
          {isSubmitting ? "Saving..." : "Save Page"}
        </button>
      </div>
    </form>
  );
}
