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
import MobileNav from "@/components/mobile-nav";
import Image from "next/image";
import { NavAuthButtons } from "@/components/nav-auth-buttons";
import { supabase } from "@/lib/supabase/client";

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

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navPages, setNavPages] = useState<any[]>([]);

  useEffect(() => {
    const fetchNavPages = async () => {
      const { data } = await supabase
        .from("pages")
        .select("slug, nav_label, nav_order")
        .eq("show_in_nav", true)
        .order("nav_order", { ascending: true });
      setNavPages(data || []);
    };
    fetchNavPages();
  }, []);

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
          {/* Logo and subtitle in a row on lg+ screens, column on mobile */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              <span className="text-xl font-bold bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent dark:from-cognition-400 dark:to-consciousness-400">
                4C Research
              </span>
            </Link>
            <span className="text-xs text-muted-foreground ml-10 lg:ml-0 lg:pl-4 lg:border-l lg:border-gray-200 dark:lg:border-gray-700 lg:mt-0 mt-1">
              Cognition • Consciousness • Critical Care
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-4">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
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
              {navPages.map((page) => (
                <Link key={page.slug} href={`/${page.slug}`}>
                  {page.nav_label}
                </Link>
              ))}
              <div className="relative group">
                <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white">
                  More
                  <FaChevronDown className="h-3 w-3 mt-0.5 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black/5 dark:ring-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link
                      href="/projects"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Projects
                    </Link>
                    <Link
                      href="/knowledge-mobilization"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Knowledge Mobilization
                    </Link>
                    <Link
                      href="/team"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Join the Team
                    </Link>
                    <Link
                      href="/4c-blogs"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      4C Blogs
                    </Link>
                    <Link
                      href="/contact"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            <div className="flex items-center gap-4 ml-4">
              <ThemeToggle />
              <div className="h-6 w-px bg-gray-200 dark:bg-gray-700" />
              <NavAuthButtons />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="px-4 py-3 space-y-3 max-h-[80vh] overflow-y-auto">
              <Link
                href="/"
                className="px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <div className="px-4 py-2">
                <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Research
                </div>
                <div className="space-y-2 pl-4">
                  <Link
                    href="/research/cognition"
                    className="px-4 py-2 rounded-lg text-base text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaBrain className="h-4 w-4 text-cognition-500" />
                    Cognition
                  </Link>
                  <Link
                    href="/research/consciousness"
                    className="px-4 py-2 rounded-lg text-base text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaFlask className="h-4 w-4 text-consciousness-500" />
                    Consciousness
                  </Link>
                  <Link
                    href="/research/critical-care"
                    className="px-4 py-2 rounded-lg text-base text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaHeartbeat className="h-4 w-4 text-care-500" />
                    Critical Care
                  </Link>
                </div>
              </div>
              {navPages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/${page.slug}`}
                  className="px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {page.nav_label}
                </Link>
              ))}
              <Link
                href="/projects"
                className="px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/knowledge-mobilization"
                className="px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Knowledge Mobilization
              </Link>
              <Link
                href="/team"
                className="px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Join the Team
              </Link>
              <Link
                href="/4c-blogs"
                className="px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                4C Blogs
              </Link>
              <Link
                href="/contact"
                className="px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
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
          { name: "Join the Team", href: "/team" },
          { name: "4C Blogs", href: "/4c-blogs" },
          { name: "Contact", href: "/contact" },
        ]}
      />
    </div>
  );
}
