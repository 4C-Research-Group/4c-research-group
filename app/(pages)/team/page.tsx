"use client";

import { useMemo, lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaUser,
  FaUserTie,
} from "react-icons/fa";
import {
  getTeamMembers,
  getPrincipalInvestigator,
  type TeamMember,
} from "@/lib/supabase/team";
import LoadingSpinner from "@/components/ui/loading-spinner";
import PageHero from "@/components/PageHero";

const TeamMemberCard = lazy(() => import("@/components/TeamMemberCard"));

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [principalInvestigator, setPrincipalInvestigator] =
    useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setError(null);
        const [members, pi] = await Promise.all([
          getTeamMembers(),
          getPrincipalInvestigator(),
        ]);

        // Filter out the PI from the team members list to avoid duplication
        const filteredMembers =
          members?.filter((member) => !member.is_principal_investigator) || [];
        setTeamMembers(filteredMembers);
        setPrincipalInvestigator(pi);
      } catch (error) {
        console.error("Error loading team data:", error);
        setError("Failed to load team data. Please try again later.");
        // Set empty arrays to prevent further errors
        setTeamMembers([]);
        setPrincipalInvestigator(null);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section - Show immediately even when loading */}
        <PageHero
          title="Meet Our Team"
          subtitle="Dedicated researchers and healthcare professionals working together to advance pediatric critical care"
        />

        {/* Loading Content */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <LoadingSpinner message="Loading team data..." size="lg" />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <PageHero
        title="Meet Our Team"
        subtitle="Dedicated researchers and healthcare professionals working together to advance pediatric critical care"
      />

      {/* Principal Investigator */}
      {principalInvestigator && (
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto max-w-6xl px-2 sm:px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-cognition-50 to-cognition-100 dark:from-cognition-900/20 dark:to-cognition-800/20 rounded-3xl transform rotate-1"></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
                {/* Header section */}
                <div className="bg-gradient-to-r from-cognition-600 to-cognition-700 px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-white/20 rounded-full">
                      <FaUserTie className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Principal Investigator
                      </h2>
                      <p className="text-cognition-100 text-sm">
                        Leading our research initiatives
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row">
                  {/* Image section */}
                  <div className="w-full lg:w-2/5 bg-gradient-to-br from-cognition-50 to-cognition-100 dark:from-cognition-900/30 dark:to-cognition-800/30 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-cognition-600 rounded-full -translate-x-16 -translate-y-16"></div>
                      <div className="absolute bottom-0 right-0 w-24 h-24 bg-cognition-600 rounded-full translate-x-12 translate-y-12"></div>
                    </div>

                    <div className="relative z-10 text-center">
                      <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 sm:border-6 lg:border-8 border-white/20 shadow-2xl mb-4 sm:mb-6 mx-auto">
                        {principalInvestigator.image_url ? (
                          <Image
                            src={principalInvestigator.image_url}
                            alt={principalInvestigator.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
                            priority
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-cognition-400 to-cognition-600 flex items-center justify-center">
                            <FaUser className="text-white text-4xl sm:text-6xl lg:text-8xl" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
                        {principalInvestigator.name}
                      </h3>
                      <p className="text-cognition-600 dark:text-cognition-400 text-sm sm:text-base lg:text-lg xl:text-xl font-medium">
                        {principalInvestigator.role}
                      </p>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="w-full lg:w-3/5 p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
                    <div className="space-y-4 sm:space-y-6">
                      {principalInvestigator.bio && (
                        <div className="prose dark:prose-invert max-w-none">
                          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                            {principalInvestigator.bio}
                          </p>
                        </div>
                      )}

                      {/* Contact section */}
                      <div className="pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                          Get in Touch
                        </h4>
                        <div className="space-y-2 sm:space-y-3">
                          {principalInvestigator.email && (
                            <motion.a
                              href={`mailto:${principalInvestigator.email}`}
                              className="flex items-center space-x-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-cognition-50 dark:hover:bg-cognition-900/30 transition-all duration-200 group"
                              whileHover={{ x: 5 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.1 }}
                            >
                              <div className="p-2 bg-cognition-100 dark:bg-cognition-800 rounded-lg group-hover:bg-cognition-200 dark:group-hover:bg-cognition-700 transition-colors">
                                <FaEnvelope className="w-4 h-4 text-cognition-600 dark:text-cognition-400" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Email
                                </p>
                                <p className="text-gray-900 dark:text-white font-medium text-sm sm:text-base break-all">
                                  {principalInvestigator.email}
                                </p>
                              </div>
                            </motion.a>
                          )}

                          {principalInvestigator.linkedin_url && (
                            <motion.a
                              href={principalInvestigator.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-cognition-50 dark:hover:bg-cognition-900/30 transition-all duration-200 group"
                              whileHover={{ x: 5 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.1 }}
                            >
                              <div className="p-2 bg-cognition-100 dark:bg-cognition-800 rounded-lg group-hover:bg-cognition-200 dark:group-hover:bg-cognition-700 transition-colors">
                                <FaLinkedin className="w-4 h-4 text-cognition-600 dark:text-cognition-400" />
                              </div>
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  LinkedIn
                                </p>
                                <p className="text-gray-900 dark:text-white font-medium">
                                  Connect on LinkedIn
                                </p>
                              </div>
                            </motion.a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Team Members */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Our Team Members
            </h2>
            <div className="w-20 h-1 bg-cognition-600 mx-auto"></div>
          </div>

          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
              <Suspense
                fallback={
                  <div className="col-span-full text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cognition-600 border-r-transparent"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      Loading team members...
                    </p>
                  </div>
                }
              >
                {teamMembers.map((member, index) => (
                  <TeamMemberCard
                    key={member.id}
                    member={member}
                    index={index}
                  />
                ))}
              </Suspense>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No team members found.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
