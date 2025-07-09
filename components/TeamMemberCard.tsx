"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import {
  FaEnvelope,
  FaLinkedin,
  FaUser,
  FaBrain,
  FaHeart,
  FaFlask,
  FaLightbulb,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaRocket,
  FaStar,
  FaMagic,
  FaCog,
  FaLeaf,
  FaFire,
  FaEye,
  FaHandshake,
  FaBook,
  FaGraduationCap,
} from "react-icons/fa";

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

// Function to get icon based on superpower keywords
function getSuperpowerIcon(superpower: string) {
  const lowerSuperpower = superpower.toLowerCase();

  if (
    lowerSuperpower.includes("brain") ||
    lowerSuperpower.includes("cognitive") ||
    lowerSuperpower.includes("neuroscience") ||
    lowerSuperpower.includes("mind")
  ) {
    return <FaBrain className="w-4 h-4" />;
  }
  if (
    lowerSuperpower.includes("heart") ||
    lowerSuperpower.includes("care") ||
    lowerSuperpower.includes("compassion") ||
    lowerSuperpower.includes("empathy")
  ) {
    return <FaHeart className="w-4 h-4" />;
  }
  if (
    lowerSuperpower.includes("research") ||
    lowerSuperpower.includes("lab") ||
    lowerSuperpower.includes("experiment") ||
    lowerSuperpower.includes("analysis")
  ) {
    return <FaFlask className="w-4 h-4" />;
  }
  if (
    lowerSuperpower.includes("innovation") ||
    lowerSuperpower.includes("creative") ||
    lowerSuperpower.includes("idea") ||
    lowerSuperpower.includes("solution")
  ) {
    return <FaLightbulb className="w-4 h-4" />;
  }
  if (
    lowerSuperpower.includes("team") ||
    lowerSuperpower.includes("collaboration") ||
    lowerSuperpower.includes("leadership") ||
    lowerSuperpower.includes("mentor")
  ) {
    return <FaUsers className="w-4 h-4" />;
  }
  if (
    lowerSuperpower.includes("data") ||
    lowerSuperpower.includes("analytics") ||
    lowerSuperpower.includes("statistics") ||
    lowerSuperpower.includes("metrics")
  ) {
    return <FaChartLine className="w-4 h-4" />;
  }
  if (
    lowerSuperpower.includes("protection") ||
    lowerSuperpower.includes("safety") ||
    lowerSuperpower.includes("security") ||
    lowerSuperpower.includes("guardian")
  ) {
    return <FaShieldAlt className="w-4 h-4" />;
  }
  if (
    lowerSuperpower.includes("speed") ||
    lowerSuperpower.includes("fast") ||
    lowerSuperpower.includes("efficiency") ||
    lowerSuperpower.includes("accelerate")
  ) {
    return <FaRocket className="w-4 h-4" />;
  }
  if (
    lowerSuperpower.includes("excellence") ||
    lowerSuperpower.includes("best") ||
    lowerSuperpower.includes("quality") ||
    lowerSuperpower.includes("premium")
  ) {
    return <FaStar className="w-4 h-4" />;
  }
  if (
    lowerSuperpower.includes("magic") ||
    lowerSuperpower.includes("wizard") ||
    lowerSuperpower.includes("transform") ||
    lowerSuperpower.includes("special")
  ) {
    return <FaMagic className="w-4 h-4" />;
  }
  if (
    lowerSuperpower.includes("technical") ||
    lowerSuperpower.includes("engineering") ||
    lowerSuperpower.includes("system") ||
    lowerSuperpower.includes("process")
  ) {
    return <FaCog className="w-4 h-4" />;
  }
  if (
    lowerSuperpower.includes("nature") ||
    lowerSuperpower.includes("organic") ||
    lowerSuperpower.includes("growth") ||
    lowerSuperpower.includes("sustainable")
  ) {
    return <FaLeaf className="w-4 h-4" />;
  }
  if (
    lowerSuperpower.includes("energy") ||
    lowerSuperpower.includes("passion") ||
    lowerSuperpower.includes("drive") ||
    lowerSuperpower.includes("power")
  ) {
    return <FaFire className="w-4 h-4" />;
  }
  if (
    lowerSuperpower.includes("vision") ||
    lowerSuperpower.includes("insight") ||
    lowerSuperpower.includes("foresight") ||
    lowerSuperpower.includes("perspective")
  ) {
    return <FaEye className="w-4 h-4" />;
  }
  if (
    lowerSuperpower.includes("communication") ||
    lowerSuperpower.includes("network") ||
    lowerSuperpower.includes("partnership") ||
    lowerSuperpower.includes("relationship")
  ) {
    return <FaHandshake className="w-4 h-4" />;
  }
  if (
    lowerSuperpower.includes("knowledge") ||
    lowerSuperpower.includes("learning") ||
    lowerSuperpower.includes("education") ||
    lowerSuperpower.includes("teaching")
  ) {
    return <FaBook className="w-4 h-4" />;
  }
  if (
    lowerSuperpower.includes("academic") ||
    lowerSuperpower.includes("scholar") ||
    lowerSuperpower.includes("expertise") ||
    lowerSuperpower.includes("specialist")
  ) {
    return <FaGraduationCap className="w-4 h-4" />;
  }

  // Default icon if no keywords match
  return <FaStar className="w-4 h-4" />;
}

export default function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="group relative h-full overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-150 ease-out"
      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
      animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.03,
        ease: "easeOut",
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -2,
              transition: {
                duration: 0.15,
                ease: "easeOut",
              },
            }
      }
      whileTap={
        shouldReduceMotion
          ? undefined
          : {
              scale: 0.99,
              transition: {
                duration: 0.1,
                ease: "easeInOut",
              },
            }
      }
      aria-label={`Team member: ${member.name}, ${member.role}`}
      role="article"
      tabIndex={0}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cognition-500/3 via-transparent to-consciousness-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />

      {/* Image section */}
      <div className="relative h-60 w-full overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-cognition-100/10 to-consciousness-100/10 dark:from-cognition-900/10 dark:to-consciousness-900/10" />

        {member.image_url ? (
          <div className="relative h-full w-full">
            <Image
              src={member.image_url}
              alt={member.name}
              fill
              className="object-cover object-center transition-transform duration-200 ease-out group-hover:scale-102"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 4}
            />
            {/* Very subtle overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cognition-500 to-consciousness-600">
            <div className="text-center">
              <FaUser className="mx-auto mb-2 text-6xl text-white/80" />
              <span className="text-2xl font-bold text-white">
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content section */}
      <div className="relative p-5">
        {/* Name and role */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cognition-600 dark:group-hover:text-cognition-400 transition-colors duration-150">
            {member.name}
          </h3>
          <p className="text-sm font-medium text-cognition-600 dark:text-cognition-400 leading-relaxed">
            {member.role}
          </p>
        </div>

        {/* Superpower section */}
        {member.superpower && (
          <div className="mb-4 p-3 bg-gradient-to-r from-cognition-50 to-consciousness-50 dark:from-cognition-900/20 dark:to-consciousness-900/20 rounded-xl border border-cognition-100/30 dark:border-cognition-700/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="text-cognition-600 dark:text-cognition-400">
                {getSuperpowerIcon(member.superpower)}
              </div>
              <p className="text-xs font-semibold text-cognition-600 dark:text-cognition-400 uppercase tracking-wider">
                Superpower
              </p>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {member.superpower}
            </p>
          </div>
        )}

        {/* Contact links */}
        <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-gray-700/30">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-cognition-100 dark:bg-cognition-900/30 text-cognition-600 dark:text-cognition-400 hover:bg-cognition-200 dark:hover:bg-cognition-800/50 hover:scale-105 transition-all duration-150 ease-out group/link"
              aria-label={`Email ${member.name}`}
            >
              <FaEnvelope className="w-4 h-4" />
            </a>
          )}

          {member.linkedin_url && (
            <a
              href={member.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-cognition-100 dark:bg-cognition-900/30 text-cognition-600 dark:text-cognition-400 hover:bg-cognition-200 dark:hover:bg-cognition-800/50 hover:scale-105 transition-all duration-150 ease-out group/link"
              aria-label={`${member.name}'s LinkedIn profile`}
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
          )}

          {/* Spacer to push contact buttons to the left */}
          <div className="flex-1" />
        </div>
      </div>

      {/* Very subtle corner accent */}
      <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-cognition-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
    </motion.article>
  );
}
