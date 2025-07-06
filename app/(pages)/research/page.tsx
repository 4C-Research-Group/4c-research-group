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
  FaArrowRight,
} from "react-icons/fa";
import { supabase } from "@/lib/supabase/client";

import PageHero from "@/components/PageHero";
import ResearchSearchFilters from "@/components/ResearchSearchFilters";
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

  const handleViewAllProjects = () => {
    const mainContent = document.getElementById("main-research-content");
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setIsLoadingMore(true);
    setTimeout(() => setIsLoadingMore(false), 300);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner />
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Loading research projects...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <PageHero
        title="Research Projects"
        subtitle="Exploring innovative approaches to improve cognitive outcomes in critical care."
      />

      {/* Search and Filters Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <ResearchSearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedStatuses={selectedStatuses}
            setSelectedStatuses={setSelectedStatuses}
            categories={categories}
            statuses={statuses}
            totalProjects={projects.length}
            filteredCount={filteredProjects.length}
            viewMode={viewMode}
            onViewChange={handleViewChange}
            onViewAllProjects={handleViewAllProjects}
          />
        </div>
      </section>

      {/* Main Research Content */}
      <section id="main-research-content" className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="w-4/5 mx-auto">
            {/* Title and Controls Row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              {/* Centered Title */}
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-cognition-900 dark:text-white mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-cognition-600 via-consciousness-600 to-care-600 bg-clip-text text-transparent">
                    {searchTerm ||
                    selectedCategories.length > 0 ||
                    selectedStatuses.length > 0
                      ? "Search Results"
                      : "All Projects"}
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
                  {filteredProjects.length} of {projects.length} projects
                  {searchTerm && ` matching "${searchTerm}"`}
                  {selectedCategories.length > 0 &&
                    ` in ${selectedCategories.join(", ")}`}
                  {selectedStatuses.length > 0 &&
                    ` (${selectedStatuses.join(", ")})`}
                </p>
              </div>

              {/* View Toggle and Admin Actions */}
              <div className="flex items-center justify-center sm:justify-end gap-4">
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
                    <Link href="/admin/projects/new">+ Create Project</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Projects Grid/List */}
          {paginatedProjects.length > 0 ? (
            <>
              {isLoadingMore && (
                <div className="w-4/5 mx-auto mb-8">
                  <div className="flex justify-center">
                    <LoadingSpinner />
                  </div>
                </div>
              )}
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-4/5 mx-auto auto-rows-fr"
                    : "space-y-6 w-4/5 mx-auto"
                }
              >
                {paginatedProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                      viewMode === "list"
                        ? "flex"
                        : "flex flex-col min-h-[400px]"
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
                          className={`font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cognition-600 dark:group-hover:text-cognition-400 transition-colors ${
                            viewMode === "list"
                              ? "text-lg line-clamp-2"
                              : "text-xl line-clamp-2"
                          }`}
                        >
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p
                          className={`text-gray-600 dark:text-gray-300 mb-3 ${
                            viewMode === "list"
                              ? "line-clamp-2"
                              : "line-clamp-3"
                          }`}
                        >
                          {project.description}
                        </p>

                        {/* Meta Row */}
                        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                          <span className="inline-flex items-center px-3 py-1 rounded-full font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            {project.category}
                          </span>
                          <span className="flex items-center text-gray-500 dark:text-gray-400">
                            <FaCalendarAlt className="mr-1.5" />
                            {new Date(project.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>
                          {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {project.tags.slice(0, 2).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="inline-flex items-center px-2 py-1 rounded-full font-medium bg-cognition-100 text-cognition-700 dark:bg-cognition-900 dark:text-cognition-300"
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 2 && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                                  +{project.tags.length - 2}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Bottom Row: View Project CTA and External Link */}
                        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                          <button
                            type="button"
                            tabIndex={-1}
                            className="inline-flex items-center px-3 py-1.5 bg-cognition-600 hover:bg-cognition-700 text-white font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-cognition-500 focus:ring-offset-2 text-xs"
                            style={{ pointerEvents: "none" }}
                            aria-hidden="true"
                          >
                            View Project
                            <FaArrowRight className="ml-1.5 w-3 h-3" />
                          </button>
                          {project.link && !project.link.startsWith("/") && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-2 text-gray-400 hover:text-cognition-600 dark:hover:text-cognition-400 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                              tabIndex={0}
                              aria-label={`External link for project: ${project.title}`}
                            >
                              <FaExternalLinkAlt className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </Link>

                    {/* Admin Actions */}
                    {isAdmin && (
                      <div className="p-4 text-right space-x-2 border-t border-gray-200 dark:border-gray-700">
                        <Link
                          href={`/admin/projects/edit/${project.id}`}
                          className="inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            // TODO: Implement delete functionality
                            console.log("Delete project:", project.id);
                          }}
                          className="inline-block px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </motion.article>
                ))}
              </div>
            </>
          ) : (
            <div className="w-4/5 mx-auto text-center py-16">
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
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategories([]);
                    setSelectedStatuses([]);
                  }}
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
      </section>
    </div>
  );
}
