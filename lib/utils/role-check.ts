import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export async function isUserAdmin(user: User | null): Promise<boolean> {
  if (!user) return false;

  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  return !error && data?.role === "admin";
}
