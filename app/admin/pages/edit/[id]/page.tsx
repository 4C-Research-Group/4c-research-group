"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import the editor to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

type Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
};

export default function PageEditor() {
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [page, setPage] = useState<Page>({
    id: "",
    title: "",
    slug: "",
    content: "",
    metaTitle: "",
    metaDescription: "",
    isPublished: false,
  });

  // TODO: Replace with actual API call to fetch page by ID
  useEffect(() => {
    const fetchPage = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock data - replace with actual API call
        const mockPage: Page = {
          id: id as string,
          title: id === "new" ? "New Page" : `Page ${id}`,
          slug: id === "new" ? "" : `page-${id}`,
          content:
            id === "new"
              ? ""
              : `<h1>Page ${id} Content</h1><p>Edit your content here.</p>`,
          metaTitle: id === "new" ? "" : `Page ${id} Title`,
          metaDescription: id === "new" ? "" : `Description for page ${id}`,
          isPublished: true,
        };

        setPage(mockPage);
      } catch (error) {
        console.error("Error fetching page:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPage();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;

    setPage((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContentChange = (content: string) => {
    setPage((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // TODO: Implement save functionality
      console.log("Saving page:", page);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to pages list after save
      router.push("/admin/pages");
    } catch (error) {
      console.error("Error saving page:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {id === "new" ? "Create New Page" : `Edit: ${page.title}`}
          </h1>
          <p className="text-gray-600">
            {id === "new"
              ? "Create a new page"
              : `Last updated: ${new Date().toLocaleString()}`}
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/admin/pages" className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pages
          </Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={page.title}
                    onChange={handleChange}
                    placeholder="Page Title"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      /
                    </span>
                    <Input
                      id="slug"
                      name="slug"
                      value={page.slug}
                      onChange={handleChange}
                      placeholder="page-slug"
                      className="rounded-l-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label>Content</Label>
                  {typeof window !== "undefined" && ReactQuill && (
                    <div className="mt-1 bg-white">
                      <ReactQuill
                        theme="snow"
                        value={page.content}
                        onChange={handleContentChange}
                        className="h-96 mb-16"
                        modules={{
                          toolbar: [
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            ["bold", "italic", "underline", "strike"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link", "image"],
                            ["clean"],
                          ],
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg border">
              <h2 className="font-semibold mb-4">Publish</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="isPublished">Status</Label>
                  <div className="flex items-center">
                    <input
                      id="isPublished"
                      name="isPublished"
                      type="checkbox"
                      checked={page.isPublished}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      {page.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button type="submit" className="w-full" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        {id === "new" ? "Create Page" : "Update Page"}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
              <h2 className="font-semibold mb-4">SEO Settings</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    name="metaTitle"
                    value={page.metaTitle}
                    onChange={handleChange}
                    placeholder="Meta title for SEO"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Recommended: 50-60 characters
                  </p>
                </div>
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    name="metaDescription"
                    value={page.metaDescription}
                    onChange={handleChange}
                    placeholder="Meta description for SEO"
                    rows={3}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Recommended: 150-160 characters
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
