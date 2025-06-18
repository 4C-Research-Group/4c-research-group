"use client";

import { useAuth } from "@/components/providers/auth-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavAuthButtons() {
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        {user.role === "admin" && (
          <Link
            href="/admin"
            className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            Admin
          </Link>
        )}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cognition-600 to-consciousness-600 rounded-lg opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
          <button
            onClick={() => signOut()}
            className="relative px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cognition-600 to-consciousness-600 rounded-lg hover:opacity-90 transition-opacity duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      >
        Login
      </Link>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cognition-600 to-consciousness-600 rounded-lg opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
        <Link
          href="/signup"
          className="relative px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cognition-600 to-consciousness-600 rounded-lg hover:opacity-90 transition-opacity duration-200"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
