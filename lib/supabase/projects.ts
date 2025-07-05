import { supabase } from "@/lib/supabase/client";

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  long_description?: string;
  category: string;
  status: "active" | "completed" | "upcoming";
  start_date: string;
  end_date?: string;
  image?: string;
  images?: string[];
  tags?: string[];
  link?: string;
  funding?: string;
  objectives?: string[];
  team_members?: { name: string; role: string }[];
  publications?: { title: string; link: string; date: string }[];
  additional_info?: string;
  created_at: string;
  updated_at: string;
}

// Client-side functions (work in both client and server components)
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return [];
  }

  console.log("Fetched projects from database:", data);
  return (data as unknown as Project[]) || [];
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching project:", error);
    return null;
  }

  return data;
}

export async function createProject(
  project: Omit<Project, "id" | "created_at" | "updated_at">
) {
  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    throw error;
  }

  return data;
}

export async function updateProject(id: string, updates: Partial<Project>) {
  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating project:", error);
    throw error;
  }

  return data;
}

export async function deleteProject(id: string) {
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}

export async function getProjectCategories() {
  const { data, error } = await supabase
    .from("projects")
    .select("category")
    .order("category");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  const categories = [
    ...new Set((data ?? []).map((p: { category: string }) => p.category)),
  ];
  return categories;
}
