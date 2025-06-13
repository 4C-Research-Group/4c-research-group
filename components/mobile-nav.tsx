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
          "border-b border-gray-200 dark:border-gray-800 last:border-b-0",
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
            "hover:bg-primary/5 transition-colors duration-300",
            depth === 0 ? "text-lg font-semibold" : "text-base"
          )}
        >
          {hasSubItems ? (
            <div
              onClick={() => setActiveSubmenu(isActive ? null : item.title)}
              className={cn("flex-grow cursor-pointer", "font-semibold")}
            >
              {item.title}
            </div>
          ) : (
            <SheetClose asChild>
              <Link
                href={item.href === "#" ? "" : item.href}
                className={cn(
                  "flex-grow",
                  "hover:text-primary",
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
                "hover:bg-primary/10 active:bg-primary/20",
                "transition-colors duration-300"
              )}
              whileTap={{ scale: 0.9 }}
              animate={{ rotate: isActive ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown
                className={cn(
                  "h-6 w-6 text-gray-600 dark:text-gray-400",
                  "group-hover:text-primary transition-colors"
                )}
              />
            </motion.button>
          )}
        </motion.div>

        <AnimatePresence>
          {hasSubItems && isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className="overflow-hidden bg-gray-50 dark:bg-gray-900"
            >
              {item.subItems?.map((subItem, index) => (
                <motion.div
                  key={subItem.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                  }}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {subItem.subItems && subItem.subItems.length > 0 ? (
                      <div
                        onClick={() => setActiveSubmenu(subItem.title)}
                        className={cn(
                          "block p-4 pl-8 text-sm",
                          "text-gray-700 dark:text-gray-300",
                          "hover:bg-primary/10 transition-colors duration-300",
                          "border-t border-gray-200 dark:border-gray-800",
                          "cursor-pointer"
                        )}
                      >
                        <div className="flex justify-between items-center">
                          <span>{subItem.title}</span>
                          {subItem.description && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                              {subItem.description}
                            </span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <SheetClose asChild>
                        <Link
                          href={subItem.href}
                          className={cn(
                            "block p-4 pl-8 text-sm",
                            "text-gray-700 dark:text-gray-300",
                            "hover:bg-primary/10 transition-colors duration-300",
                            "border-t border-gray-200 dark:border-gray-800"
                          )}
                        >
                          <div className="flex justify-between items-center">
                            <span>{subItem.title}</span>
                            {subItem.description && (
                              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                {subItem.description}
                              </span>
                            )}
                          </div>
                        </Link>
                      </SheetClose>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="lg:hidden flex items-center justify-between w-full">
      <Sheet>
        <SheetTrigger asChild>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </motion.div>
        </SheetTrigger>
        <SheetContent side="left" className="w-3/4 p-0 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <SheetHeader className="p-6 border-b border-gray-200 dark:border-gray-800 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icons.logo />
                </motion.div>
                <SheetTitle className="text-xl font-bold text-primary">
                  IDSL
                </SheetTitle>
              </div>
            </SheetHeader>

            <div className="p-4 space-y-2">
              {navigationConfig.map(renderNavItem)}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                delay: 0.2,
              }}
              className={cn(
                "p-6 border-t border-gray-200 dark:border-gray-800",
                "flex justify-between items-center"
              )}
            ></motion.div>
          </motion.div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
