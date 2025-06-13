"use client";

import { Inter } from "next/font/google";
import "../../app/globals.css";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  FaBrain,
  FaFlask,
  FaHeartbeat,
  FaChevronDown,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { SiteFooter } from "@/components/site-footer";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Theme Toggle Component
function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800">
        <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      {theme === "dark" ? (
        <FaSun className="w-4 h-4 text-yellow-400" />
      ) : (
        <FaMoon className="w-4 h-4 text-gray-600" />
      )}
    </button>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <PagesLayout>{children}</PagesLayout>
      </body>
    </html>
  );
}

function PagesLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm transition-all duration-200",
          isScrolled ? "shadow-sm" : "border-transparent",
          "dark:bg-gray-900/80 dark:border-gray-800"
        )}
      >
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <FaBrain className="h-6 w-6 text-cognition-600 dark:text-cognition-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent dark:from-cognition-400 dark:to-consciousness-400">
                4C Research
              </span>
            </Link>
            <span className="hidden md:inline-block text-xs text-muted-foreground mt-1">
              Cognition • Consciousness • Critical Care
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white">
                Research
                <FaChevronDown className="h-3 w-3 mt-0.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  <Link
                    href="/research/cognition"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <FaBrain className="h-4 w-4 text-cognition-500" />
                      Cognition
                    </div>
                  </Link>
                  <Link
                    href="/research/consciousness"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <FaFlask className="h-4 w-4 text-consciousness-500" />
                      Consciousness
                    </div>
                  </Link>
                  <Link
                    href="/research/critical-care"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center gap-2">
                      <FaHeartbeat className="h-4 w-4 text-care-500" />
                      Critical Care
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/publications"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
            >
              Projects
            </Link>
            <Link
              href="/knowledge-mobilization"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
            >
              Knowledge Mobilization
            </Link>
            <Link
              href="/join-the-team"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
            >
              Join the Team
            </Link>
            <Link
              href="/4c-blogs"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
            >
              4C Blogs
            </Link>
            <Link
              href="/4c-blogs"
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-cognition-600 hover:bg-cognition-700 transition-colors dark:bg-cognition-700 dark:hover:bg-cognition-600"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <SiteFooter
        navItems={[
          { name: "Home", href: "/" },
          { name: "Research", href: "/research" },
          { name: "Projects", href: "/projects" },
          { name: "Knowledge Mobilization", href: "/knowledge-mobilization" },
          { name: "Join the Team", href: "/join-the-team" },
          { name: "4C Blogs", href: "/4c-blogs" },
          { name: "Contact", href: "/contact" },
        ]}
      />
    </div>
  );
}
