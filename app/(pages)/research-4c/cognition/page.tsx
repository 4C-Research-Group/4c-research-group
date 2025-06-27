"use client";

import { motion } from "framer-motion";
import {
  FaBrain,
  FaFlask,
  FaBookOpen,
  FaUserMd,
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
    icon: (
      <FaBrain className="w-8 h-8 text-cognition-600 dark:text-cognition-400" />
    ),
    title: "Cognitive Impairment in Critical Illness",
    description:
      "Investigating the prevalence, mechanisms, and long-term outcomes of cognitive dysfunction following critical illness and ICU stays.",
  },
  {
    icon: (
      <FaUserMd className="w-8 h-8 text-cognition-600 dark:text-cognition-400" />
    ),
    title: "Delirium Prevention & Management",
    description:
      "Developing and testing interventions to prevent and manage delirium in critical care settings.",
  },
  {
    icon: (
      <FaChartLine className="w-8 h-8 text-cognition-600 dark:text-cognition-400" />
    ),
    title: "Cognitive Rehabilitation",
    description:
      "Designing and evaluating cognitive rehabilitation programs for ICU survivors experiencing post-intensive care syndrome.",
  },
  {
    icon: (
      <FaMicroscope className="w-8 h-8 text-cognition-600 dark:text-cognition-400" />
    ),
    title: "Biomarkers of Cognitive Decline",
    description:
      "Identifying biological markers that predict long-term cognitive outcomes following critical illness.",
  },
];

const publications: Publication[] = [
  {
    title:
      "Long-term cognitive impairment after critical illness: a systematic review and meta-analysis",
    authors: "Smith PJ, et al.",
    journal: "JAMA Neurology",
    year: 2024,
    link: "#",
  },
  {
    title:
      "Cognitive and psychological outcomes following critical illness: current understanding and future directions",
    authors: "Johnson RW, et al.",
    journal: "Critical Care Medicine",
    year: 2023,
    link: "#",
  },
  {
    title:
      "The impact of delirium on long-term cognitive trajectory in ICU survivors",
    authors: "Williams LM, et al.",
    journal: "Intensive Care Medicine",
    year: 2023,
    link: "#",
  },
];

export default function CognitionResearchPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-cognition-50 to-white dark:from-cognition-900 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Cognition in Critical Care Research
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Advancing understanding and treatment of cognitive impairment in
              critical illness survivors
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
                Our research focuses on understanding and addressing the
                cognitive challenges faced by survivors of critical illness.
                Many patients experience significant cognitive impairment after
                intensive care unit (ICU) stays, which can persist for years and
                significantly impact quality of life.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Through interdisciplinary collaboration, we investigate the
                mechanisms of cognitive decline, identify at-risk populations,
                and develop targeted interventions to improve cognitive outcomes
                for critical illness survivors.
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
                <div className="w-16 h-16 bg-cognition-50 dark:bg-cognition-900 rounded-full flex items-center justify-center mb-6">
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
                <h3 className="text-xl font-bold text-cognition-600 dark:text-cognition-400 mb-2">
                  COG-ICU Study
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  A prospective cohort study examining the long-term cognitive
                  trajectories of ICU survivors and identifying risk factors for
                  cognitive decline.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cognition-100 dark:bg-cognition-900 text-cognition-800 dark:text-cognition-200 text-sm rounded-full">
                    Ongoing
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm rounded-full">
                    500+ Participants
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
                <h3 className="text-xl font-bold text-cognition-600 dark:text-cognition-400 mb-2">
                  MIND-ICU Trial
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  A randomized controlled trial evaluating a novel cognitive
                  rehabilitation program for ICU survivors with persistent
                  cognitive impairment.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cognition-100 dark:bg-cognition-900 text-cognition-800 dark:text-cognition-200 text-sm rounded-full">
                    Recruiting
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm rounded-full">
                    Target: 300 Participants
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
                      className="hover:text-cognition-600 dark:hover:text-cognition-400 transition-colors"
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
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cognition-600 hover:bg-cognition-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cognition-500 transition-colors"
              >
                View All Publications
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-16 bg-cognition-600 dark:bg-cognition-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Interested in Our Research?
          </h2>
          <p className="text-xl text-cognition-100 dark:text-cognition-200 mb-8 max-w-3xl mx-auto">
            We&apos;re always looking for collaborators, research participants,
            and passionate individuals to join our mission.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-cognition-700 font-medium rounded-md hover:bg-gray-100 transition-colors"
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
