"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaBrain, FaHeartbeat, FaFlask, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

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
          {/* User Authentication Display */}
          {!loading && user && (
            <motion.div
              className="flex justify-end mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Welcome, {user.email}
                </div>
                <UserAvatar />
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="border-cognition-700 text-cognition-700 hover:bg-cognition-50 dark:border-cognition-400 dark:text-cognition-100 dark:hover:bg-cognition-900/50"
                >
                  Sign Out
                </Button>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-cognition-900 dark:text-white mb-6"
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

      {/* Research Highlights Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Groundbreaking Research
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cognition-500 to-care-500 mx-auto mb-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-cognition-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg"
            >
              <div className="bg-cognition-100 dark:bg-cognition-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaBrain className="text-cognition-600 dark:text-cognition-300 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">
                Cognitive Functions Analysis
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                The groundbreaking analysis of the cognitive functions of
                critically ill children is essential for better understanding
                and treatment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-consciousness-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg"
            >
              <div className="bg-consciousness-100 dark:bg-consciousness-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaFlask className="text-consciousness-600 dark:text-consciousness-300 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">
                Advanced Research
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Our advanced research in altered cognition and consciousness is
                paving the way for improved long-term outcomes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-care-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg"
            >
              <div className="bg-care-100 dark:bg-care-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                <FaHeartbeat className="text-care-600 dark:text-care-300 text-xl" />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">
                Neuroscience Exploration
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                Cutting-edge exploration in neuroscience holds the key to
                enhancing the lives of critically ill children.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section with Wave Background */}
      <section className="relative py-20 overflow-hidden">
        {/* Wave Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cognition-50 to-white dark:from-cognition-900 dark:to-gray-900"></div>
          <div className="absolute inset-0 opacity-20 dark:opacity-10">
            <svg
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="w-full h-full"
              style={{
                transform: "rotate(2deg) scaleY(1.5) scaleX(1.5)",
                transformOrigin: "center",
              }}
            >
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                fill="currentColor"
                className="text-cognition-200 dark:text-cognition-800"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60-48.46V0Z"
                opacity=".25"
                fill="currentColor"
                className="text-cognition-300 dark:text-cognition-700"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                opacity=".5"
                fill="currentColor"
                className="text-cognition-400 dark:text-cognition-600"
              ></path>
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Our Services
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Comprehensive research and clinical services at the intersection
              of cognition, consciousness, and critical care.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Clinical Research",
                description:
                  "Cutting-edge clinical trials and studies to advance understanding of brain function and recovery.",
                icon: (
                  <FaFlask className="text-4xl mb-4 text-cognition-600 dark:text-cognition-400" />
                ),
              },
              {
                title: "Patient Care",
                description:
                  "Specialized care protocols for patients with cognitive impairments and disorders of consciousness.",
                icon: (
                  <FaHeartbeat className="text-4xl mb-4 text-cognition-600 dark:text-cognition-400" />
                ),
              },
              {
                title: "Consultation",
                description:
                  "Expert consultation services for healthcare providers and institutions seeking specialized expertise.",
                icon: (
                  <FaBrain className="text-4xl mb-4 text-cognition-600 dark:text-cognition-400" />
                ),
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center text-center">
                  {service.icon}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Research Projects Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">
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
                      className={`w-16 h-16 rounded-full flex items-center justify-center text-white dark:text-gray-200 mb-4 mx-auto relative z-10 ${
                        projectData.color === "cognition"
                          ? "bg-gradient-to-br from-cognition-500 to-cognition-600"
                          : projectData.color === "consciousness"
                            ? "bg-gradient-to-br from-consciousness-500 to-consciousness-600"
                            : "bg-gradient-to-br from-care-500 to-care-600"
                      }`}
                    >
                      {projectData.icon}
                    </div>
                    <h3 className="text-lg font-bold text-foreground dark:text-white mb-2 text-center">
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
              <h2 className="text-3xl font-bold text-foreground dark:text-white mb-2">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Research Community
            </h2>
            <p className="text-xl text-cognition-100 dark:text-gray-400 mb-8">
              We are always looking for passionate researchers, students, and
              collaborators to join us in advancing the frontiers of cognitive
              science and critical care research.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/careers"
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
