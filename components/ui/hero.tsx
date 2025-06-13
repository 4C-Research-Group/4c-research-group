import * as React from "react";
import { cn } from "@/lib/utils";

import { motion, HTMLMotionProps } from "framer-motion";

interface HeroProps extends Omit<HTMLMotionProps<"div">, "children"> {
  title: string;
  description: string;
  ctaPrimary?: {
    text: string;
    href: string;
    className?: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
    className?: string;
  };
}

export function Hero({
  title,
  description,
  ctaPrimary,
  ctaSecondary,
  className,
  ...props
}: HeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn("w-full", className)}
      {...props}
    >
      <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight 
              text-slate-900 dark:text-white 
              leading-tight
              drop-shadow-lg"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-prose"
            >
              {description}
            </motion.p>

            {/* CTA Buttons with staggered animations */}
            <motion.div
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-start"
            >
              {ctaPrimary && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5, delay: 0.5 },
                    },
                  }}
                  className="w-full sm:w-auto"
                >
                  <a
                    href={ctaPrimary.href}
                    className={`inline-block w-full sm:w-auto text-center px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 ${ctaPrimary.className}`}
                  >
                    {ctaPrimary.text}
                  </a>
                </motion.div>
              )}
              {ctaSecondary && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.5, delay: 0.6 },
                    },
                  }}
                  className="w-full sm:w-auto"
                >
                  <a
                    href={ctaSecondary.href}
                    className={`inline-block w-full sm:w-auto text-center px-6 py-3 rounded-full border font-semibold transition-all duration-300 ${ctaSecondary.className}`}
                  >
                    {ctaSecondary.text}
                  </a>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
