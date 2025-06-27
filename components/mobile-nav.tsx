"use client";

import * as React from "react";
import Link from "next/link";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationConfig } from "@/lib/navigation";
import { SimpleThemeToggle } from "@/components/simple-theme-toggle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-5 w-5" />,
  About: <User className="h-5 w-5" />,
  Research: <FlaskConical className="h-5 w-5" />,
  "Knowledge Mobilization": <FileSpreadsheet className="h-5 w-5" />,
  Publications: <FileText className="h-5 w-5" />,
  "Our Team": <Users className="h-5 w-5" />,
  "4C Blogs": <BookOpen className="h-5 w-5" />,
};

export default function MobileNav() {
  const [activePath, setActivePath] = React.useState("/");
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setActivePath(window.location.pathname);
    }
  }, []);

  const isCurrentPath = (path: string) => {
    return activePath === path || activePath.startsWith(`${path}/`);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open main menu</span>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-4 border-b border-cognition-100/50 dark:border-cognition-800/50">
            <SheetHeader>
              <SheetTitle className="text-lg font-bold bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent dark:from-cognition-400 dark:to-consciousness-400">
                4C Research
              </SheetTitle>
            </SheetHeader>
            <SheetClose asChild>
              <button className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </button>
            </SheetClose>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigationConfig.map((item) => {
              const Icon = iconMap[item.title] || null;
              const isActive = isCurrentPath(item.href);

              return (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-cognition-100 text-cognition-900 dark:bg-cognition-900/50 dark:text-white"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {Icon && <span className="mr-3">{Icon}</span>}
                    {item.title}
                  </Link>
                </SheetClose>
              );
            })}
          </nav>

          <div className="p-4 border-t border-cognition-100/50 dark:border-cognition-800/50">
            <SimpleThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
