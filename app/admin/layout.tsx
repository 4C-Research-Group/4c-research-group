// app/(admin)/layout.tsx
import { Inter } from "next/font/google";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import Link from "next/link";
import {
  LayoutDashboard,
  FileEdit,
  Settings,
  Users,
  Plus,
  Home,
  Users as TeamIcon,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });
const AdminSignOutButton = dynamic(
  () => import("@/components/admin/AdminSignOutButton"),
  { ssr: false }
);

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  try {
    console.log("🔍 Admin layout: Checking authentication...");
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error("❌ Auth error in admin layout:", authError);
      redirect("/login");
    }

    if (!user) {
      console.log("❌ No user found in admin layout");
      redirect("/login");
    }

    console.log("✅ User authenticated in admin layout:", user.id);

    // Check admin status
    console.log("🔍 Admin layout: Checking user role...");
    const { data: userData, error } = await supabase
      .from("users")
      .select("name, role")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("❌ Error checking admin status:", error);
      redirect("/login");
    }

    console.log("👤 User role in admin layout:", userData?.role);

    if (userData?.role !== "admin") {
      console.log("❌ User is not admin, redirecting to dashboard");
      redirect("/dashboard");
    }

    console.log("✅ Admin access granted - rendering admin layout");

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

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Mobile menu button - will be handled by client component */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <button
            id="mobile-menu-button"
            className="p-2 rounded-md bg-white dark:bg-gray-800 shadow-lg"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Sidebar */}
        <div
          className="fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-xl transform -translate-x-full lg:translate-x-0 transition-transform duration-300 ease-in-out"
          id="sidebar"
        >
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
            <Link href="/admin" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cognition-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">4C</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Admin
              </span>
            </Link>
            <button
              id="close-sidebar"
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* User info */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-cognition-100 dark:bg-cognition-900 rounded-full flex items-center justify-center">
                <span className="text-cognition-600 dark:text-cognition-400 font-semibold">
                  {userData?.name?.charAt(0) || user.email?.charAt(0) || "A"}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {userData?.name || "Admin User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <div key={item.name} className="space-y-1">
                <Link
                  href={item.href}
                  className="group flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-cognition-50 dark:hover:bg-cognition-900/50 hover:text-cognition-700 dark:hover:text-cognition-300 transition-colors"
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
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <Link
                href="/"
                className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
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

        {/* Main content */}
        <div className="lg:pl-64">
          {/* Top bar for mobile */}
          <div className="lg:hidden h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"></div>

          {/* Page header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Admin Dashboard
                  </h1>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manage your website content and settings
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    href="/"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    View Site
                  </Link>
                </div>
              </div>
            </div>
          </header>

          {/* Main content area */}
          <main className="py-6">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>

        {/* Mobile overlay */}
        <div
          id="mobile-overlay"
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30 lg:hidden hidden"
        ></div>

        {/* Client-side JavaScript for mobile menu */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                const mobileMenuButton = document.getElementById('mobile-menu-button');
                const closeSidebarButton = document.getElementById('close-sidebar');
                const sidebar = document.getElementById('sidebar');
                const mobileOverlay = document.getElementById('mobile-overlay');

                function openSidebar() {
                  sidebar.classList.remove('-translate-x-full');
                  mobileOverlay.classList.remove('hidden');
                  document.body.style.overflow = 'hidden';
                }

                function closeSidebar() {
                  sidebar.classList.add('-translate-x-full');
                  mobileOverlay.classList.add('hidden');
                  document.body.style.overflow = '';
                }

                mobileMenuButton?.addEventListener('click', openSidebar);
                closeSidebarButton?.addEventListener('click', closeSidebar);
                mobileOverlay?.addEventListener('click', closeSidebar);

                // Close sidebar when clicking on a link (mobile)
                const sidebarLinks = sidebar?.querySelectorAll('a');
                sidebarLinks?.forEach(link => {
                  link.addEventListener('click', () => {
                    if (window.innerWidth < 1024) {
                      closeSidebar();
                    }
                  });
                });
              });
            `,
          }}
        />
      </div>
    );
  } catch (error) {
    console.error("❌ Admin layout error:", error);
    redirect("/login");
  }
}
