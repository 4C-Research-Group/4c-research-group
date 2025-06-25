// app/(admin)/layout.tsx
import { Inter } from "next/font/google";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isUserAdmin } from "@/lib/utils/role-check";
import { Toaster } from "sonner";
import Link from "next/link";
import { LogOut, LayoutDashboard, FileEdit, Settings } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin = user ? await isUserAdmin(user) : false;

  if (!isAdmin) {
    redirect("/login");
  }

  const handleSignOut = async () => {
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/login");
  };

  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${inter.className} h-full`}>
        <div className="min-h-full">
          <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Link
                      href="/admin"
                      className="text-white font-bold text-xl"
                    >
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
                  <div className="ml-4 flex items-center md:ml-6">
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
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
