"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaBrain, FaHeartbeat, FaFlask, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

type ResearchArea = {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
};

type NewsItem = {
  title: string;
  date: string;
  excerpt: string;
  category: string;
};

export default function HomePage() {
  const researchAreas: ResearchArea[] = [
    {
      icon: <FaBrain className="text-4xl" />,
      title: "Cognition",
      description:
        "Exploring the neural and computational mechanisms of human thought, learning, and decision-making processes.",
      color: "cognition",
    },
    {
      icon: <FaFlask className="text-4xl" />,
      title: "Consciousness",
      description:
        "Investigating the nature of awareness and subjective experience in both health and disease states.",
      color: "consciousness",
    },
    {
      icon: <FaHeartbeat className="text-4xl" />,
      title: "Critical Care",
      description:
        "Advancing patient care through innovative research in intensive care medicine and cognitive recovery.",
      color: "care",
    },
  ];

  const newsItems: NewsItem[] = [
    {
      title: "New Study on Neural Correlates of Consciousness Published",
      date: "May 15, 2023",
      excerpt:
        "Our latest research reveals new insights into the neural mechanisms underlying conscious perception.",
      category: "Research",
    },
    {
      title: "4C Research Group Awarded Major Grant",
      date: "April 2, 2023",
      excerpt:
        "We are excited to announce $2.5M in funding from the National Science Foundation for our work on cognitive recovery.",
      category: "Awards",
    },
    {
      title: "New Study on Neural Correlates of Consciousness Published",
      date: "May 15, 2023",
      excerpt:
        "Our latest research reveals new insights into the neural mechanisms underlying conscious perception.",
      category: "Research",
    },
  ];

  const researchProjects = [
    {
      title: "Critical Care Delirium",
      description:
        "Prediction and diagnosis of critical delirium using advanced functional neuroimaging tools.",
    },
    {
      title: "Disorders of Consciousness",
      description:
        "Prediction of outcomes in unresponsive critically ill patients after acquired brain injury.",
    },
    {
      title: "Pain and Comfort in Critical Care",
      description:
        "Objective detection of pain and discomfort in critically ill children.",
    },
    {
      title: "Pharmacological Sedation in the ICU",
      description:
        "Optimizing depth of sedation and testing innovative strategies to improve patient outcomes.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cognition-50 to-white dark:from-cognition-900 dark:to-gray-900">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-cognition-900 dark:text-white mb-6 font-serif"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Advancing Research in
                <span className="bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent dark:from-cognition-400 dark:to-consciousness-400">
                  {" "}
                  Cognition, Consciousness & Critical Care
                </span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Exploring the frontiers of neuroscience and critical care
                through innovative research and collaboration.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link
                  href="/research"
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-cognition-700 hover:bg-cognition-800 transition-colors duration-200 dark:bg-cognition-600 dark:hover:bg-cognition-700"
                >
                  Explore Our Research
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-cognition-700 text-base font-medium rounded-lg text-cognition-700 hover:bg-cognition-50 transition-colors duration-200 dark:border-cognition-400 dark:text-cognition-100 dark:hover:bg-cognition-900/50"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
            <motion.div
              className="relative h-80 md:h-96 lg:h-[32rem]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cognition-100 to-white dark:from-cognition-900/50 dark:to-gray-900/30 rounded-3xl transform rotate-6"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-cognition-50 to-white dark:from-cognition-800/50 dark:to-gray-900/20 rounded-3xl transform -rotate-6"></div>
              <div className="relative h-full w-full bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-2xl flex items-center justify-center p-8 shadow-xl">
                <div className="relative w-full h-full">
                  <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-cognition-100/80 dark:bg-cognition-900/50 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-consciousness-100/80 dark:bg-consciousness-900/50 translate-x-1/2 translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-care-100/80 dark:bg-care-900/50 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl text-cognition-800 dark:text-cognition-200">
                      <FaBrain className="animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent"></div>
      </section>

      {/* Research Projects Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4 font-serif">
              Our Research Focus Areas
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {researchProjects.map((project, index) => {
              // Map projects to colors, icons, and images
              const projectData = [
                {
                  color: "cognition",
                  icon: <FaBrain key="brain" className="w-6 h-6" />,
                  image:
                    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Brain scan with neural connections
                },
                {
                  color: "consciousness",
                  icon: <FaBrain key="brain" className="w-6 h-6" />,
                  image:
                    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Doctor with patient
                },
                {
                  color: "care",
                  icon: <FaBrain key="brain" className="w-6 h-6" />,
                  image:
                    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Brain scan with neural connections
                },
                {
                  color: "cognition",
                  icon: <FaBrain key="brain" className="w-6 h-6" />,
                  image:
                    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Doctor with patient
                },
              ][index];

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden hover:shadow-soft-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 ${
                    projectData.color === "cognition"
                      ? "hover:border-cognition-100"
                      : projectData.color === "consciousness"
                        ? "hover:border-consciousness-100"
                        : "hover:border-care-100"
                  }`}
                >
                  <div className="h-40 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <Image
                      src={projectData.image}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-white dark:text-gray-200 mb-4 -mt-10 mx-auto relative z-10 ${
                        projectData.color === "cognition"
                          ? "bg-gradient-to-br from-cognition-500 to-cognition-600"
                          : projectData.color === "consciousness"
                            ? "bg-gradient-to-br from-consciousness-500 to-consciousness-600"
                            : "bg-gradient-to-br from-care-500 to-care-600"
                      }`}
                    >
                      {projectData.icon}
                    </div>
                    <h3 className="text-lg font-bold text-foreground dark:text-white mb-2 text-center font-serif">
                      {project.title}
                    </h3>
                    <p className="text-sm text-foreground/80 dark:text-gray-400 text-center leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-cognition-600 to-consciousness-600 text-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6"
            >
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-cognition-100 dark:text-gray-400">
                Research Projects
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-6"
            >
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-cognition-100 dark:text-gray-400">
                Publications
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="p-6"
            >
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-cognition-100 dark:text-gray-400">
                Team Members
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="p-6"
            >
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-cognition-100 dark:text-gray-400">
                Active Grants
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground dark:text-white mb-2 font-serif">
                Latest News
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-cognition-500 to-care-500 rounded-full"></div>
            </div>
            <Link
              href="/news"
              className="text-cognition-600 dark:text-gray-400 hover:text-cognition-700 font-medium flex items-center"
            >
              View all news <FaArrowRight className="ml-2" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {newsItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden hover:shadow-soft-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="px-3 py-1 bg-cognition-100 dark:bg-cognition-900 text-cognition-800 dark:text-gray-200 text-xs font-medium rounded-full">
                      {item.category}
                    </span>
                    <span className="text-sm text-foreground/60 dark:text-gray-500">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-foreground/80 dark:text-gray-400 mb-4">
                    {item.excerpt}
                  </p>
                  <Link
                    href="#"
                    className="text-cognition-600 dark:text-gray-400 hover:text-cognition-700 font-medium text-sm flex items-center"
                  >
                    Read more <FaArrowRight className="ml-1 text-xs" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-cognition-700 to-cognition-900 text-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">
              Join Our Research Community
            </h2>
            <p className="text-xl text-cognition-100 dark:text-gray-400 mb-8">
              We are always looking for passionate researchers, students, and
              collaborators to join us in advancing the frontiers of cognitive
              science and critical care research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/join"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-md text-cognition-900 dark:text-white bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                Join Our Team
                <FaArrowRight className="ml-2" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white dark:border-gray-700 text-base font-medium rounded-lg text-white dark:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-900/50 transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
            <div className="mt-8">
              <p className="text-cognition-100 dark:text-gray-400 mb-4">
                Follow us on X for updates and news from the 4C Research Group
              </p>
              <a
                href="https://x.com/Mission_FourC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-black/10 dark:bg-gray-900/50 hover:bg-black/20 dark:hover:bg-gray-900/70 transition-colors duration-200 text-white dark:text-gray-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @Mission_FourC
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
