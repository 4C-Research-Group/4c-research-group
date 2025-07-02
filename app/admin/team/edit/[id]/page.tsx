"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getTeamMemberById,
  updateTeamMember,
  type CreateTeamMemberData,
  deleteTeamMember,
} from "@/lib/supabase/team";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function EditTeamMemberPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<CreateTeamMemberData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchMember() {
      setLoading(true);
      const member = await getTeamMemberById(id);
      setFormData(member);
      setLoading(false);
    }
    if (id) fetchMember();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => (prev ? { ...prev, [name]: checked } : prev));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const filePath = `avatars/${Date.now()}-${file.name}`;
      // First upload the file
      const { error: uploadError } = await supabase.storage
        .from("team")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });
      if (uploadError) throw uploadError;

      // Get a public URL that won't expire
      const {
        data: { publicUrl },
      } = supabase.storage.from("team").getPublicUrl(filePath);

      console.log("Generated public URL:", publicUrl);

      if (publicUrl) {
        setFormData((prev) =>
          prev ? { ...prev, image_url: publicUrl } : prev
        );
      } else {
        throw new Error("Failed to generate public URL");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    setSaving(true);
    try {
      await updateTeamMember(id, formData);
      router.push("/admin/team");
    } catch (error) {
      alert("Failed to update team member");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id || !formData) return;
    setSaving(true);
    try {
      // 1. Parse the file path from the image_url
      const imageUrl = formData.image_url; // e.g., https://.../object/public/team/avatars/filename.jpg
      const filePath = imageUrl.split("/team/")[1]; // gives 'avatars/filename.jpg'

      // 2. Delete the file from storage
      await supabase.storage.from("team").remove([filePath]);

      // 3. Then delete the team member from the database
      await deleteTeamMember(id);

      router.push("/admin/team");
    } catch (error) {
      console.error("Error deleting team member:", error);
      alert("Failed to delete team member");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  console.log("Image URL:", formData.image_url);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/admin/team"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
        >
          <FaArrowLeft className="mr-2" />
          Back to Team Management
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Edit Team Member
        </h1>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Edit Team Member Information</CardTitle>
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
                  placeholder="e.g., PhD Student, Research Assistant"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="superpower">Superpower</Label>
              <Input
                id="superpower"
                name="superpower"
                value={formData.superpower}
                onChange={handleInputChange}
                placeholder="e.g., Making music and DJing as a side job!"
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Brief biography or description"
                rows={4}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="education">Education</Label>
                <Input
                  id="education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="e.g., BSc, MSc, PhD"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g., London, Ontario"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                <Input
                  id="linkedin_url"
                  name="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <Label htmlFor="twitter_url">Twitter URL</Label>
                <Input
                  id="twitter_url"
                  name="twitter_url"
                  value={formData.twitter_url}
                  onChange={handleInputChange}
                  placeholder="https://twitter.com/username"
                />
              </div>
            </div>

            {/* Image */}
            <div>
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                placeholder="/team/team-member.jpg"
              />
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="block"
                />
                {uploading && (
                  <span className="text-sm text-gray-500">Uploading...</span>
                )}
                {formData.image_url && (
                  <div className="mt-2">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="h-24 w-24 object-cover rounded"
                      onError={(e) => {
                        console.error(
                          "Error loading image:",
                          formData.image_url
                        );
                        // Optionally set a fallback image
                        // e.currentTarget.src = '/path/to/fallback.jpg';
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Settings */}
            <div className="grid md:grid-cols-2 gap-4">
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
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_principal_investigator"
                  checked={formData.is_principal_investigator}
                  onCheckedChange={(checked: boolean) =>
                    handleCheckboxChange("is_principal_investigator", checked)
                  }
                />
                <Label htmlFor="is_principal_investigator">
                  Principal Investigator
                </Label>
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
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link href="/admin/team">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={saving}
                className="bg-cognition-600 hover:bg-cognition-700"
              >
                {saving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
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
