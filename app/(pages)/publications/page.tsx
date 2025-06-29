"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaFilePdf,
  FaResearchgate,
  FaGoogle,
  FaOrcid,
} from "react-icons/fa";
import LoadingSpinner from "@/components/ui/loading-spinner";

const ORCID_PROFILE_URL = "https://orcid.org/0000-0002-2599-9119";

export default function PublicationsPage() {
  const [publications, setPublications] = useState<any[]>([]);
  const [sortBy, setSortBy] = useState<"year" | "title">("year");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPubs() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/publications");
        if (!res.ok) throw new Error("Failed to fetch publications");
        const data = await res.json();
        setPublications(data);
      } catch (e: any) {
        setError(e.message || "Error loading publications");
      } finally {
        setLoading(false);
      }
    }
    fetchPubs();
  }, []);

  function getSortedPubs() {
    if (sortBy === "year") {
      return [...publications].sort((a, b) => (b.year || 0) - (a.year || 0));
    } else {
      return [...publications].sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cognition-50 via-white to-consciousness-50 dark:from-cognition-900 dark:via-gray-900 dark:to-consciousness-900">
        {/* Background Bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cognition-200/20 dark:bg-cognition-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-consciousness-200/20 dark:bg-consciousness-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-care-200/20 dark:bg-care-700/10 rounded-full animate-pulse-slow" />
        </div>
        <div className="container mx-auto px-4 py-20 md:py-24 relative z-10 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-cognition-900 dark:text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
                Publications
              </span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our latest research contributions and scholarly work
            </motion.p>

            {/* Profile Links */}
            <motion.div
              className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a
                href="https://www.researchgate.net/profile/Saptharishi-Lalgudi-Ganesan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow text-sm sm:text-base"
              >
                <FaResearchgate className="text-green-600 dark:text-green-400 mr-2 flex-shrink-0" />
                <span className="truncate">ResearchGate</span>
              </a>
              <a
                href="http://scholar.google.com/citations?user=iuxSVQwAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow text-sm sm:text-base"
              >
                <FaGoogle className="text-blue-500 dark:text-blue-400 mr-2 flex-shrink-0" />
                <span className="truncate">Google Scholar</span>
              </a>
              <a
                href={ORCID_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow text-sm sm:text-base"
              >
                <FaOrcid className="text-green-700 dark:text-green-500 mr-2 flex-shrink-0" />
                <span className="truncate">ORCID</span>
              </a>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent"></div>
      </section>

      {/* Publications List */}
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-7xl">
        <div className="max-w-4xl mx-auto w-full">
          <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
            <button
              className={`px-3 py-2 rounded border text-sm sm:text-base w-full sm:w-auto ${sortBy === "year" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-blue-600"}`}
              onClick={() => setSortBy("year")}
            >
              Sort by Year
            </button>
            <button
              className={`px-3 py-2 rounded border text-sm sm:text-base w-full sm:w-auto ${sortBy === "title" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-blue-600"}`}
              onClick={() => setSortBy("title")}
            >
              Sort by Title
            </button>
          </div>
          {loading && (
            <div className="text-center py-8">
              <LoadingSpinner message="Loading publications..." />
            </div>
          )}
          {error && (
            <div className="text-red-500 text-center py-8">{error}</div>
          )}
          {publications.length > 0 ? (
            <div className="space-y-6 sm:space-y-8">
              {getSortedPubs().map((pub, index) => (
                <motion.div
                  key={pub.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight break-words">
                    {pub.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm sm:text-base break-words">
                    {pub.authors}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 break-words">
                    {pub.journal}, {pub.year}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {pub.externalIds && pub.externalIds.length > 0 && (
                      <div className="text-sm">
                        {pub.externalIds.map((eid: any, i: number) =>
                          eid.type === "doi" ? (
                            <a
                              key={i}
                              href={`https://doi.org/${eid.value}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cognition-600 dark:text-cognition-400 hover:underline flex items-center text-xs sm:text-sm break-all"
                            >
                              <FaExternalLinkAlt className="mr-1 flex-shrink-0" />
                              <span className="truncate">DOI: {eid.value}</span>
                            </a>
                          ) : null
                        )}
                      </div>
                    )}
                    {pub.url && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cognition-600 dark:text-cognition-400 hover:underline flex items-center text-xs sm:text-sm"
                      >
                        <FaExternalLinkAlt className="mr-1 flex-shrink-0" />
                        <span>View Publication</span>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg px-4">
                Publications will be listed here soon. Please check back later.
              </p>
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex items-center px-4 sm:px-6 py-3 bg-cognition-600 hover:bg-cognition-700 text-white font-medium rounded-lg transition-colors text-sm sm:text-base"
                >
                  View All Works
                  <FaExternalLinkAlt className="ml-2" />
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
