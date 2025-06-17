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
      <div className="flex items-center gap-4">
        {user.role === "admin" && (
          <Link
            href="/admin"
            className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
          >
            Admin
          </Link>
        )}
        <button
          onClick={() => signOut()}
          className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/login"
        className="px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Sign Up
      </Link>
    </div>
  );
}
