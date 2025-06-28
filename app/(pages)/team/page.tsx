"use client";

import { useMemo, lazy, Suspense, useEffect, useState } from "react";
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

  useEffect(() => {
    async function loadData() {
      try {
        const [members, pi, testimonialData] = await Promise.all([
          getTeamMembers(),
          getPrincipalInvestigator(),
          getTestimonials(),
        ]);

        setTeamMembers(members);
        setPrincipalInvestigator(pi);
        setTestimonials(testimonialData);
      } catch (error) {
        console.error("Error loading team data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cognition-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Loading team data...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-cognition-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our Team
            </h1>
            <p className="text-xl text-cognition-100">
              Dedicated researchers and healthcare professionals working
              together to advance pediatric critical care
            </p>
          </div>
        </div>
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

      {/* Team Members */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Our Team Members
            </h2>
            <div className="w-20 h-1 bg-cognition-600 mx-auto"></div>
          </div>

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
