"use client";

import { useAuth } from "@/components/providers/auth-provider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function NavAuthButtons() {
  const { user, signOut, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const { data } = await fetch("/api/check-admin").then((res) =>
          res.json()
        );
        setIsAdmin(data?.isAdmin || false);
      }
    };
    checkAdminStatus();
  }, [user]);

  if (loading) {
    return (
      <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
    );
  }

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link
            href="/admin"
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            Admin
          </Link>
        )}
        <button
          onClick={handleSignOut}
          className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cognition-600 to-consciousness-600 rounded-lg hover:opacity-90 transition-opacity duration-200"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-cognition-600 dark:hover:text-cognition-400 transition-colors duration-200"
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cognition-600 to-consciousness-600 rounded-lg hover:opacity-90 transition-opacity duration-200"
      >
        Sign up
      </Link>
    </div>
  );
}
