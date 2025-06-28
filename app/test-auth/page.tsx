"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";

export default function TestAuthPage() {
  const router = useRouter();
  const [envVars, setEnvVars] = useState<{
    url: string | undefined;
    anonKey: string | undefined;
  }>({ url: undefined, anonKey: undefined });
  const [user, setUser] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get environment variables
    setEnvVars({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });

    const getSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Error getting session:", error);
        } else {
          setSession(session);
          setUser(session?.user || null);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event: string, session: Session | null) => {
        console.log("Auth state changed:", event, session);
        setSession(session);
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.refresh(); // Refresh the page to update the UI
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Auth Test Page</h1>

      {/* Sign Out Button - Only show when user is signed in */}
      {user && (
        <div className="mb-6 flex justify-end">
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      )}

      <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Environment Variables</h2>
        <pre className="bg-black dark:bg-gray-900 text-white p-4 rounded overflow-x-auto">
          {JSON.stringify(envVars, null, 2)}
        </pre>
      </div>

      <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Auth State</h2>
        <pre className="bg-black dark:bg-gray-900 text-white p-4 rounded overflow-x-auto">
          {JSON.stringify({ session, user }, null, 2)}
        </pre>
      </div>

      <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">User from Auth Provider</h2>
        <div className="mb-4">
          <span className="font-medium">Status:</span>{" "}
          {loading ? "Loading..." : "Ready"}
        </div>
        <div className="mb-4">
          <span className="font-medium">Authenticated:</span>{" "}
          {user ? "Yes" : "No"}
        </div>
        <pre className="bg-black dark:bg-gray-900 text-white p-4 rounded overflow-x-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}
