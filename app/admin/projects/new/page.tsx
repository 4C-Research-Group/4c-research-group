"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProject } from "@/lib/supabase/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    long_description: "",
    category: "",
    status: "upcoming" as "active" | "completed" | "upcoming",
    start_date: "",
    end_date: "",
    image: "",
    images: [] as string[],
    tags: [] as string[],
    link: "",
    funding: "",
    objectives: [] as string[],
    team_members: [] as { name: string; role: string }[],
    additional_info: "",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagsChange = (value: string) => {
    const tags = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleObjectivesChange = (value: string) => {
    const objectives = value
      .split("\n")
      .map((obj) => obj.trim())
      .filter((obj) => obj.length > 0);
    setFormData((prev) => ({ ...prev, objectives }));
  };

  const handleTeamMembersChange = (value: string) => {
    const lines = value.split("\n").filter((line) => line.trim().length > 0);
    const team_members = lines.map((line) => {
      const [name, role] = line.split(":").map((part) => part.trim());
      return { name: name || "", role: role || "" };
    });
    setFormData((prev) => ({ ...prev, team_members }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate required fields
      if (
        !formData.slug ||
        !formData.title ||
        !formData.description ||
        !formData.category ||
        !formData.start_date
      ) {
        throw new Error("Please fill in all required fields");
      }

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
      let normalizedLink: string | undefined = undefined;
      if (formData.link) {
        const result = normalizeUrl(formData.link);
        if (result === false) {
          throw new Error(
            "Please enter a valid URL for the project link (e.g., 'example.com' or 'https://example.com') or leave it empty"
          );
        }
        normalizedLink = result || undefined;
      }

      let normalizedImage: string | undefined = undefined;
      if (formData.image) {
        const result = normalizeUrl(formData.image);
        if (result === false) {
          throw new Error(
            "Please enter a valid URL for the main image (e.g., 'example.com/image.jpg' or 'https://example.com/image.jpg') or leave it empty"
          );
        }
        normalizedImage = result || undefined;
      }

      let normalizedLegacyImage: string | undefined = undefined;
      if (formData.image) {
        const result = normalizeUrl(formData.image);
        if (result === false) {
          throw new Error(
            "Please enter a valid URL for the legacy image (e.g., 'example.com/image.jpg') or leave it empty"
          );
        }
        normalizedLegacyImage = result || undefined;
      }

      // Create slug from title if not provided
      const slug =
        formData.slug ||
        formData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

      await createProject({
        ...formData,
        slug,
        link: normalizedLink,
        image: normalizedImage,
        images: formData.images,
        publications: [],
      });

      router.push("/admin/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Create New Project</h1>
            <p className="text-muted-foreground mt-2">
              Add a new research project to your portfolio
            </p>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <section className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="e.g., NuANCEd"
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => handleInputChange("slug", e.target.value)}
                  placeholder="e.g., nuanced (auto-generated from title)"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty to auto-generate from title
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="description">Short Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Brief description for project cards"
                rows={3}
                required
              />
            </div>

            <div className="mt-4">
              <Label htmlFor="long_description">Detailed Description</Label>
              <ReactQuill
                value={formData.long_description}
                onChange={(val) => handleInputChange("long_description", val)}
                placeholder="Comprehensive project description with HTML support"
              />
            </div>
          </section>

          {/* Project Details */}
          <section className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
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
                  <option value="Quality Improvement">
                    Quality Improvement
                  </option>
                </select>
              </div>
              <div>
                <Label htmlFor="status">Status *</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <Label htmlFor="funding">Funding Source</Label>
                <Input
                  id="funding"
                  value={formData.funding}
                  onChange={(e) => handleInputChange("funding", e.target.value)}
                  placeholder="e.g., AMOSO Opportunities Fund"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="start_date">Start Date *</Label>
                <Input
                  id="start_date"
                  type="date"
                  value={formData.start_date}
                  onChange={(e) =>
                    handleInputChange("start_date", e.target.value)
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="end_date">End Date</Label>
                <Input
                  id="end_date"
                  type="date"
                  value={formData.end_date}
                  onChange={(e) =>
                    handleInputChange("end_date", e.target.value)
                  }
                />
              </div>
            </div>
          </section>

          {/* Media & Links */}
          <section className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Media & Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="image">Main Project Image (Optional)</Label>
                <Input
                  id="image"
                  type="text"
                  value={formData.image}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This will be the primary image displayed for the project.
                  Leave empty if no image is available.
                </p>
              </div>
              <div>
                <Label htmlFor="link">Project Link (Optional)</Label>
                <Input
                  id="link"
                  type="text"
                  value={formData.link}
                  onChange={(e) => handleInputChange("link", e.target.value)}
                  placeholder="https://..."
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Leave empty if no external link is available
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Label htmlFor="image">Legacy Image URL (Optional)</Label>
              <Input
                id="image"
                type="text"
                value={formData.image}
                onChange={(e) => handleInputChange("image", e.target.value)}
                placeholder="/images/project-1.png"
              />
              <p className="text-xs text-muted-foreground mt-1">
                For backward compatibility with existing projects. Leave empty
                if not needed.
              </p>
            </div>
          </section>

          {/* Tags & Objectives */}
          <section className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Tags & Objectives</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags.join(", ")}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="Neuromonitoring, EEG, Seizure Detection"
                />
              </div>
              <div>
                <Label htmlFor="objectives">Objectives (one per line)</Label>
                <Textarea
                  id="objectives"
                  value={formData.objectives.join("\n")}
                  onChange={(e) => handleObjectivesChange(e.target.value)}
                  placeholder="Develop a nurse-led qEEG-based seizure screening program&#10;Reduce time to seizure detection and treatment"
                  rows={4}
                />
              </div>
            </div>
          </section>

          {/* Team Members */}
          <section className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Team Members</h2>
            <div>
              <Label htmlFor="team_members">
                Team Members (Name: Role, one per line)
              </Label>
              <Textarea
                id="team_members"
                value={formData.team_members
                  .map((member) => `${member.name}: ${member.role}`)
                  .join("\n")}
                onChange={(e) => handleTeamMembersChange(e.target.value)}
                placeholder="Dr. Ganesan: Principal Investigator&#10;LHSC Team: Clinical Partners"
                rows={4}
              />
            </div>
          </section>

          {/* Additional Information */}
          <section className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Additional Information
            </h2>
            <div>
              <Label htmlFor="additional_info">Additional Information</Label>
              <ReactQuill
                value={formData.additional_info}
                onChange={(val) => handleInputChange("additional_info", val)}
                placeholder="Any additional details about the project"
              />
            </div>
          </section>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
