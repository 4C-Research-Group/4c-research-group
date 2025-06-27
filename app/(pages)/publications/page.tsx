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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-cognition-50 to-white dark:from-cognition-900 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Publications
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our latest research contributions and scholarly work
            </motion.p>

            {/* Profile Links */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a
                href="https://www.researchgate.net/profile/Saptharishi-Lalgudi-Ganesan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <FaResearchgate className="text-green-600 dark:text-green-400 mr-2" />
                ResearchGate Profile
              </a>
              <a
                href="http://scholar.google.com/citations?user=iuxSVQwAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <FaGoogle className="text-blue-500 dark:text-blue-400 mr-2" />
                Google Scholar Profile
              </a>
              <a
                href={ORCID_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <FaOrcid className="text-green-700 dark:text-green-500 mr-2" />
                ORCID Profile
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Publications List */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex gap-4 items-center">
            <button
              className={`px-3 py-1 rounded border ${sortBy === "year" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-blue-600"}`}
              onClick={() => setSortBy("year")}
            >
              Sort by Year
            </button>
            <button
              className={`px-3 py-1 rounded border ${sortBy === "title" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border-blue-600"}`}
              onClick={() => setSortBy("title")}
            >
              Sort by Title
            </button>
          </div>
          {loading && <div>Loading publications...</div>}
          {error && <div className="text-red-500">{error}</div>}
          {publications.length > 0 ? (
            <div className="space-y-8">
              {getSortedPubs().map((pub, index) => (
                <motion.div
                  key={pub.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {pub.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {pub.authors}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    {pub.journal}, {pub.year}
                  </p>
                  <div className="flex space-x-4">
                    {pub.externalIds && pub.externalIds.length > 0 && (
                      <div className="text-sm">
                        {pub.externalIds.map((eid: any, i: number) =>
                          eid.type === "doi" ? (
                            <a
                              key={i}
                              href={`https://doi.org/${eid.value}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cognition-600 dark:text-cognition-400 hover:underline flex items-center text-sm"
                            >
                              <FaExternalLinkAlt className="mr-1" /> DOI:{" "}
                              {eid.value}
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
                        className="text-cognition-600 dark:text-cognition-400 hover:underline flex items-center text-sm"
                      >
                        <FaExternalLinkAlt className="mr-1" /> View Publication
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
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Publications will be listed here soon. Please check back later.
              </p>
              <div className="mt-6">
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 bg-cognition-600 hover:bg-cognition-700 text-white font-medium rounded-lg transition-colors"
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
