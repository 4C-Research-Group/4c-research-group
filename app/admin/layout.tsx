"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
    // TODO: Implement proper admin check
    if (user) {
      setIsAdmin(true);
    }
  }, [user, loading, router, pathname]);

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
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="p-4 space-y-2">
          <NavItem href="/admin" icon="🏠" active={pathname === "/admin"}>
            Dashboard
          </NavItem>
          <NavItem
            href="/admin/pages"
            icon="📄"
            active={pathname.startsWith("/admin/pages")}
          >
            Pages
          </NavItem>
          <NavItem
            href="/admin/content"
            icon="✏️"
            active={pathname.startsWith("/admin/content")}
          >
            Content
          </NavItem>
          <NavItem
            href="/admin/users"
            icon="👥"
            active={pathname.startsWith("/admin/users")}
          >
            Users
          </NavItem>
          <button
            onClick={() => signOut()}
            className="flex items-center w-full p-2 rounded-md text-left text-red-600 hover:bg-red-50"
          >
            <span className="mr-2">🚪</span>
            Sign Out
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  children,
  active,
}: {
  href: string;
  icon: string;
  children: React.ReactNode;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center p-2 rounded-md ${active ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"}`}
    >
      <span className="mr-2">{icon}</span>
      {children}
    </Link>
  );
}
