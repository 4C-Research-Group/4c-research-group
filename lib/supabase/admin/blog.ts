// lib/supabase/admin/blog.ts
"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function createBlogPost(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // Create service role client for admin operations
  const supabaseAdmin = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // Check if user is admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const { data: userData } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (userData?.role !== "admin") {
    throw new Error("Not authorized");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const excerpt = formData.get("excerpt") as string;
  const image_url = formData.get("image_url") as string;
  const tags = formData.get("tags") as string;
  const category = formData.get("category") as string;
  const read_time = formData.get("read_time") as string;
  const author_name = formData.get("author_name") as string;
  const author_role = formData.get("author_role") as string;
  const author_image_url = formData.get("author_image_url") as string;

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  const { data, error } = await supabaseAdmin.from("blog_posts").insert({
    title,
    content,
    excerpt,
    image_url,
    tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    category: category || "General",
    read_time: read_time || "5 min read",
    featured: false,
    author_name: author_name || "Admin User",
    author_role: author_role || "Administrator",
    author_image_url: author_image_url || "",
  });

  if (error) {
    console.error("Error creating blog post:", error);
    throw new Error("Failed to create blog post");
  }

  revalidatePath("/4c-blogs");
  return data;
}

export async function updateBlogPost(postId: string, formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // Create service role client for admin operations
  const supabaseAdmin = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

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

  const { data, error } = await supabaseAdmin
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
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // Create service role client for admin operations
  const supabaseAdmin = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

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

  const { data, error } = await supabaseAdmin
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

export async function deleteBlogPost(postId: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  // Create service role client for admin operations
  const supabaseAdmin = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

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

  const { error } = await supabaseAdmin
    .from("blog_posts")
    .delete()
    .eq("id", postId);

  if (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }

  revalidatePath("/4c-blogs");
  revalidatePath("/admin");
}
