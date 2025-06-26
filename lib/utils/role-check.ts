import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";

export async function isUserAdmin(user: User | null): Promise<boolean> {
  if (!user) return false;

  try {
    // Use client component client for role checking
    const supabase = createClientComponentClient();

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
