import { createClient as createClientClient } from "@/lib/supabase/client";
import { createClient as createServerClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

export async function isUserAdmin(user: User | null): Promise<boolean> {
  if (!user) return false;

  try {
    // Try server client first, fallback to client
    const supabase =
      typeof window === "undefined"
        ? createServerClient()
        : createClientClient();

    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    return !error && data?.role === "admin";
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}
