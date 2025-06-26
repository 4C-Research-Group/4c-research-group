"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export default function TestLoginPage() {
  const [status, setStatus] = useState<string>("Ready");
  const [result, setResult] = useState<any>(null);

  const testDirectAuth = async () => {
    setStatus("Testing direct authentication...");
    setResult(null);

    try {
      console.log("🧪 Starting direct auth test...");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const startTime = Date.now();
      console.log("🔐 Calling signInWithPassword...");

      // Add timeout to prevent hanging
      const authPromise = supabase.auth.signInWithPassword({
        email: "admin@example.com",
        password: "admin123",
      });

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Authentication timeout after 10 seconds")),
          10000
        );
      });

      const { data, error } = (await Promise.race([
        authPromise,
        timeoutPromise,
      ])) as any;

      const endTime = Date.now();
      console.log(`⏱️ Auth call took ${endTime - startTime}ms`);

      if (error) {
        console.error("❌ Auth error:", error);
        setStatus(`Error: ${error.message}`);
        setResult({ error: error.message });
      } else {
        console.log("✅ Auth successful:", data);
        setStatus("Authentication successful!");
        setResult(data);
      }
    } catch (err) {
      console.error("💥 Exception:", err);
      setStatus(`Exception: ${err}`);
      setResult({ exception: err });
    }
  };

  const testFreshClient = async () => {
    setStatus("Testing with fresh client...");
    setResult(null);

    try {
      console.log("🧪 Testing with fresh Supabase client...");

      // Create a fresh client instance
      const freshSupabase = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const startTime = Date.now();
      console.log("🔐 Calling signInWithPassword with fresh client...");

      const { data, error } = await freshSupabase.auth.signInWithPassword({
        email: "admin@example.com",
        password: "admin123",
      });

      const endTime = Date.now();
      console.log(`⏱️ Fresh client auth call took ${endTime - startTime}ms`);

      if (error) {
        console.error("❌ Fresh client auth error:", error);
        setStatus(`Fresh client error: ${error.message}`);
        setResult({ error: error.message });
      } else {
        console.log("✅ Fresh client auth successful:", data);
        setStatus("Fresh client authentication successful!");
        setResult(data);
      }
    } catch (err) {
      console.error("💥 Fresh client exception:", err);
      setStatus(`Fresh client exception: ${err}`);
      setResult({ exception: err });
    }
  };

  const testRoleQuery = async () => {
    if (!result?.user?.id) {
      setStatus("Please authenticate first");
      return;
    }

    setStatus("Testing role query...");

    try {
      console.log("🔍 Testing role query...");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", result.user.id)
        .single();

      if (error) {
        console.error("❌ Role query error:", error);
        setStatus(`Role query error: ${error.message}`);
      } else {
        console.log("✅ Role query successful:", data);
        setStatus(`Role query successful: ${data.role}`);
      }
    } catch (err) {
      console.error("💥 Role query exception:", err);
      setStatus(`Role query exception: ${err}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Direct Auth Test</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Status</h2>
            <p className="text-lg">{status}</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={testDirectAuth}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Test Direct Authentication
            </button>

            <button
              onClick={testFreshClient}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 ml-2"
            >
              Test Fresh Client Authentication
            </button>

            <button
              onClick={testRoleQuery}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 ml-2"
            >
              Test Role Query
            </button>
          </div>

          {result && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Result</h2>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
