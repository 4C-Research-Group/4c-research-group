"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaSearch,
  FaTh,
  FaList,
  FaCalendarAlt,
  FaUser,
  FaExternalLinkAlt,
  FaFilter,
  FaArrowRight,
} from "react-icons/fa";
import { supabase } from "@/lib/supabase/client";

import PageHero from "@/components/PageHero";
import ResearchPagination from "@/components/ResearchPagination";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  status: string;
  tags: string[];
  link?: string;
  slug: string;
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

const ITEMS_PER_PAGE = 9;

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    async function checkAdminRole() {
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

    fetchProjects();
    checkAdminRole();
  }, []);

  // Filter projects based on search and filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = searchTerm
      ? project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.tags &&
          project.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ))
      : true;

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(project.category);
    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.includes(project.status);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Get unique categories and statuses
  const categories = Array.from(
    new Set(projects.map((p) => p.category))
  ).filter(Boolean);
  const statuses = Array.from(new Set(projects.map((p) => p.status))).filter(
    Boolean
  );

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleViewChange = (newView: "grid" | "list") => {
    setViewMode(newView);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsLoadingMore(true);
    setTimeout(() => setIsLoadingMore(false), 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((c: string) => c !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleStatus = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s: string) => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setSelectedStatuses([]);
  };

  const hasActiveFilters =
    searchTerm || selectedCategories.length > 0 || selectedStatuses.length > 0;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: {
        color:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        text: "Active",
      },
      completed: {
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        text: "Completed",
      },
      pending: {
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        text: "Pending",
      },
      on_hold: {
        color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        text: "On Hold",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  const formatProjectDates = (
    startDate: string,
    status: string,
    endDate?: string
  ) => {
    const start = new Date(startDate);
    const startYear = start.getFullYear();

    if (endDate) {
      const end = new Date(endDate);
      const endYear = end.getFullYear();

      if (startYear === endYear) {
        return `${startYear}`;
      } else {
        return `${startYear} - ${endYear}`;
      }
    } else {
      // No end date - show start year and indicate ongoing
      if (status === "active") {
        return `${startYear} - Present`;
      } else {
        return `${startYear}`;
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <PageHero
        title="Research Projects"
        subtitle='<span class="whitespace-normal sm:whitespace-nowrap">Exploring innovative approaches to improve cognitive outcomes in critical care.</span>'
      >
        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          <div className="text-center">
            <div className="text-xl md:text-2xl font-bold text-cognition-600 dark:text-cognition-400">
              {projects.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Projects
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
                    placeholder="Search projects..."
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
                  {filteredProjects.length} projects
                </div>

                {/* Clear Filters Button - Only show when filters are active */}
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}

                {/* View Toggle */}
                <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-md p-0.5">
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
                    <Link href="/admin/projects/new">+ Create</Link>
                  </Button>
                )}
              </div>
            </div>

            {/* Second Row: Category and Status Filters */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  Category:
                </span>
                <div className="flex flex-wrap gap-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-2 py-1 text-xs rounded-full transition-colors ${
                        selectedCategories.includes(category)
                          ? "bg-cognition-600 text-white"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                  Status:
                </span>
                <div className="flex flex-wrap gap-1">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => toggleStatus(status)}
                      className={`px-2 py-1 text-xs rounded-full transition-colors ${
                        selectedStatuses.includes(status)
                          ? "bg-cognition-600 text-white"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className="w-4/5 mx-auto pb-12">
        {paginatedProjects.length > 0 ? (
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
              {paginatedProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                    viewMode === "list" ? "flex" : "flex flex-col"
                  }`}
                >
                  <Link
                    href={`/research/${project.slug}`}
                    className={`block group focus:outline-none focus:ring-2 focus:ring-cognition-500 ${viewMode === "list" ? "flex-1 flex" : ""}`}
                    tabIndex={0}
                    aria-label={`View details for project: ${project.title}`}
                  >
                    {/* Image */}
                    <div
                      className={`relative ${viewMode === "list" ? "w-48 h-32 flex-shrink-0" : "h-44"}`}
                    >
                      <Image
                        src={project.image || "/images/placeholder.jpg"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                      />
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        {getStatusBadge(project.status)}
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`p-4 flex-1 flex flex-col ${viewMode === "list" ? "min-w-0" : ""}`}
                    >
                      {/* Title */}
                      <h3
                        className={`font-bold text-gray-900 dark:text-white mb-1 group-hover:text-cognition-600 dark:group-hover:text-cognition-400 transition-colors ${
                          viewMode === "list"
                            ? "text-lg line-clamp-2"
                            : "text-xl line-clamp-2"
                        }`}
                      >
                        {project.title}
                      </h3>

                      {/* Key Focus Area */}
                      {project.tags && project.tags.length > 0 && (
                        <p className="text-sm italic text-cognition-600 dark:text-cognition-400 mb-2">
                          {project.tags[0]}
                        </p>
                      )}

                      {/* Description */}
                      <p
                        className={`text-gray-600 dark:text-gray-300 mb-3 ${
                          viewMode === "list" ? "line-clamp-2" : "line-clamp-3"
                        }`}
                      >
                        {project.description.replace(/<[^>]*>/g, "")}
                      </p>

                      {/* Meta Row */}
                      <div className="flex flex-wrap items-center gap-2 text-xs mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          {project.category}
                        </span>
                        <span className="flex items-center text-gray-500 dark:text-gray-400">
                          <FaCalendarAlt className="mr-1.5" />
                          {formatProjectDates(
                            project.start_date,
                            project.status,
                            project.end_date
                          )}
                        </span>
                      </div>

                      {/* External Link (if exists) - positioned naturally */}
                      {project.link && !project.link.startsWith("/") && (
                        <div className="mt-auto flex items-center justify-end">
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-cognition-600 dark:hover:text-cognition-400 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                            tabIndex={0}
                            aria-label={`External link for project: ${project.title}`}
                          >
                            <FaExternalLinkAlt className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={clearAllFilters}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cognition-600 hover:bg-cognition-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cognition-500 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Pagination */}
        <ResearchPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          scrollToTop={scrollToTop}
        />
      </div>
    </div>
  );
}
