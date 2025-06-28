"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function UserAvatar() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

        if (!error && data && typeof data.role === "string") {
          const role = data.role as string;
          setUserRole(role);
        } else {
          // If user doesn't exist in users table, set default role
          setUserRole("user");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        // Set default role on error
        setUserRole("user");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user]);

  if (!user) return null;

  // Get user initials from email or name
  const getInitials = () => {
    if (user.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full bg-cognition-100 hover:bg-cognition-200 dark:bg-cognition-900 dark:hover:bg-cognition-800 transition-colors"
        >
          <span className="font-medium text-cognition-700 dark:text-cognition-200">
            {getInitials()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.email}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {loading ? "Loading..." : userRole === "admin" ? "Admin" : "User"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {!loading && userRole === "admin" && (
          <DropdownMenuItem onClick={() => router.push("/dashboard")}>
            Admin Dashboard
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
