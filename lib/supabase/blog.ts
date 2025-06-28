import { supabase } from "./client";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  created_at: string;
  updated_at: string;
  read_time: string;
  image_url: string;
  tags: string[];
  featured: boolean;
  author_name: string;
  author_role: string;
  author_image_url: string;
};

export async function getAllBlogPosts() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }

  return data as BlogPost[];
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return data as BlogPost | null;
}

export async function getFeaturedPosts() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching featured posts:", error);
    return [];
  }

  return data as BlogPost[];
}

export async function getPostsByCategory(category: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching posts for category ${category}:`, error);
    return [];
  }

  return data as BlogPost[];
}

export async function getCategories() {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("category")
    .not("category", "is", null);

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  // Get unique categories
  const categories = [
    ...new Set((data ?? []).map((item: { category: string }) => item.category)),
  ];
  return categories as string[];
}
