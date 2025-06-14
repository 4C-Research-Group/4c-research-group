"use client";

import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaClock,
  FaDollarSign,
  FaBuilding,
} from "react-icons/fa";
import Link from "next/link";

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary?: string;
  experience?: string;
  postedDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  isNew?: boolean;
  isUrgent?: boolean;
}

const jobPositions: JobPosition[] = [
  {
    id: "1",
    title: "Postdoctoral Research Fellow in Critical Care",
    department: "Critical Care Research",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$65,000 - $75,000",
    experience: "PhD required",
    postedDate: "2023-06-01",
    description:
      "We are seeking a highly motivated Postdoctoral Research Fellow to join our Critical Care Research team. The successful candidate will work on cutting-edge research in cognitive outcomes following critical illness.",
    requirements: [
      "Ph.D. in Neuroscience, Psychology, or related field",
      "Strong background in cognitive assessment and neuroimaging",
      "Experience with statistical analysis and scientific writing",
      "Excellent communication and teamwork skills",
    ],
    responsibilities: [
      "Design and conduct research studies",
      "Analyze data and prepare manuscripts",
      "Present findings at conferences",
      "Mentor graduate students",
    ],
    isNew: true,
    isUrgent: true,
  },
  {
    id: "2",
    title: "Senior Research Scientist - Cognitive Neuroscience",
    department: "Cognitive Neuroscience",
    location: "Boston, MA (Hybrid)",
    type: "Full-time",
    salary: "$90,000 - $110,000",
    experience: "5+ years",
    postedDate: "2023-06-10",
    description:
      "Lead research initiatives in cognitive neuroscience with a focus on critical care outcomes. This position offers leadership opportunities and the chance to shape research direction.",
    requirements: [
      "PhD in Neuroscience, Psychology, or related field",
      "5+ years of postdoctoral experience",
      "Strong publication record",
      "Experience with grant writing",
    ],
    responsibilities: [
      "Lead research projects",
      "Mentor junior researchers",
      "Secure research funding",
      "Publish in high-impact journals",
    ],
    isNew: true,
  },
  {
    id: "3",
    title: "Research Assistant - Cognitive Assessment",
    department: "Cognitive Neuroscience",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$45,000 - $55,000",
    experience: "Entry Level",
    postedDate: "2023-06-15",
    description:
      "Support research studies on cognitive assessment in critical care survivors. Ideal for recent graduates considering graduate school.",
    requirements: [
      "Bachelor's degree in Psychology, Neuroscience, or related field",
      "Experience with human subjects research",
      "Strong organizational skills",
      "Attention to detail",
    ],
    responsibilities: [
      "Recruit and screen participants",
      "Administer cognitive assessments",
      "Maintain study databases",
      "Assist with IRB submissions",
    ],
  },
  {
    id: "4",
    title: "Data Analyst - Research",
    department: "Data Science",
    location: "Remote",
    type: "Full-time",
    salary: "$70,000 - $85,000",
    experience: "2+ years",
    postedDate: "2023-06-05",
    description:
      "Analyze complex research data and contribute to groundbreaking studies in critical care research.",
    requirements: [
      "Degree in Statistics, Data Science, or related field",
      "Proficiency in R/Python",
      "Experience with statistical analysis",
      "Knowledge of machine learning",
    ],
    responsibilities: [
      "Clean and analyze research data",
      "Develop statistical models",
      "Create data visualizations",
      "Prepare reports and presentations",
    ],
  },
];

export default function CareersPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="bg-cognition-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Work on groundbreaking research that makes a difference in
              critical care and cognitive health.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Filter Jobs
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Job Type
                  </label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-cognition-500 focus:border-cognition-500 sm:text-sm rounded-md">
                    <option>All Job Types</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Department
                  </label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-cognition-500 focus:border-cognition-500 sm:text-sm rounded-md">
                    <option>All Departments</option>
                    <option>Critical Care Research</option>
                    <option>Cognitive Neuroscience</option>
                    <option>Data Science</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-cognition-500 focus:border-cognition-500 sm:text-sm rounded-md">
                    <option>All Locations</option>
                    <option>Boston, MA</option>
                    <option>Remote</option>
                    <option>Hybrid</option>
                  </select>
                </div>

                <button className="w-full bg-cognition-600 hover:bg-cognition-700 text-white py-2 px-4 rounded-md transition-colors">
                  Apply Filters
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Job Alerts
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Get notified when new positions match your search.
              </p>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-cognition-500 focus:border-cognition-500"
              />
              <button className="mt-2 w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-md transition-colors">
                Create Alert
              </button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:w-3/4 space-y-4">
            {/* Search Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-cognition-500 focus:border-cognition-500 sm:text-sm"
                      placeholder="Job title, keywords, or company"
                    />
                  </div>
                </div>
                <button className="bg-cognition-600 hover:bg-cognition-700 text-white py-2 px-6 rounded-md transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
              {jobPositions.map((position) => (
                <motion.div
                  key={position.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                >
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h2 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-cognition-600 dark:hover:text-cognition-400 transition-colors">
                            <Link href={`/team/careers/${position.id}`}>
                              {position.title}
                            </Link>
                          </h2>
                          {position.isNew && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              New
                            </span>
                          )}
                          {position.isUrgent && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                              Urgent
                            </span>
                          )}
                        </div>

                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-3">
                          <span className="flex items-center mr-4">
                            <FaBuilding className="mr-1.5 h-4 w-4 text-cognition-600 dark:text-cognition-400" />
                            {position.department}
                          </span>
                          <span className="flex items-center">
                            <FaMapMarkerAlt className="mr-1.5 h-4 w-4 text-cognition-600 dark:text-cognition-400" />
                            {position.location}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            <FaBriefcase className="mr-1.5 h-3 w-3" />
                            {position.type}
                          </span>
                          {position.salary && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              <FaDollarSign className="mr-1.5 h-3 w-3" />
                              {position.salary}
                            </span>
                          )}
                          {position.experience && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                              <FaClock className="mr-1.5 h-3 w-3" />
                              {position.experience}
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                          {position.description}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:ml-4 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <Link
                          href={`/team/careers/apply?id=${position.id}`}
                          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cognition-600 hover:bg-cognition-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cognition-500"
                        >
                          Apply Now
                        </Link>
                        <Link
                          href={`/team/careers/${position.id}`}
                          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cognition-500"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Posted{" "}
                        {new Date(position.postedDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        <Link
                          href="#"
                          className="text-cognition-600 dark:text-cognition-400 hover:underline"
                        >
                          Save Job
                        </Link>
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 sm:px-6 mt-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Previous
                </a>
                <a
                  href="#"
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Next
                </a>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">4</span> of{" "}
                    <span className="font-medium">4</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <span className="sr-only">Previous</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-current="page"
                      className="z-10 bg-cognition-600 border-cognition-600 text-white relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      2
                    </a>
                    <a
                      href="#"
                      className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      3
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <span className="sr-only">Next</span>
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
