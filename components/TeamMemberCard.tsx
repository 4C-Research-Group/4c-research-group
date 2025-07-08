"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

interface TeamMemberCardProps {
  member: {
    name: string;
    role: string;
    superpower?: string;
    image_url?: string;
    email?: string;
    linkedin_url?: string;
  };
  index: number;
}

export default function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full transition-colors duration-200"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={shouldReduceMotion ? undefined : {
        y: -4,
        scale: 1.015,
        boxShadow: "0 12px 24px -8px rgba(0,0,0,0.12)",
        backgroundColor: "#f3f4f6",
        borderColor: "#2563eb",
        transition: {
          duration: 0.18,
          ease: "easeOut",
        },
      }}
      whileTap={shouldReduceMotion ? undefined : {
        scale: 0.98,
        transition: {
          duration: 0.1,
          ease: "easeInOut",
        },
      }}
      aria-label={`Team member card for ${member.name}`}
      role="region"
      tabIndex={0}
    >
      {/* Image container with gradient overlay */}
      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
        {member.image_url ? (
          <div className="w-full h-full flex items-center justify-center">
            <Image
              src={member.image_url}
              alt={member.name}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-150 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cognition-400 to-cognition-600 flex items-center justify-center">
            <span className="text-5xl text-white font-bold">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-1">
            {member.name}
          </h3>
          <p className="text-cognition-600 dark:text-cognition-400 font-medium mb-3 sm:mb-4 text-sm sm:text-base">
            {member.role}
          </p>
          {member.superpower && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
                My Superpower
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                {member.superpower}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
