import { motion } from "framer-motion";
import { FaSearch, FaTh, FaList, FaFilter } from "react-icons/fa";

interface ResearchSearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedStatuses: string[];
  setSelectedStatuses: (statuses: string[]) => void;
  categories: string[];
  statuses: string[];
  totalProjects: number;
  filteredCount: number;
  viewMode: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  onViewAllProjects?: () => void;
}

export default function ResearchSearchFilters({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  selectedStatuses,
  setSelectedStatuses,
  categories,
  statuses,
  totalProjects,
  filteredCount,
  viewMode,
  onViewChange,
  onViewAllProjects,
}: ResearchSearchFiltersProps) {
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

  return (
    <div className="w-4/5 mx-auto mb-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search research projects..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cognition-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Filter Section */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                  <FaFilter className="mr-2" />
                  Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => toggleCategory(category)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
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

              {/* Status */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                  <FaFilter className="mr-2" />
                  Status
                </h3>
                <div className="flex flex-wrap gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => toggleStatus(status)}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
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

          {/* Controls Section */}
          <div className="flex items-center justify-between lg:justify-end gap-4">
            {/* Results Summary */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {filteredCount} of {totalProjects} projects
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedCategories.length > 0 &&
                ` in ${selectedCategories.join(", ")}`}
              {selectedStatuses.length > 0 &&
                ` (${selectedStatuses.join(", ")})`}
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => onViewChange("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-600 text-cognition-600 dark:text-cognition-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <FaTh className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewChange("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-600 text-cognition-600 dark:text-cognition-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                <FaList className="w-4 h-4" />
              </button>
            </div>

            {/* Clear Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* View All Projects Button */}
        {onViewAllProjects && (
          <div className="mt-6 text-center">
            <button
              onClick={onViewAllProjects}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cognition-600 to-cognition-700 hover:from-cognition-700 hover:to-cognition-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
