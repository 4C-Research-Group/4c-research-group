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

        setTeamMembers(members || []);
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
        <motion.section
          className="relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative pt-32 pb-20 md:pt-40 md:pb-28">
            <div className="container mx-auto px-4">
              <motion.div
                className="max-w-4xl mx-auto text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                  Meet Our Team
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Dedicated researchers and healthcare professionals working
                  together to advance pediatric critical care
                </p>
              </motion.div>
            </div>
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-cognition-500/5 to-transparent"></div>
            </div>
          </div>
        </motion.section>

        {/* Loading Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <p className="text-red-800 dark:text-red-200 text-lg">
                Loading team data...
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
              >
                Try Again
              </button>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Meet Our Team
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Dedicated researchers and healthcare professionals working
                together to advance pediatric critical care
              </p>
            </motion.div>
          </div>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cognition-500/5 to-transparent"></div>
          </div>
        </div>
      </motion.section>

      {/* Principal Investigator */}
      {principalInvestigator && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="md:flex">
                <div className="md:w-1/3 relative">
                  <div className="h-full w-full bg-gradient-to-br from-cognition-500 to-cognition-600 p-8 flex flex-col items-center justify-center">
                    <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl mb-6">
                      <Image
                        src={
                          principalInvestigator.image_url ||
                          "/team/placeholder.jpg"
                        }
                        alt={principalInvestigator.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-white text-center">
                      {principalInvestigator.name}
                    </h2>
                    <p className="text-cognition-100 text-center text-lg mb-6">
                      {principalInvestigator.role}
                    </p>
                    <div className="flex space-x-4">
                      {principalInvestigator.email && (
                        <a
                          href={`mailto:${principalInvestigator.email}`}
                          className="text-white hover:text-cognition-200 transition-colors"
                          aria-label="Email"
                        >
                          <FaEnvelope className="w-5 h-5" />
                        </a>
                      )}
                      {principalInvestigator.linkedin_url && (
                        <a
                          href={principalInvestigator.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-cognition-200 transition-colors"
                          aria-label="LinkedIn"
                        >
                          <FaLinkedin className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3 p-8 md:p-10">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      About {principalInvestigator.name.split(" ").slice(-1)[0]}
                    </h3>
                    {principalInvestigator.bio && (
                      <div className="space-y-4 text-gray-700 dark:text-gray-300">
                        {principalInvestigator.bio
                          .split("\n")
                          .map((paragraph, i) => (
                            <p key={i} className="leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-8">
                    <a
                      href="/about-pi"
                      className="inline-flex items-center text-cognition-600 dark:text-cognition-400 hover:text-cognition-700 dark:hover:text-cognition-300 font-medium transition-colors"
                    >
                      View full profile
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Error Display */}
      {error && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <p className="text-red-800 dark:text-red-200 text-lg">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
              >
                Try Again
              </button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Team Members */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Team Members
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cognition-500 to-cognition-600 mx-auto rounded-full"></div>
          </motion.div>

          {teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                    member={{
                      name: member.name,
                      role: member.role,
                      superpower: member.superpower || "",
                      image: member.image_url,
                      email: member.email,
                      linkedin_url: member.linkedin_url,
                    }}
                    index={index}
                  />
                ))}
              </Suspense>
            </div>
          ) : !loading && !error ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <FaUser className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No team members found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Check back later for updates
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
