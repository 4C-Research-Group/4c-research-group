"use client";

import { motion } from "framer-motion";
import {
  FaBrain,
  FaHeartbeat,
  FaRegLightbulb,
  FaRegClock,
  FaChartLine,
  FaMicroscope,
} from "react-icons/fa";
import Link from "next/link";

type ResearchFocus = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

type Publication = {
  title: string;
  authors: string;
  journal: string;
  year: number;
  link: string;
};

const focusAreas: ResearchFocus[] = [
  {
    icon: <FaBrain className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
    title: "Neural Correlates of Consciousness",
    description:
      "Investigating brain activity patterns associated with different states of consciousness in critical care patients.",
  },
  {
    icon: <FaHeartbeat className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
    title: "Consciousness Monitoring",
    description:
      "Developing and validating tools for continuous assessment of consciousness levels in ICU patients.",
  },
  {
    icon: (
      <FaRegLightbulb className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
    ),
    title: "Disorders of Consciousness",
    description:
      "Studying the mechanisms and outcomes of coma, vegetative state, and minimally conscious state.",
  },
  {
    icon: <FaChartLine className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />,
    title: "Consciousness Recovery",
    description:
      "Tracking and predicting recovery trajectories in patients with impaired consciousness.",
  },
];

const publications: Publication[] = [
  {
    title:
      "Advanced neuroimaging techniques in the assessment of consciousness disorders: A systematic review",
    authors: "Anderson RK, et al.",
    journal: "Nature Reviews Neurology",
    year: 2024,
    link: "#",
  },
  {
    title:
      "EEG-based consciousness monitoring in critically ill patients: Current evidence and future directions",
    authors: "Martinez GH, et al.",
    journal: "Intensive Care Medicine",
    year: 2023,
    link: "#",
  },
  {
    title:
      "Predictors of consciousness recovery in post-anoxic brain injury: A prospective multicenter study",
    authors: "Chen L, et al.",
    journal: "Neurology",
    year: 2023,
    link: "#",
  },
];

export default function ConsciousnessResearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-900 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Consciousness Research
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Exploring the frontiers of awareness, perception, and cognition in
              critical care
            </motion.p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Research Overview
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Our consciousness research program investigates the neural and
                cognitive basis of awareness in critical care settings. We focus
                on understanding, measuring, and supporting consciousness in
                patients with severe brain injuries, neurological disorders, and
                those recovering from critical illness.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Through cutting-edge neuroimaging, electrophysiology, and
                behavioral assessment techniques, we aim to improve diagnosis,
                prognosis, and treatment for patients with disorders of
                consciousness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Research Focus Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {focusAreas.map((area, index) => (
              <motion.div
                key={area.title}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-cyan-50 dark:bg-cyan-900 rounded-full flex items-center justify-center mb-6">
                  {area.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {area.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing Projects */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Ongoing Research Projects
            </h2>

            <div className="space-y-8">
              <motion.div
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                  CONSCIOUS-ICU Study
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  A multi-center study investigating the neural mechanisms of
                  consciousness recovery in ICU patients with acute brain
                  injury.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-sm rounded-full">
                    Ongoing
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm rounded-full">
                    8 Sites
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
                  AWAKE Trial
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  A randomized controlled trial of a novel pharmacological
                  intervention to promote consciousness recovery in patients
                  with severe brain injury.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-sm rounded-full">
                    Recruiting
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm rounded-full">
                    Phase II/III
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Selected Publications
            </h2>
            <div className="space-y-6">
              {publications.map((pub, index) => (
                <motion.div
                  key={pub.title}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    <Link
                      href={pub.link}
                      className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                    >
                      {pub.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                    {pub.authors}
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-sm">
                    {pub.journal}, {pub.year}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/publications"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors"
              >
                View All Publications
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-16 bg-cyan-600 dark:bg-cyan-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Join Our Research
          </h2>
          <p className="text-xl text-cyan-100 dark:text-cyan-200 mb-8 max-w-3xl mx-auto">
            We welcome collaborations with clinicians, researchers, and
            institutions interested in advancing consciousness science.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-cyan-700 font-medium rounded-md hover:bg-gray-100 transition-colors"
            >
              Contact Our Team
            </Link>
            <Link
              href="/research/participate"
              className="px-6 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
            >
              Participate in Research
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
