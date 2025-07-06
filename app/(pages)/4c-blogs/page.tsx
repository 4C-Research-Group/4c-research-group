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
  FaHome,
  FaChevronRight,
  FaNewspaper,
  FaRss,
  FaTh,
  FaList,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getAllBlogPostsWithStats,
  getFeaturedPostsWithStats,
  getCategories,
  type BlogPostWithStats,
} from "@/lib/supabase/blog";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import BlogImage from "@/components/BlogImage";
import LikeButton from "@/components/LikeButton";
import DeleteBlogButton from "@/components/DeleteBlogButton";
import LoadingSpinner from "@/components/ui/loading-spinner";
import FeaturedBlogPosts from "@/components/FeaturedBlogPosts";
import BlogSearchFilters from "@/components/BlogSearchFilters";
import BlogNewsletterSignup from "@/components/BlogNewsletterSignup";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [posts, setPosts] = useState<BlogPostWithStats[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPostWithStats[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [postsData, featuredPostsData, categoriesData] =
          await Promise.all([
            getAllBlogPostsWithStats(),
            getFeaturedPostsWithStats(),
            getCategories(),
          ]);
        setPosts(postsData);
        setFeaturedPosts(featuredPostsData);
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

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "oldest":
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      case "popular":
        return b.likeCount - a.likeCount;
      case "most-commented":
        return b.commentCount - a.commentCount;
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ); // Default to newest
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    setCurrentPage(1); // Reset to first page when sorting
  };

  const handleViewChange = (newView: "grid" | "list") => {
    setViewMode(newView);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link
              href="/"
              className="hover:text-cognition-600 dark:hover:text-cognition-400 flex items-center"
            >
              <FaHome className="w-4 h-4 mr-1" />
              Home
            </Link>
            <FaChevronRight className="w-3 h-3" />
            <span className="text-cognition-600 dark:text-cognition-400 font-medium">
              Blog
            </span>
          </div>
        </div>
      </nav>

      {/* Compact Hero Section */}
      <section className="relative py-12 md:py-16 bg-gradient-to-br from-cognition-50 via-white to-consciousness-50 dark:from-cognition-900 dark:via-gray-900 dark:to-consciousness-900">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-48 h-48 bg-cognition-200/20 dark:bg-cognition-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute top-20 right-20 w-64 h-64 bg-consciousness-200/20 dark:bg-consciousness-700/10 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-10 left-1/4 w-56 h-56 bg-care-200/20 dark:bg-care-700/10 rounded-full animate-pulse-slow" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
                  4C Research Blog
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed max-w-2xl mx-auto">
                Exploring the frontiers of neuroscience through insights,
                research updates, and stories from our work in cognition,
                consciousness, and critical care.
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-6 mb-6">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-cognition-600 dark:text-cognition-400">
                    {posts.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Articles
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-consciousness-600 dark:text-consciousness-400">
                    {categories.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Categories
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-care-600 dark:text-care-400">
                    {featuredPosts.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Featured
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrated Search and Filters */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <BlogSearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            totalPosts={posts.length}
            filteredCount={filteredPosts.length}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            onViewChange={handleViewChange}
          />
        </div>
      </section>

      {/* Featured Blog Posts - Only show if there are featured posts */}
      {featuredPosts.length > 0 && (
        <FeaturedBlogPosts featuredPosts={featuredPosts} isAdmin={isAdmin} />
      )}

      {/* Main Blog Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {searchTerm || selectedCategory
                  ? "Search Results"
                  : "All Articles"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredPosts.length} of {posts.length} articles
                {searchTerm && ` matching "${searchTerm}"`}
                {selectedCategory && ` in ${selectedCategory}`}
              </p>
            </div>

            {/* View Toggle and Admin Actions */}
            <div className="flex items-center gap-4">
              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "grid"
                      ? "bg-white dark:bg-gray-600 text-cognition-600 dark:text-cognition-400 shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <FaTh className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === "list"
                      ? "bg-white dark:bg-gray-600 text-cognition-600 dark:text-cognition-400 shadow-sm"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <FaList className="w-4 h-4" />
                </button>
              </div>

              {/* Admin Create Button */}
              {isAdmin && (
                <Button asChild size="sm">
                  <Link href="/admin/blog/new">+ Create Blog</Link>
                </Button>
              )}
            </div>
          </div>

          {/* Blog Posts Grid/List */}
          {paginatedPosts.length > 0 ? (
            <>
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              >
                {paginatedPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                      viewMode === "list" ? "flex" : "flex flex-col"
                    }`}
                  >
                    <Link
                      href={`/4c-blogs/${post.slug}`}
                      className={`block ${viewMode === "list" ? "flex-1 flex" : ""}`}
                    >
                      {/* Image */}
                      <div
                        className={`relative ${viewMode === "list" ? "w-48 h-32 flex-shrink-0" : "h-48"}`}
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
                        className={`p-6 flex-1 flex flex-col ${viewMode === "list" ? "min-w-0" : ""}`}
                      >
                        {/* Meta Information */}
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
                          className={`text-gray-600 dark:text-gray-300 mb-4 ${
                            viewMode === "list"
                              ? "line-clamp-2"
                              : "line-clamp-3"
                          }`}
                        >
                          {post.excerpt}
                        </p>

                        {/* Category */}
                        <div className="mb-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            {post.category}
                          </span>
                        </div>

                        {/* Stats and Read More */}
                        <div className="mt-auto">
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center text-cognition-600 dark:text-cognition-400 font-medium">
                              Read more
                              <FaArrowRight className="ml-2" />
                            </span>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <LikeButton
                                blogPostId={post.id}
                                showCount={true}
                              />
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
                      <div className="p-4 text-right space-x-2 border-t border-gray-200 dark:border-gray-700">
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-10 h-10 p-0"
                        >
                          {page}
                        </Button>
                      )
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setCurrentPage(1);
                  }}
                  variant="outline"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <BlogNewsletterSignup />

      {/* RSS Feed Link */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
            <FaRss className="w-4 h-4" />
            <span className="text-sm">
              Subscribe to our{" "}
              <Link
                href="/rss.xml"
                className="text-cognition-600 dark:text-cognition-400 hover:underline"
              >
                RSS feed
              </Link>{" "}
              for updates
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
