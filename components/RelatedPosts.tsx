"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaCalendarAlt, FaClock } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/supabase/blog";

interface RelatedPostsProps {
  currentPost: BlogPost;
  maxPosts?: number;
}

export default function RelatedPosts({
  currentPost,
  maxPosts = 3,
}: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelatedPosts() {
      try {
        setLoading(true);
        // Fetch posts with the same category, excluding current post
        const response = await fetch(
          `/api/blog/related?category=${encodeURIComponent(currentPost.category)}&excludeId=${currentPost.id}&limit=${maxPosts}`
        );
        if (response.ok) {
          const data = await response.json();
          setRelatedPosts(data);
        }
      } catch (error) {
        console.error("Error fetching related posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRelatedPosts();
  }, [currentPost.category, currentPost.id, maxPosts]);

  if (loading) {
    return (
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-4 animate-pulse"
                >
                  <div className="h-32 bg-gray-200 dark:bg-gray-600 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Related Articles
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <Link href={`/4c-blogs/${post.slug}`} className="block">
                  <div className="h-32 relative">
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <span className="flex items-center mr-3">
                        <FaCalendarAlt className="mr-1" />
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center">
                        <FaClock className="mr-1" />
                        {post.read_time}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 flex items-center text-cognition-600 dark:text-cognition-400 text-xs font-medium">
                      Read more
                      <FaArrowRight className="ml-1" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/4c-blogs"
              className="inline-flex items-center px-6 py-3 bg-cognition-600 hover:bg-cognition-700 text-white font-semibold rounded-full transition-colors duration-300"
            >
              View All Articles
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
