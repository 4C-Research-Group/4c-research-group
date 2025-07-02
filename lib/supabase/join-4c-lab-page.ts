import { supabase } from "./client";
import type { Join4CLabPage } from "@/lib/types/join-4c-lab-page";

export async function getJoin4CLabPage(): Promise<Join4CLabPage | null> {
  const { data, error } = await supabase
    .from("join_4c_lab_page")
    .select("*")
    .limit(1)
    .single();
  if (error) {
    console.error("Error fetching join 4c lab page:", error);
    return null;
  }
  return data as Join4CLabPage;
}

export async function updateJoin4CLabPage(
  updates: Partial<Omit<Join4CLabPage, "id" | "updated_at">>
): Promise<Join4CLabPage | null> {
  // Only update the first row (single-row table pattern)
  const { data, error } = await supabase
    .from("join_4c_lab_page")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .order("updated_at", { ascending: false })
    .limit(1)
    .select("*")
    .single();
  if (error) {
    console.error("Error updating join 4c lab page:", error);
    return null;
  }
  return data as Join4CLabPage;
}
