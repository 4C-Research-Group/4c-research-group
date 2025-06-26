// lib/supabase/client.ts
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

// Ensure we only create one instance
let supabaseInstance: ReturnType<typeof createPagesBrowserClient> | null = null;

export const supabase = (() => {
  if (!supabaseInstance) {
    supabaseInstance = createPagesBrowserClient();
  }
  return supabaseInstance;
})();
