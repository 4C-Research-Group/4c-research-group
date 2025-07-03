"use client";

import { useAuth } from "@/components/providers/auth-provider";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserAvatar } from "@/components/user-avatar";
import { useEffect, useState } from "react";
import { fullSignOut } from "@/lib/utils/signout";

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
            className="w-full lg:w-auto px-4 py-3 lg:py-2 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-all duration-200 hover:shadow-sm border border-gray-200 dark:border-gray-700"
          >
            Admin Dashboard
          </Link>
          <button
            onClick={async () => {
              await fullSignOut(signOut, onClick);
            }}
            className="w-full lg:w-auto px-4 py-3 lg:py-2 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-all duration-200 hover:shadow-sm border border-gray-200 dark:border-gray-700"
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
        className="w-full lg:w-auto px-4 py-3 lg:py-2 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-all duration-200 hover:shadow-sm border border-gray-200 dark:border-gray-700"
      >
        Login
      </button>
      <div className="relative group w-full lg:w-auto">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cognition-600 to-consciousness-600 rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-200"></div>
        <button
          onClick={() => {
            onClick?.();
            router.push("/signup");
          }}
          className="relative w-full lg:w-auto px-4 py-3 lg:py-2 rounded-xl text-base font-medium text-white bg-gradient-to-r from-cognition-600 to-consciousness-600 hover:opacity-90 transition-all duration-200 hover:shadow-lg"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
