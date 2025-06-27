"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export function AdminEditButton({ postId }: { postId: string }) {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    async function checkRole() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();
      if (!error && data?.role === "admin") setIsAdmin(true);
    }
    checkRole();
  }, []);
  if (!isAdmin) return null;
  return (
    <div className="my-6 text-right">
      <Link
        href={`/admin/blog/edit/${postId}`}
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Edit Post
      </Link>
    </div>
  );
}
