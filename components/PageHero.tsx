import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export default function PageHero({
  title,
  subtitle,
  children,
  className = "",
}: PageHeroProps) {
  return (
    <section
      className={`relative min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-cognition-50 via-white to-consciousness-50 dark:from-cognition-900 dark:via-gray-900 dark:to-consciousness-900 ${className}`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-48 h-48 bg-cognition-200/20 dark:bg-cognition-700/10 rounded-full animate-pulse-slow" />
        <div className="absolute top-20 right-20 w-64 h-64 bg-consciousness-200/20 dark:bg-consciousness-700/10 rounded-full animate-pulse-slow" />
        <div className="absolute bottom-10 left-1/4 w-56 h-56 bg-care-200/20 dark:bg-care-700/10 rounded-full animate-pulse-slow" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            {subtitle && (
              <div
                className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed max-w-2xl mx-auto"
                dangerouslySetInnerHTML={{ __html: subtitle }}
              />
            )}
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
