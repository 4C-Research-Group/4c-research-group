"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaBrain, FaHeartbeat, FaFlask, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import drGanesanProfile from "@/lib/data/dr_saptharishi_ganesan_profile.json";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
};

export default function AboutPage() {
  const teamMembers: TeamMember[] = [
    {
      name: "Dr. Saptharishi Ganesan",
      role: "Founder & Director",
      bio: "Pediatric Critical Care Physician and Neuroscientist leading the 4C Research Group.",
      image: "/team/dr-ganesan.jpg",
      linkedin: drGanesanProfile.contact.linkedin,
    },
    // Add more team members as needed
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cognition-50 to-white dark:from-cognition-900 dark:to-gray-900">
        <div className="container mx-auto px-4 py-20 md:py-24">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cognition-900 dark:text-white mb-6">
              About 4C Research
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Advancing the frontiers of Cognition, Consciousness, and Critical
              Care through innovative research
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent"></div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cognition-500 to-care-500 mx-auto mb-6"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <FaBrain className="text-4xl mb-4 text-cognition-600 dark:text-cognition-400" />
                ),
                title: "Cognition",
                description:
                  "Exploring the neural and computational mechanisms of human thought, learning, and decision-making processes.",
              },
              {
                icon: (
                  <FaFlask className="text-4xl mb-4 text-consciousness-600 dark:text-consciousness-400" />
                ),
                title: "Consciousness",
                description:
                  "Investigating the nature of awareness and subjective experience in both health and disease states.",
              },
              {
                icon: (
                  <FaHeartbeat className="text-4xl mb-4 text-care-600 dark:text-care-400" />
                ),
                title: "Critical Care",
                description:
                  "Advancing patient care through innovative research in intensive care medicine and cognitive recovery.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="text-center">
                  {item.icon}
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Team
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cognition-500 to-care-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Meet the brilliant minds driving innovation in cognitive and
              critical care research
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {member.name}
                      </h3>
                      <p className="text-cognition-600 dark:text-cognition-400 font-medium">
                        {member.role}
                      </p>
                    </div>
                    {member.linkedin && (
                      <a
                        href={`https://${member.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-cognition-600 dark:hover:text-cognition-400 transition-colors"
                      >
                        <FaLinkedin className="text-2xl" />
                      </a>
                    )}
                  </div>
                  <p className="mt-4 text-gray-700 dark:text-gray-300">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Research Focus */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Research Focus
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cognition-500 to-care-500 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
                At 4C Research, we&apos;re dedicated to transforming patient
                outcomes through cutting-edge research at the intersection of
                neuroscience and critical care medicine.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Key Areas
                </h3>
                <ul className="space-y-4">
                  {[
                    "Cognitive assessment in critical care settings",
                    "Neural mechanisms of consciousness",
                    "Neuroprotective strategies in critical illness",
                    "Long-term cognitive outcomes in critical care survivors",
                    "Advanced neuroimaging techniques in critical care",
                  ].map((item, index) => (
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
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Our Approach
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We combine clinical expertise with cutting-edge research
                  methodologies to address some of the most challenging
                  questions in cognitive and critical care medicine. Our
                  interdisciplinary approach brings together experts from
                  neuroscience, medicine, engineering, and data science.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Our ultimate goal is to translate our findings into clinical
                  practice, improving outcomes for patients with critical
                  illnesses and neurological conditions.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
