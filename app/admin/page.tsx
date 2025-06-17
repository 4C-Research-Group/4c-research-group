"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/admin");
    }
    // Check if user is admin (you'll need to implement this logic)
    // For now, we'll just check if user exists
    if (user) {
      // TODO: Implement proper admin check
      setIsAdmin(true);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        <Link href="/" className="mt-4 text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Pages"
          description="Manage website pages"
          href="/admin/pages"
          icon="📄"
        />
        <DashboardCard
          title="Users"
          description="Manage user accounts and permissions"
          href="/admin/users"
          icon="👥"
        />
        <DashboardCard
          title="Content"
          description="Edit website content"
          href="/admin/content"
          icon="✏️"
        />
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="p-6 border rounded-lg hover:shadow-md transition-shadow duration-200 block"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}
