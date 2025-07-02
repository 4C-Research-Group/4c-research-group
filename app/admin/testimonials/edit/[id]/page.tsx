"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getTestimonial,
  updateTestimonial,
  type Testimonial,
  deleteTestimonial,
} from "@/lib/supabase/team";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FaSave, FaArrowLeft, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";

export default function EditTestimonialPage() {
  const params = useParams();
  const router = useRouter();
  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const testimonialId = params.id as string;

  const loadTestimonial = useCallback(async () => {
    try {
      setError(null);
      const data = await getTestimonial(testimonialId);
      setTestimonial(data);
    } catch (error) {
      console.error("Error loading testimonial:", error);
      setError("Failed to load testimonial");
    } finally {
      setLoading(false);
    }
  }, [testimonialId]);

  useEffect(() => {
    loadTestimonial();
  }, [loadTestimonial]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!testimonial) return;

    setSaving(true);
    setError(null);

    try {
      await updateTestimonial(testimonialId, {
        name: testimonial.name,
        role: testimonial.role,
        quote: testimonial.quote,
        bio: testimonial.bio,
        education: testimonial.education,
        image_url: testimonial.image_url,
        is_active: testimonial.is_active,
        display_order: testimonial.display_order,
      });

      router.push("/admin/testimonials");
    } catch (error) {
      console.error("Error updating testimonial:", error);
      setError("Failed to update testimonial");
    } finally {
      setSaving(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    // Optional: validate file type/size
    const filePath = `testimonials/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("team")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (uploadError) {
      alert("Image upload failed.");
      return;
    }
    const { data } = supabase.storage.from("team").getPublicUrl(filePath);
    if (data?.publicUrl) {
      setTestimonial((prev) =>
        prev ? { ...prev, image_url: data.publicUrl } : prev
      );
    } else {
      alert("Failed to get public URL for image.");
    }
  }

  // Add delete handler
  async function handleDelete() {
    if (!testimonial) return;
    try {
      // 1. Parse the file path from the image_url
      const imageUrl = testimonial.image_url;
      if (imageUrl) {
        const filePath = imageUrl.split("/team/")[1]; // gives 'testimonials/filename.jpg'
        if (filePath) {
          const { error } = await supabase.storage
            .from("team")
            .remove([filePath]);
          if (error) {
            console.error("Delete error:", error);
            alert("Failed to delete image: " + error.message);
          }
        }
      }
      // 2. Delete the testimonial from the database (implement deleteTestimonial if needed)
      // await deleteTestimonial(testimonial.id);
      // router.push("/admin/testimonials");
      alert("Image deleted from storage. Implement DB delete as needed.");
    } catch (error) {
      console.error("Error deleting testimonial or image:", error);
      alert("Failed to delete testimonial or image");
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <FaSpinner className="animate-spin h-8 w-8 mx-auto text-cognition-600" />
          <p className="mt-4 text-gray-600">Loading testimonial...</p>
        </div>
      </div>
    );
  }

  if (error || !testimonial) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">
            {error || "Testimonial not found"}
          </p>
          <Link href="/admin/testimonials">
            <Button>
              <FaArrowLeft className="mr-2" />
              Back to Testimonials
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Edit Testimonial
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Update testimonial information for {testimonial.name}
            </p>
          </div>
          <Link href="/admin/testimonials">
            <Button variant="outline">
              <FaArrowLeft className="mr-2" />
              Back to Testimonials
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Testimonial Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={testimonial.name}
                  onChange={(e) =>
                    setTestimonial({ ...testimonial, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  value={testimonial.role}
                  onChange={(e) =>
                    setTestimonial({ ...testimonial, role: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="quote">Quote *</Label>
              <Textarea
                id="quote"
                value={testimonial.quote}
                onChange={(e) =>
                  setTestimonial({ ...testimonial, quote: e.target.value })
                }
                rows={4}
                required
                placeholder="Enter the student's testimonial quote..."
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                value={testimonial.bio}
                onChange={(e) =>
                  setTestimonial({ ...testimonial, bio: e.target.value })
                }
                rows={3}
                required
                placeholder="Enter the student's bio..."
              />
            </div>

            <div>
              <Label htmlFor="education">Education *</Label>
              <Input
                id="education"
                value={testimonial.education}
                onChange={(e) =>
                  setTestimonial({ ...testimonial, education: e.target.value })
                }
                required
                placeholder="e.g., BSc in Psychology, Western University"
              />
            </div>

            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={testimonial.image_url}
                onChange={(e) =>
                  setTestimonial({ ...testimonial, image_url: e.target.value })
                }
                placeholder="/team/testimonial.jpg"
              />
              <div className="mt-2 flex flex-col items-start gap-2 w-full">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="block w-full"
                />
                {testimonial.image_url && (
                  <div className="max-w-xs w-full mt-2">
                    <Image
                      src={testimonial.image_url}
                      alt="Preview"
                      width={400}
                      height={400}
                      className="w-full h-auto object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/fallback-avatar.png";
                      }}
                      priority
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  value={testimonial.display_order}
                  onChange={(e) =>
                    setTestimonial({
                      ...testimonial,
                      display_order: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_active"
                  checked={testimonial.is_active}
                  onCheckedChange={(checked) =>
                    setTestimonial({
                      ...testimonial,
                      is_active: checked,
                    })
                  }
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
              >
                Delete Testimonial & Image
              </Button>
              <Link href="/admin/testimonials">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
