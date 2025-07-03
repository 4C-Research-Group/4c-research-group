"use client";

import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaTags,
  FaSearch,
  FaArrowRight,
  FaBrain,
  FaFlask,
  FaMicroscope,
  FaHeart,
  FaComment,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getAllBlogPostsWithStats,
  getCategories,
  type BlogPostWithStats,
} from "@/lib/supabase/blog";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import BlogImage from "@/components/BlogImage";
import LikeButton from "@/components/LikeButton";
import DeleteBlogButton from "@/components/DeleteBlogButton";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [posts, setPosts] = useState<BlogPostWithStats[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [postsData, categoriesData] = await Promise.all([
          getAllBlogPostsWithStats(),
          getCategories(),
        ]);
        setPosts(postsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    async function checkRole() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session?.user) return;
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();
      if (!error && data?.role === "admin") setIsAdmin(true);
    }
    checkRole();
  }, []);

  const filteredPosts = posts.filter((post) => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cognition-50 via-white to-consciousness-50 dark:from-cognition-900 dark:via-gray-900 dark:to-consciousness-900">
        {/* Background Bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cognition-200/20 dark:bg-cognition-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-consciousness-200/20 dark:bg-consciousness-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-care-200/20 dark:bg-care-700/10 rounded-full animate-pulse-slow" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
                4C Research Blog
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Exploring the frontiers of neuroscience through insights, research
              updates, and stories from our work in cognition, consciousness,
              and critical care.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-cognition-600 dark:text-cognition-400">
                  {posts.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Articles
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-consciousness-600 dark:text-consciousness-400">
                  {categories.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Categories
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-care-600 dark:text-care-400">
                  Latest
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Research
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="bg-cognition-600 hover:bg-cognition-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() =>
                  document
                    .getElementById("search-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Articles
                <FaArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-900 dark:to-transparent"></div>
      </section>

      {/* Blog Content */}
      <section id="search-section" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Filter by Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      !selectedCategory
                        ? "bg-cognition-600 text-white"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
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
          </div>

          {/* Blog Posts Grid */}
          {isAdmin && (
            <div className="flex justify-end mb-8">
              <Button asChild>
                <Link href="/admin/blog/new">+ Create Blog</Link>
              </Button>
            </div>
          )}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <Link href={`/4c-blogs/${post.slug}`} className="block">
                    <div className="h-48 relative">
                      <BlogImage
                        src={post.image_url}
                        alt={post.title}
                        title={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span className="flex items-center mr-4">
                          <FaCalendarAlt className="mr-1.5" />
                          {new Date(post.created_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                        <span className="flex items-center">
                          <FaClock className="mr-1.5" />
                          {post.read_time}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
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
                  {isAdmin && (
                    <div className="p-4 text-right space-x-2">
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className="inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                      >
                        Edit
                      </Link>
                      <DeleteBlogButton
                        postId={post.id}
                        postTitle={post.title}
                        className="inline-block"
                      />
                    </div>
                  )}
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
