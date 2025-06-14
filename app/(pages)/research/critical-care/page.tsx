"use client";

import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaLungs,
  FaFlask,
  FaChartLine,
  FaMicroscope,
  FaUserMd,
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
    icon: <FaHeartbeat className="w-8 h-8 text-red-600 dark:text-red-400" />,
    title: "Cardiovascular Support",
    description:
      "Advanced hemodynamic monitoring and support strategies for critically ill patients",
  },
  {
    icon: <FaLungs className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
    title: "Respiratory Care",
    description:
      "Mechanical ventilation optimization and lung-protective strategies",
  },
  {
    icon: <FaFlask className="w-8 h-8 text-purple-600 dark:text-purple-400" />,
    title: "Critical Care Pharmacology",
    description: "Precision dosing and pharmacokinetic/pharmacodynamic studies",
  },
  {
    icon: (
      <FaChartLine className="w-8 h-8 text-green-600 dark:text-green-400" />
    ),
    title: "Clinical Outcomes",
    description: "Long-term recovery and quality of life assessment",
  },
];

const publications: Publication[] = [
  {
    title:
      "Optimizing mechanical ventilation in acute respiratory distress syndrome: A prospective cohort study",
    authors: "Smith JL, et al.",
    journal: "American Journal of Respiratory and Critical Care Medicine",
    year: 2024,
    link: "#",
  },
  {
    title:
      "Hemodynamic monitoring in septic shock: A randomized controlled trial",
    authors: "Johnson MD, et al.",
    journal: "Critical Care Medicine",
    year: 2023,
    link: "#",
  },
  {
    title:
      "Precision dosing of antimicrobials in critically ill patients: A systematic review",
    authors: "Williams KA, et al.",
    journal: "Clinical Pharmacology & Therapeutics",
    year: 2023,
    link: "#",
  },
];

export default function CriticalCareResearchPage() {
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
              Critical Care Research
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Advancing the science of intensive care through innovative
              research
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
                Our critical care research program focuses on improving outcomes
                for patients with life-threatening illnesses and injuries. We
                conduct translational research that bridges the gap between
                laboratory discoveries and clinical practice.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Through multidisciplinary collaboration, we aim to develop new
                therapies, optimize existing treatments, and improve patient
                care in the ICU setting.
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
                  VENT-PRO Study
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  A multicenter trial comparing ventilation strategies in ARDS
                  patients.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-sm rounded-full">
                    Recruiting
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm rounded-full">
                    Phase III
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
                  SEPTIC-TRIAL
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Investigating novel sepsis management protocols in ICU
                  settings.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 text-sm rounded-full">
                    Ongoing
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm rounded-full">
                    12 Sites
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
            institutions interested in advancing critical care medicine.
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
