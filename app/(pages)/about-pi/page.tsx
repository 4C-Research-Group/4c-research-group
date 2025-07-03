"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaUserMd,
  FaUniversity,
  FaAward,
  FaBrain,
  FaBook,
  FaChalkboardTeacher,
  FaStar,
  FaLinkedin,
  FaResearchgate,
  FaGoogle,
} from "react-icons/fa";
import { SiOrcid } from "react-icons/si";
import RichTextContent from "@/components/ui/rich-text-content";
import type { AboutPI } from "@/lib/types/about-pi";

export default function AboutPIPage() {
  const [data, setData] = useState<AboutPI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/about-pi");
        if (response.ok) {
          const aboutData = await response.json();
          setData(aboutData);
        }
      } catch (error) {
        console.error("Error fetching about PI data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cognition-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Page Not Available
          </h1>
          <p className="text-gray-600">
            The About PI page is currently unavailable.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cognition-50 via-white to-consciousness-50 dark:from-cognition-900 dark:via-gray-900 dark:to-consciousness-900">
        {/* Background Bubbles (restored for theme consistency) */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-48 h-48 md:w-72 md:h-72 bg-cognition-200/20 dark:bg-cognition-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute top-40 right-20 w-64 h-64 md:w-96 md:h-96 bg-consciousness-200/20 dark:bg-consciousness-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-20 left-1/4 w-56 h-56 md:w-80 md:h-80 bg-care-200/20 dark:bg-care-700/10 rounded-full animate-pulse-slow" />
        </div>
        <div className="container relative mx-auto px-4 py-20 md:py-24 z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden border-4 border-white/80 shadow-2xl mb-6"
          >
            <Image
              src="/team/team-1.jpg"
              alt="Dr. Saptharishi (Rishi) Ganesan"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
              {data.name}
            </h1>
            <div className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-2 flex items-center justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cognition-100 dark:bg-cognition-800 text-cognition-700 dark:text-cognition-200 font-semibold text-sm">
                {data.pronouns}
              </span>
              {data.title.split("|").map((title, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-care-100 dark:bg-care-800 text-care-700 dark:text-care-200 font-semibold text-sm"
                >
                  {title.trim()}
                </span>
              ))}
            </div>
            {/* Social Links */}
            <div className="flex justify-center gap-4 mb-4 mt-2">
              {data.linkedin_url && (
                <a
                  href={data.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-cognition-100 dark:bg-cognition-800 hover:bg-cognition-200 dark:hover:bg-cognition-700 transition-colors shadow"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-6 h-6 text-cognition-600 dark:text-cognition-300" />
                </a>
              )}
              {data.google_scholar_url && (
                <a
                  href={data.google_scholar_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-care-100 dark:bg-care-800 hover:bg-care-200 dark:hover:bg-care-700 transition-colors shadow"
                  aria-label="Google Scholar"
                >
                  <FaGoogle className="w-6 h-6 text-care-600 dark:text-care-300" />
                </a>
              )}
              {data.researchgate_url && (
                <a
                  href={data.researchgate_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-consciousness-100 dark:bg-consciousness-800 hover:bg-consciousness-200 dark:hover:bg-consciousness-700 transition-colors shadow"
                  aria-label="ResearchGate"
                >
                  <FaResearchgate className="w-6 h-6 text-consciousness-600 dark:text-consciousness-300" />
                </a>
              )}
              {data.orcid_url && (
                <a
                  href={data.orcid_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-cognition-100 dark:bg-cognition-800 hover:bg-cognition-200 dark:hover:bg-cognition-700 transition-colors shadow"
                  aria-label="ORCID"
                >
                  <SiOrcid className="w-6 h-6 text-cognition-600 dark:text-cognition-300" />
                </a>
              )}
            </div>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
              {data.hero_description}
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent"></div>
      </section>

      <div className="container mx-auto px-4 py-12 max-w-5xl space-y-12">
        {/* About Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8"
        >
          <h2 className="text-2xl font-bold mb-3 bg-gradient-to-r from-cognition-600 to-care-500 bg-clip-text text-transparent">
            About
          </h2>
          <div className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
            <RichTextContent
              content={data.about_content}
              className="text-base text-gray-700 dark:text-gray-300 leading-relaxed"
            />
          </div>
        </motion.section>

        {/* Current Positions & Leadership */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex items-center mb-4">
            <FaUserMd className="w-6 h-6 text-cognition-500 mr-3" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cognition-600 to-care-500 bg-clip-text text-transparent">
              Current Positions & Leadership
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {data.current_positions.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl shadow-sm flex flex-col justify-between h-full"
              >
                <div className="font-semibold text-cognition-700 dark:text-cognition-200 mb-1">
                  {item.title}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {item.subtitle}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Education & Training */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex items-center mb-4">
            <FaUniversity className="w-6 h-6 text-care-500 mr-3" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-care-600 to-cognition-500 bg-clip-text text-transparent">
              Education & Training
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {data.education.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl shadow-sm flex flex-col justify-between h-full"
              >
                <div className="font-semibold text-care-700 dark:text-care-200 mb-1">
                  {item.title}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {item.subtitle}
                </div>
                {item.note && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 whitespace-pre-line">
                    {item.note}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Professional Experience */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex items-center mb-4">
            <FaBook className="w-6 h-6 text-consciousness-500 mr-3" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-consciousness-600 to-care-500 bg-clip-text text-transparent">
              Professional Experience
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {data.professional_experience.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl shadow-sm flex flex-col justify-between h-full"
              >
                <div className="font-semibold text-consciousness-700 dark:text-consciousness-200 mb-1">
                  {item.title}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {item.institution} ({item.period})
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Research & Awards */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex items-center mb-4">
            <FaBrain className="w-6 h-6 text-cognition-500 mr-3" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cognition-600 to-care-500 bg-clip-text text-transparent">
              Research & Awards
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {data.research_awards.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl shadow-sm flex flex-col justify-between h-full"
              >
                <div className="font-semibold text-cognition-700 dark:text-cognition-200 mb-1">
                  {item.title}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {item.description}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {item.year}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex items-center mb-4">
            <FaStar className="w-6 h-6 text-care-500 mr-3" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-care-600 to-cognition-500 bg-clip-text text-transparent">
              Skills
            </h2>
          </div>
          {/* Industry Knowledge */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-cognition-700 dark:text-cognition-200 mb-2">
              Industry Knowledge
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Pediatric Intensive Care",
                "Neurocritical Care",
                "Teacher Mentoring",
                "Procedural Sedation",
                "Pediatric Critical Care Outreach",
                "Pediatrics",
                "Critical Care",
                "Innovation",
                "Public Health",
                "Medical Education",
                "Medical Research",
                "Clinical Research",
                "Clinical Trials",
                "Neuroscience",
                "Medical Diagnostics",
                "Critical care neurophysiology",
                "Brain focused ICU care",
                "Medicine",
                "Acute Care",
                "Research",
                "Resident Education",
                "Fellow Education",
              ].map((skill, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-cognition-100 dark:bg-cognition-900 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
          {/* Tools & Technologies */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-cognition-700 dark:text-cognition-200 mb-2">
              Tools & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Python (Programming Language)",
                "SPSS",
                "Quantitative EEG",
                "Electroencephalography",
                "Machine Learning",
                "Medical Writing",
                "Quality & Safety",
              ].map((skill, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-care-100 dark:bg-care-900 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
          {/* Other Skills */}
          <div>
            <h3 className="text-lg font-semibold text-cognition-700 dark:text-cognition-200 mb-2">
              Other Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Systems Neuroscience",
                "Medical Diagnostics",
                "Medical Research",
                "Clinical Research",
                "Resident Education",
                "Fellow Education",
              ].map((skill, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-consciousness-100 dark:bg-consciousness-900 rounded-full text-sm text-gray-700 dark:text-gray-300 shadow-sm"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Volunteering */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex items-center mb-4">
            <FaStar className="w-6 h-6 text-cognition-500 mr-3" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cognition-600 to-care-500 bg-clip-text text-transparent">
              Volunteering
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {[
              {
                role: "MD Admissions Interviewer",
                org: "University of Toronto",
                years: "Jan 2018 - Dec 2019 · 2 yrs",
                desc: "Interviewed and rated applicants for the MD program at University of Toronto.",
              },
              {
                role: "Organizer - Blood donation camps",
                org: "PGIMER, Chandigarh",
                years: "Jan 2010 - Jun 2016 · 6 yrs 6 mos",
                desc: "Organized blood donation camps, mobilized 187 donors in a single drive, and promoted blood donation awareness.",
              },
              {
                role: "Student Volunteer",
                org: "JIPMER, Puducherry",
                years: "Jan 2008 - Dec 2008 · 1 yr",
                desc: "Visited 12 remote villages in Tamil Nadu to deliver health education on breastfeeding during World Breastfeeding Awareness Week.",
              },
              {
                role: "Volunteer - Content Expert",
                org: "92.7 Big FM Chandigarh",
                years: "Jan 2013 - Dec 2014 · 2 yrs",
                desc: "Content expert for radio broadcasts to improve awareness about diabetes and infectious diseases in Chandigarh.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl shadow-sm flex flex-col h-full"
              >
                <div className="font-semibold text-cognition-700 dark:text-cognition-200 mb-1">
                  {item.role}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  {item.org}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {item.years}
                </div>
                <div className="text-xs text-gray-700 dark:text-gray-300">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Recommendations */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex items-center mb-4">
            <FaStar className="w-6 h-6 text-care-500 mr-3" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-care-600 to-cognition-500 bg-clip-text text-transparent">
              Recommendations
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl shadow-sm flex flex-col h-full">
              <div className="font-semibold text-cognition-700 dark:text-cognition-200 mb-1">
                Tom Schepens
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                PICU staff physician at UZ Gent
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                March 28, 2019 &middot; Worked with Dr. Saptharishi on the same
                team
              </div>
              <div className="text-base text-gray-700 dark:text-gray-300 italic">
                &quot;Rishi is someone you absolutely love as a colleague. He is
                a hard working and disciplined clinician, an earnest teacher and
                a gifted researcher. Most importantly, he remains the helpful
                generous person he has always been. He has a charming
                personality and is a great team player, fun to be around with,
                in and out of the hospital!&quot;
              </div>
            </div>
          </div>
        </motion.section>

        {/* Licenses & Certifications */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex items-center mb-4">
            <FaStar className="w-6 h-6 text-cognition-500 mr-3" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cognition-600 to-care-500 bg-clip-text text-transparent">
              Licenses & Certifications
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {[
              {
                title: "Faculty Success Program Alumni, Cohort 44",
                org: "NCFDD",
                issued: "Issued Jul 2024",
                expires: null,
                credential: null,
              },
              {
                title: "Canada GCP",
                org: "CITI Program",
                issued: "Issued Mar 2024",
                expires: "Expires Mar 2027",
                credential: "Credential ID 60833875",
              },
              {
                title:
                  "Health Canada Division 5 - Drugs For Clinical Trials Involving Human Subjects",
                org: "CITI Program",
                issued: "Issued Mar 2024",
                expires: "Expires Mar 2026",
                credential: "Credential ID 64077350",
              },
              {
                title:
                  "Health Canada Division 5 - Drugs For Clinical Trials Involving Human Subjects",
                org: "CITI Program",
                issued: "Issued Mar 2024",
                expires: "Expires Mar 2027",
                credential: "Credential ID 61542765",
              },
              {
                title: "DM Pediatric Critical Care",
                org: "Medical Council of India",
                issued: "Issued Jul 2016",
                expires: null,
                credential: null,
              },
              {
                title: "MBBS - Medical Degree",
                org: "Medical Council of India",
                issued: "Issued Dec 2009",
                expires: null,
                credential: null,
              },
              {
                title: "MD Pediatrics",
                org: "Medical Council of India",
                issued: null,
                expires: null,
                credential: null,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl shadow-sm flex flex-col h-full"
              >
                <div className="font-semibold text-cognition-700 dark:text-cognition-200 mb-1">
                  {item.title}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  {item.org}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                  {item.issued}
                  {item.expires ? ` · ${item.expires}` : ""}
                </div>
                {item.credential && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                    {item.credential}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.section>

        {/* Organizations */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex items-center mb-4">
            <FaStar className="w-6 h-6 text-care-500 mr-3" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-care-600 to-cognition-500 bg-clip-text text-transparent">
              Organizations
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl shadow-sm flex flex-col h-full">
              <div className="font-semibold text-cognition-700 dark:text-cognition-200 mb-1">
                American Clinical Neurophysiology Society
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                Member
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                Jan 2017 - Present
              </div>
            </div>
          </div>
        </motion.section>

        {/* Publications */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8"
        >
          <div className="flex items-center mb-4">
            <FaStar className="w-6 h-6 text-care-500 mr-3" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-care-600 to-cognition-500 bg-clip-text text-transparent">
              Publications
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-6">
            {data.publications.map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl shadow-sm flex flex-col h-full"
              >
                <div className="font-semibold text-cognition-700 dark:text-cognition-200 mb-1">
                  {item.title}
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                  {item.journal}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {item.year}
                </div>
                {item.doi && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    DOI: {item.doi}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <a
              href="http://localhost:3000/publications"
              className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-cognition-600 to-care-600 text-white font-semibold shadow hover:from-cognition-700 hover:to-care-700 transition-colors text-base"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Full List of Publications
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
