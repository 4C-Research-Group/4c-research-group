"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Home,
  Users,
  BookOpen,
  UserPlus,
  FileText,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationConfig, NavItem } from "@/lib/navigation";
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
  Projects: <FileText className="h-5 w-5" />,
  "Knowledge Mobilization": <BookOpen className="h-5 w-5" />,
  "Join the Team": <UserPlus className="h-5 w-5" />,
  "4C Blogs": <FileText className="h-5 w-5" />,
  Contact: <Mail className="h-5 w-5" />,
};

export default function MobileNav() {
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null);
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

  const renderNavItem = (item: NavItem, depth = 0) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isActive = activeSubmenu === item.title;
    const isCurrent = isCurrentPath(item.href);
    const Icon = iconMap[item.title] || null;

    return (
      <motion.div
        key={item.href}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: depth * 0.05,
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className={cn(
          "border-b border-cognition-100/50 dark:border-cognition-800/50 last:border-b-0",
          depth > 0 ? "pl-6" : ""
        )}
      >
        <motion.div
          whileTap={{ scale: 0.98 }}
          className={cn(
            "flex items-center justify-between py-3 px-4 -mx-1 rounded-lg transition-colors duration-200",
            isCurrent
              ? "bg-cognition-100/80 dark:bg-cognition-900/30 text-cognition-700 dark:text-white"
              : "text-cognition-700 dark:text-cognition-200 hover:bg-cognition-100/70 dark:hover:bg-cognition-800/30"
          )}
        >
          <div className="flex items-center gap-3">
            {depth === 0 && Icon && (
              <span className={cn("opacity-70", isCurrent && "opacity-100")}>
                {Icon}
              </span>
            )}
            {hasSubItems ? (
              <button
                onClick={() => setActiveSubmenu(isActive ? null : item.title)}
                className={cn(
                  "text-left font-medium",
                  depth === 0 ? "text-base" : "text-sm"
                )}
              >
                {item.title}
              </button>
            ) : (
              <SheetClose asChild>
                <Link
                  href={item.href === "#" ? "" : item.href}
                  className={cn(
                    "block w-full font-medium",
                    depth === 0 ? "text-base" : "text-sm"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              </SheetClose>
            )}
          </div>

          {hasSubItems && (
            <motion.button
              onClick={() => setActiveSubmenu(isActive ? null : item.title)}
              className="p-1 -mr-1 rounded-full transition-colors hover:bg-cognition-100/50 dark:hover:bg-cognition-800/50"
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: isActive ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="h-5 w-5 text-cognition-500 dark:text-cognition-400" />
            </motion.button>
          )}
        </motion.div>

        <AnimatePresence>
          {hasSubItems && isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="overflow-hidden pl-4"
            >
              {item.subItems?.map((subItem) =>
                renderNavItem(subItem, depth + 1)
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className={cn(
            "md:hidden p-2 -mr-2 rounded-lg transition-colors",
            "text-cognition-700 dark:text-cognition-200 hover:bg-cognition-100/50 dark:hover:bg-cognition-800/50"
          )}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[85vw] max-w-sm p-0"
        onInteractOutside={() => setIsOpen(false)}
        onEscapeKeyDown={() => setIsOpen(false)}
      >
        <div className="h-full flex flex-col">
          <div className="px-6 pt-6 pb-4 border-b border-cognition-100/50 dark:border-cognition-800/50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-cognition-800 dark:text-white">
                4C Research
              </h2>
              <SheetClose asChild>
                <button
                  className="rounded-lg p-1 -mr-1 transition-colors hover:bg-cognition-100/50 dark:hover:bg-cognition-800/50"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-cognition-500 dark:text-cognition-400" />
                </button>
              </SheetClose>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {navigationConfig.map((item) => renderNavItem(item))}
          </nav>

          <div className="pb-20 pt-4 ml-10 border-t border-cognition-100/50 dark:border-cognition-800/50">
            <SimpleThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
