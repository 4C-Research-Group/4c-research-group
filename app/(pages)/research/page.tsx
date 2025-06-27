"use client";

import { motion } from "framer-motion";
import {
  FaFlask,
  FaHospital,
  FaBrain,
  FaChartLine,
  FaSearch,
} from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: "active" | "completed" | "upcoming";
  startDate: string;
  endDate?: string;
  image: string;
  tags: string[];
  link?: string;
};

const projects: Project[] = [
  {
    id: "1",
    title: "NuANCEd",
    description:
      "An integrated knowledge translation project that brings together implementation science, quality improvement and research.",
    category: "Implementation Science",
    status: "active",
    startDate: "2023-01-01",
    endDate: "2025-12-31",
    image: "/images/project-1.png",
    tags: ["Implementation Science", "Quality Improvement", "Research"],
    link: "/research/nuanced",
  },
  {
    id: "2",
    title: "TraNSIEnCe",
    description:
      "This study aims to characterize functional and effective brain connectivity in critically ill children at varying degrees of risk for delirium.",
    category: "Clinical Research",
    status: "active",
    startDate: "2023-05-15",
    endDate: "2026-06-30",
    image: "/images/project-2.jpg",
    tags: ["Brain Connectivity", "Delirium", "Pediatric Critical Care"],
    link: "/research/transience",
  },
  {
    id: "3",
    title: "PREDICT ABI",
    description:
      "This pilot prospective observational study will use functional neuroimaging to help improve the accuracy and precision of predicting neurological outcomes in unresponsive critically ill children with moderate-severe acquired brain injury.",
    category: "Clinical Research",
    status: "active",
    startDate: "2023-08-01",
    endDate: "2025-12-31",
    image: "/images/project-3.png",
    tags: ["Neuroimaging", "Brain Injury", "Outcome Prediction"],
    link: "/research/predict-abi",
  },
  {
    id: "4",
    title: "ABOVE",
    description:
      "A pilot, multicenter, vanguard randomized controlled trial (RCT) in preparation for a definitive trial to evaluate if inhaled anesthetics compared to IV sedative agents improves delirium in mechanically ventilated children.",
    category: "Clinical Trial",
    status: "upcoming",
    startDate: "2024-01-15",
    endDate: "2025-12-31",
    image: "/images/project-4.jpeg",
    tags: ["Clinical Trial", "Delirium", "Mechanical Ventilation"],
    link: "/research/above",
  },
  {
    id: "5",
    title: "NORSE",
    description:
      "This study aims to collect health related data and biological samples that will enable researchers to understand the cause of cryptogenic new-onset refractory status epilepticus (NORSE).",
    category: "Clinical Research",
    status: "active",
    startDate: "2023-03-01",
    endDate: "2026-03-31",
    image: "/images/project-5.jpeg",
    tags: ["Epilepsy", "Status Epilepticus", "Biomarkers"],
    link: "/research/norse",
  },
];

const categories = [...new Set(projects.map((project) => project.category))];
const statuses = ["active", "completed", "upcoming"] as const;

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleStatus = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(project.category);

    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.includes(project.status);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      completed:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      upcoming:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    };

    const statusText = status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <span
        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}
      >
        {statusText}
      </span>
    );
  };

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
              Research Projects
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Exploring innovative approaches to improve cognitive outcomes in
              critical care.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedCategories.includes(category)
                        ? "bg-cognition-600 text-white"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </h3>
              <div className="flex flex-wrap gap-2">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => toggleStatus(status)}
                    className={`px-3 py-1 text-sm rounded-full transition-colors ${
                      selectedStatuses.includes(status)
                        ? "bg-cognition-600 text-white"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <div className="h-64 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-cognition-100 to-cognition-300 dark:from-cognition-800 dark:to-cognition-900 opacity-50"></div>
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(project.status)}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                      <span>{new Date(project.startDate).getFullYear()}</span>
                      <span>
                        {project.endDate
                          ? `${new Date(project.startDate).getFullYear()} - ${new Date(project.endDate).getFullYear()}`
                          : "Ongoing"}
                      </span>
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cognition-600 hover:bg-cognition-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cognition-500 transition-colors duration-200"
                      >
                        Learn More
                        <svg
                          className="ml-2 -mr-1 w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
