"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaBrain,
  FaHeartbeat,
  FaFlask,
  FaLinkedin,
  FaQuestion,
  FaSearch,
  FaBullseye,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import LoadingSpinner from "@/components/ui/loading-spinner";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
};

export default function AboutPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("pages")
        .select("content")
        .eq("slug", "about")
        .single();
      if (error) {
        setError("Failed to load about page content.");
        setLoading(false);
        return;
      }
      let parsedContent = null;
      if (typeof data?.content === "string") {
        parsedContent = JSON.parse(data.content);
      }
      setContent(parsedContent);
      setLoading(false);
    }
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }
  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error || "No content found."}
      </div>
    );
  }

  // Extract content sections
  const hero = content.hero || {};
  const mission = content.mission || {};
  const aboutUs = content.aboutUs || {};
  const pi = content.pi || {};
  const researchFocus = content.researchFocus || {};

  const missionCards = [
    {
      icon: (
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-cognition-100 dark:bg-cognition-900/30 rounded-full">
            <FaQuestion className="text-4xl text-cognition-600 dark:text-cognition-400" />
          </div>
        </div>
      ),
      title: mission.whatTitle || "What?",
      description:
        mission.whatDescription ||
        "To improve outcomes for critically ill patients with acute disorders of cognition and consciousness.",
    },
    {
      icon: (
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-consciousness-100 dark:bg-consciousness-900/30 rounded-full">
            <FaSearch className="text-4xl text-consciousness-600 dark:text-consciousness-400" />
          </div>
        </div>
      ),
      title: mission.howTitle || "How?",
      description:
        mission.howDescription ||
        "Through the development and validation of functional neuroimaging modalities as tools for accurate prediction and timely detection of pathological brain states.",
    },
    {
      icon: (
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-care-100 dark:bg-care-900/30 rounded-full">
            <FaBullseye className="text-4xl text-care-600 dark:text-care-400" />
          </div>
        </div>
      ),
      title: mission.whyTitle || "Why?",
      description:
        mission.whyDescription ||
        "The long-term consequences of brain injury acquired prior to or during critical illness are debilitating. Our work will improve survival and mitigate morbidity associated with brain injury.",
    },
  ];

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
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-cognition-900 dark:text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
                {hero.title || "About 4C Research"}
              </span>
            </h1>
            {hero.subtitle ? (
              <p
                className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                dangerouslySetInnerHTML={{ __html: hero.subtitle }}
              />
            ) : (
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Advancing the frontiers of Cognition, Consciousness, and
                Critical Care through innovative research
              </p>
            )}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent"></div>
      </section>

      <div className="container mx-auto px-4 py-16 relative">
        {/* Subtle background shapes for visual consistency */}
        <div className="absolute -z-10 top-32 left-0 w-64 h-64 bg-cognition-100/30 dark:bg-cognition-900/10 rounded-full blur-2xl" />
        <div className="absolute -z-10 bottom-10 right-0 w-80 h-80 bg-care-100/30 dark:bg-care-900/10 rounded-full blur-2xl" />

        {/* Mission Section */}
        {mission.title && (
          <motion.section
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {mission.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cognition-500 to-care-500 mx-auto mb-6"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {missionCards.map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.icon}
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p
                      className="text-gray-700 dark:text-gray-300"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                  ) : (
                    <p className="text-gray-700 dark:text-gray-300">
                      {item.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* About Us Section */}
        {aboutUs.title && (
          <motion.section
            className="py-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-12">
                {/* Text Content */}
                <div className="md:w-1/2">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    {aboutUs.title}
                  </h2>
                  <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg">
                    {aboutUs.description ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: aboutUs.description,
                        }}
                      />
                    ) : (
                      <>
                        <p>
                          Our dedicated research group focuses on uncovering
                          groundbreaking discoveries in altered cognition and
                          consciousness in critically ill children.
                        </p>
                        <p>
                          By understanding the complex neurophysiology
                          underlying these pathological brain states, we can
                          develop tools to predict and detect such neurological
                          problems in a timely manner. Accurate prediction
                          and/or early detection of such conditions would
                          positively impact the long-term functional outcomes of
                          these children.
                        </p>
                        <p>
                          Our work is driven by our passion for improving the
                          lives of children and their families. Join us on this
                          journey as we strive to make a difference in the world
                          of pediatric survivors of critical illness. Together,
                          we can create a brighter future for our young
                          patients.
                        </p>
                      </>
                    )}
                  </div>
                  {aboutUs.buttonText && aboutUs.buttonLink && (
                    <div className="mt-8">
                      <a
                        href={aboutUs.buttonLink}
                        className="inline-block bg-cognition-600 hover:bg-cognition-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                      >
                        {aboutUs.buttonText}
                      </a>
                    </div>
                  )}
                </div>

                {/* Image */}
                {aboutUs.image && (
                  <div className="md:w-1/2">
                    <div className="relative rounded-xl overflow-hidden shadow-xl">
                      <Image
                        src={aboutUs.image}
                        alt={
                          aboutUs.imageAlt ||
                          "Our Mission in Pediatric Research"
                        }
                        width={600}
                        height={400}
                        className="w-full h-auto object-cover"
                        priority
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}

        {/* About the PI Section */}
        {pi.title && (
          <section className="py-16 mb-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {pi.title}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-cognition-500 to-care-500 mx-auto mb-6"></div>
                {pi.subtitle && (
                  <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                    {pi.subtitle}
                  </p>
                )}
              </div>

              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  {/* PI Image */}
                  {pi.image && (
                    <motion.div
                      className="w-full md:w-1/3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl">
                        <Image
                          src={pi.image}
                          alt={pi.imageAlt || "Principal Investigator"}
                          width={600}
                          height={600}
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* PI Bio */}
                  <motion.div
                    className="w-full md:w-2/3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {pi.name && (
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {pi.name}
                      </h3>
                    )}
                    <div className="text-gray-700 dark:text-gray-300 mb-4">
                      {pi.bio ? (
                        <div dangerouslySetInnerHTML={{ __html: pi.bio }} />
                      ) : (
                        <p>
                          Dr. Rishi Ganesan is a paediatric intensive care
                          physician-researcher with additional expertise in
                          paediatric neurocritical care. He is a physician in
                          the Division of Paediatric Critical Care Medicine at
                          the Children&apos;s Hospital - London Health Sciences
                          Centre, Assistant Professor in the Department of
                          Paediatrics at the Schulich School of Medicine
                          (Western University) and an Associate Scientist at the
                          Lawson Health Research Institute.
                        </p>
                      )}
                    </div>

                    {pi.education && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            Education & Training
                          </h4>
                          <div
                            className="text-gray-700 dark:text-gray-300"
                            dangerouslySetInnerHTML={{ __html: pi.education }}
                          />
                        </div>
                      </div>
                    )}

                    {pi.researchFocus && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            Research Focus
                          </h4>
                          <div
                            className="text-gray-700 dark:text-gray-300"
                            dangerouslySetInnerHTML={{
                              __html: pi.researchFocus,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="pt-4 flex flex-wrap gap-6">
                      {pi.profileLink && (
                        <Link
                          href={pi.profileLink}
                          className="inline-flex items-center text-cognition-600 dark:text-cognition-400 hover:underline font-medium whitespace-nowrap"
                        >
                          {pi.profileLinkText || "View Full Profile"}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-1 flex-shrink-0"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Link>
                      )}
                      {pi.teamLink && (
                        <Link
                          href={pi.teamLink}
                          className="inline-flex items-center text-cognition-600 dark:text-cognition-400 hover:underline font-medium whitespace-nowrap"
                        >
                          {pi.teamLinkText || "View Full Team"}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-1 flex-shrink-0"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Research Focus */}
        {researchFocus.title && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {researchFocus.title}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-cognition-500 to-care-500 mx-auto mb-6"></div>
                {researchFocus.subtitle && (
                  <p
                    className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto"
                    dangerouslySetInnerHTML={{ __html: researchFocus.subtitle }}
                  />
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {researchFocus.keyAreas && (
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      {researchFocus.keyAreasTitle || "Key Areas"}
                    </h3>
                    <ul className="space-y-4">
                      {researchFocus.keyAreas.map(
                        (item: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <svg
                              className="h-6 w-6 text-cognition-500 mr-2 mt-0.5 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                              {item}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                {researchFocus.approach && (
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                      {researchFocus.approachTitle || "Our Approach"}
                    </h3>
                    <div
                      className="text-gray-700 dark:text-gray-300"
                      dangerouslySetInnerHTML={{
                        __html: researchFocus.approach,
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
