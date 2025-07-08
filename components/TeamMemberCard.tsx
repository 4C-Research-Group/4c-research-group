"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

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

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      role="region"
      tabIndex={0}
      aria-label={`Team member: ${member.name}`}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -4,
              scale: 1.015,
              transition: { duration: 0.2 },
            }
      }
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
      className="group flex flex-col rounded-2xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-200"
    >
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 md:h-64 w-full bg-gray-100 dark:bg-gray-800">
        {member.image_url ? (
          <Image
            src={member.image_url}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-cognition-500 to-cognition-700 text-white text-4xl font-semibold">
            {member.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
          {member.name}
        </h3>
        <p className="text-sm text-cognition-600 dark:text-cognition-400 font-medium mt-1">
          {member.role}
        </p>

        {member.superpower && (
          <div className="mt-4 border-t pt-3 border-gray-200 dark:border-gray-700">
            <p className="text-xs uppercase font-semibold tracking-wide text-gray-500 dark:text-gray-400 mb-1">
              Superpower
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
              {member.superpower}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
