import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  link?: string;
  image?: string; // URL or local path
}

interface Theme {
  title: string;
  projects: Project[];
}

// ------------------- RESEARCH DATA -------------------
const researchThemes: Theme[] = [
  {
    title:
      "Neuroprognostication in acute disorder of consciousness after acquired brain injury",
    projects: [
      {
        title: "Systematic reviews on neuroprognostication",
        link: "https://www.sciencedirect.com/science/article/pii/S030095722400858X",
        description:
          "Prediction of good neurological outcome after return of circulation following paediatric cardiac arrest: A systematic review and meta-analysis.",
        image: "/images/barney_scholefield.jpg",
      },
      {
        title: "PREDICT ABI Project",
        description:
          "Funded by AMOSO - Evaluating functional neuroimaging (fNIRS, hdEEG, fMRI) to detect covert consciousness and improve outcome prediction.",
        image: "/images/karen_ncs_meeting.jpg",
      },
      {
        title: "Common data elements for Disorders of Consciousness",
        link: "https://link.springer.com/article/10.1007/s12028-023-01870-7",
        description:
          "Recommendations from the Working Group in the Pediatric Population.",
      },
      {
        title: "Ethics of research in Disorders of Consciousness",
        description: "Papers in progress to be published soon.",
      },
      {
        title:
          "Complex decision making in neuroprognostication (GERMINAL project)",
        description:
          "Funded by Radboud-Western Collaboration Fund - Quality improvement to improve caregiver satisfaction and reduce moral distress.",
        image: "/images/dr_femke_bekius.jpg",
      },
      {
        title:
          "Book chapter: Approach to child with reduced level of consciousness",
        link: "https://link.springer.com/chapter/10.1007/978-3-031-67951-3_49",
        description:
          "Published book chapter on pediatric consciousness assessment.",
      },
    ],
  },
  {
    title: "ICU Delirium & Sleep deprivation",
    projects: [
      {
        title: "TraNSIENCE",
        description:
          "Funded by Brain Canada - Tracking brain connectivity in children at risk of delirium. >70 children enrolled; abstracts presented at multiple meetings.",
      },
      {
        title:
          "Systematic review of functional connectivity changes in delirium",
        description: "Manuscript being prepared; Karen presenting at CCCF.",
      },
      {
        title:
          "Systematic review of functional connectivity changes associated with acute sleep deprivation",
        description: "Accepted for publication in Neurological Sciences.",
      },
      {
        title: "BrainCASH study",
        description:
          "Brain connectivity in acutely sleep deprived healthcare providers; abstract presented by Dr. Stephanie Hosang.",
      },
      {
        title: "BrainCASH-2 study",
        description:
          "Cognitive function assessment in acutely sleep deprived healthcare providers; Dr. Sunny Kim (Resident Research Project).",
      },
      {
        title:
          "EEG-based machine learning framework for diagnosis of acute sleep deprivation",
        description:
          "Led by Daya Kumar, in collaboration with Dr. Narayan's IDSL lab; manuscript under review in Frontiers in Physiology.",
      },
    ],
  },
  {
    title: "Quantitative EEG guided enhanced neuromonitoring",
    projects: [
      {
        title: "NuANCEd",
        description:
          "Nurse-led advanced monitoring for non-convulsive seizures in encephalopathic critically ill children - Funded by AMOSO Opportunities.",
      },
      {
        title: "Quantitative EEG in PICU delirium",
        description:
          "Evaluating qEEG metrics (ADR, RAV) in children with and without PICU delirium.",
        image: "/images/hiruthika_ravi.jpg",
      },
    ],
  },
  {
    title: "Pain and comfort in critical care",
    projects: [
      {
        title: "ABOVE trial",
        description:
          "Advancing Brain Outcomes in pediatric critically ill patients sedated with volatile anesthetic agents. Pilot multicenter RCT. Funded by CIHR.",
        link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11189165/",
        image: "/images/above_trial_team.jpg",
      },
      {
        title: "In-SYNCC",
        description:
          "International survey on sedation, analgesia, delirium detection, TBI management, and neuroprognostication in pediatric ICUs.",
      },
    ],
  },
  {
    title: "Multi-center collaborations",
    projects: [
      {
        title: "POPCORN",
        link: "https://www.popcornpediatrics.ca/",
        description:
          "Pediatric Outcomes improvement through Coordination of Research Networks. Scientific committee chair, Site PI, lead of sub-study SnaCCC.",
      },
      {
        title: "PROBE",
        description:
          "Pediatric Registry of Brain Death Practices - International registry of over 2000 children.",
      },
      {
        title: "BOBBI trial",
        description:
          "Better Outcomes in Babies with Bacterial meningitis: RCT funded by CIHR; PI Dr. Manish Sadarangani. Canada lead investigator role highlighted.",
      },
    ],
  },
];

// ------------------- MOTION VARIANTS -------------------
const fadeInUp = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ------------------- RESEARCH THEME CARD -------------------
interface ThemeCardProps {
  theme: Theme;
  index: number;
}

const ResearchThemeCard: React.FC<ThemeCardProps> = ({ theme, index }) => {
  const featuredProject =
    theme.projects.find((project) => project.image) || theme.projects[0];

  return (
    <m.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px 0px -100px 0px" }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col"
    >
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-cognition-600 dark:group-hover:text-cognition-400 transition-colors">
          {theme.title}
        </h3>
        <div className="space-y-4 flex-1">
          {theme.projects.slice(0, 3).map((project, j) => (
            <div key={j} className="border-l-2 border-cognition-400 pl-4">
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cognition-600 dark:hover:text-cognition-400 transition-colors flex items-center"
                  >
                    {project.title}
                    <FaExternalLinkAlt className="ml-1 text-xs opacity-70" />
                  </a>
                ) : (
                  project.title
                )}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {project.description}
              </p>
            </div>
          ))}
          {theme.projects.length > 3 && (
            <div className="pt-2 text-sm text-cognition-600 dark:text-cognition-400 font-medium">
              +{theme.projects.length - 3} more projects
            </div>
          )}
        </div>
        {featuredProject?.image && (
          <div className="mt-4 rounded-lg overflow-hidden relative h-40 w-full">
            <Image
              src={featuredProject.image}
              alt={featuredProject.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          </div>
        )}
      </div>
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/30 border-t border-gray-100 dark:border-gray-700">
        <a
          href={`#research-theme-${index}`}
          className="text-sm font-medium text-cognition-600 dark:text-cognition-400 hover:text-cognition-700 dark:hover:text-cognition-300 transition-colors inline-flex items-center"
        >
          View all projects
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </m.div>
  );
};

// ------------------- MAIN COMPONENT -------------------
export const ResearchLandingPage: React.FC = () => {
  return (
    <LazyMotion features={domAnimation}>
      <div className="container mx-auto px-4 py-12">
        <m.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px 0px -100px 0px" }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            <span className="bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent">
              Research Themes & Projects
            </span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto" />
        </m.div>

        <m.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {researchThemes.map((theme, i) => (
            <ResearchThemeCard key={i} theme={theme} index={i} />
          ))}
        </m.div>
      </div>
    </LazyMotion>
  );
};
