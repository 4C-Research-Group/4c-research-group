// lib/supabase/admin/blog.ts
"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createBlogPost(formData: FormData) {
  const supabase = createServerComponentClient({ cookies });

  // Check if user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: userRecord, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("id", user?.id)
    .eq("role", "admin")
    .single();

  if (userError || !userRecord) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      read_time: formData.get("read_time") as string,
      image_url: formData.get("image_url") as string,
      tags: (formData.get("tags") as string)
        ?.split(",")
        .map((tag) => tag.trim()),
      featured: formData.get("featured") === "on",
      author_name: formData.get("author_name") as string,
      author_role: formData.get("author_role") as string,
      author_image_url: formData.get("author_image_url") as string,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }

  revalidatePath("/4c-blogs");
  revalidatePath(`/4c-blogs/${data.slug}`);

  return data;
}

export async function updateBlogPost(postId: string, formData: FormData) {
  const supabase = createServerComponentClient({ cookies });

  // Check if user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: userRecord, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("id", user?.id)
    .eq("role", "admin")
    .single();

  if (userError || !userRecord) {
    throw new Error("Unauthorized");
  }

  // Optionally, only allow the admin who created the post to edit it
  // const { data: post } = await supabase
  //   .from("blog_posts")
  //   .select("author_id")
  //   .eq("id", postId)
  //   .single();
  // if (post && post.author_id !== user.id) {
  //   throw new Error("You can only edit your own posts.");
  // }

  const { data, error } = await supabase
    .from("blog_posts")
    .update({
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      read_time: formData.get("read_time") as string,
      image_url: formData.get("image_url") as string,
      tags: (formData.get("tags") as string)
        ?.split(",")
        .map((tag) => tag.trim()),
      featured: formData.get("featured") === "on",
      author_name: formData.get("author_name") as string,
      author_role: formData.get("author_role") as string,
      author_image_url: formData.get("author_image_url") as string,
      updated_at: new Date().toISOString(),
    })
    .eq("id", postId)
    .select()
    .single();

  if (error) {
    console.error("Error updating blog post:", error);
    throw error;
  }

  revalidatePath("/4c-blogs");
  revalidatePath(`/4c-blogs/${data.slug}`);

  return data;
}

export async function getBlogPostById(postId: string) {
  const supabase = createServerComponentClient({ cookies });

  // Check if user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: userRecord, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("id", user?.id)
    .eq("role", "admin")
    .single();

  if (userError || !userRecord) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }

  return data;
}
