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
      {hero && (
        <section className="relative overflow-hidden bg-gradient-to-br from-cognition-50 to-white dark:from-cognition-900 dark:to-gray-900">
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <motion.h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-cognition-900 dark:text-white mb-6">
                  {hero.title}
                </motion.h1>
                <motion.p
                  className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0"
                  dangerouslySetInnerHTML={
                    hero.subtitle ? { __html: hero.subtitle } : undefined
                  }
                />
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
                          width={512}
                          height={512}
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
      )}

      {/* Research Projects Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 className="text-4xl md:text-5xl font-bold text-foreground dark:text-white mb-4">
              {projects.title}
            </motion.h2>
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
                  <p
                    className="text-sm text-foreground/80 dark:text-gray-400 text-center leading-relaxed"
                    dangerouslySetInnerHTML={
                      project.description
                        ? { __html: project.description }
                        : undefined
                    }
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Combined Mission & 4C's Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
            {/* Left Column - Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col h-full"
            >
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  Unveiling the mission within
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-cognition-500 to-care-500 mb-8" />
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 flex-grow">
                Explore the depths of our research, our vision, and our impact.
                Delve into the intricacies of altered cognition and
                consciousness in critically ill children and the transformative
                journey towards improved long-term functional outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/about"
                  className="px-8 py-3 bg-cognition-600 hover:bg-cognition-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/about-pi"
                  className="px-8 py-3 border-2 border-cognition-600 text-cognition-600 hover:bg-cognition-50 dark:border-cognition-400 dark:text-cognition-400 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors flex items-center justify-center"
                >
                  ABOUT THE PI
                </Link>
              </div>
            </motion.div>

            {/* Right Column - 4C's */}
            <motion.div
              className="flex flex-col h-full justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8 text-center">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                  The 4C&apos;s
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-cognition-500 to-care-500 mx-auto mb-8" />
              </div>
              <div className="relative w-full aspect-[4/3] max-w-xl mx-auto">
                <Image
                  src="/images/4cccc.png"
                  alt="The 4C's: Cognition, Care, Compassion, and Collaboration"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {services.title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cognition-500 to-care-500 mx-auto mb-6"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.cards.map((card: any, i: number) => (
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
                <p
                  className="text-gray-700 dark:text-gray-300 text-center"
                  dangerouslySetInnerHTML={
                    card.description ? { __html: card.description } : undefined
                  }
                />
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

      {/* Partners Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Partners
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Mission 4C is generously supported by:
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-center">
            {Array.from({ length: 7 }, (_, i) => (
              <motion.div
                key={`partner-${i + 1}`}
                className="flex items-center justify-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all"
                whileHover={{ y: -5, scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <div className="relative w-full h-full flex items-center justify-center p-2 rounded-lg bg-white dark:bg-white/90 dark:shadow-lg">
                  <Image
                    src={`/partners/partner-${i + 1}.png`}
                    alt={`Partner ${i + 1}`}
                    width={180}
                    height={100}
                    className="h-14 w-auto max-w-full object-contain"
                    priority={i < 8}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* In The News Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Mission 4C In The News
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cognition-500 to-care-500 mx-auto mb-8"></div>
          </div>

          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                SickKids: Researchers investigate a new method of sedation for
                paediatric patients
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our latest research on innovative sedation methods is making
                waves in pediatric care. The study focuses on improving outcomes
                for young patients requiring medical procedures.
              </p>
              <a
                href="https://www.sickkids.ca/en/news/archive/2023/researchers-investigate-a-new-method-of-sedation-for-paediatric-patients/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-cognition-600 dark:text-cognition-400 hover:underline font-medium"
              >
                Read the full article
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Discover our latest research on social media
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cognition-500 to-care-500 mx-auto mb-8"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 md:p-8 text-center">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Mission 4C on Twitter
                  </h3>
                  {cta.social && (
                    <div className="mt-8">
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        Follow us on X for updates and news from the 4C Research
                        Group
                      </p>
                      <a
                        href={cta.social}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cognition-600 hover:bg-cognition-700 text-white transition-colors duration-200 dark:bg-cognition-700 dark:hover:bg-cognition-600"
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
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-cognition-700 to-cognition-900 text-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{cta.title}</h2>
            <p
              className="text-xl text-cognition-100 dark:text-gray-400 mb-8"
              dangerouslySetInnerHTML={
                cta.description ? { __html: cta.description } : undefined
              }
            />
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
          </div>
        </div>
      </section>
    </div>
  );
}
