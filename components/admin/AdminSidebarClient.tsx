"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Home,
  ChevronRight,
  LayoutDashboard,
  FileEdit,
  Settings,
  Users,
  Plus,
  Users as TeamIcon,
} from "lucide-react";
import dynamic from "next/dynamic";

const AdminSignOutButton = dynamic(
  () => import("@/components/admin/AdminSignOutButton"),
  { ssr: false }
);

interface AdminSidebarClientProps {
  userName: string;
  userEmail: string;
  userRole: string;
}

export default function AdminSidebarClient({
  userName,
  userEmail,
  userRole,
}: AdminSidebarClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      description: "Overview and analytics",
    },
    {
      name: "Content Pages",
      href: "/admin/pages",
      icon: FileEdit,
      description: "Manage website pages",
      children: [
        { name: "Home Page", href: "/admin/edit-home" },
        { name: "About Page", href: "/admin/edit-about" },
        { name: "Contact Page", href: "/admin/edit-contact" },
        { name: "Join 4C Lab Page", href: "/admin/edit-join-4c-lab" },
        { name: "New Page", href: "/admin/pages/new" },
      ],
    },
    {
      name: "Research Projects",
      href: "/admin/projects",
      icon: FileEdit,
      description: "Manage research projects",
    },
    {
      name: "Team Management",
      href: "/admin/team",
      icon: TeamIcon,
      description: "Team members & testimonials",
      children: [
        { name: "Team Members", href: "/admin/team" },
        { name: "Add Member", href: "/admin/team/new" },
        { name: "Testimonials", href: "/admin/testimonials" },
        { name: "Add Testimonial", href: "/admin/testimonials/new" },
      ],
    },
    {
      name: "User Management",
      href: "/admin/users",
      icon: Users,
      description: "Manage user accounts",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      description: "System configuration",
    },
  ];

  const handleSidebarOpen = () => setSidebarOpen(true);
  const handleSidebarClose = () => setSidebarOpen(false);

  // Close sidebar on navigation (mobile)
  const handleNavClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Hamburger menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={handleSidebarOpen}
          className="p-2 rounded-md bg-white dark:bg-gray-800 shadow-lg"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={handleSidebarClose}
          aria-label="Close sidebar overlay"
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:z-40`}
        id="sidebar"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <Link
              href="/admin"
              className="flex items-center space-x-2"
              onClick={handleNavClick}
            >
              <div className="w-8 h-8 bg-cognition-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">4C</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Admin
              </span>
            </Link>
            <button
              onClick={handleSidebarClose}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User info */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-cognition-100 dark:bg-cognition-900 rounded-full flex items-center justify-center">
                <span className="text-cognition-600 dark:text-cognition-400 font-semibold">
                  {userName?.charAt(0) || userEmail?.charAt(0) || "A"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {userName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {userEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation (scrollable) */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto max-h-[calc(100vh-220px)]">
            {navigationItems.map((item) => (
              <div key={item.name} className="space-y-1">
                <Link
                  href={item.href}
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-cognition-50 dark:hover:bg-cognition-900/50 hover:text-cognition-700 dark:hover:text-cognition-300 transition-colors"
                  onClick={handleNavClick}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span className="flex-1">{item.name}</span>
                  {item.children && (
                    <ChevronRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                  )}
                </Link>
                {item.children && (
                  <div className="ml-8 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-cognition-600 dark:hover:text-cognition-400 hover:bg-cognition-50 dark:hover:bg-cognition-900/30 rounded-md transition-colors"
                        onClick={handleNavClick}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer (sticky at bottom) */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={handleNavClick}
              >
                <Home className="mr-3 h-5 w-5" />
                View Site
              </Link>
            </div>
            <div className="mt-3">
              <AdminSignOutButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
