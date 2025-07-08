"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/ui/rich-text-editor";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

export default function EditResearchProjectPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<any>(null);

  // Form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [funding, setFunding] = useState("");
  const [link, setLink] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [objectives, setObjectives] = useState<string[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !data) {
        setError("Project not found.");
        setLoading(false);
        return;
      }

      setProject(data);
      setTitle(data.title || "");
      setDescription(data.description || "");
      setLongDescription(data.long_description || "");
      setCategory(data.category || "");
      setStatus(data.status || "");
      setStartDate(data.start_date || "");
      setEndDate(data.end_date || "");
      setFunding(data.funding || "");
      setLink(data.link || "");
      setImages(data.images || []);
      setTags(data.tags || []);
      setObjectives(data.objectives || []);
      setTeamMembers(data.team_members || []);
      setLoading(false);
    }

    if (slug) fetchProject();
  }, [slug]);

  const addObjective = () => {
    setObjectives([...objectives, ""]);
  };

  const updateObjective = (index: number, value: string) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    setObjectives(newObjectives);
  };

  const removeObjective = (index: number) => {
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", role: "" }]);
  };

  const updateTeamMember = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    const newTeamMembers = [...teamMembers];
    newTeamMembers[index] = { ...newTeamMembers[index], [field]: value };
    setTeamMembers(newTeamMembers);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const addTag = () => {
    setTags([...tags, ""]);
  };

  const updateTag = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

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

    const updateData = {
      title,
      description,
      long_description: longDescription,
      category,
      status,
      start_date: startDate,
      end_date: endDate || null, // Convert empty string to null
      funding: funding || null,
      link: link || null,
      images: images.filter((img) => img.trim() !== ""),
      tags: tags.filter((tag) => tag.trim() !== ""),
      objectives: objectives.filter((obj) => obj.trim() !== ""),
      team_members: teamMembers.filter(
        (member) => member.name.trim() !== "" && member.role.trim() !== ""
      ),
    };

    const { error } = await supabase
      .from("projects")
      .update(updateData)
      .eq("slug", slug);

    setSaving(false);
    if (error) {
      setError("Failed to save changes: " + error.message);
    } else {
      router.push("/admin/projects");
    }
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">
        Edit Research Project: {project?.title}
      </h1>

      <form
        onSubmit={handleSave}
        className="space-y-8 bg-white dark:bg-gray-900 p-8 rounded-xl shadow"
      >
        {/* Basic Information */}
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
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <RichTextEditor
            value={longDescription}
            onChange={setLongDescription}
            placeholder="Comprehensive project description with rich formatting"
            label="Long Description"
          />
        </div>

        {/* Status and Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>
          <div>
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Funding and Link */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="funding">Funding</Label>
            <Input
              id="funding"
              value={funding}
              onChange={(e) => setFunding(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="link">Project Link</Label>
            <Input
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>
        </div>

        {/* Objectives */}
        <div>
          <Label>Research Objectives</Label>
          <div className="space-y-2">
            {objectives.map((objective, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={objective}
                  onChange={(e) => updateObjective(index, e.target.value)}
                  placeholder="Enter objective"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeObjective(index)}
                  className="px-3"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addObjective}>
              Add Objective
            </Button>
          </div>
        </div>

        {/* Team Members */}
        <div>
          <Label>Team Members</Label>
          <div className="space-y-4">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-2 gap-2"
              >
                <Input
                  value={member.name}
                  onChange={(e) =>
                    updateTeamMember(index, "name", e.target.value)
                  }
                  placeholder="Name"
                />
                <div className="flex gap-2">
                  <Input
                    value={member.role}
                    onChange={(e) =>
                      updateTeamMember(index, "role", e.target.value)
                    }
                    placeholder="Role"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeTeamMember(index)}
                    className="px-3"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addTeamMember}>
              Add Team Member
            </Button>
          </div>
        </div>

        {/* Tags */}
        <div>
          <Label>Tags</Label>
          <div className="space-y-2">
            {tags.map((tag, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={tag}
                  onChange={(e) => updateTag(index, e.target.value)}
                  placeholder="Enter tag"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => removeTag(index)}
                  className="px-3"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addTag}>
              Add Tag
            </Button>
          </div>
        </div>

        {error && <div className="text-red-600">{error}</div>}

        <div className="flex gap-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/projects")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
