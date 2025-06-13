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
        "relative flex h-10 w-20 items-center rounded-full border-none outline-none focus:ring-2 focus:ring-blue-400/70 shadow-lg transition-all duration-300",
        "bg-gradient-to-r from-[#38bdf8] via-[#2563eb] to-[#1e40af] dark:from-[#0a1931] dark:via-[#2563eb] dark:to-[#38bdf8]",
        "hover:scale-105 active:scale-95",
        className
      )}
      style={{
        boxShadow: isDark
          ? "0 4px 24px 0 rgba(56,189,248,0.15), 0 1.5px 4px 0 rgba(30,64,175,0.12)"
          : "0 4px 24px 0 rgba(56,189,248,0.10), 0 1.5px 4px 0 rgba(37,99,235,0.10)",
      }}
      {...props}
    >
      <span
        className={cn(
          "absolute top-1 left-1 h-8 w-8 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center",
          "bg-white/90 dark:bg-[#112240]/90",
          "ring-2 ring-blue-200 dark:ring-blue-700",
          isDark ? "translate-x-10" : "translate-x-0"
        )}
        style={{
          boxShadow: isDark
            ? "0 0 12px 2px #2563eb44"
            : "0 0 12px 2px #38bdf844",
        }}
      >
        <span
          className={cn(
            "transition-transform duration-500 ease-in-out",
            isDark ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
            "absolute"
          )}
        >
          <Moon className="h-5 w-5 text-blue-400 drop-shadow" />
        </span>
        <span
          className={cn(
            "transition-transform duration-500 ease-in-out",
            isDark ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
            "absolute"
          )}
        >
          <Sun className="h-5 w-5 text-yellow-400 drop-shadow" />
        </span>
      </span>
      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </button>
  );
}
