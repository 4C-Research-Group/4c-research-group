"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function EditPage({ pageId }: { pageId: string }) {
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadPage = async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("content")
        .eq("id", pageId)
        .single();

      if (error) {
        toast.error("Failed to load page");
        console.error(error);
      } else if (data) {
        setContent(data.content);
      }
    };

    loadPage();
  }, [pageId]);

  const handleSave = async () => {
    if (!content.trim()) {
      toast.error("Content cannot be empty");
      return;
    }

    setIsSaving(true);
    const { error } = await supabase
      .from("pages")
      .update({
        content,
        updated_at: new Date().toISOString(),
      })
      .eq("id", pageId);

    setIsSaving(false);

    if (error) {
      toast.error("Failed to save page");
      console.error(error);
    } else {
      toast.success("Page updated successfully");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Edit Page</h2>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`px-4 py-2 rounded ${
            isSaving
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full min-h-[400px] p-4 border rounded-lg font-mono text-sm"
        placeholder="Enter your page content (supports Markdown)"
      />
    </div>
  );
}
