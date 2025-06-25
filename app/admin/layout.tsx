import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if not authenticated
  if (!user) {
    redirect(
      "/login?message=You must be logged in to access the admin dashboard"
    );
  }

  // Check if user is admin
  const { data: userData } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!userData?.is_admin) {
    redirect("/unauthorized");
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="mt-2 text-sm text-gray-600">
            <div>{user.email}</div>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Admin
            </div>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          <Link
            href="/admin"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            Overview
          </Link>
          <Link
            href="/admin/pages"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            Pages
          </Link>
          <Link
            href="/admin/users"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
          >
            Users
          </Link>
          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
            >
              Sign Out
            </button>
          </form>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">{children}</div>
    </div>
  );
}
