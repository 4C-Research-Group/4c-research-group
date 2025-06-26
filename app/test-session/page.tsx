"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function TestSession() {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      console.log("🔍 Checking session...");

      // Check session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      console.log("Session:", session);
      console.log("Session error:", sessionError);
      setSession(session);

      // Check user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      console.log("User:", user);
      console.log("User error:", userError);
      setUser(user);

      setLoading(false);
    }

    checkSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change:", event, session);
      setSession(session);
      setUser(session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Session Test</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Session:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(session, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold">User:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Status:</h2>
          <p>{session ? "✅ Session exists" : "❌ No session"}</p>
          <p>{user ? "✅ User authenticated" : "❌ No user"}</p>
        </div>

        <button
          onClick={() => supabase.auth.signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
