"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardFooter } from "@/components/ui/card";
import { Eye, Edit } from "lucide-react";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
      } else {
        setProject(data);
        setTitle(data.title || "");
        setDescription(data.description || "");
      }
      setLoading(false);
    }
    if (projectId) fetchProject();
  }, [projectId]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const { error } = await supabase
      .from("projects")
      .update({ title, description })
      .eq("id", projectId);
    setSaving(false);
    if (error) {
      setError("Failed to save changes.");
    } else {
      router.push("/admin/projects");
    }
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Edit Project</h1>
      <form
        onSubmit={handleSave}
        className="space-y-6 bg-white dark:bg-gray-900 p-8 rounded-xl shadow"
      >
        <div>
          <label className="block font-medium mb-2">Title</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-2">Description</label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[120px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
      <CardFooter className="pt-3 gap-2">
        <Link
          href={`/research/${project.slug}`}
          className="flex-1"
          target="_blank"
        >
          <Button variant="outline" className="w-full">
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
        </Link>
        <Link href={`/admin/projects/edit/${project.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </Link>
        <Link href={`/admin/research/edit/${project.slug}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            <Edit className="h-4 w-4 mr-2" />
            Edit Research Page
          </Button>
        </Link>
      </CardFooter>
    </div>
  );
}
