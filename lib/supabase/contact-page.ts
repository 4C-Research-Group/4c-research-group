import { supabase } from "./client";
import type { ContactPage } from "@/lib/types/contact-page";

export async function getContactPage(): Promise<ContactPage | null> {
  const { data, error } = await supabase
    .from("contact_page")
    .select("*")
    .limit(1)
    .single();
  if (error) {
    console.error("Error fetching contact page:", error);
    return null;
  }
  return data as ContactPage;
}

export async function updateContactPage(
  updates: Partial<Omit<ContactPage, "id" | "updated_at">>
): Promise<ContactPage | null> {
  // Only update the first row (single-row table pattern)
  const { data, error } = await supabase
    .from("contact_page")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .order("updated_at", { ascending: false })
    .limit(1)
    .select("*")
    .single();
  if (error) {
    console.error("Error updating contact page:", error);
    return null;
  }
  return data as ContactPage;
}
