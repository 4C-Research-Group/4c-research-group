"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaBrain,
  FaHeartbeat,
  FaFlask,
  FaArrowRight,
  FaMicroscope,
  FaLightbulb,
  FaUsers,
  FaStar,
  FaPlay,
} from "react-icons/fa";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import LoadingSpinner from "@/components/ui/loading-spinner";

// Unsplash images for research focus areas - optimized for performance
// Four distinct, verified working images for visual variety
const researchImages = [
  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&crop=center&auto=format&q=80&fm=webp", // Brain/Neuroscience
  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=400&fit=crop&crop=center&auto=format&q=80&fm=webp", // Laboratory
  "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=800&h=400&fit=crop&crop=center&auto=format&q=80&fm=webp", // Research/Science
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop&crop=center&auto=format&q=80&fm=webp", // Nature/Brain inspiration
];

// Minimal animation variants for better performance
const fadeInUp = {
  hidden: { opacity: 0, transform: "translateY(30px)" },
  visible: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: {
      duration: 0.6,
    },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, transform: "translateX(-30px)" },
  visible: {
    opacity: 1,
    transform: "translateX(0px)",
    transition: {
      duration: 0.6,
    },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, transform: "translateX(30px)" },
  visible: {
    opacity: 1,
    transform: "translateX(0px)",
    transition: {
      duration: 0.6,
    },
  },
};

// Optimized stagger container with better timing
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      duration: 0.6,
    },
  },
};

// Card-specific variants for better performance
const cardVariants = {
  hidden: {
    opacity: 0,
    transform: "translateY(20px) scale(0.95)",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0px) scale(1)",
    transition: {
      duration: 0.5,
    },
  },
};

// Optimized viewport settings
const viewportSettings = {
  once: true,
  margin: "-50px 0px -100px 0px",
  amount: 0.3,
};

// Utility to strip HTML and get first sentence
function getFirstSentenceFromHtml(html: string) {
  if (!html) return "";
  // Remove HTML tags
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  // Get first sentence (ends with . ! or ?)
  const match = text.match(/.*?[.!?](\s|$)/);
  return match
    ? match[0].trim()
    : text.slice(0, 160) + (text.length > 160 ? "..." : "");
}

export default function HomePage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Conditional animation variants based on user preference
  const shouldReduceMotion = prefersReducedMotion === true;

  const conditionalFadeInUp = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : fadeInUp;

  const conditionalFadeInLeft = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : fadeInLeft;

  const conditionalFadeInRight = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : fadeInRight;

  const conditionalStaggerContainer = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : staggerContainer;

  const conditionalCardVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : cardVariants;

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
    return null; // Don't show loading state, let layout handle it
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
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      {hero && (
        <section className="relative -mt-12 min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cognition-50 via-white to-consciousness-50 dark:from-cognition-900 dark:via-gray-900 dark:to-consciousness-900">
          {/* Simple Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cognition-200/20 dark:bg-cognition-700/10 rounded-full" />
            <div className="absolute top-40 right-20 w-96 h-96 bg-consciousness-200/20 dark:bg-consciousness-700/10 rounded-full" />
            <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-care-200/20 dark:bg-care-700/10 rounded-full" />
          </div>

          <div className="container mx-auto px-4 py-20 relative z-10 max-w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center lg:mx-4">
              {/* Left Column - Content */}
              <motion.div
                className="text-center lg:text-left"
                variants={conditionalFadeInLeft}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="inline-flex items-center px-4 py-2 bg-cognition-100/80 dark:bg-cognition-800/50 rounded-full text-cognition-700 dark:text-cognition-300 text-sm font-medium mb-6"
                  variants={conditionalFadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 }}
                >
                  <FaStar className="mr-2 text-cognition-500" />
                  Pioneering Neuroscience Research
                </motion.div>

                <motion.h1
                  className="text-4xl md:text-6xl font-bold text-cognition-900 dark:text-white mb-8 leading-tight"
                  variants={conditionalFadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 }}
                >
                  <span className="bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
                    {hero.title}
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                  variants={conditionalFadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.3 }}
                  dangerouslySetInnerHTML={
                    hero.subtitle ? { __html: hero.subtitle } : undefined
                  }
                />

                <motion.div
                  className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
                  variants={conditionalFadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  {hero.primaryText && hero.primaryLink && (
                    <Link
                      href={hero.primaryLink}
                      className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cognition-600 to-cognition-700 hover:from-cognition-700 hover:to-cognition-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {hero.primaryText}
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  )}
                  {hero.secondaryText && hero.secondaryLink && (
                    <Link
                      href={hero.secondaryLink}
                      className="group inline-flex items-center justify-center px-8 py-4 border-2 border-cognition-600 text-cognition-700 hover:bg-cognition-50 dark:border-cognition-400 dark:text-cognition-300 dark:hover:bg-cognition-900/50 font-semibold rounded-xl transition-all duration-300"
                    >
                      <FaPlay className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                      {hero.secondaryText}
                    </Link>
                  )}
                </motion.div>
              </motion.div>

              {/* Right Column - Visual */}
              <motion.div
                className="relative h-96 md:h-[32rem] lg:h-[36rem]"
                variants={conditionalFadeInRight}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                {/* Floating Bubbles */}
                <div className="absolute inset-0 overflow-hidden">
                  {/* Large bubble - top right of logo */}
                  <div className="absolute top-1/4 right-1/4 w-28 h-28 bg-cognition-200/40 dark:bg-cognition-600/30 rounded-full" />

                  {/* Medium bubble - bottom left of logo */}
                  <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-consciousness-200/40 dark:bg-consciousness-600/30 rounded-full" />

                  {/* Small bubble - top left of logo */}
                  <div className="absolute top-1/3 left-1/3 w-20 h-20 bg-care-200/40 dark:bg-care-600/30 rounded-full" />

                  {/* Extra small bubble - bottom right of logo */}
                  <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-cognition-300/40 dark:bg-cognition-500/30 rounded-full" />

                  {/* Additional small bubble - center top of logo */}
                  <div className="absolute top-1/5 left-1/2 w-18 h-18 bg-consciousness-300/30 dark:bg-consciousness-500/25 rounded-full" />
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-cognition-100/50 to-consciousness-100/50 dark:from-cognition-800/30 dark:to-consciousness-800/30 rounded-3xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-care-100/50 to-cognition-100/50 dark:from-care-800/30 dark:to-cognition-800/30 rounded-3xl transform -rotate-6"></div>
                <div className="relative h-full w-full bg-white/70 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl flex items-center justify-center p-8 shadow-2xl border border-white/20">
                  {/* Floating Bubbles on the card */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    {/* Large bubble - top right corner */}
                    <motion.div
                      className="absolute top-4 right-4 w-36 h-36 bg-cognition-200/40 dark:bg-cognition-600/30 rounded-full"
                      animate={{
                        y: [0, -15, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                      }}
                    />

                    {/* Medium bubble - bottom left corner */}
                    <motion.div
                      className="absolute bottom-4 left-4 w-32 h-32 bg-consciousness-200/40 dark:bg-consciousness-600/30 rounded-full"
                      animate={{
                        y: [0, 12, 0],
                        x: [0, 8, 0],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        delay: 1,
                      }}
                    />

                    {/* Small bubble - top left corner */}
                    <motion.div
                      className="absolute top-6 left-6 w-28 h-28 bg-care-200/40 dark:bg-care-600/30 rounded-full"
                      animate={{
                        y: [0, -10, 0],
                        scale: [1, 0.95, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: 0.5,
                      }}
                    />

                    {/* Extra small bubble - bottom right corner */}
                    <motion.div
                      className="absolute bottom-6 right-6 w-24 h-24 bg-cognition-300/40 dark:bg-cognition-500/30 rounded-full"
                      animate={{
                        y: [0, 8, 0],
                        x: [0, -6, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: 1.5,
                      }}
                    />

                    {/* Additional small bubble - top center */}
                    <motion.div
                      className="absolute top-8 left-1/2 transform -translate-x-1/2 w-30 h-30 bg-consciousness-300/30 dark:bg-consciousness-500/25 rounded-full"
                      animate={{
                        y: [0, -8, 0],
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 2.8,
                        repeat: Infinity,
                        delay: 0.8,
                      }}
                    />

                    {/* Another bubble - bottom center */}
                    <motion.div
                      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-26 h-26 bg-care-300/35 dark:bg-care-500/25 rounded-full"
                      animate={{
                        y: [0, 6, 0],
                        x: [0, -4, 0],
                      }}
                      transition={{
                        duration: 3.2,
                        repeat: Infinity,
                        delay: 1.2,
                      }}
                    />
                  </div>

                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl text-cognition-800 dark:text-cognition-200">
                        <Image
                          src={hero.logo || "/logo.png"}
                          alt="4C Lab Logo"
                          width={512}
                          height={512}
                          className="drop-shadow-2xl"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Simple Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-cognition-400 dark:border-cognition-300 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-cognition-400 dark:bg-cognition-300 rounded-full mt-2 animate-bounce" />
            </div>
          </div>
        </section>
      )}

      {/* Research Projects Section */}
      {projects && projects.cards && projects.cards.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-20"
              variants={conditionalFadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent">
                  {projects.title}
                </span>
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto" />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={conditionalStaggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              {projects.cards.map((project: any, i: number) => (
                <motion.div
                  key={i}
                  variants={conditionalCardVariants}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  <div className="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                    <Image
                      src={researchImages[i] || researchImages[0]}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-200 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      priority={i === 0}
                      loading={i === 0 ? "eager" : "lazy"}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      onError={(e) => {
                        // Fallback to first image if current image fails
                        const target = e.target as HTMLImageElement;
                        target.src = researchImages[0];
                      }}
                    />
                  </div>

                  <div className="p-6 relative">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 mx-auto relative z-10 bg-gradient-to-br from-cognition-500 to-cognition-600 shadow-lg">
                      {iconMap[i]}
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 text-center group-hover:text-cognition-600 dark:group-hover:text-cognition-400 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p
                      className="text-gray-600 dark:text-gray-400 text-center leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300 text-sm"
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

      {/* Mission Section */}
      {mission && (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
              {/* Left Column - Mission */}
              <motion.div
                variants={conditionalFadeInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
                className="flex flex-col h-full"
              >
                <div className="mb-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent">
                      {mission.title}
                    </span>
                  </h2>
                  <div className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full" />
                </div>

                <div className="space-y-8">
                  <div
                    className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                    dangerouslySetInnerHTML={
                      mission.description
                        ? { __html: mission.description }
                        : undefined
                    }
                  />
                  <div className="flex flex-col sm:flex-row gap-6">
                    {mission.primaryText && mission.primaryLink && (
                      <Link
                        href={mission.primaryLink}
                        className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cognition-600 to-cognition-700 hover:from-cognition-700 hover:to-cognition-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {mission.primaryText}
                        <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    )}
                    {mission.secondaryText && mission.secondaryLink && (
                      <Link
                        href={mission.secondaryLink}
                        className="group inline-flex items-center justify-center px-8 py-4 border-2 border-cognition-600 text-cognition-700 hover:bg-cognition-50 dark:border-cognition-400 dark:text-cognition-300 dark:hover:bg-cognition-900/50 font-semibold rounded-xl transition-all duration-300"
                      >
                        {mission.secondaryText}
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Right Column - 4C's */}
              <motion.div
                className="flex flex-col h-full justify-center"
                variants={conditionalFadeInRight}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
              >
                <div className="mb-8 text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    <span className="bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent">
                      {mission.fourCsTitle || "The 4C's"}
                    </span>
                  </h2>
                  <div className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto" />
                </div>

                <div className="relative w-full h-64 md:h-80 lg:h-96 max-w-4xl mx-auto">
                  <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-2 shadow-xl border border-white/20 h-full">
                    <Image
                      src={mission.fourCsImage || "/images/4cccc.png"}
                      alt="The 4C's: Cognition, Care, Compassion, and Collaboration"
                      fill
                      className="object-contain"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {services && services.cards && services.cards.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-20"
              variants={conditionalFadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent">
                  {services.title}
                </span>
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto" />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={conditionalStaggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              {services.cards.map((card: any, i: number) => (
                <motion.div
                  key={i}
                  variants={conditionalCardVariants}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 dark:border-gray-700"
                >
                  <div className="relative z-10">
                    <div className="bg-gradient-to-br from-cognition-500 to-cognition-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg">
                      {iconMap[i]}
                    </div>

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

      {/* Stats Section */}
      {stats && stats.length > 0 && (
        <section className="py-24 bg-gradient-to-br from-cognition-600 via-consciousness-600 to-care-600 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid md:grid-cols-4 gap-8 text-center"
              variants={conditionalStaggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              {stats.map((stat: any, i: number) => (
                <motion.div
                  key={i}
                  variants={conditionalFadeInUp}
                  className="p-8"
                >
                  <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cognition-100 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xl text-cognition-100 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Partners Section */}
      {partners && (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-20"
              variants={conditionalFadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent">
                  {partners.title}
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                {partners.subtitle}
              </p>
              <div className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto mt-8" />
            </motion.div>

            {partners.cards && partners.cards.length > 0 && (
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-center"
                variants={conditionalStaggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportSettings}
              >
                {partners.cards.map((partner: any, i: number) => (
                  <motion.div
                    key={i}
                    variants={conditionalFadeInUp}
                    className="group flex items-center justify-center p-6 bg-white dark:bg-gray-400 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                  >
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      width={180}
                      height={100}
                      className="h-16 w-auto max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                      priority={i < 8}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* News Section */}
      {news && (
        <section className="py-24 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-20"
              variants={conditionalFadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent">
                  {news.title}
                </span>
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto" />
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto"
              variants={conditionalFadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    {news.headline}
                  </h3>
                  <div className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    {getFirstSentenceFromHtml(news.description)}
                  </div>
                  {news.link && (
                    <a
                      href={news.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center text-cognition-600 dark:text-cognition-400 hover:text-cognition-700 dark:hover:text-cognition-300 font-semibold transition-colors duration-300"
                    >
                      {news.linkText || "Read the full article"}
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Social Media Section */}
      {social && (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-20"
              variants={conditionalFadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                <span className="bg-gradient-to-r from-cognition-600 to-consciousness-600 bg-clip-text text-transparent">
                  {social.title}
                </span>
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto" />
            </motion.div>

            <motion.div
              className="max-w-4xl mx-auto"
              variants={conditionalFadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="p-8 md:p-12 text-center">
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                      {social.platformTitle}
                    </h3>
                    <div
                      className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
                      dangerouslySetInnerHTML={
                        social.description
                          ? { __html: social.description }
                          : undefined
                      }
                    />
                    {social.link && (
                      <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cognition-600 to-cognition-700 hover:from-cognition-700 hover:to-cognition-800 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <svg
                          className="w-6 h-6 group-hover:scale-110 transition-transform duration-300"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        {social.buttonText || "@Mission_FourC"}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      {cta && (
        <section className="py-24 bg-gradient-to-br from-cognition-700 via-consciousness-700 to-care-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              className="max-w-4xl mx-auto"
              variants={conditionalFadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportSettings}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                {cta.title}
              </h2>
              <div
                className="text-xl text-cognition-100 dark:text-gray-300 mb-12 leading-relaxed"
                dangerouslySetInnerHTML={
                  cta.description ? { __html: cta.description } : undefined
                }
              />
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                {cta.primaryText && cta.primaryLink && (
                  <Link
                    href={cta.primaryLink}
                    className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl shadow-lg text-cognition-900 dark:text-white bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                  >
                    {cta.primaryText}
                    <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                )}
                {cta.secondaryText && cta.secondaryLink && (
                  <Link
                    href={cta.secondaryLink}
                    className="group inline-flex items-center justify-center px-8 py-4 border-2 border-white dark:border-gray-700 text-lg font-semibold rounded-xl text-white dark:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-900/50 transition-all duration-300"
                  >
                    {cta.secondaryText}
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
