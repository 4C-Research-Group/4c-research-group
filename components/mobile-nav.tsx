"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  FlaskConical,
  BookOpen,
  FileText,
  Users,
  FileSpreadsheet,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationConfig } from "@/lib/navigation";
import { SimpleThemeToggle } from "@/components/simple-theme-toggle";
import { NavAuthButtons } from "@/components/nav-auth-buttons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-5 w-5" />,
  About: <User className="h-5 w-5" />,
  Research: <FlaskConical className="h-5 w-5" />,
  "Knowledge Mobilization": <FileSpreadsheet className="h-5 w-5" />,
  Publications: <FileText className="h-5 w-5" />,
  "Our Team": <Users className="h-5 w-5" />,
  "4C Blogs": <BookOpen className="h-5 w-5" />,
  "Join 4C Lab": <UserPlus className="h-5 w-5" />,
};

export default function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const isCurrentPath = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "44px",
            minHeight: "44px",
            zIndex: 1,
          }}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open main menu</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] p-0 z-[60]"
        style={{
          // Ensure proper stacking above sticky header
          zIndex: 60,
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-6 py-6 border-b border-cognition-100/50 dark:border-cognition-800/50 bg-gradient-to-r from-cognition-50/50 to-consciousness-50/50 dark:from-cognition-900/20 dark:to-consciousness-900/20">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent dark:from-cognition-400 dark:to-consciousness-400">
                4C Research
              </SheetTitle>
              <SheetDescription className="sr-only">
                Navigation menu for 4C Research Lab website
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <button className="p-2 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm opacity-70 ring-offset-background transition-all duration-200 hover:opacity-100 hover:bg-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cognition-500">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </SheetClose>
          </div>

          <nav className="flex-1 overflow-y-auto p-6 space-y-2">
            {navigationConfig.map((item) => {
              const Icon = iconMap[item.title] || null;
              const isActive = isCurrentPath(item.href);

              return (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-4 py-4 rounded-xl text-base font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-cognition-100 to-consciousness-100 text-cognition-900 dark:from-cognition-900/50 dark:to-consciousness-900/50 dark:text-white shadow-sm"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 hover:shadow-sm"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {Icon && (
                      <span className="mr-4 text-cognition-600 dark:text-cognition-400">
                        {Icon}
                      </span>
                    )}
                    {item.title}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>

          {/* Theme Toggle Section */}
          <div className="px-6 py-4 border-t border-cognition-100/50 dark:border-cognition-800/50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Theme
              </span>
              <SimpleThemeToggle />
            </div>
          </div>

          <div className="p-6 border-t border-cognition-100/50 dark:border-cognition-800/50 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-800/30">
            <div className="space-y-4">
              <div className="pt-2">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 uppercase tracking-wide">
                  Account
                </h3>
                <NavAuthButtons
                  className="flex-col lg:flex-row lg:space-y-0 lg:space-x-3 space-y-3"
                  onClick={() => setIsOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
