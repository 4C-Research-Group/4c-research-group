"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import DeleteBlogButton from "./DeleteBlogButton";

export function AdminEditButton({ postId }: { postId: string }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [postTitle, setPostTitle] = useState("");

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

  useEffect(() => {
    async function getPostTitle() {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("title")
        .eq("id", postId)
        .single();
      if (!error && data) {
        setPostTitle(data.title);
      }
    }
    if (isAdmin) {
      getPostTitle();
    }
  }, [postId, isAdmin]);

  if (!isAdmin) return null;

  return (
    <div className="my-6 text-right space-x-3">
      <Link
        href={`/admin/blog/edit/${postId}`}
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Edit Post
      </Link>
      <DeleteBlogButton postId={postId} postTitle={postTitle} />
    </div>
  );
}
