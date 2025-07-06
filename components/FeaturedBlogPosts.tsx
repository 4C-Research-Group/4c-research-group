"use client";

import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaArrowRight,
  FaHeart,
  FaComment,
  FaStar,
} from "react-icons/fa";
import Link from "next/link";
import { type BlogPostWithStats } from "@/lib/supabase/blog";
import BlogImage from "@/components/BlogImage";
import LikeButton from "@/components/LikeButton";

interface FeaturedBlogPostsProps {
  featuredPosts: BlogPostWithStats[];
  isAdmin?: boolean;
  viewMode?: "grid" | "list";
}

export default function FeaturedBlogPosts({
  featuredPosts,
  isAdmin = false,
  viewMode = "grid",
}: FeaturedBlogPostsProps) {
  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-cognition-50 via-white to-consciousness-50 dark:from-cognition-900 dark:via-gray-900 dark:to-consciousness-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-cognition-900 dark:text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
              Featured Articles
            </span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover our most important research insights and breakthrough
            findings
          </motion.p>
        </motion.div>

        {/* Featured Posts Grid/List */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-4/5 mx-auto"
              : "space-y-6 w-4/5 mx-auto"
          }
        >
          {featuredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`group relative bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                viewMode === "list" ? "flex" : "flex flex-col"
              }`}
            >
              {/* Featured Badge */}
              <div
                className={`absolute z-10 ${viewMode === "list" ? "top-2 left-2" : "top-3 left-3"}`}
              >
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-cognition-600 text-white shadow-lg">
                  <FaStar className="mr-1 w-3 h-3" />
                  Featured
                </span>
              </div>

              <Link
                href={`/4c-blogs/${post.slug}`}
                className={`block ${viewMode === "list" ? "flex-1 flex" : ""}`}
              >
                {/* Image */}
                <div
                  className={`relative ${viewMode === "list" ? "w-48 h-32 flex-shrink-0" : "h-40"}`}
                >
                  <BlogImage
                    src={post.image_url}
                    alt={post.title}
                    title={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div
                  className={`p-4 flex-1 flex flex-col ${viewMode === "list" ? "min-w-0" : ""}`}
                >
                  {/* Meta Information */}
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center mr-4">
                      <FaCalendarAlt className="mr-1.5" />
                      {new Date(post.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center">
                      <FaClock className="mr-1.5" />
                      {post.read_time}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-bold text-gray-900 dark:text-white mb-3 ${
                      viewMode === "list"
                        ? "text-lg line-clamp-2"
                        : "text-xl line-clamp-2"
                    }`}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    className={`text-gray-600 dark:text-gray-300 mb-3 ${
                      viewMode === "list" ? "line-clamp-2" : "line-clamp-2"
                    }`}
                  >
                    {post.excerpt}
                  </p>

                  {/* Category */}
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      {post.category}
                    </span>
                  </div>

                  {/* Author Info - Compact */}
                  {post.author_name && (
                    <div className="flex items-center mb-3">
                      <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                          {post.author_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-gray-900 dark:text-white">
                          {post.author_name}
                        </div>
                        {post.author_role && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {post.author_role}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Stats and Read More */}
                  <div className="mt-auto">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center text-cognition-600 dark:text-cognition-400 font-medium">
                        Read more
                        <FaArrowRight className="ml-2" />
                      </span>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <LikeButton blogPostId={post.id} showCount={true} />
                        <div className="flex items-center gap-1">
                          <FaComment className="w-4 h-4" />
                          <span>{post.commentCount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Admin Actions */}
              {isAdmin && (
                <div className="absolute top-3 right-3 z-10 flex gap-2">
                  <Link
                    href={`/admin/blog/edit/${post.id}`}
                    className="inline-block px-2 py-1 bg-blue-600 text-white rounded text-xs font-medium transition-colors duration-200"
                  >
                    Edit
                  </Link>
                </div>
              )}
            </motion.article>
          ))}
        </div>

        {/* View All Posts CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8"
        >
          <Link
            href="#main-blog-content"
            className="inline-flex items-center px-6 py-3 bg-cognition-600 hover:bg-cognition-700 text-white text-base font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("main-blog-content");
              if (element) {
                const offset = 80; // Account for any fixed headers
                const elementPosition = element.offsetTop - offset;
                window.scrollTo({
                  top: elementPosition,
                  behavior: "smooth",
                });
              }
            }}
          >
            View All Articles
            <FaArrowRight className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
