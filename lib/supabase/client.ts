// lib/supabase/client.ts
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "./database.types";

// Ensure we only create one instance
let supabaseInstance: ReturnType<typeof createBrowserClient<Database>> | null = null;

// Client-side Supabase client for browser usage
export const supabase = (() => {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error(
        "Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_KEY"
      );
    }

    supabaseInstance = createBrowserClient<Database>(
      supabaseUrl,
      supabaseKey
    );
  }
  return supabaseInstance;
})();

// Server-side Supabase client for admin operations (use in API routes)
export const createServerClient = () => {
  if (typeof window !== "undefined") {
    throw new Error("This function should only be used in server-side code");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      "Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_KEY"
    );
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseServiceKey);
};
