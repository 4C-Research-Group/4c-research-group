"use client";

import { cn } from "@/lib/utils";

interface RichTextContentProps {
  content: string;
  className?: string;
}

export default function RichTextContent({
  content,
  className,
}: RichTextContentProps) {
  return (
    <div
      className={cn(
        "rich-text-content prose prose-lg dark:prose-invert max-w-none",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
