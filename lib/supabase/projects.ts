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
  console.log("createProject called with:", project);

  const { data, error } = await supabase
    .from("projects")
    .insert(project)
    .select()
    .single();

  if (error) {
    console.error("Supabase error creating project:", error);
    console.error("Error details:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    });
    throw error;
  }

  console.log("Project created successfully:", data);
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
  console.log(`Starting deletion of project with ID: ${id}`);

  // First, get the project to access its images
  const { data: project, error: fetchError } = await supabase
    .from("projects")
    .select("image, images")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error("Error fetching project for deletion:", fetchError);
    throw fetchError;
  }

  console.log("Project data retrieved:", project);

  // Delete images from storage if they exist
  if (project) {
    const imagesToDelete: string[] = [];

    // Add main image if it exists
    if (project.image) {
      console.log("Found main image:", project.image);
      imagesToDelete.push(project.image);
    }

    // Add additional images if they exist
    if (project.images && Array.isArray(project.images)) {
      console.log("Found additional images:", project.images);
      imagesToDelete.push(...project.images);
    }

    console.log(`Total images to delete: ${imagesToDelete.length}`);

    // Delete each image from storage using generalized logic
    for (const imageUrl of imagesToDelete) {
      try {
        console.log(`Processing image URL: ${imageUrl}`);
        let filePath = null;

        // Extract file path from projects bucket URL
        if (imageUrl.includes("/storage/v1/object/public/")) {
          // Method 1: Extract after /storage/v1/object/public/
          const parts = imageUrl.split("/storage/v1/object/public/");
          if (parts.length > 1) {
            const fullPath = parts[1];
            console.log(`Extracted full path: ${fullPath}`);
            // For projects bucket, the path is just the filename (no subfolder)
            if (fullPath.startsWith("projects/")) {
              filePath = fullPath.substring(9); // Remove "projects/" prefix
              console.log(`Removed projects/ prefix, final path: ${filePath}`);
            } else {
              filePath = fullPath;
              console.log(`Using full path: ${filePath}`);
            }
          }
        } else if (imageUrl.includes("/projects/")) {
          // Method 2: Extract after /projects/
          filePath = imageUrl.split("/projects/")[1];
          console.log(`Extracted path using /projects/ method: ${filePath}`);
        } else if (imageUrl.includes("supabase.co")) {
          // Method 3: Extract everything after the domain
          const urlParts = imageUrl.split("supabase.co");
          if (urlParts.length > 1) {
            const pathPart = urlParts[1];
            // Remove leading slash and extract bucket/path
            const cleanPath = pathPart.startsWith("/")
              ? pathPart.substring(1)
              : pathPart;
            if (cleanPath.includes("/")) {
              const pathSegments = cleanPath.split("/");
              // Remove bucket name and join the rest
              filePath = pathSegments.slice(2).join("/");
              console.log(
                `Extracted path using supabase.co method: ${filePath}`
              );
            }
          }
        } else {
          // Method 4: Try to extract filename
          const urlParts = imageUrl.split("/");
          const fileName = urlParts[urlParts.length - 1];
          if (fileName && fileName.includes(".")) {
            filePath = fileName;
            console.log(`Extracted path using filename method: ${filePath}`);
          }
        }

        if (filePath) {
          console.log(`Attempting to delete image with path: ${filePath}`);
          console.log(`Using bucket: projects`);
          console.log(
            `Calling supabase.storage.from("projects").remove([${filePath}])`
          );

          const { error: deleteError } = await supabase.storage
            .from("projects")
            .remove([filePath]);

          if (deleteError) {
            console.error(`Failed to delete image ${filePath}:`, deleteError);
            console.error("Delete error details:", {
              name: deleteError.name,
              message: deleteError.message,
              // Only include properties that exist on StorageError
              ...(deleteError as any).statusCode && { statusCode: (deleteError as any).statusCode },
              ...(deleteError as any).error && { error: (deleteError as any).error },
            });
            // Continue with other deletions even if one fails
          } else {
            console.log(`Successfully deleted image: ${filePath}`);
          }
        } else {
          console.warn(`Could not extract file path from URL: ${imageUrl}`);
        }
      } catch (error) {
        console.error(`Error deleting image ${imageUrl}:`, error);
        // Continue with other deletions even if one fails
      }
    }
  }

  console.log("Deleting project record from database...");
  // Delete the project record from database
  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) {
    console.error("Error deleting project:", error);
    throw error;
  }

  console.log("Project deletion completed successfully");
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
