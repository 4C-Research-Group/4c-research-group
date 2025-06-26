"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function TestAuthPage() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [envVars, setEnvVars] = useState<{
    url: string | undefined;
    anonKey: string | undefined;
  }>({ url: undefined, anonKey: undefined });
  const [authState, setAuthState] = useState<any>(null);

  useEffect(() => {
    // Get environment variables
    setEnvVars({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });

    // Test Supabase client
    const testSupabase = async () => {
      const supabase = createClientComponentClient();
      const { data, error } = await supabase.auth.getSession();
      setAuthState({
        session: data.session,
        error: error?.message,
      });
    };

    testSupabase();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
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
          {JSON.stringify(authState, null, 2)}
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
