"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createTestimonial,
  type CreateTestimonialData,
} from "@/lib/supabase/team";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import Link from "next/link";

export default function NewTestimonialPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateTestimonialData>({
    name: "",
    role: "",
    quote: "",
    bio: "",
    education: "",
    image_url: "",
    display_order: 0,
    is_active: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createTestimonial(formData);
      router.push("/admin/testimonials");
    } catch (error) {
      console.error("Error creating testimonial:", error);
      alert("Failed to create testimonial");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/admin/testimonials"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to Testimonials
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Add New Testimonial
        </h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Testimonial Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Full name"
                />
              </div>
              <div>
                <Label htmlFor="role">Role *</Label>
                <Input
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., DDS Student, Research Assistant"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="quote">Quote *</Label>
              <Textarea
                id="quote"
                name="quote"
                value={formData.quote}
                onChange={handleInputChange}
                required
                placeholder="The testimonial quote..."
                rows={6}
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio *</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                required
                placeholder="Brief biography or background information"
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="education">Education *</Label>
              <Textarea
                id="education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                required
                placeholder="Educational background and qualifications"
                rows={3}
              />
            </div>

            {/* Image */}
            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                placeholder="/team/testimonial.jpg"
              />
            </div>

            {/* Settings */}
            <div>
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                name="display_order"
                type="number"
                value={formData.display_order}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked: boolean) =>
                  handleCheckboxChange("is_active", checked)
                }
              />
              <Label htmlFor="is_active">Active</Label>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link href="/admin/testimonials">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={loading}
                className="bg-cognition-600 hover:bg-cognition-700"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FaSave className="mr-2" />
                    Create Testimonial
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
