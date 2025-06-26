"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaBrain, FaHeartbeat, FaFlask, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function HomePage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
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

  const colorMap = ["cognition", "consciousness", "care"];
  const iconMap = [
    <FaBrain key="brain" />,
    <FaFlask key="flask" />,
    <FaHeartbeat key="heartbeat" />,
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cognition-50 to-white dark:from-cognition-900 dark:to-gray-900">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cognition-900 dark:text-white mb-6">
                {hero.title}
              </motion.h1>
              <motion.p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                {hero.subtitle}
              </motion.p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {hero.primaryText && hero.primaryLink && (
                  <Link
                    href={hero.primaryLink}
                    className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-md text-white bg-cognition-700 hover:bg-cognition-800 transition-colors duration-200 dark:bg-cognition-600 dark:hover:bg-cognition-700"
                  >
                    {hero.primaryText}
                  </Link>
                )}
                {hero.secondaryText && hero.secondaryLink && (
                  <Link
                    href={hero.secondaryLink}
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-cognition-700 text-base font-medium rounded-lg text-cognition-700 hover:bg-cognition-50 transition-colors duration-200 dark:border-cognition-400 dark:text-cognition-100 dark:hover:bg-cognition-900/50"
                  >
                    {hero.secondaryText}
                  </Link>
                )}
              </motion.div>
            </div>
            <motion.div className="relative h-80 md:h-96 lg:h-[32rem]">
              <div className="absolute inset-0 bg-gradient-to-br from-cognition-100 to-white dark:from-cognition-900/50 dark:to-gray-900/30 rounded-3xl transform rotate-6"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-cognition-50 to-white dark:from-cognition-800/50 dark:to-gray-900/20 rounded-3xl transform -rotate-6"></div>
              <div className="relative h-full w-full bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-2xl flex items-center justify-center p-8 shadow-xl">
                <div className="relative w-full h-full">
                  <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-cognition-100/80 dark:bg-cognition-900/50 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-consciousness-100/80 dark:bg-consciousness-900/50 translate-x-1/2 translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-care-100/80 dark:bg-care-900/50 -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl text-cognition-800 dark:text-cognition-200">
                      <Image
                        src={hero.logo || "/logo.png"}
                        alt="4C Lab Logo"
                        width={128}
                        height={128}
                      />
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
          <motion.div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {researchHighlights.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cognition-500 to-care-500 mx-auto mb-6"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {researchHighlights.cards.map((card: any, i: number) => (
              <motion.div
                key={i}
                className={`bg-${colorMap[i]}-50 dark:bg-gray-800 p-8 rounded-xl shadow-lg`}
              >
                <div className="bg-cognition-100 dark:bg-cognition-900/50 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                  {iconMap[i]}
                </div>
                <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-4">
                  {card.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-center">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {services.title}
            </motion.h2>
            <motion.p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {services.description}
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.cards.map((service: any, i: number) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  {iconMap[i]}
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
              {projects.title}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-cognition-500 via-consciousness-500 to-care-500 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.cards.map((project: any, i: number) => (
              <motion.div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-soft overflow-hidden hover:shadow-soft-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="h-40 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white dark:text-gray-200 mb-4 mx-auto relative z-10 bg-gradient-to-br from-cognition-500 to-cognition-600">
                    {iconMap[i]}
                  </div>
                  <h3 className="text-lg font-bold text-foreground dark:text-white mb-2 text-center">
                    {project.title}
                  </h3>
                  <p className="text-sm text-foreground/80 dark:text-gray-400 text-center leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-cognition-600 to-consciousness-600 text-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat: any, i: number) => (
              <motion.div key={i} className="p-6">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-cognition-100 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground dark:text-white mb-2">
                {news.title}
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-cognition-500 to-care-500 rounded-full"></div>
            </div>
            {/* You can add dynamic news cards here if you store them in the DB */}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-cognition-700 to-cognition-900 text-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{cta.title}</h2>
            <p className="text-xl text-cognition-100 dark:text-gray-400 mb-8">
              {cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {cta.primaryText && cta.primaryLink && (
                <Link
                  href={cta.primaryLink}
                  className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-md text-cognition-900 dark:text-white bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  {cta.primaryText}
                  <FaArrowRight className="ml-2" />
                </Link>
              )}
              {cta.secondaryText && cta.secondaryLink && (
                <Link
                  href={cta.secondaryLink}
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white dark:border-gray-700 text-base font-medium rounded-lg text-white dark:text-gray-200 hover:bg-white/10 dark:hover:bg-gray-900/50 transition-colors duration-200"
                >
                  {cta.secondaryText}
                </Link>
              )}
            </div>
            {cta.social && (
              <div className="mt-8">
                <p className="text-cognition-100 dark:text-gray-400 mb-4">
                  Follow us on X for updates and news from the 4C Research Group
                </p>
                <a
                  href={cta.social}
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
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
