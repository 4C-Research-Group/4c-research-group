"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function TestAdminPage() {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is authenticated
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError || !authUser) {
          setError("Not authenticated");
          setLoading(false);
          return;
        }

        setUser(authUser);

        // Check user role
        const { data: userData, error: roleError } = await supabase
          .from("users")
          .select("role")
          .eq("id", authUser.id)
          .single();

        if (roleError) {
          setError("Error checking user role");
          setLoading(false);
          return;
        }

        setUserRole(userData.role);
        setLoading(false);
      } catch (err) {
        setError("Unexpected error");
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

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
            <p className="text-lg">
              {userRole
                ? `Role: ${userRole} (${userRole === "admin" ? "ADMIN" : "USER"})`
                : error || "Checking..."}
            </p>
          </div>

          {user && (
            <div>
              <h2 className="text-lg font-semibold mb-2">User Data</h2>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(user, null, 2)}
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
