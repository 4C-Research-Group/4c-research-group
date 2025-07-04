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
import { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import MobileNav from "@/components/mobile-nav";
import Image from "next/image";
import { NavAuthButtons } from "@/components/nav-auth-buttons";
import { supabase } from "@/lib/supabase/client";
import LoadingSpinner from "@/components/ui/loading-spinner";

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
  const [showResearch, setShowResearch] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const fetchNavPages = async () => {
      const startTime = Date.now();
      const { data } = await supabase
        .from("pages")
        .select("slug, nav_label, nav_order")
        .eq("show_in_nav", true)
        .order("nav_order", { ascending: true });
      setNavPages(data || []);

      // Ensure minimum loading time for smooth UX
      const elapsed = Date.now() - startTime;
      const minLoadingTime = 600; // Reduced to 600ms for faster loading
      if (elapsed < minLoadingTime) {
        setTimeout(() => {
          setIsLoading(false);
          // Mark initial load as complete after a short delay
          setTimeout(() => setIsInitialLoad(false), 100);
        }, minLoadingTime - elapsed);
      } else {
        setIsLoading(false);
        setTimeout(() => setIsInitialLoad(false), 100);
      }
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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Reset showResearch when closing menu
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    setShowResearch(false);
  }, []);

  // Keyboard accessibility: close on Esc
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, closeMobileMenu]);

  // Focus trap for accessibility
  useEffect(() => {
    if (!isMobileMenuOpen || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, [isMobileMenuOpen]);

  return (
    <div className="flex flex-col min-h-screen">
      {isLoading && isInitialLoad ? (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-cognition-50 to-white dark:from-cognition-900 dark:to-gray-900 transition-opacity duration-300 flex items-center justify-center">
          <LoadingSpinner
            message="Loading 4C Research..."
            size="md"
            fullScreen={false}
          />
        </div>
      ) : (
        <>
          {/* Navigation */}
          <header
            className={cn(
              "sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-900 transition-all duration-200",
              isScrolled
                ? "shadow-sm border-gray-200 dark:border-gray-700"
                : "border-transparent"
            )}
          >
            <div className="container flex h-16 items-center justify-between px-4">
              {/* Logo and subtitle in a row on lg+ screens, column on mobile */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:gap-4 flex-1 min-w-0">
                <Link
                  href="/"
                  className="flex items-center space-x-2 flex-shrink-0"
                >
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    priority
                    className="flex-shrink-0"
                  />
                  <span className="text-xl font-bold bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent dark:from-cognition-400 dark:to-consciousness-400 flex-shrink-0">
                    4C RESEARCH
                  </span>
                </Link>
                <span className="text-[0.5rem] md:text-[0.75rem] text-muted-foreground ml-10 lg:ml-0 lg:pl-4 lg:border-l lg:border-gray-200 dark:lg:border-gray-700 lg:mt-0 mt-1 flex-shrink-0">
                  Cognition • Consciousness • Critical Care
                </span>
              </div>

              <div className="hidden lg:flex items-center gap-6">
                <nav className="flex items-center gap-4">
                  <Link
                    href="/"
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
                  >
                    About
                  </Link>
                  <Link
                    href="/research"
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
                  >
                    Research
                  </Link>
                  <Link
                    href="/team"
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
                  >
                    Team
                  </Link>
                  <Link
                    href="/4c-blogs"
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
                  >
                    Blogs
                  </Link>

                  {navPages.map((page) => (
                    <Link
                      key={page.slug}
                      href={`/${page.slug}`}
                      className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors dark:text-gray-300 dark:hover:text-white"
                    >
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
                          href="/knowledge-mobilization"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          Knowledge Mobilization
                        </Link>
                        <Link
                          href="/publications"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          Publications
                        </Link>
                        <Link
                          href="/join-4c-lab"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          Join 4C Lab
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
              <div className="flex lg:hidden items-center gap-4 flex-shrink-0">
                <MobileNav />
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
              { name: "Projects", href: "/research" },
              { name: "Join 4C Lab", href: "/join-4c-lab" },
              {
                name: "Knowledge Mobilization",
                href: "/knowledge-mobilization",
              },
              { name: "Publications", href: "/publications" },
              { name: "Contact", href: "/contact" },
            ]}
          />
        </>
      )}
    </div>
  );
}
