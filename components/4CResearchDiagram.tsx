"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface ProjectInfo {
  name: string;
  description: string;
  status: string;
}

const projectData: Record<string, ProjectInfo[]> = {
  cognition: [
    {
      name: "CONN & SCOR - SRS",
      description: "Connectivity and Scoring - Standardized Rating Scale",
      status: "Active",
    },
    {
      name: "TRANSCIENCE",
      description: "Transient consciousness and cognitive science",
      status: "Active",
    },
    {
      name: "BRAIN-CASH",
      description: "Brain Computer-Aided Scoring and Health",
      status: "Planning",
    },
  ],
  consciousness: [
    {
      name: "PREDICT ABI",
      description: "Predicting Acquired Brain Injury outcomes",
      status: "Active",
    },
    {
      name: "IN-SYNCC",
      description: "Integrated Synchronization and Consciousness",
      status: "Active",
    },
  ],
  critical: [
    {
      name: "ABOVE",
      description: "Advanced Brain Outcomes and Validation",
      status: "Active",
    },
    {
      name: "ABOVE 2.0",
      description: "Enhanced Advanced Brain Outcomes",
      status: "Planning",
    },
  ],
  comfort: [
    {
      name: "NOPE-ICU",
      description: "Non-Pharmacological Interventions in ICU",
      status: "Active",
    },
    {
      name: "DOSM-PCCU",
      description: "Digital Outcomes and Safety Monitoring in PCCU",
      status: "Active",
    },
  ],
};

export default function ResearchDiagram() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(
    null
  );

  const handleSectionHover = (section: string | null) => {
    setHoveredSection(section);
  };

  const handleProjectClick = (project: ProjectInfo) => {
    setSelectedProject(project);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto p-8">
      {/* Main Diagram */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <svg
            width="900"
            height="700"
            viewBox="0 0 900 700"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <defs>
              {/* Gradients */}
              <linearGradient
                id="cognitionGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#10B981", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#059669", stopOpacity: 1 }}
                />
              </linearGradient>

              <linearGradient
                id="consciousnessGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#8B5CF6", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#7C3AED", stopOpacity: 1 }}
                />
              </linearGradient>

              <linearGradient
                id="criticalGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#F59E0B", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#D97706", stopOpacity: 1 }}
                />
              </linearGradient>

              <linearGradient
                id="comfortGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#EC4899", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#DB2777", stopOpacity: 1 }}
                />
              </linearGradient>

              {/* Filters */}
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="2"
                  dy="4"
                  stdDeviation="3"
                  floodColor="#000000"
                  floodOpacity="0.2"
                />
              </filter>
            </defs>

            {/* Background */}
            <rect width="900" height="700" fill="#FAFBFC" />

            {/* Title */}
            <text
              x="450"
              y="40"
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize="28"
              fontWeight="bold"
              fill="#1E293B"
            >
              4C Research Group
            </text>
            <text
              x="450"
              y="65"
              textAnchor="middle"
              fontFamily="Arial, sans-serif"
              fontSize="16"
              fill="#64748B"
            >
              Cognition • Consciousness • Critical Care • Comfort
            </text>

            {/* COGNITION Section (Top Left) */}
            <g transform="translate(200, 150)">
              <motion.rect
                x="-100"
                y="-40"
                width="200"
                height="80"
                rx="20"
                fill="url(#cognitionGradient)"
                filter="url(#shadow)"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => handleSectionHover("cognition")}
                onMouseLeave={() => handleSectionHover(null)}
                style={{ cursor: "pointer" }}
              />
              <text
                x="0"
                y="8"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="16"
                fontWeight="bold"
                fill="white"
              >
                COGNITION
              </text>

              {/* Child Projects */}
              <g transform="translate(0, 80)">
                {projectData.cognition.map((project, index) => (
                  <g
                    key={project.name}
                    transform={`translate(0, ${index * 60})`}
                  >
                    <motion.rect
                      x="-80"
                      y="-20"
                      width="160"
                      height="40"
                      rx="10"
                      fill="#10B981"
                      opacity="0.9"
                      whileHover={{ scale: 1.05, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleProjectClick(project)}
                      style={{ cursor: "pointer" }}
                    />
                    <text
                      x="0"
                      y="5"
                      textAnchor="middle"
                      fontFamily="Arial, sans-serif"
                      fontSize="11"
                      fill="white"
                      fontWeight="bold"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleProjectClick(project)}
                    >
                      {project.name}
                    </text>
                  </g>
                ))}
              </g>
            </g>

            {/* CONSCIOUSNESS Section (Top Right) */}
            <g transform="translate(700, 150)">
              <motion.rect
                x="-100"
                y="-40"
                width="200"
                height="80"
                rx="20"
                fill="url(#consciousnessGradient)"
                filter="url(#shadow)"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => handleSectionHover("consciousness")}
                onMouseLeave={() => handleSectionHover(null)}
                style={{ cursor: "pointer" }}
              />
              <text
                x="0"
                y="8"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="16"
                fontWeight="bold"
                fill="white"
              >
                CONSCIOUSNESS
              </text>

              {/* Child Projects */}
              <g transform="translate(0, 80)">
                {projectData.consciousness.map((project, index) => (
                  <g
                    key={project.name}
                    transform={`translate(0, ${index * 60})`}
                  >
                    <motion.rect
                      x="-80"
                      y="-20"
                      width="160"
                      height="40"
                      rx="10"
                      fill="#8B5CF6"
                      opacity="0.9"
                      whileHover={{ scale: 1.05, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleProjectClick(project)}
                      style={{ cursor: "pointer" }}
                    />
                    <text
                      x="0"
                      y="5"
                      textAnchor="middle"
                      fontFamily="Arial, sans-serif"
                      fontSize="11"
                      fill="white"
                      fontWeight="bold"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleProjectClick(project)}
                    >
                      {project.name}
                    </text>
                  </g>
                ))}
              </g>
            </g>

            {/* CRITICAL TRIALS Section (Bottom Left) */}
            <g transform="translate(200, 500)">
              <motion.rect
                x="-100"
                y="-40"
                width="200"
                height="80"
                rx="20"
                fill="url(#criticalGradient)"
                filter="url(#shadow)"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => handleSectionHover("critical")}
                onMouseLeave={() => handleSectionHover(null)}
                style={{ cursor: "pointer" }}
              />
              <text
                x="0"
                y="8"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="16"
                fontWeight="bold"
                fill="white"
              >
                CRITICAL TRIALS
              </text>

              {/* Child Projects */}
              <g transform="translate(0, 80)">
                {projectData.critical.map((project, index) => (
                  <g
                    key={project.name}
                    transform={`translate(0, ${index * 60})`}
                  >
                    <motion.rect
                      x="-80"
                      y="-20"
                      width="160"
                      height="40"
                      rx="10"
                      fill="#F59E0B"
                      opacity="0.9"
                      whileHover={{ scale: 1.05, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleProjectClick(project)}
                      style={{ cursor: "pointer" }}
                    />
                    <text
                      x="0"
                      y="5"
                      textAnchor="middle"
                      fontFamily="Arial, sans-serif"
                      fontSize="11"
                      fill="white"
                      fontWeight="bold"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleProjectClick(project)}
                    >
                      {project.name}
                    </text>
                  </g>
                ))}
              </g>
            </g>

            {/* COMFORT Section (Bottom Right) */}
            <g transform="translate(700, 500)">
              <motion.rect
                x="-100"
                y="-40"
                width="200"
                height="80"
                rx="20"
                fill="url(#comfortGradient)"
                filter="url(#shadow)"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => handleSectionHover("comfort")}
                onMouseLeave={() => handleSectionHover(null)}
                style={{ cursor: "pointer" }}
              />
              <text
                x="0"
                y="8"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="16"
                fontWeight="bold"
                fill="white"
              >
                COMFORT
              </text>

              {/* Child Projects */}
              <g transform="translate(0, 80)">
                {projectData.comfort.map((project, index) => (
                  <g
                    key={project.name}
                    transform={`translate(0, ${index * 60})`}
                  >
                    <motion.rect
                      x="-80"
                      y="-20"
                      width="160"
                      height="40"
                      rx="10"
                      fill="#EC4899"
                      opacity="0.9"
                      whileHover={{ scale: 1.05, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleProjectClick(project)}
                      style={{ cursor: "pointer" }}
                    />
                    <text
                      x="0"
                      y="5"
                      textAnchor="middle"
                      fontFamily="Arial, sans-serif"
                      fontSize="11"
                      fill="white"
                      fontWeight="bold"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleProjectClick(project)}
                    >
                      {project.name}
                    </text>
                  </g>
                ))}
              </g>
            </g>

            {/* Central Connection Lines */}
            <g stroke="#E2E8F0" strokeWidth="3" fill="none" opacity="0.8">
              <path d="M 300 190 L 600 190" />
              <path d="M 300 540 L 600 540" />
              <path d="M 300 190 L 300 540" />
              <path d="M 600 190 L 600 540" />
            </g>

            {/* Central 4C Icon */}
            <g transform="translate(450, 350)">
              <circle
                cx="0"
                cy="0"
                r="60"
                fill="#F1F5F9"
                stroke="#CBD5E1"
                strokeWidth="2"
              />
              <text
                x="0"
                y="-10"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="20"
                fontWeight="bold"
                fill="#475569"
              >
                4C
              </text>
              <text
                x="0"
                y="10"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="12"
                fill="#64748B"
              >
                RESEARCH
              </text>
            </g>
          </svg>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            className="bg-white rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-2">{selectedProject.name}</h3>
            <p className="text-gray-600 mb-4">{selectedProject.description}</p>
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedProject.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {selectedProject.status}
              </span>
            </div>
            <button
              onClick={() => setSelectedProject(null)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Section Info Tooltip */}
      {hoveredSection && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bg-white border border-gray-200 rounded-lg p-3 shadow-lg z-10"
          style={{
            left:
              hoveredSection === "cognition"
                ? "22%"
                : hoveredSection === "consciousness"
                  ? "78%"
                  : hoveredSection === "critical"
                    ? "22%"
                    : "78%",
            top:
              hoveredSection === "cognition" ||
              hoveredSection === "consciousness"
                ? "25%"
                : "75%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h4 className="font-semibold capitalize">{hoveredSection}</h4>
          <p className="text-sm text-gray-600">
            {hoveredSection === "cognition" &&
              "Cognitive research and brain connectivity studies"}
            {hoveredSection === "consciousness" &&
              "Consciousness monitoring and prediction"}
            {hoveredSection === "critical" &&
              "Critical care trials and outcomes"}
            {hoveredSection === "comfort" &&
              "Patient comfort and non-pharmacological interventions"}
          </p>
        </motion.div>
      )}
    </div>
  );
}
