"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { navigationConfig, NavItem } from "@/lib/navigation";
import { Icons } from "@/components/icons";
import { SimpleThemeToggle } from "@/components/simple-theme-toggle";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

export default function MobileNav() {
  const [activeSubmenu, setActiveSubmenu] = React.useState<string | null>(null);

  const renderNavItem = (item: NavItem, depth = 0) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isActive = activeSubmenu === item.title;

    return (
      <motion.div
        key={item.href}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: depth * 0.1,
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
        className={cn(
          "border-b border-cognition-200 dark:border-cognition-700 last:border-b-0",
          depth > 0 ? "pl-4" : ""
        )}
      >
        <motion.div
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "flex items-center justify-between p-4 group",
            "hover:bg-cognition-50 dark:hover:bg-cognition-900/20",
            "transition-all duration-200",
            depth === 0 ? "text-lg font-semibold" : "text-base"
          )}
        >
          {hasSubItems ? (
            <div
              onClick={() => setActiveSubmenu(isActive ? null : item.title)}
              className={cn(
                "flex-grow cursor-pointer",
                "text-cognition-600 dark:text-white/90",
                "group-hover:text-cognition-500 dark:group-hover:text-white",
                "font-semibold transition-colors duration-200"
              )}
            >
              {item.title}
            </div>
          ) : (
            <SheetClose asChild>
              <Link
                href={item.href === "#" ? "" : item.href}
                className={cn(
                  "flex-grow",
                  "text-cognition-600 dark:text-white/90",
                  "group-hover:text-cognition-500 dark:group-hover:text-white",
                  "transition-colors duration-200",
                  depth === 0 ? "font-semibold" : "font-normal"
                )}
              >
                {item.title}
              </Link>
            </SheetClose>
          )}

          {hasSubItems && (
            <motion.button
              onClick={() => setActiveSubmenu(isActive ? null : item.title)}
              className={cn(
                "p-2 rounded-full ml-2",
                "hover:bg-cognition-100 dark:hover:bg-cognition-900/30",
                "active:bg-cognition-200 dark:active:bg-cognition-900/40",
                "transition-colors duration-200"
              )}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown
                className={cn(
                  "h-6 w-6",
                  "text-cognition-600 dark:text-white/90",
                  "group-hover:text-cognition-500 dark:group-hover:text-white",
                  "transition-colors duration-200"
                )}
              />
            </motion.button>
          )}
        </motion.div>

        <AnimatePresence>
          {hasSubItems && isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
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
    <Sheet>
      <SheetTrigger asChild>
        <button
          className={cn(
            "md:hidden p-2 rounded-lg",
            "text-cognition-600 dark:text-cognition-400 hover:text-cognition-500 dark:hover:text-cognition-300",
            "transition-colors duration-300"
          )}
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="text-cognition-600 dark:text-white">
            4C Research
          </SheetTitle>
          <SheetClose asChild>
            <button
              className={cn(
                "absolute top-4 right-4 p-2 rounded-lg",
                "text-cognition-600 dark:text-white",
                "group-hover:text-cognition-500 dark:group-hover:text-white",
                "transition-colors duration-200"
              )}
            >
              <X className="h-6 w-6" />
            </button>
          </SheetClose>
        </SheetHeader>
        <nav className="mt-6">
          {navigationConfig.map((item) => renderNavItem(item))}
        </nav>
        <div className="mt-8 px-4">
          <SimpleThemeToggle className="w-full justify-center p-2" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
