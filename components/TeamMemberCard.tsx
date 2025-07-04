"use client";

import Image from "next/image";

interface TeamMemberCardProps {
  member: {
    name: string;
    role: string;
    superpower: string;
    image?: string;
  };
  index: number;
}

export default function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col items-center pt-10 pb-8 px-6 text-center">
      {/* Decorative accent */}
      <div className="w-full h-2 bg-gradient-to-r from-cognition-400 to-cognition-600 mb-8"></div>

      {/* Profile image container */}
      <div className="relative w-36 h-36 mb-6 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            width={144}
            height={144}
            className="object-cover w-full h-full"
            style={{ borderRadius: "9999px" }}
          />
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
      <div className="w-full space-y-3">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {member.name}
        </h3>
        <p className="text-cognition-600 dark:text-cognition-400 font-medium text-lg mb-2">
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
  );
}
