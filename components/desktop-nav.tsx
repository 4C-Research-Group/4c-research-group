"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { navigationConfig, NavItem } from "@/lib/navigation";

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.3,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

export default function DesktopNav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const renderNavItem = (item: NavItem) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;

    return (
      <motion.div
        key={item.href}
        variants={itemVariants}
        className="relative group"
        onMouseEnter={() => setOpenMenu(hasSubItems ? item.title : null)}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <Link
          href={item.href}
          className="relative px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-300 group/link"
        >
          <span className="relative z-10">{item.title}</span>

          {hasSubItems && (
            <ChevronDown
              className={`inline-block ml-1 h-4 w-4 text-neutral-400 dark:text-neutral-500 transition-transform duration-300 ${
                openMenu === item.title ? "rotate-180" : ""
              }`}
            />
          )}

          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white origin-left scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300" />
        </Link>

        <AnimatePresence>
          {hasSubItems && openMenu === item.title && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setOpenMenu(item.title)}
              onMouseLeave={() => setOpenMenu(null)}
              className="absolute top-full left-0 mt-4 w-64 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xl overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-800"
            >
              {item.subItems?.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className="block px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-300 group"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                      {subItem.title}
                    </span>
                    {subItem.description && (
                      <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        {subItem.description}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <motion.nav
      ref={navRef}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className="flex items-center space-x-2"
    >
      {navigationConfig.map(renderNavItem)}
    </motion.nav>
  );
}
