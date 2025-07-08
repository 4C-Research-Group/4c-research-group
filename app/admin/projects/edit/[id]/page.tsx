"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/rich-text-editor";
import Link from "next/link";
import { CardFooter } from "@/components/ui/card";
import Image from "next/image";
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
  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingAdditional, setUploadingAdditional] = useState(false);
  const mainImageRef = useRef<HTMLInputElement>(null);
  const additionalImageRef = useRef<HTMLInputElement>(null);

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

  const handleMainImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingMain(true);
    try {
      const filePath = `${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from("projects")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });
      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("projects").getPublicUrl(filePath);

      if (publicUrl) {
        setImage(publicUrl);
      } else {
        throw new Error("Failed to generate public URL");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploadingMain(false);
    }
  };

  const handleAdditionalImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingAdditional(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(2, 15);
        const filePath = `${timestamp}-${randomId}-${i}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("projects")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });
        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("projects").getPublicUrl(filePath);

        if (publicUrl) {
          setImages((prev) => [...prev, publicUrl]);
        } else {
          throw new Error("Failed to generate public URL");
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploadingAdditional(false);
    }
  };

  const removeAdditionalImage = (index: number) => {
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

    const updateData = {
      title,
      description,
      category,
      status,
      start_date: startDate,
      end_date: endDate || null,
      funding: funding || null,
      link: normalizedLink,
      image,
      images,
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
      <div className="max-w-4xl mx-auto py-12 px-4">
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
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <Link
            href="/admin/projects"
            className="inline-flex items-center text-cognition-600 hover:text-cognition-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="mb-8">
        <Link
          href="/admin/projects"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Edit Project
        </h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic Information */}
        <section className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., NuANCEd"
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Category</option>
                <option value="Clinical Research">Clinical Research</option>
                <option value="Implementation Science">
                  Implementation Science
                </option>
                <option value="Clinical Trial">Clinical Trial</option>
                <option value="Basic Science">Basic Science</option>
                <option value="Quality Improvement">Quality Improvement</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <RichTextEditor
              value={description}
              onChange={setDescription}
              placeholder="Brief description for project cards"
              label="Description *"
              required
            />
          </div>
        </section>

        {/* Project Details */}
        <section className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Project Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="status">Status *</Label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <Label htmlFor="start_date">Start Date *</Label>
              <Input
                id="start_date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="funding">Funding Source</Label>
              <Input
                id="funding"
                value={funding}
                onChange={(e) => setFunding(e.target.value)}
                placeholder="e.g., AMOSO Opportunities Fund"
              />
            </div>
            <div>
              <Label htmlFor="link">Project Link</Label>
              <Input
                id="link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
              />
            </div>
          </div>
        </section>

        {/* Media & Links */}
        <section className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Media & Links</h2>

          {/* Main Project Image */}
          <div className="mb-6">
            <Label htmlFor="main_image">
              Main Project Image (Hero Image) *
            </Label>
            <div className="mt-2 space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  ref={mainImageRef}
                  onChange={handleMainImageUpload}
                  disabled={uploadingMain}
                  className="block"
                />
                {uploadingMain && (
                  <span className="text-sm text-gray-500">Uploading...</span>
                )}
              </div>
              {image && (
                <div className="max-w-xs">
                  <Image
                    src={image}
                    alt="Main project image preview"
                    width={300}
                    height={200}
                    className="w-full h-auto object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Additional Project Images */}
          <div className="mb-6">
            <Label htmlFor="additional_images">
              Additional Project Images (Optional)
            </Label>
            <div className="mt-2 space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={additionalImageRef}
                  onChange={handleAdditionalImageUpload}
                  disabled={uploadingAdditional}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => additionalImageRef.current?.click()}
                  disabled={uploadingAdditional}
                  className="flex items-center justify-center w-32 h-24 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-cognition-500 dark:hover:border-cognition-400 transition-colors"
                >
                  <div className="text-center">
                    <Plus className="w-6 h-6 text-gray-400 dark:text-gray-500 mx-auto mb-1" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Add Images
                    </span>
                  </div>
                </button>
                {uploadingAdditional && (
                  <span className="text-sm text-gray-500">Uploading...</span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Click the plus button to add images. Up to 2 additional images
                will be displayed on the public page.
              </p>
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((imageUrl, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={imageUrl}
                        alt={`Additional project image ${index + 1}`}
                        width={200}
                        height={150}
                        className="w-full h-auto object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={() => removeAdditionalImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/projects")}
            disabled={saving}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>

      {project && (
        <div className="mt-8 flex justify-end gap-4">
          <Link
            href={`/projects/${project.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-cognition-600 hover:text-cognition-700"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Public Page
          </Link>
          <Link
            href={`/admin/research/edit/${project.slug}`}
            className="inline-flex items-center text-cognition-600 hover:text-cognition-700"
          >
            <Edit className="mr-2 h-4 w-4" />
            Advanced Edit
          </Link>
        </div>
      )}
    </div>
  );
}
