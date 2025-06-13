"use client";

import { motion } from "framer-motion";

export function GradientMotionSpan({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      animate={{ backgroundPosition: "200% center" }}
      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
      className={`bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
    >
      {children}
    </motion.span>
  );
}
