"use client";

import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaTags,
  FaSearch,
  FaArrowRight,
} from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  featured?: boolean;
};

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Delirium in Critical Care",
    excerpt:
      "An in-depth look at the causes, symptoms, and management of delirium in ICU patients.",
    category: "Clinical Research",
    date: "2025-05-15",
    readTime: "8 min read",
    image: "/blog/delirium-research.jpg",
    tags: ["Delirium", "ICU", "Research"],
    featured: true,
  },
  {
    id: "2",
    title: "The Role of Family in Patient Recovery",
    excerpt:
      "How family engagement improves outcomes for critical care patients and reduces post-ICU syndrome.",
    category: "Patient Care",
    date: "2025-04-22",
    readTime: "6 min read",
    image: "/blog/family-engagement.jpg",
    tags: ["Family", "Recovery", "Patient Care"],
  },
  {
    id: "3",
    title: "Advancements in Cognitive Assessment Tools",
    excerpt:
      "Exploring new digital tools that are revolutionizing cognitive assessment in critical care settings.",
    category: "Technology",
    date: "2025-04-10",
    readTime: "7 min read",
    image: "/blog/cognitive-tools.jpg",
    tags: ["Technology", "Assessment", "Innovation"],
  },
  {
    id: "4",
    title: "Sleep and Recovery in the ICU",
    excerpt:
      "The critical relationship between sleep quality and patient recovery in intensive care units.",
    category: "Clinical Research",
    date: "2025-03-28",
    readTime: "5 min read",
    image: "/blog/sleep-recovery.jpg",
    tags: ["Sleep", "Recovery", "ICU"],
  },
  {
    id: "5",
    title: "Nutrition for Brain Health",
    excerpt:
      "How proper nutrition supports cognitive function and recovery in critically ill patients.",
    category: "Nutrition",
    date: "2025-03-15",
    readTime: "6 min read",
    image: "/blog/nutrition-brain.jpg",
    tags: ["Nutrition", "Brain Health", "Recovery"],
  },
  {
    id: "6",
    title: "Post-ICU Rehabilitation Strategies",
    excerpt:
      "Effective rehabilitation approaches to help patients regain cognitive and physical function after critical illness.",
    category: "Rehabilitation",
    date: "2025-02-28",
    readTime: "9 min read",
    image: "/blog/rehabilitation.jpg",
    tags: ["Rehabilitation", "Recovery", "Therapy"],
  },
];

const categories = [...new Set(blogPosts.map((post) => post.category))];

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      !selectedCategory || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const recentPosts = blogPosts.filter((post) => !post.featured).slice(0, 3);

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
              4C Research Blog
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Insights, research updates, and expert perspectives on critical
              care cognition.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && !searchTerm && !selectedCategory && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Featured Article
            </h2>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-1/3 bg-gray-200 dark:bg-gray-700">
                  <div className="h-full w-full bg-gradient-to-br from-cognition-100 to-cognition-300 dark:from-cognition-800 dark:to-cognition-900 flex items-center justify-center">
                    <FaTags className="text-white text-6xl opacity-30" />
                  </div>
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-cognition-600 dark:text-cognition-400 font-semibold">
                    {featuredPost.category}
                  </div>
                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="block mt-2"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-cognition-600 dark:hover:text-cognition-400 transition-colors">
                      {featuredPost.title}
                    </h3>
                  </Link>
                  <p className="mt-3 text-gray-600 dark:text-gray-300">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <FaClock className="mr-1" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <div className="mt-4">
                    <Link
                      href={`/blog/${featuredPost.id}`}
                      className="inline-flex items-center text-cognition-600 dark:text-cognition-400 hover:text-cognition-700 dark:hover:text-cognition-300 font-medium"
                    >
                      Read more <FaArrowRight className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {searchTerm || selectedCategory
              ? "Search Results"
              : "Latest Articles"}
          </h2>

          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cognition-100 to-cognition-300 dark:from-cognition-800 dark:to-cognition-900 opacity-70"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaTags className="text-white text-6xl opacity-30" />
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-white dark:bg-gray-900 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <Link href={`/blog/${post.id}`} className="block">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-cognition-600 dark:hover:text-cognition-400 transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    category === selectedCategory ? "" : category
                  )
                }
                className={`p-4 rounded-lg text-center transition-colors ${
                  category === selectedCategory
                    ? "bg-cognition-600 text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter CTA */}
      <section className="bg-cognition-50 dark:bg-cognition-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest research updates and blog
            posts.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
            />
            <button className="bg-cognition-600 hover:bg-cognition-700 text-white font-semibold px-6 py-3 rounded-r-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
