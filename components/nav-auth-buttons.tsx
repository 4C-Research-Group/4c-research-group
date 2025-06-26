"use client";

import { useAuth } from "@/components/providers/auth-provider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserAvatar } from "@/components/user-avatar";
import { useEffect, useState, useCallback } from "react";

interface NavAuthButtonsProps {
  className?: string;
  onClick?: () => void;
}

// Custom hook for admin redirection
function useAdminRedirect() {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (user?.role === "admin" && !pathname.startsWith("/admin")) {
      router.push("/admin");
    }
  }, [user, pathname, router]);
}

export function NavAuthButtons({
  className = "",
  onClick,
}: NavAuthButtonsProps) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  // Use the custom hook for admin redirection
  useAdminRedirect();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't show anything on auth pages
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  // Show loading state only on initial load
  if (!isMounted) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        <div className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
      </div>
    );
  }

  // Show user menu if logged in
  if (user) {
    // If admin, show admin link and sign out button
    if (user.role === "admin") {
      return (
        <div className={`flex items-center gap-3 ${className}`}>
          <UserAvatar />
          <Link
            href="/admin"
            onClick={onClick}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cognition-600 to-consciousness-600 rounded-lg hover:opacity-90 transition-opacity duration-200"
          >
            Admin Dashboard
          </Link>
          <button
            onClick={async (e) => {
              await signOut();
              onClick?.();
              router.push("/");
              router.refresh();
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      );
    }

    // Regular user view
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <UserAvatar />
        <button
          onClick={async (e) => {
            await signOut();
            onClick?.();
            router.push("/");
            router.refresh();
          }}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          Sign Out
        </button>
      </div>
    );
  }

  // Show login/signup buttons when not logged in
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        onClick={() => {
          onClick?.();
          router.push("/login");
        }}
        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      >
        Login
      </button>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cognition-600 to-consciousness-600 rounded-lg opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
        <button
          onClick={() => {
            onClick?.();
            router.push("/signup");
          }}
          className="relative px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cognition-600 to-consciousness-600 rounded-lg hover:opacity-90 transition-opacity duration-200"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
