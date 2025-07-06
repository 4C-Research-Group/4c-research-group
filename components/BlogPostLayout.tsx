"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaTags,
  FaArrowLeft,
  FaShare,
  FaBookmark,
  FaPrint,
  FaEnvelope,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaLink,
  FaEye,
  FaBars,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/lib/supabase/blog";
import { cleanAuthorName } from "@/lib/utils";

interface BlogPostLayoutProps {
  post: BlogPost;
  children: React.ReactNode;
}

export default function BlogPostLayout({
  post,
  children,
}: BlogPostLayoutProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showTableOfContents, setShowTableOfContents] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Calculate reading time
  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const readingTime = calculateReadingTime(post.content);

  // Handle bookmark toggle
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Implement bookmark functionality
  };

  // Handle social sharing
  const sharePost = (platform: string) => {
    const url = window.location.href;
    const title = post.title;
    const text = post.excerpt;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    };

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(
        shareUrls[platform as keyof typeof shareUrls],
        "_blank",
        "width=600,height=400"
      );
    }
  };

  // Handle print
  const printPost = () => {
    window.print();
  };

  // Handle email sharing
  const emailPost = () => {
    const subject = encodeURIComponent(`Check out this article: ${post.title}`);
    const body = encodeURIComponent(
      `I thought you might be interested in this article:\n\n${post.title}\n${post.excerpt}\n\nRead more: ${window.location.href}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Copy link to clipboard
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // TODO: Show toast notification
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  // Update reading progress
  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", updateReadingProgress);
    return () => window.removeEventListener("scroll", updateReadingProgress);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-cognition-600 to-consciousness-600 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section with Featured Image */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10"></div>
        <div className="relative h-[60vh] min-h-[400px]">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Back Button */}
        <motion.div className="absolute top-6 left-6 z-40" style={{ opacity }}>
          <Link
            href="/4c-blogs"
            className="inline-flex items-center px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blogs
          </Link>
        </motion.div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl mx-auto text-white">
              <div className="flex items-center gap-4 mb-4 text-sm">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  {post.category}
                </span>
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="flex items-center">
                  <FaClock className="mr-2" />
                  {readingTime} min read
                </span>
                <span className="flex items-center">
                  <FaEye className="mr-2" />
                  {post.read_time}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-12">
              {/* Author Info */}
              <div className="flex items-center justify-between mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    {post.author_image_url ? (
                      <Image
                        src={post.author_image_url}
                        alt={post.author_name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-cognition-600 to-cognition-700 text-white font-bold text-2xl">
                        {cleanAuthorName(post.author_name)
                          ? cleanAuthorName(post.author_name)
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                          : "A"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {cleanAuthorName(post.author_name)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {post.author_role}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleBookmark}
                    className={`p-3 transition-colors ${
                      isBookmarked
                        ? "text-cognition-600"
                        : "text-gray-500 hover:text-cognition-600"
                    }`}
                    title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
                  >
                    <FaBookmark
                      className={`text-lg ${isBookmarked ? "fill-current" : ""}`}
                    />
                  </button>
                  <button
                    onClick={copyLink}
                    className="p-3 text-gray-500 hover:text-cognition-600 transition-colors"
                    title="Copy link"
                  >
                    <FaLink className="text-lg" />
                  </button>
                  <button
                    onClick={printPost}
                    className="p-3 text-gray-500 hover:text-cognition-600 transition-colors"
                    title="Print article"
                  >
                    <FaPrint className="text-lg" />
                  </button>
                  <button
                    onClick={emailPost}
                    className="p-3 text-gray-500 hover:text-cognition-600 transition-colors"
                    title="Email article"
                  >
                    <FaEnvelope className="text-lg" />
                  </button>
                </div>
              </div>

              {/* Social Sharing */}
              <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Share this article
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => sharePost("twitter")}
                    className="p-2 text-gray-500 hover:text-blue-400 transition-colors"
                    title="Share on Twitter"
                  >
                    <FaTwitter className="text-lg" />
                  </button>
                  <button
                    onClick={() => sharePost("linkedin")}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                    title="Share on LinkedIn"
                  >
                    <FaLinkedin className="text-lg" />
                  </button>
                  <button
                    onClick={() => sharePost("facebook")}
                    className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                    title="Share on Facebook"
                  >
                    <FaFacebook className="text-lg" />
                  </button>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none">
              {children}
            </article>

            {/* Tags Section */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <FaTags className="text-cognition-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Tags
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-cognition-50 dark:bg-cognition-900/30 text-cognition-700 dark:text-cognition-300 rounded-full text-sm font-medium border border-cognition-200 dark:border-cognition-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Badge */}
            {post.featured && (
              <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400">
                    ⭐
                  </span>
                  <span className="text-yellow-800 dark:text-yellow-200 font-medium">
                    Featured Post
                  </span>
                </div>
              </div>
            )}

            {/* Last Updated */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated:{" "}
                {new Date(
                  post.updated_at || post.created_at
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
