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
  FaArrowUp,
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

import BlogNewsletterSignup from "@/components/BlogNewsletterSignup";
import PageHero from "@/components/PageHero";

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
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

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

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  const handlePageChange = (page: number) => {
    setIsLoadingMore(true);
    setCurrentPage(page);
    // Simulate loading delay for better UX
    setTimeout(() => setIsLoadingMore(false), 300);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Generate pagination range for better mobile experience
  const getPaginationRange = () => {
    const delta = 2; // Show 2 pages on each side
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background scroll-smooth">
      {/* Hero Section */}
      <PageHero
        title="4C Research Blog"
        subtitle="Exploring the frontiers of neuroscience through insights, research updates, and stories from our work in cognition, consciousness, and critical care."
      >
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

        {/* View All Articles Button */}
        <div className="flex justify-center mb-6">
          <Button
            asChild
            size="lg"
            className="bg-cognition-600 hover:bg-cognition-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Link href="#all-articles" className="flex items-center gap-2">
              <FaNewspaper className="w-5 h-5" />
              View All Articles
              <FaArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </PageHero>

      {/* Compact Filter Bar */}
      <div className="w-4/5 mx-auto py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <div className="flex flex-col gap-4">
            {/* First Row: Search and Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400 w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cognition-500 focus:border-transparent text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                {/* Results Count */}
                <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                  {filteredPosts.length} articles
                </div>

                {/* Clear Filters Button - Only show when filters are active */}
                {(searchTerm || selectedCategory || sortBy !== "newest") && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}

                {/* View Toggle */}
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md p-0.5">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === "grid"
                        ? "bg-white dark:bg-gray-600 text-cognition-600 dark:text-cognition-400 shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    <FaTh className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === "list"
                        ? "bg-white dark:bg-gray-600 text-cognition-600 dark:text-cognition-400 shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    <FaList className="w-3 h-3" />
                  </button>
                </div>

                {/* Admin Create Button */}
                {isAdmin && (
                  <Button asChild size="sm">
                    <Link href="/admin/blog/new">+ Create</Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Second Row: Category Filter and Sort */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  Category:
                </span>
                <div className="flex flex-wrap gap-1">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`px-2 py-1 text-xs rounded-full transition-colors ${
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
                      className={`px-2 py-1 text-xs rounded-full transition-colors ${
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

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cognition-500"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="popular">Most Popular</option>
                  <option value="most-commented">Most Commented</option>
                  <option value="title">Title A-Z</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Blog Posts - Only show if there are featured posts and no active filters */}
      {featuredPosts.length > 0 && !searchTerm && !selectedCategory && (
        <FeaturedBlogPosts
          featuredPosts={featuredPosts}
          isAdmin={isAdmin}
          viewMode={viewMode}
        />
      )}

      {/* All Articles Section */}
      <div id="all-articles" className="w-4/5 mx-auto py-8 -mt-16 pt-24">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">
            <span className="bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
              All Articles
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Explore our complete collection of research insights and updates
          </p>
          {/* Solid Lines */}
          <div className="flex justify-center items-center gap-2">
            <div className="w-8 h-1 bg-cognition-600"></div>
            <div className="w-2 h-1 bg-consciousness-600"></div>
            <div className="w-8 h-1 bg-care-600"></div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid/List */}
      <div className="w-4/5 mx-auto pb-12">
        {paginatedPosts.length > 0 ? (
          <>
            {isLoadingMore && (
              <div className="mb-8">
                <div className="flex justify-center">
                  <LoadingSpinner />
                </div>
              </div>
            )}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
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
                      className={`relative ${viewMode === "list" ? "w-48 h-32 flex-shrink-0" : "h-40"}`}
                    >
                      <BlogImage
                        src={post.image_url}
                        alt={post.title}
                        title={post.title}
                        fill
                        className="object-cover"
                      />

                      {/* Admin Actions - Top Right */}
                      {isAdmin && (
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Link
                            href={`/admin/blog/edit/${post.id}`}
                            className="inline-block px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs shadow-lg backdrop-blur-sm bg-opacity-90"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Edit
                          </Link>
                          <DeleteBlogButton
                            postId={post.id}
                            postTitle={post.title}
                            className="inline-block px-2 py-1 text-xs shadow-lg backdrop-blur-sm bg-opacity-90"
                          />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div
                      className={`p-4 flex-1 flex flex-col ${viewMode === "list" ? "min-w-0" : ""}`}
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
                        className={`text-gray-600 dark:text-gray-300 mb-3 ${
                          viewMode === "list" ? "line-clamp-2" : "line-clamp-2"
                        }`}
                      >
                        {post.excerpt}
                      </p>

                      {/* Category and Tags */}
                      <div className="mb-3 flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          {post.category}
                        </span>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-cognition-100 text-cognition-700 dark:bg-cognition-900 dark:text-cognition-300"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 2 && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                +{post.tags.length - 2}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Author Info */}
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
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12 w-4/5 mx-auto">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2"
                  >
                    Previous
                  </Button>

                  {getPaginationRange().map((page, index) => (
                    <div key={index}>
                      {page === "..." ? (
                        <span className="px-3 py-2 text-gray-500 dark:text-gray-400">
                          ...
                        </span>
                      ) : (
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page as number)}
                          className="w-12 h-12 p-0 text-sm font-medium"
                        >
                          {page}
                        </Button>
                      )}
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2"
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 w-4/5 mx-auto">
            <div className="max-w-md mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-20 h-20 bg-gradient-to-br from-cognition-100 to-consciousness-100 dark:from-cognition-800 dark:to-consciousness-800 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <FaSearch className="w-10 h-10 text-cognition-600 dark:text-cognition-400" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl font-bold text-gray-900 dark:text-white mb-3"
              >
                No articles found
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-600 dark:text-gray-400 mb-8 text-lg"
              >
                {searchTerm || selectedCategory
                  ? "Try adjusting your search or filter criteria"
                  : "We're working on new content. Check back soon!"}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("");
                    setCurrentPage(1);
                  }}
                  variant="outline"
                  className="px-6 py-2"
                >
                  Clear Filters
                </Button>
                <Button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-cognition-600 hover:bg-cognition-700"
                >
                  Refresh Page
                </Button>
              </motion.div>
            </div>
          </div>
        )}
      </div>

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

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-cognition-600 hover:bg-cognition-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
