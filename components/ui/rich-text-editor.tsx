"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(
  () => import("react-quill").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[200px] border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 flex items-center justify-center">
        <div className="text-gray-500">Loading editor...</div>
      </div>
    ),
  }
);

// Import Quill styles
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  error?: string;
  required?: boolean;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content here...",
  className,
  label,
  error,
  required = false,
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate character and word count
  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  // Quill modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // Headings
      ["bold", "italic", "underline", "strike"], // Text formatting
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      [{ indent: "-1" }, { indent: "+1" }], // Indentation
      [{ color: [] }, { background: [] }], // Text color and background
      [{ align: [] }], // Text alignment
      ["link", "image", "code-block"], // Links, images, and code blocks
      ["blockquote", "code"], // Blockquotes and inline code
      ["clean"], // Remove formatting
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  // Quill formats configuration
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "color",
    "background",
    "align",
    "link",
    "image",
    "code-block",
    "blockquote",
    "code",
  ];

  if (!mounted) {
    return (
      <div className={cn("space-y-2", className)}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="min-h-[200px] border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 flex items-center justify-center">
          <div className="text-gray-500">Loading editor...</div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <ReactQuill
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="min-h-[200px]"
          theme="snow"
        />
        <style jsx global>{`
          .ql-editor {
            min-height: 200px;
            font-size: 14px;
            line-height: 1.6;
          }
          .ql-editor h1 {
            font-size: 2em;
            font-weight: bold;
            margin-bottom: 0.5em;
          }
          .ql-editor h2 {
            font-size: 1.5em;
            font-weight: bold;
            margin-bottom: 0.5em;
          }
          .ql-editor h3 {
            font-size: 1.25em;
            font-weight: bold;
            margin-bottom: 0.5em;
          }
          .ql-editor h4 {
            font-size: 1.1em;
            font-weight: bold;
            margin-bottom: 0.5em;
          }
          .ql-editor h5 {
            font-size: 1em;
            font-weight: bold;
            margin-bottom: 0.5em;
          }
          .ql-editor h6 {
            font-size: 0.9em;
            font-weight: bold;
            margin-bottom: 0.5em;
          }
          .ql-editor p {
            margin-bottom: 1em;
          }
          .ql-editor ul,
          .ql-editor ol {
            margin-bottom: 1em;
            padding-left: 1.5em;
          }
          .ql-editor blockquote {
            border-left: 4px solid #e5e7eb;
            padding-left: 1em;
            margin: 1em 0;
            font-style: italic;
          }
          .ql-editor a {
            color: #3b82f6;
            text-decoration: underline;
          }
          .ql-editor img {
            max-width: 100%;
            height: auto;
            margin: 1em 0;
          }
          .ql-editor code {
            background-color: #f3f4f6;
            padding: 0.125rem 0.25rem;
            border-radius: 0.25rem;
            font-family: monospace;
            font-size: 0.875em;
          }
          .ql-editor pre {
            background-color: #f3f4f6;
            padding: 1rem;
            border-radius: 0.5rem;
            overflow-x: auto;
            margin: 1em 0;
          }
          .ql-editor pre code {
            background-color: transparent;
            padding: 0;
          }
          .ql-toolbar {
            border-top-left-radius: 0.375rem;
            border-top-right-radius: 0.375rem;
            border-color: #d1d5db;
          }
          .ql-container {
            border-bottom-left-radius: 0.375rem;
            border-bottom-right-radius: 0.375rem;
            border-color: #d1d5db;
          }
          .dark .ql-toolbar,
          .dark .ql-container {
            border-color: #4b5563;
          }
          .dark .ql-editor {
            color: #f3f4f6;
          }
          .dark .ql-editor.ql-blank::before {
            color: #9ca3af;
          }
          .dark .ql-editor code {
            background-color: #374151;
            color: #f3f4f6;
          }
          .dark .ql-editor pre {
            background-color: #374151;
          }
        `}</style>
      </div>
      <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
        <span>{wordCount} words</span>
        <span>{charCount} characters</span>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
