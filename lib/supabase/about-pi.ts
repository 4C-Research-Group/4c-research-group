import { supabase } from "./client";
import type { AboutPI } from "@/lib/types/about-pi";

export async function getAboutPI(): Promise<AboutPI | null> {
  const { data, error } = await supabase
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

export async function updateAboutPI(
  updates: Partial<Omit<AboutPI, "id" | "updated_at">>
): Promise<AboutPI | null> {
  // Only update the first row (single-row table pattern)
  const { data, error } = await supabase
    .from("about_pi")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .order("updated_at", { ascending: false })
    .limit(1)
    .select("*")
    .single();

  if (error) {
    console.error("Error updating about PI:", error);
    return null;
  }

  return data as AboutPI;
}
