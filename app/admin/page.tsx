"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Welcome, {user.email}</h2>
        <p className="text-gray-600">
          You have successfully accessed the admin dashboard.
        </p>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/admin/pages"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors block"
            >
              <h4 className="font-medium">Manage Pages</h4>
              <p className="text-sm text-gray-500">
                View and edit website pages
              </p>
            </a>
            <a
              href="/admin/users"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors block"
            >
              <h4 className="font-medium">Manage Users</h4>
              <p className="text-sm text-gray-500">
                View and manage user accounts
              </p>
            </a>
            <a
              href="/admin/settings"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors block"
            >
              <h4 className="font-medium">Site Settings</h4>
              <p className="text-sm text-gray-500">
                Configure site preferences
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
