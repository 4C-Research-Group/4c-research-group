"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { AboutPI } from "@/lib/types/about-pi";

export async function updateAboutPIAdmin(
  updates: Partial<Omit<AboutPI, "id" | "updated_at">>
) {
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

  // Update the about_pi table
  const { data, error } = await supabaseAdmin
    .from("about_pi")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .order("updated_at", { ascending: false })
    .limit(1)
    .select("*")
    .single();

  if (error) {
    console.error("Error updating about PI:", error);
    throw new Error("Failed to update about PI data");
  }

  revalidatePath("/about-pi");
  return data as AboutPI;
}

export async function getAboutPIAdmin() {
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

  const { data, error } = await supabaseAdmin
    .from("about_pi")
    .select("*")
    .limit(1)
    .single();

  if (error) {
    console.error("Error fetching about PI:", error);
    return null;
  }

  return data as AboutPI;
}
