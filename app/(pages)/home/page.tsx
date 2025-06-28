"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import {
  FaBrain,
  FaHeartbeat,
  FaFlask,
  FaArrowRight,
  FaMicroscope,
  FaLightbulb,
  FaUsers,
  FaChartLine,
  FaStar,
  FaPlay,
} from "react-icons/fa";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

// Floating animation variants
const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

// Stagger animation for cards
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

// Text reveal animation
const textRevealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

export default function HomePage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { scrollY } = useScroll();

  // Parallax effects
  const heroY = useTransform(scrollY, [0, 500], [0, -100]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const textY = useTransform(scrollY, [0, 300], [0, 50]);

  useEffect(() => {
    async function fetchContent() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("pages")
        .select("content")
        .eq("slug", "home")
        .single();
      if (error) {
        setError("Failed to load home page content.");
        setLoading(false);
        return;
      }
      let parsedContent = null;
      if (typeof data?.content === "string") {
        parsedContent = JSON.parse(data.content);
      }
      setContent(parsedContent);
      setLoading(false);
    }
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cognition-50 to-white dark:from-cognition-900 dark:to-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-cognition-200 border-t-cognition-600 rounded-full"
        />
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 bg-gradient-to-br from-cognition-50 to-white dark:from-cognition-900 dark:to-gray-900">
        {error || "No content found."}
      </div>
    );
  }

  // HERO SECTION
  const hero = content.hero || {};

  // RESEARCH HIGHLIGHTS
  const researchHighlights = content.researchHighlights || { cards: [] };

  // SERVICES
  const services = content.services || { cards: [] };

  // PROJECTS
  const projects = content.projects || { cards: [] };

  // STATS
  const stats = content.stats || [];

  // NEWS
  const news = content.news || {};

  // CTA
  const cta = content.cta || {};

  // MISSION SECTION
  const mission = content.mission || {};

  // PARTNERS SECTION
  const partners = content.partners || {};

  // SOCIAL MEDIA SECTION
  const social = content.social || {};

  const colorMap = ["cognition", "consciousness", "care"];
  const iconMap = [
    <FaBrain key="brain" className="text-2xl" />,
    <FaFlask key="flask" className="text-2xl" />,
    <FaHeartbeat key="heartbeat" className="text-2xl" />,
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Enhanced Hero Section */}
      {hero && (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cognition-50 via-white to-consciousness-50 dark:from-cognition-900 dark:via-gray-900 dark:to-consciousness-900">
          {/* Animated Background Elements */}
          <motion.div className="absolute inset-0" style={{ y: heroY }}>
            <div className="absolute top-20 left-10 w-72 h-72 bg-cognition-200/30 dark:bg-cognition-700/20 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute top-40 right-20 w-96 h-96 bg-consciousness-200/30 dark:bg-consciousness-700/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-20 left-1/4 w-80 h-80 bg-care-200/30 dark:bg-care-700/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </motion.div>

          {/* Floating Icons */}
          <motion.div
            className="absolute top-32 left-20 text-cognition-400/60 dark:text-cognition-300/60"
            variants={floatingAnimation}
            animate="animate"
          >
            <FaMicroscope className="text-4xl" />
          </motion.div>
          <motion.div
            className="absolute top-48 right-32 text-consciousness-400/60 dark:text-consciousness-300/60"
            variants={floatingAnimation}
            animate="animate"
            style={{ animationDelay: "1s" }}
          >
            <FaLightbulb className="text-3xl" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-1/3 text-care-400/60 dark:text-care-300/60"
            variants={floatingAnimation}
            animate="animate"
            style={{ animationDelay: "2s" }}
          >
            <FaUsers className="text-4xl" />
          </motion.div>

          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Column - Content */}
              <motion.div
                className="text-center lg:text-left"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <motion.div
                  className="inline-flex items-center px-4 py-2 bg-cognition-100/80 dark:bg-cognition-800/50 rounded-full text-cognition-700 dark:text-cognition-300 text-sm font-medium mb-6 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <FaStar className="mr-2 text-cognition-500" />
                  Pioneering Neuroscience Research
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-cognition-900 dark:text-white mb-8 leading-tight"
                  style={{ y: textY }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
                    {hero.title}
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  dangerouslySetInnerHTML={
                    hero.subtitle ? { __html: hero.subtitle } : undefined
                  }
                />

                <motion.div
                  className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                >
                  {hero.primaryText && hero.primaryLink && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={hero.primaryLink}
                        className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cognition-600 to-cognition-700 hover:from-cognition-700 hover:to-cognition-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform"
                      >
                        {hero.primaryText}
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </motion.div>
                  )}
                  {hero.secondaryText && hero.secondaryLink && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={hero.secondaryLink}
                        className="group inline-flex items-center justify-center px-8 py-4 border-2 border-cognition-600 text-cognition-700 hover:bg-cognition-50 dark:border-cognition-400 dark:text-cognition-300 dark:hover:bg-cognition-900/50 font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm"
                      >
                        <FaPlay className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                        {hero.secondaryText}
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              {/* Right Column - Visual */}
              <motion.div
                className="relative h-96 md:h-[32rem] lg:h-[40rem]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{ scale: heroScale }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cognition-100/50 to-consciousness-100/50 dark:from-cognition-800/30 dark:to-consciousness-800/30 rounded-3xl transform rotate-6 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-care-100/50 to-cognition-100/50 dark:from-care-800/30 dark:to-cognition-800/30 rounded-3xl transform -rotate-6 backdrop-blur-sm"></div>
                <motion.div
                  className="relative h-full w-full bg-white/70 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl flex items-center justify-center p-8 shadow-2xl border border-white/20"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-full h-full">
                    {/* Animated background circles */}
                    <motion.div
                      className="absolute top-0 left-0 w-32 h-32 rounded-full bg-cognition-200/60 dark:bg-cognition-700/40 -translate-x-1/2 -translate-y-1/2"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-consciousness-200/60 dark:bg-consciousness-700/40 translate-x-1/2 translate-y-1/2"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.9, 0.6] }}
                      transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                    />
                    <motion.div
                      className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-care-200/60 dark:bg-care-700/40 -translate-x-1/2 -translate-y-1/2"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.7, 0.6] }}
                      transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                    />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-6xl text-cognition-800 dark:text-cognition-200"
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 8, repeat: Infinity }}
                      >
                        <Image
                          src={hero.logo || "/logo.png"}
                          alt="4C Lab Logo"
                          width={512}
                          height={512}
                          className="drop-shadow-2xl"
                        />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-cognition-400 dark:border-cognition-300 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-cognition-400 dark:bg-cognition-300 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>
      )}

      {/* Enhanced Research Projects Section */}
      {projects && projects.cards && projects.cards.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
                variants={textRevealVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent">
                  {projects.title}
                </span>
              </motion.h2>
              <motion.div
                className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: "8rem" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {projects.cards.map((project: any, i: number) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-700"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cognition-500/0 to-consciousness-500/0 group-hover:from-cognition-500/10 group-hover:to-consciousness-500/10 transition-all duration-500 rounded-2xl" />

                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>

                  <div className="p-8 relative">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto relative z-10 bg-gradient-to-br from-cognition-500 to-cognition-600 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      {iconMap[i]}
                    </motion.div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center group-hover:text-cognition-600 dark:group-hover:text-cognition-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p
                      className="text-gray-600 dark:text-gray-400 text-center leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300"
                      dangerouslySetInnerHTML={
                        project.description
                          ? { __html: project.description }
                          : undefined
                      }
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Enhanced Mission & 4C's Section */}
      {mission && (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-cognition-100/30 dark:bg-cognition-800/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-consciousness-100/30 dark:bg-consciousness-800/20 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent">
                  {mission.title}
                </span>
              </h2>
              <motion.div
                className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: "8rem" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </motion.div>

            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div
                className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={
                  mission.description
                    ? { __html: mission.description }
                    : undefined
                }
              />
              <motion.div
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                {mission.primaryText && mission.primaryLink && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={mission.primaryLink}
                      className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cognition-600 to-cognition-700 hover:from-cognition-700 hover:to-cognition-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {mission.primaryText}
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                )}
                {mission.secondaryText && mission.secondaryLink && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={mission.secondaryLink}
                      className="group inline-flex items-center justify-center px-8 py-4 border-2 border-cognition-600 text-cognition-700 hover:bg-cognition-50 dark:border-cognition-400 dark:text-cognition-300 dark:hover:bg-cognition-900/50 font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm"
                    >
                      {mission.secondaryText}
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Enhanced Services Section */}
      {services && services.cards && services.cards.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent">
                  {services.title}
                </span>
              </h2>
              <motion.div
                className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: "8rem" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services.cards.map((card: any, i: number) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 dark:border-gray-700 overflow-hidden"
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cognition-500/0 to-consciousness-500/0 group-hover:from-cognition-500/10 group-hover:to-consciousness-500/10 transition-all duration-500 rounded-2xl" />

                  <div className="relative z-10">
                    <motion.div
                      className="bg-gradient-to-br from-cognition-500 to-cognition-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {iconMap[i]}
                    </motion.div>

                    <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6 group-hover:text-cognition-600 dark:group-hover:text-cognition-400 transition-colors duration-300">
                      {card.title}
                    </h3>

                    <p
                      className="text-gray-600 dark:text-gray-400 text-center leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300"
                      dangerouslySetInnerHTML={
                        card.description
                          ? { __html: card.description }
                          : undefined
                      }
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Enhanced Stats Section */}
      {stats && stats.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-cognition-600 via-consciousness-600 to-care-600 text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="grid md:grid-cols-4 gap-8 text-center"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stats.map((stat: any, i: number) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-8 group"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cognition-100 bg-clip-text text-transparent"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.1,
                      duration: 0.5,
                      type: "spring",
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xl text-cognition-100 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Enhanced Partners Section */}
      {partners && (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-cognition-100/30 dark:bg-cognition-800/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-consciousness-100/30 dark:bg-consciousness-800/20 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent">
                  {partners.title}
                </span>
              </h2>
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {partners.subtitle}
              </motion.p>
              <motion.div
                className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto mt-8"
                initial={{ width: 0 }}
                whileInView={{ width: "8rem" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </motion.div>

            {partners.cards && partners.cards.length > 0 && (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-center"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {partners.cards.map((partner: any, i: number) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="group flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700"
                    whileHover={{ y: -8, scale: 1.05 }}
                  >
                    <div className="relative w-full h-full flex items-center justify-center p-4 rounded-xl bg-white dark:bg-white/90 shadow-sm group-hover:shadow-md transition-all duration-300">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src={partner.image}
                          alt={partner.name}
                          width={180}
                          height={100}
                          className="h-16 w-auto max-w-full object-contain"
                          priority={i < 8}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Enhanced News Section */}
      {news && (
        <section className="py-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent">
                  {news.title}
                </span>
              </h2>
              <motion.div
                className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: "8rem" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="p-8 md:p-12">
                  <motion.h3
                    className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    {news.headline}
                  </motion.h3>
                  <motion.div
                    className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    dangerouslySetInnerHTML={
                      news.description
                        ? { __html: news.description }
                        : undefined
                    }
                  />
                  {news.link && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <a
                        href={news.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center text-cognition-600 dark:text-cognition-400 hover:text-cognition-700 dark:hover:text-cognition-300 font-semibold transition-colors duration-300"
                      >
                        {news.linkText || "Read the full article"}
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </a>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Enhanced Social Media Section */}
      {social && (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cognition-100/30 dark:bg-cognition-800/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-consciousness-100/30 dark:bg-consciousness-800/20 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent">
                  {social.title}
                </span>
              </h2>
              <motion.div
                className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto"
                initial={{ width: 0 }}
                whileInView={{ width: "8rem" }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              />
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="p-8 md:p-12 text-center">
                  <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      {social.platformTitle}
                    </h3>
                    <motion.div
                      className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      dangerouslySetInnerHTML={
                        social.description
                          ? { __html: social.description }
                          : undefined
                      }
                    />
                    {social.link && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                      >
                        <motion.a
                          href={social.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cognition-600 to-cognition-700 hover:from-cognition-700 hover:to-cognition-800 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg
                            className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                          {social.buttonText || "@Mission_FourC"}
                        </motion.a>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Enhanced Call to Action */}
      {cta && (
        <section className="py-24 bg-gradient-to-br from-cognition-700 via-consciousness-700 to-care-700 text-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {cta.title}
              </motion.h2>
              <motion.div
                className="text-xl text-cognition-100 dark:text-gray-300 mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                dangerouslySetInnerHTML={
                  cta.description ? { __html: cta.description } : undefined
                }
              />
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                {cta.primaryText && cta.primaryLink && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={cta.primaryLink}
                      className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl shadow-lg text-cognition-900 dark:text-white bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                    >
                      {cta.primaryText}
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                )}
                {cta.secondaryText && cta.secondaryLink && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={cta.secondaryLink}
                      className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white dark:border-gray-700 text-lg font-semibold rounded-xl text-white dark:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-900/50 transition-all duration-300 backdrop-blur-sm"
                    >
                      {cta.secondaryText}
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
