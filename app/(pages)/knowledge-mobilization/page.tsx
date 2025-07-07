"use client";

import {
  FaBookMedical,
  FaUserNurse,
  FaUserMd,
  FaFilePdf,
  FaVideo,
  FaBookReader,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import PageHero from "@/components/PageHero";
import Link from "next/link";

type ResourceCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
};

const ResourceCard = ({
  title,
  description,
  icon,
  link,
}: ResourceCardProps) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    whileHover={{ y: -5 }}
  >
    <div className="p-6">
      <div className="text-cognition-600 dark:text-cognition-400 text-3xl mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      {link && link !== "#" ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cognition-600 dark:text-cognition-400 hover:underline font-medium inline-flex items-center"
        >
          Learn more
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      ) : (
        <span className="text-gray-400 font-medium inline-flex items-center cursor-not-allowed opacity-60">
          Learn more
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </span>
      )}
    </div>
  </motion.div>
);

export default function KnowledgeMobilization() {
  const [showBanner, setShowBanner] = useState(true);

  const patientResources = [
    {
      title: "Understanding Delirium",
      description:
        "A comprehensive guide to understanding delirium, its symptoms, and management strategies.",
      icon: <FaBookMedical />,
      link: "#",
    },
    {
      title: "Caregiver's Handbook",
      description:
        "Essential information for caregivers of patients with cognitive impairments.",
      icon: <FaBookReader />,
      link: "#",
    },
    {
      title: "Patient Recovery Stories",
      description:
        "Inspirational stories from patients who have experienced critical illnesses.",
      icon: <FaVideo />,
      link: "#",
    },
  ];

  const nurseResources = [
    {
      title: "Delirium Assessment Tools",
      description:
        "Standardized tools and protocols for assessing delirium in critical care settings.",
      icon: <FaFilePdf />,
      link: "#",
    },
    {
      title: "Best Practices in ICU Care",
      description:
        "Evidence-based practices for preventing and managing delirium in ICU patients.",
      icon: <FaBookMedical />,
      link: "#",
    },
    {
      title: "Family Communication Guide",
      description:
        "Effective communication strategies for discussing critical care with families.",
      icon: <FaUserNurse />,
      link: "#",
    },
  ];

  const doctorResources = [
    {
      title: "Clinical Guidelines",
      description:
        "Latest clinical practice guidelines for managing disorders of consciousness.",
      icon: <FaFilePdf />,
      link: "#",
    },
    {
      title: "Research Publications",
      description:
        "Access to the latest research articles and publications from our team.",
      icon: <FaBookMedical />,
      link: "#",
    },
    {
      title: "Case Studies",
      description:
        "Detailed case studies of complex cases and their management approaches.",
      icon: <FaUserMd />,
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Under Development Notice - Floating Overlay */}
      {showBanner && (
        <div
          className="fixed bottom-6 right-6 z-50 bg-yellow-100/80 backdrop-blur-md border border-yellow-400 text-yellow-800 px-6 py-4 rounded-xl shadow-lg flex items-center space-x-4"
          role="alert"
          style={{ pointerEvents: "auto" }}
        >
          <div>
            <span className="font-bold">Page Under Development: </span>
            <span>
              This page is currently under development. Content and resources
              may change.
            </span>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="ml-2 text-yellow-800 hover:text-yellow-900 font-bold text-2xl focus:outline-none"
            aria-label="Dismiss notice"
          >
            &times;
          </button>
        </div>
      )}
      {/* Main Page Content */}
      <div>
        {/* Hero Section */}
        <PageHero
          title="Knowledge Mobilization"
          subtitle="Bridging the gap between research and practice through education and resources for patients, nurses, and healthcare professionals."
        />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          {/* Patients Section */}
          <section className="mb-20">
            <div className="flex items-center mb-8">
              <div className="p-3 rounded-full bg-cognition-100 dark:bg-cognition-900 mr-4">
                <FaBookMedical className="text-2xl text-cognition-600 dark:text-cognition-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                For Patients & Families
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {patientResources.map((resource, index) => (
                <ResourceCard key={index} {...resource} />
              ))}
            </div>
          </section>

          {/* Nurses Section */}
          <section className="mb-20">
            <div className="flex items-center mb-8">
              <div className="p-3 rounded-full bg-cognition-100 dark:bg-cognition-900 mr-4">
                <FaUserNurse className="text-2xl text-cognition-600 dark:text-cognition-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                For Nurses & Healthcare Staff
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nurseResources.map((resource, index) => (
                <ResourceCard key={index} {...resource} />
              ))}
            </div>
          </section>

          {/* Doctors Section */}
          <section>
            <div className="flex items-center mb-8">
              <div className="p-3 rounded-full bg-cognition-100 dark:bg-cognition-900 mr-4">
                <FaUserMd className="text-2xl text-cognition-600 dark:text-cognition-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                For Physicians & Researchers
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctorResources.map((resource, index) => (
                <ResourceCard key={index} {...resource} />
              ))}
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <section className="bg-cognition-700 dark:bg-cognition-900 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Have Questions or Need More Information?
            </h2>
            <p className="text-xl text-cognition-100 mb-8 max-w-3xl mx-auto">
              Our team is here to help. Reach out to us for more resources or to
              learn about our research.
            </p>
            <Link href="/contact" passHref legacyBehavior>
              <a className="bg-white text-cognition-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition-colors duration-300">
                Contact Us
              </a>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
