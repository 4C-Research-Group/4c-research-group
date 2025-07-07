"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
  return (
    <motion.div
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5, transition: { duration: 0.15 } }}
      whileTap={{ scale: 0.98, transition: { duration: 0.15 } }}
    >
      {/* Image container with gradient overlay */}
      <div className="relative h-48 sm:h-56 md:h-64 w-full overflow-hidden">
        {member.image_url ? (
          <div className="w-full h-full flex items-center justify-center">
            <Image
              src={member.image_url}
              alt={member.name}
              fill
              className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <div className="flex space-x-3">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-sm transition-colors"
                aria-label="Email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            )}
            {member.linkedin_url && (
              <a
                href={member.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 hover:bg-white text-blue-600 p-2 rounded-full shadow-sm transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
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
