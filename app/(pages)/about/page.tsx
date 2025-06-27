"use client";
import React from "react";
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
import drGanesanProfile from "@/lib/data/dr_saptharishi_ganesan_profile.json";
import Link from "next/link";

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
                  <FaQuestion className="text-4xl mb-4 text-cognition-600 dark:text-cognition-400" />
                ),
                title: "What?",
                description:
                  "To improve outcomes for critically ill patients with acute disorders of cognition and consciousness.",
              },
              {
                icon: (
                  <FaSearch className="text-4xl mb-4 text-consciousness-600 dark:text-consciousness-400" />
                ),
                title: "How?",
                description:
                  "Through the development and validation of functional neuroimaging modalities as tools for accurate prediction and timely detection of pathological brain states.",
              },
              {
                icon: (
                  <FaBullseye className="text-4xl mb-4 text-care-600 dark:text-care-400" />
                ),
                title: "Why?",
                description:
                  "The long-term consequences of brain injury acquired prior to or during critical illness are debilitating. Our work will improve survival and mitigate morbidity associated with brain injury.",
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

        {/* About Us Section */}
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
                  Our Dedicated Research
                </h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300 text-lg">
                  <p>
                    Our dedicated research group focuses on uncovering
                    groundbreaking discoveries in altered cognition and
                    consciousness in critically ill children.
                  </p>
                  <p>
                    By understanding the complex neurophysiology underlying
                    these pathological brain states, we can develop tools to
                    predict and detect such neurological problems in a timely
                    manner. Accurate prediction and/or early detection of such
                    conditions would positively impact the long-term functional
                    outcomes of these children.
                  </p>
                  <p>
                    Our work is driven by our passion for improving the lives of
                    children and their families. Join us on this journey as we
                    strive to make a difference in the world of pediatric
                    survivors of critical illness. Together, we can create a
                    brighter future for our young patients.
                  </p>
                </div>
                <div className="mt-8">
                  <a
                    href="/projects"
                    className="inline-block bg-cognition-600 hover:bg-cognition-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    View all projects
                  </a>
                </div>
              </div>

              {/* Image */}
              <div className="md:w-1/2">
                <div className="relative rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/mission.jpg" // Update this path to your actual image location
                    alt="Our Mission in Pediatric Research"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* About the PI Section */}
        <section className="py-16 mb-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                About the PI
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cognition-500 to-care-500 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Dr. Rishi Ganesan, MD, DM, MSc
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                {/* PI Image */}
                <motion.div
                  className="w-full md:w-1/3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden shadow-xl">
                    <Image
                      src="/team/dr-ganesan.jpg"
                      alt="Dr. Rishi Ganesan"
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>

                {/* PI Bio */}
                <motion.div
                  className="w-full md:w-2/3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Pediatric Intensive Care Physician-Researcher
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Dr. Rishi Ganesan is a paediatric intensive care
                    physician-researcher with additional expertise in paediatric
                    neurocritical care. He is a physician in the Division of
                    Paediatric Critical Care Medicine at the Children's
                    Hospital- London Health Sciences Centre, Assistant Professor
                    in the Department of Paediatrics at the Schulich School of
                    Medicine (Western University) and an Associate Scientist at
                    the Lawson Health Research Institute.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Education & Training
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        • MD, DM (Pediatric Critical Care), MSc (Neurosciences)
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        Research Focus
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Developing EEG-based monitoring tools for improving
                        outcomes in critically ill children.
                      </p>
                    </div>

                    <div className="pt-4">
                      <Link
                        href="/about-pi"
                        className="inline-flex items-center text-cognition-600 dark:text-cognition-400 hover:underline font-medium"
                      >
                        View Full Profile
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 ml-1"
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
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <motion.section
          className="py-16 bg-gray-50 dark:bg-gray-900"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Team
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cognition-500 to-care-500 mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Meet the talented individuals driving our research forward
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {teamMembers.slice(0, 4).map((member, index) => (
                <motion.div
                  key={member.name}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 relative">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cognition-400 to-cognition-600">
                        <span className="text-6xl text-white font-bold">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {member.name}
                    </h3>
                    <p className="text-cognition-600 dark:text-cognition-400 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                      {member.bio.replace(/'/g, "&apos;")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href="/team"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cognition-600 hover:bg-cognition-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cognition-500 transition-colors"
              >
                View Full Team
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
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
            </div>
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
