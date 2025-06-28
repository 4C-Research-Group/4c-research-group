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
  FaGraduationCap,
} from "react-icons/fa";
import {
  getTeamMembers,
  getPrincipalInvestigator,
  getTestimonials,
  type TeamMember,
  type Testimonial,
} from "@/lib/supabase/team";

const TeamMemberCard = lazy(() => import("@/components/TeamMemberCard"));

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [principalInvestigator, setPrincipalInvestigator] =
    useState<TeamMember | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setError(null);
        const [members, pi, testimonialData] = await Promise.all([
          getTeamMembers(),
          getPrincipalInvestigator(),
          getTestimonials(),
        ]);

        setTeamMembers(members || []);
        setPrincipalInvestigator(pi);
        setTestimonials(testimonialData || []);
      } catch (error) {
        console.error("Error loading team data:", error);
        setError("Failed to load team data. Please try again later.");
        // Set empty arrays to prevent further errors
        setTeamMembers([]);
        setPrincipalInvestigator(null);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section - Show immediately even when loading */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cognition-50 via-white to-consciousness-50 dark:from-cognition-900 dark:via-gray-900 dark:to-consciousness-900">
          {/* Background Bubbles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cognition-200/20 dark:bg-cognition-700/10 rounded-full animate-pulse-slow" />
            <div className="absolute top-40 right-20 w-96 h-96 bg-consciousness-200/20 dark:bg-consciousness-700/10 rounded-full animate-pulse-slow" />
            <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-care-200/20 dark:bg-care-700/10 rounded-full animate-pulse-slow" />
          </div>
          <div className="container mx-auto px-4 py-20 md:py-24 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-cognition-900 dark:text-white mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
                  Meet Our Team
                </span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Dedicated researchers and healthcare professionals working
                together to advance pediatric critical care
              </motion.p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent"></div>
        </section>

        {/* Loading Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cognition-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
              Loading team data...
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cognition-50 via-white to-consciousness-50 dark:from-cognition-900 dark:via-gray-900 dark:to-consciousness-900">
        {/* Background Bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cognition-200/20 dark:bg-cognition-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-consciousness-200/20 dark:bg-consciousness-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-care-200/20 dark:bg-care-700/10 rounded-full animate-pulse-slow" />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-cognition-900 dark:text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
                Meet Our Team
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Dedicated researchers and healthcare professionals working
              together to advance pediatric critical care
            </motion.p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent"></div>
      </section>

      {/* Principal Investigator */}
      {principalInvestigator && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-cognition-600 p-8 flex flex-col items-center">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-200 shadow-lg mb-6">
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
                  <p className="text-cognition-100 text-center mb-6">
                    {principalInvestigator.role}
                  </p>
                  <div className="flex space-x-4">
                    {principalInvestigator.email && (
                      <a
                        href={`mailto:${principalInvestigator.email}`}
                        className="text-white hover:text-cognition-200"
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
                        className="text-white hover:text-cognition-200"
                        aria-label="LinkedIn"
                      >
                        <FaLinkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="md:w-2/3 p-8">
                  <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      About {principalInvestigator.name.split(" ").slice(-1)[0]}
                    </h3>
                    {principalInvestigator.bio && (
                      <p className="text-gray-700 dark:text-gray-300">
                        {principalInvestigator.bio}
                      </p>
                    )}
                  </div>
                  <div className="mt-6">
                    <a
                      href="/about-pi"
                      className="text-cognition-600 dark:text-cognition-400"
                    >
                      View full profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Error Display */}
      {error && (
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-2xl">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
              <p className="text-red-800 dark:text-red-200 text-lg">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Team Members */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Our Team Members
            </h2>
            <div className="w-20 h-1 bg-cognition-600 mx-auto"></div>
          </div>

          {teamMembers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Suspense
                fallback={
                  <div className="col-span-3 text-center py-8">
                    Loading team members...
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
                    }}
                    index={index}
                  />
                ))}
              </Suspense>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No team members found.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Student Testimonials
            </h2>
            <div className="w-20 h-1 bg-cognition-600 mx-auto"></div>
          </div>

          {testimonials.length > 0 ? (
            <div className="space-y-12 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  <div className="md:flex">
                    {/* Left Column - Image */}
                    <div className="md:w-1/3 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                      <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
                        {testimonial.image_url ? (
                          <Image
                            src={testimonial.image_url}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            loading={index > 1 ? "lazy" : "eager"}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-cognition-400 to-cognition-600 flex items-center justify-center">
                            <span className="text-6xl text-white font-bold">
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right Column - Content */}
                    <div className="md:w-2/3 p-8">
                      <div className="relative pl-4 border-l-4 border-cognition-400 mb-6">
                        <p className="text-gray-700 dark:text-gray-300 italic pl-6">
                          &ldquo;{testimonial.quote}&rdquo;
                        </p>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {testimonial.name}
                        </h3>
                        <p className="text-cognition-600 dark:text-cognition-400 font-medium mb-4">
                          {testimonial.role}
                        </p>

                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Bio
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          {testimonial.bio}
                        </p>
                        <div className="flex items-start text-sm text-gray-500 dark:text-gray-400">
                          <FaGraduationCap className="mt-0.5 mr-2 flex-shrink-0" />
                          <span>{testimonial.education}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No testimonials available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Join Mission 4C
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              We are always looking for passionate students to join our team. If
              you are interested in joining our team, please send your CV to:
            </p>
            <a
              href="mailto:rishi.ganesan@lhsc.on.ca"
              className="inline-flex items-center px-6 py-3 bg-cognition-600 hover:bg-cognition-700 text-white font-medium rounded-lg transition-colors mb-8"
            >
              <FaEnvelope className="mr-2" />
              rishi.ganesan@lhsc.on.ca
            </a>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Read more about previous students&apos; experiences with Mission
              4C above!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
