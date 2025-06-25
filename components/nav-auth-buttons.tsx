"use client";

import { useAuth } from "@/components/providers/auth-provider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NavAuthButtonsProps {
  className?: string;
  onClick?: () => void;
}

export function NavAuthButtons({ className, onClick }: NavAuthButtonsProps) {
  const { user, signOut, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Don't show anything on auth pages
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  // Show user menu if logged in
  if (user) {
    return (
      <div className={`flex items-center gap-4 ${className || ""}`}>
        {user.role === "admin" && (
          <Link
            href="/admin"
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            onClick={onClick}
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

  // Show login/signup buttons if not logged in
  return (
    <div className={`flex items-center gap-3 ${className || ""}`}>
      <Link
        href="/login"
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
          router.push("/login");
        }}
        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-cognition-600 dark:hover:text-cognition-400 transition-colors duration-200"
      >
        Log in
      </Link>
      <Link
        href="/signup"
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
          router.push("/signup");
        }}
        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cognition-600 to-consciousness-600 rounded-lg hover:opacity-90 transition-opacity duration-200"
      >
        Sign up
      </Link>
    </div>
  );
}
