"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaUserGraduate,
  FaUsers,
  FaLightbulb,
  FaGraduationCap,
} from "react-icons/fa";
import { getTestimonials, type Testimonial } from "@/lib/supabase/team";
import Image from "next/image";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Join4CLabPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        setError(null);
        const testimonialData = await getTestimonials();
        setTestimonials(testimonialData || []);
      } catch (error) {
        console.error("Error loading testimonials:", error);
        setError("Failed to load testimonials. Please try again later.");
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    }

    loadTestimonials();
  }, []);

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
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-cognition-900 dark:text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
                Join Mission 4C
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              We are always looking for passionate students to join our team. If
              you are interested in joining our team, please send your CV to:
            </motion.p>
            <motion.div
              className="flex items-center justify-center space-x-2 text-xl md:text-2xl font-semibold text-cognition-600 dark:text-cognition-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FaEnvelope className="text-2xl" />
              <a
                href="mailto:rishi.ganesan@lhsc.on.ca"
                className="hover:text-cognition-800 dark:hover:text-cognition-300 transition-colors"
              >
                rishi.ganesan@lhsc.on.ca
              </a>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent"></div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Read more about previous students&apos; experiences with Mission
              4C below!
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto" />
          </motion.div>

          {/* Why Join 4C Lab */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
              <div className="bg-cognition-100 dark:bg-cognition-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUserGraduate className="text-2xl text-cognition-600 dark:text-cognition-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Research Excellence
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Work on cutting-edge research in cognition, consciousness, and
                critical care. Gain hands-on experience with state-of-the-art
                methodologies and technologies.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
              <div className="bg-consciousness-100 dark:bg-consciousness-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers className="text-2xl text-consciousness-600 dark:text-consciousness-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Collaborative Environment
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Join a diverse team of researchers, clinicians, and students.
                Learn from experts and contribute to meaningful research that
                makes a difference.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
              <div className="bg-care-100 dark:bg-care-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaLightbulb className="text-2xl text-care-600 dark:text-care-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Innovation & Growth
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Develop your skills in a supportive environment that encourages
                innovation and personal growth. Build your research portfolio
                and network.
              </p>
            </div>
          </motion.div>

          {/* Student Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Student Testimonials
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto" />
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
                Hear from our previous students about their experiences with
                Mission 4C
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <LoadingSpinner message="Loading testimonials..." size="md" />
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 dark:text-red-400">{error}</p>
              </div>
            ) : testimonials.length > 0 ? (
              <div className="space-y-8 max-w-5xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
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
                          <p className="text-gray-700 dark:text-gray-300 italic pl-6 text-lg">
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
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  No testimonials available at the moment. Check back soon!
                </p>
              </div>
            )}
          </motion.div>

          {/* Application Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-16"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              How to Apply
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Required Documents
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="bg-cognition-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      1
                    </span>
                    <span>Updated CV/Resume</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-cognition-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      2
                    </span>
                    <span>Cover letter explaining your interest</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-cognition-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      3
                    </span>
                    <span>Academic transcripts (if applicable)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-cognition-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      4
                    </span>
                    <span>References (upon request)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Application Steps
                </h3>
                <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="bg-consciousness-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      1
                    </span>
                    <span>Send your CV to rishi.ganesan@lhsc.on.ca</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-consciousness-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      2
                    </span>
                    <span>Include a brief cover letter in the email</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-consciousness-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      3
                    </span>
                    <span>Wait for our team to review your application</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-consciousness-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      4
                    </span>
                    <span>
                      We&apos;ll contact you for an interview if selected
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-cognition-600 to-consciousness-600 rounded-2xl shadow-xl p-8 text-center text-white"
          >
            <h2 className="text-2xl font-bold mb-4">
              Ready to Join Our Mission?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Send your CV today and take the first step towards contributing to
              groundbreaking research in cognition, consciousness, and critical
              care.
            </p>
            <a
              href="mailto:rishi.ganesan@lhsc.on.ca"
              className="inline-flex items-center bg-white text-cognition-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              <FaEnvelope className="mr-2" />
              Send Your CV
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
