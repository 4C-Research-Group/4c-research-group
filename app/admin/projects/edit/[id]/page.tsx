"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { CardFooter } from "@/components/ui/card";
import {
  Eye,
  Edit,
  ArrowLeft,
  Plus,
  X,
  Image as ImageIcon,
} from "lucide-react";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<any>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [funding, setFunding] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

      if (error || !data) {
        setError("Project not found.");
        setLoading(false);
        return;
      }

      setProject(data);
      setTitle(data.title || "");
      setDescription(data.description || "");
      setCategory(data.category || "");
      setStatus(data.status || "");
      setStartDate(data.start_date ? data.start_date.split("T")[0] : "");
      setEndDate(data.end_date ? data.end_date.split("T")[0] : "");
      setFunding(data.funding || "");
      setLink(data.link || "");
      setImage(data.image || "");
      setImages(data.images || []);
      setLoading(false);
    }

    if (projectId) fetchProject();
  }, [projectId]);

  const addImage = () => {
    setImages([...images, ""]);
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    // Helper function to normalize and validate URLs
    const normalizeUrl = (url: string) => {
      if (!url.trim()) return null; // Empty is valid

      let normalizedUrl = url.trim();

      // If it's a relative path (starts with /), accept as-is
      if (normalizedUrl.startsWith("/")) {
        return normalizedUrl;
      }

      // Add protocol if missing for external URLs
      if (
        !normalizedUrl.startsWith("http://") &&
        !normalizedUrl.startsWith("https://")
      ) {
        normalizedUrl = "https://" + normalizedUrl;
      }

      try {
        new URL(normalizedUrl);
        return normalizedUrl;
      } catch {
        return false; // Invalid URL
      }
    };

    // Check if provided URLs are valid and normalize them
    let normalizedLink = null;
    if (link) {
      normalizedLink = normalizeUrl(link);
      if (normalizedLink === false) {
        setError(
          "Please enter a valid URL for the external link (e.g., 'example.com' or 'https://example.com') or leave it empty"
        );
        setSaving(false);
        return;
      }
    }

    let normalizedImage = null;
    if (image) {
      normalizedImage = normalizeUrl(image);
      if (normalizedImage === false) {
        setError(
          "Please enter a valid URL for the main image (e.g., 'example.com/image.jpg' or 'https://example.com/image.jpg') or leave it empty"
        );
        setSaving(false);
        return;
      }
    }

    // Check and normalize additional images
    const normalizedImages = [];
    for (let i = 0; i < images.length; i++) {
      if (images[i]) {
        const normalized = normalizeUrl(images[i]);
        if (normalized === false) {
          setError(
            `Please enter a valid URL for additional image ${i + 1} (e.g., 'example.com/image.jpg') or leave it empty`
          );
          setSaving(false);
          return;
        }
        if (normalized) {
          normalizedImages.push(normalized);
        }
      }
    }

    const updateData = {
      title,
      description,
      category,
      status,
      start_date: startDate,
      end_date: endDate || null,
      funding: funding || null,
      link: normalizedLink,
      image: normalizedImage,
      images: normalizedImages,
    };

    const { error } = await supabase
      .from("projects")
      .update(updateData)
      .eq("id", projectId);

    setSaving(false);
    if (error) {
      setError("Failed to save changes: " + error.message);
    } else {
      router.push("/admin/projects");
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cognition-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading project...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/admin/projects">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/projects">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Edit Project</h1>
        </div>

        <form
          onSubmit={handleSave}
          className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-xl shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-800"
                required
              >
                <option value="">Select category</option>
                <option value="Clinical Research">Clinical Research</option>
                <option value="Implementation Science">
                  Implementation Science
                </option>
                <option value="Basic Science">Basic Science</option>
                <option value="Health Services Research">
                  Health Services Research
                </option>
                <option value="Quality Improvement">Quality Improvement</option>
              </select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-md px-3 py-2 bg-white dark:bg-gray-800"
                required
              >
                <option value="">Select status</option>
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <Label htmlFor="funding">Funding</Label>
              <Input
                id="funding"
                value={funding}
                onChange={(e) => setFunding(e.target.value)}
                placeholder="e.g., CIHR, NSERC"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                placeholder="Leave empty for ongoing projects"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="link">External Link (Optional)</Label>
            <Input
              id="link"
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave empty if no external link is available
            </p>
          </div>

          {/* Image Section */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="image">Main Project Image (Optional)</Label>
              <Input
                id="image"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">
                This will be the primary image displayed for the project. Leave
                empty if no image is available.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Additional Images</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addImage}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Image
                </Button>
              </div>

              {images.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                  <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    No additional images added
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {images.map((image, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={image}
                        onChange={(e) => updateImage(index, e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeImage(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={saving} className="flex-1">
              {saving ? "Saving..." : "Save Changes"}
            </Button>
            <Link href="/admin/projects">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>

        {project && (
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">
              Additional Options
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href={`/research/${project.slug}`} target="_blank">
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View Public Page
                </Button>
              </Link>
              <Link href={`/admin/research/edit/${project.slug}`}>
                <Button variant="secondary" className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Advanced Edit
                </Button>
              </Link>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-200 mt-3">
              <strong>Advanced Edit</strong> includes detailed content, team
              members, objectives, and more image options.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
