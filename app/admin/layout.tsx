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
import AdminSidebarClient from "@/components/admin/AdminSidebarClient";

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
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            console.error("Error setting cookie:", error);
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: "", ...options, maxAge: 0 });
          } catch (error) {
            console.error("Error removing cookie:", error);
          }
        },
      },
    }
  );

  // Get the session first
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    console.error("❌ No session found or error:", sessionError);
    redirect("/login?message=You need to sign in to access this page");
  }

  try {
    console.log("🔍 Admin layout: Checking authentication...");
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("❌ Error getting user:", userError);
      redirect("/login?message=You need to sign in to access this page");
    }

    console.log("✅ User authenticated in admin layout:", user.id);

    // Check admin status
    console.log("🔍 Admin layout: Checking user role...");
    const { data: userData, error: roleError } = await supabase
      .from("users")
      .select("name, role")
      .eq("id", user.id)
      .single();

    if (roleError || !userData) {
      console.error("❌ Error checking admin status:", roleError);
      redirect("/dashboard?message=Error verifying your permissions");
    }

    console.log("👤 User role in admin layout:", userData?.role);

    if (userData?.role !== "admin") {
      console.log("❌ User is not admin, redirecting to dashboard");
      redirect(
        "/dashboard?message=You don't have permission to access this page"
      );
    }

    console.log("✅ Admin access granted - rendering admin layout");

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AdminSidebarClient
          userName={userData?.name || "Admin User"}
          userEmail={user?.email || ""}
          userRole={userData?.role || "admin"}
        />

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
      </div>
    );
  } catch (error) {
    console.error("❌ Admin layout error:", error);
    redirect("/login");
  }
}
