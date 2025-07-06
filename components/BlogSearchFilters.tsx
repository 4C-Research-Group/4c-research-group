"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaTimes,
  FaSort,
  FaFilter,
  FaEye,
  FaList,
  FaTh,
  FaHistory,
  FaChartLine,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface BlogSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  totalPosts: number;
  filteredCount: number;
  sortBy: string;
  onSortChange?: (sortBy: string) => void;
  onViewChange?: (view: "grid" | "list") => void;
}

export default function BlogSearchFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  totalPosts,
  filteredCount,
  sortBy,
  onSortChange,
  onViewChange,
}: BlogSearchFiltersProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".sort-dropdown")) {
        setShowAdvancedFilters(false);
      }
    };

    if (showAdvancedFilters) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAdvancedFilters]);

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem("blog-search-history");
    if (history) {
      setSearchHistory(JSON.parse(history));
    }
  }, []);

  // Save search term to history
  const saveToHistory = (term: string) => {
    if (term.trim() && !searchHistory.includes(term.trim())) {
      const newHistory = [term.trim(), ...searchHistory.slice(0, 4)];
      setSearchHistory(newHistory);
      localStorage.setItem("blog-search-history", JSON.stringify(newHistory));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSearchSuggestions(value.length > 0);
  };

  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
    saveToHistory(term);
    setShowSearchSuggestions(false);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    onSortChange?.("newest");
  };

  const handleSortChange = (newSortBy: string) => {
    onSortChange?.(newSortBy);
    setShowAdvancedFilters(false);
  };

  const handleViewChange = (newView: "grid" | "list") => {
    setViewMode(newView);
    onViewChange?.(newView);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const hasActiveFilters =
    searchTerm || selectedCategory || sortBy !== "newest";

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles by title, content, or tags..."
              className="block w-full pl-10 pr-10 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowSearchSuggestions(searchTerm.length > 0)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="text-sm" />
              </button>
            )}
          </div>

          {/* Search Suggestions */}
          <AnimatePresence>
            {showSearchSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600"
              >
                {searchHistory.length > 0 && (
                  <div className="p-2">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                      <FaHistory className="mr-1" />
                      Recent searches
                    </div>
                    {searchHistory.map((term, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearchSubmit(term)}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Category Filters */}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
              <FaFilter className="mr-2" />
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryClick("")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !selectedCategory
                    ? "bg-cognition-600 text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                All ({totalPosts})
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
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

          {/* Sort and View Controls */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative sort-dropdown">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center gap-2"
              >
                <FaSort className="text-sm" />
                Sort:{" "}
                {sortBy === "newest"
                  ? "Newest"
                  : sortBy === "oldest"
                    ? "Oldest"
                    : sortBy === "popular"
                      ? "Most Popular"
                      : sortBy === "most-commented"
                        ? "Most Commented"
                        : sortBy === "title"
                          ? "Alphabetical"
                          : "Newest"}
              </Button>

              <AnimatePresence>
                {showAdvancedFilters && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-50"
                  >
                    <div className="p-2">
                      <button
                        onClick={() => handleSortChange("newest")}
                        className={`block w-full text-left px-3 py-2 text-sm rounded ${
                          sortBy === "newest"
                            ? "bg-cognition-100 text-cognition-700 dark:bg-cognition-900 dark:text-cognition-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                        }`}
                      >
                        Newest First
                      </button>
                      <button
                        onClick={() => handleSortChange("oldest")}
                        className={`block w-full text-left px-3 py-2 text-sm rounded ${
                          sortBy === "oldest"
                            ? "bg-cognition-100 text-cognition-700 dark:bg-cognition-900 dark:text-cognition-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                        }`}
                      >
                        Oldest First
                      </button>
                      <button
                        onClick={() => handleSortChange("popular")}
                        className={`block w-full text-left px-3 py-2 text-sm rounded ${
                          sortBy === "popular"
                            ? "bg-cognition-100 text-cognition-700 dark:bg-cognition-900 dark:text-cognition-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                        }`}
                      >
                        Most Popular
                      </button>
                      <button
                        onClick={() => handleSortChange("most-commented")}
                        className={`block w-full text-left px-3 py-2 text-sm rounded ${
                          sortBy === "most-commented"
                            ? "bg-cognition-100 text-cognition-700 dark:bg-cognition-900 dark:text-cognition-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                        }`}
                      >
                        Most Commented
                      </button>
                      <button
                        onClick={() => handleSortChange("title")}
                        className={`block w-full text-left px-3 py-2 text-sm rounded ${
                          sortBy === "title"
                            ? "bg-cognition-100 text-cognition-700 dark:bg-cognition-900 dark:text-cognition-300"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                        }`}
                      >
                        Alphabetical
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => handleViewChange("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-600 text-cognition-600 dark:text-cognition-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                title="Grid view"
              >
                <FaTh className="text-sm" />
              </button>
              <button
                onClick={() => handleViewChange("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-600 text-cognition-600 dark:text-cognition-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                title="List view"
              >
                <FaList className="text-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>
                Showing {filteredCount} of {totalPosts} articles
              </span>
              {hasActiveFilters && (
                <span className="flex items-center gap-1">
                  <FaChartLine className="text-cognition-600" />
                  Filtered results
                </span>
              )}
            </div>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <FaTimes className="mr-1" />
                Clear filters
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
