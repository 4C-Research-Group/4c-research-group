"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function TestAdminPage() {
  const { user, loading } = useAuth();
  const [adminStatus, setAdminStatus] = useState<string>("Checking...");
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        try {
          console.log("🔍 Checking admin status for user:", user.id);
          const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
          );

          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id)
            .single();

          console.log("📊 User data:", data);
          console.log("❌ Error:", error);

          if (error) {
            setAdminStatus(`Error: ${error.message}`);
          } else if (data) {
            setUserData(data);
            setAdminStatus(
              `Role: ${data.role} (${data.role === "admin" ? "ADMIN" : "USER"})`
            );
          } else {
            setAdminStatus("No user data found");
          }
        } catch (err) {
          console.error("💥 Error checking admin status:", err);
          setAdminStatus(`Exception: ${err}`);
        }
      } else {
        setAdminStatus("No user logged in");
      }
    };

    if (!loading) {
      checkAdminStatus();
    }
  }, [user, loading]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Test Page</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Authentication Status
            </h2>
            <p>
              <strong>Loading:</strong> {loading ? "Yes" : "No"}
            </p>
            <p>
              <strong>User:</strong> {user ? user.email : "None"}
            </p>
            <p>
              <strong>User ID:</strong> {user?.id || "None"}
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Admin Status</h2>
            <p className="text-lg">{adminStatus}</p>
          </div>

          {userData && (
            <div>
              <h2 className="text-lg font-semibold mb-2">User Data</h2>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(userData, null, 2)}
              </pre>
            </div>
          )}

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
            <div className="flex gap-4">
              <button
                onClick={() => (window.location.href = "/admin")}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Go to Admin Dashboard
              </button>
              <button
                onClick={() => (window.location.href = "/dashboard")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Go to User Dashboard
              </button>
              <button
                onClick={() => (window.location.href = "/login")}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
