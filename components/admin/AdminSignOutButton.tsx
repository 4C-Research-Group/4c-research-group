"use client";
import { supabase } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export default function AdminSignOutButton() {
  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
      }}
      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Sign out
    </button>
  );
}
