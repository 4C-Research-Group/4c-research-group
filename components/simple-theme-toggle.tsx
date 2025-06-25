"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function SimpleThemeToggle({
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement>) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex h-8 w-16 items-center rounded-full border-none outline-none focus:ring-2",
        "focus:ring-cognition-500 dark:focus:ring-cognition-400",
        "shadow-lg transition-all duration-300",
        "bg-gradient-to-r from-cognition-500 via-cognition-600 to-cognition-700 dark:from-cognition-400 dark:via-cognition-500 dark:to-cognition-600",
        "hover:scale-105 active:scale-95",
        className
      )}
      style={{
        boxShadow: isDark
          ? "0 4px 24px 0 rgba(67,148,237,0.15), 0 1.5px 4px 0 rgba(30,64,175,0.12)"
          : "0 4px 24px 0 rgba(67,148,237,0.10), 0 1.5px 4px 0 rgba(37,99,235,0.10)",
      }}
      {...props}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 h-7 w-7 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center",
          "bg-white/90 dark:bg-black/90",
          "ring-2 ring-cognition-400 dark:ring-cognition-500",
          isDark ? "translate-x-8" : "translate-x-0"
        )}
        style={{
          boxShadow: isDark
            ? "0 0 12px 2px rgba(67,148,237,0.44)"
            : "0 0 12px 2px rgba(67,148,237,0.44)",
        }}
      >
        {isDark ? (
          <Sun className="h-3 w-3 text-cognition-400" />
        ) : (
          <Moon className="h-3 w-3 text-cognition-600" />
        )}
      </span>
      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </button>
  );
}
