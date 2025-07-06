"use client";
import { supabase } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export default function AdminSignOutButton() {
  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut();
        // Stay on current page instead of redirecting to home
        window.location.reload();
      }}
      className="text-gray-600 dark:text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
    >
      <LogOut className="h-5 w-5 mr-3" />
      Sign out
    </button>
  );
}
