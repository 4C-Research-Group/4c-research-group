// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./database.types";

// Ensure we only create one instance
let supabaseInstance: ReturnType<typeof createBrowserClient<Database>> | null = null;

export const supabase = (() => {
  if (!supabaseInstance) {
    supabaseInstance = createBrowserClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            "Content-Type": "application/json",
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
          },
        },
      }
    );
  }
  return supabaseInstance;
})();
