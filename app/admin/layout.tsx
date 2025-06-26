// app/(admin)/layout.tsx
import { Inter } from "next/font/google";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import Link from "next/link";
import {
  LogOut,
  LayoutDashboard,
  FileEdit,
  Settings,
  Users,
} from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });

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

    const handleSignOut = async () => {
      "use server";
      const supabase = createServerComponentClient({ cookies });
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
                  <Link href="/admin" className="text-white font-bold text-xl">
                    Admin Panel
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                      href="/admin"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                    <Link
                      href="/admin/pages/new"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <FileEdit className="h-4 w-4 mr-2" />
                      New Page
                    </Link>
                    <Link
                      href="/admin/users"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    >
                      <Users className="h-4 w-4 mr-2" />
                      Users
                    </Link>
                    <Link
                      href="/admin/settings"
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
              Admin Dashboard
            </h1>
          </div>
        </header>

        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("❌ Admin layout error:", error);
    redirect("/login");
  }
}
