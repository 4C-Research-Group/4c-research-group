"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaLinkedin,
  FaTwitter,
  FaGraduationCap,
  FaFlask,
  FaAward,
  FaHospital,
} from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";

export default function AboutPIPage() {
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
        <div className="container relative mx-auto px-4 py-20 md:py-24 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-64 h-64 md:w-72 md:h-72 rounded-xl overflow-hidden border-4 border-white/80 shadow-2xl mb-8"
            >
              <Image
                src="/team/team-1.jpg"
                alt="Dr. Rishi Ganesan"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
                  Dr. Rishi Ganesan
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Physician-Scientist | Pediatric Critical Care | Neurocritical
                Care
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="#"
                  className="p-2 rounded-full bg-cognition-100/80 dark:bg-cognition-800/50 hover:bg-cognition-200/80 dark:hover:bg-cognition-700/50 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin className="w-5 h-5 text-cognition-600 dark:text-cognition-400" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-full bg-cognition-100/80 dark:bg-cognition-800/50 hover:bg-cognition-200/80 dark:hover:bg-cognition-700/50 transition-colors"
                  aria-label="Google Scholar Profile"
                >
                  <AiFillGoogleCircle className="w-5 h-5 text-cognition-600 dark:text-cognition-400" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent"></div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-xl bg-cognition-100 dark:bg-cognition-900/50 text-cognition-600 dark:text-cognition-300 mr-4">
                  <FaGraduationCap className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cognition-600 to-care-500 bg-clip-text text-transparent">
                  About Dr. Rishi Ganesan
                </h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Dr. Rishi Ganesan is a distinguished physician-scientist
                  specializing in Pediatric Critical Care and Neurocritical
                  Care. With a passion for improving outcomes in critically ill
                  children, Dr. Ganesan combines clinical expertise with
                  cutting-edge research to advance the field of pediatric
                  neurocritical care.
                </p>
                <div className="grid md:grid-cols-2 gap-8 mt-10">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <FaHospital className="mr-2 text-cognition-500" />
                      Clinical Focus
                    </h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="text-cognition-500 mr-2">•</span>
                        <span>Pediatric Critical Care Medicine</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cognition-500 mr-2">•</span>
                        <span>Pediatric Neurocritical Care</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cognition-500 mr-2">•</span>
                        <span>Pediatric Traumatic Brain Injury</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cognition-500 mr-2">•</span>
                        <span>Status Epilepticus Management</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                      <FaGraduationCap className="mr-2 text-cognition-500" />
                      Education
                    </h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="text-cognition-500 mr-2">•</span>
                        <div>
                          <p className="font-medium">
                            MBBS, JIPMER, Puducherry
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            2004 - 2009
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cognition-500 mr-2">•</span>
                        <div>
                          <p className="font-medium">MD in Pediatrics</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            PGIMER, Chandigarh, 2010 - 2012
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="text-cognition-500 mr-2">•</span>
                        <div>
                          <p className="font-medium">
                            DM in Pediatric Critical Care
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            PGIMER, Chandigarh, 2013 - 2016
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Research Focus */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-xl bg-cognition-100 dark:bg-cognition-900/50 text-cognition-600 dark:text-cognition-300 mr-4">
                  <FaFlask className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cognition-600 to-care-500 bg-clip-text text-transparent">
                  Research Focus
                </h2>
              </div>
              <div className="prose dark:prose-invert max-w-none">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                      Dr. Ganesan is an accomplished clinical researcher with 19
                      peer-reviewed original publications in high-impact
                      journals, including three randomized controlled trials.
                      His research has been cited more than 180 times, and he
                      has been invited to present at numerous national and
                      international conferences.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      Currently, Dr. Ganesan is pursuing a Master&apos;s (MSc)
                      in neurosciences at the Institute of Medical Sciences,
                      University of Toronto (2017-20).
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-cognition-50 to-cognition-100 dark:from-cognition-900/30 dark:to-cognition-900/50 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Research Highlights
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cognition-500 text-white text-sm font-medium mr-3 flex-shrink-0">
                          1
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Development of EEG-based monitoring tools for brain
                          states
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cognition-500 text-white text-sm font-medium mr-3 flex-shrink-0">
                          2
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Neuroprotective strategies in pediatric critical care
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-cognition-500 text-white text-sm font-medium mr-3 flex-shrink-0">
                          3
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Outcome prediction in pediatric brain injury
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-10">
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-xl bg-cognition-100 dark:bg-cognition-900/50 text-cognition-600 dark:text-cognition-300 mr-4">
                  <FaAward className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cognition-600 to-care-500 bg-clip-text text-transparent">
                  Awards & Recognition
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Young Investigator Award",
                    year: "2022",
                    description:
                      "Awarded for outstanding research in pediatric neurocritical care",
                  },
                  {
                    title: "Excellence in Teaching",
                    year: "2021",
                    description:
                      "Recognized for exceptional contributions to medical education",
                  },
                  {
                    title: "Research Fellowship",
                    year: "2020",
                    description:
                      "Awarded by the National Institute of Health for innovative research",
                  },
                  {
                    title: "Best Paper Award",
                    year: "2019",
                    description:
                      "For groundbreaking research published in Journal of Pediatrics",
                  },
                  {
                    title: "Clinical Excellence Award",
                    year: "2018",
                    description:
                      "Recognizing outstanding patient care and clinical skills",
                  },
                  {
                    title: "Early Career Researcher",
                    year: "2017",
                    description: "Awarded by the Pediatric Academic Societies",
                  },
                ].map((award, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="text-cognition-500 text-sm font-medium mb-2">
                      {award.year}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {award.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {award.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
