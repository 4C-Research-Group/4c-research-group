import { Inter } from "next/font/google";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import Link from "next/link";
import { LogOut, LayoutDashboard, User, Settings } from "lucide-react";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });
import AdminPanelButton from "./AdminPanelButton";
export default async function DashboardLayout({
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
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );

  try {
    console.log("🔍 Dashboard layout: Checking authentication...");
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error("❌ Auth error in dashboard layout:", authError);
      redirect("/login");
    }

    if (!user) {
      console.log("❌ No user found in dashboard layout");
      redirect("/login");
    }

    console.log("✅ User authenticated in dashboard layout:", user.id);

    // Check user role
    console.log("🔍 Dashboard layout: Checking user role...");
    const { data: userData, error } = await supabase
      .from("users")
      .select("name, role")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("❌ Error checking user status:", error);
      // Don't redirect to login if user is authenticated but not in users table
      // Just log the error and continue with default user data
      console.log("⚠️ User not found in users table, using default values");
    }

    // If user is admin and we have user data, redirect to admin panel
    if (userData?.role === "admin") {
      console.log("🔄 User is admin, redirecting to admin panel");
      redirect("/admin");
    }

    console.log("✅ User is not admin, rendering dashboard layout");

    const handleSignOut = async () => {
      "use server";
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
              cookieStore.set({ name, value, ...options });
            },
            remove(name: string, options: any) {
              cookieStore.set({ name, value: "", ...options, maxAge: 0 });
            },
          },
        }
      );
      await supabase.auth.signOut();
      redirect("/");
    };

    return (
      <div className="min-h-full">
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link
                    href="/dashboard"
                    className="text-white font-bold text-xl"
                  >
                    User Dashboard
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                      href="/dashboard"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6 space-x-4">
                  <span className="text-gray-300 text-sm">
                    Signed in as: {userData?.name || user.email}
                  </span>
                  <form action={handleSignOut}>
                    <button
                      type="submit"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign out
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              User Dashboard
            </h1>
          </div>
        </header>

        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Welcome to your Dashboard
                  </h2>
                  <p className="text-gray-600 mb-4">
                    You are logged in as: {user.email}
                  </p>
                  {userData && (
                    <p className="text-gray-600 mb-4">
                      Name: {userData.name} | Role: {userData.role}
                    </p>
                  )}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-blue-800">
                      This is your user dashboard. If you have admin privileges,
                      you can access the admin panel.
                    </p>
                  </div>
                </div>
                <div className="md:ml-8 flex-shrink-0 mb-2 md:mb-0 flex items-start">
                  <AdminPanelButton isAdmin={userData?.role === "admin"} />
                </div>
              </div>
              <div className="mb-6 mt-2">
                <a
                  href="/"
                  className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 transition-colors font-medium"
                >
                  Visit Site Homepage
                </a>
              </div>
            </div>
            {children}
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("❌ Dashboard layout error:", error);
    redirect("/login");
  }
}
