import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: pages } = await supabase
    .from("pages")
    .select("id, title, slug, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Page Management</h1>
        <Link
          href="/admin/pages/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + New Page
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages?.map((page) => (
          <div
            key={page.id}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">
                <Link
                  href={`/pages/${page.slug}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {page.title}
                </Link>
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Last Updated: {new Date(page.updated_at).toLocaleString()}
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <Link
                href={`/admin/pages/${page.id}`}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-200"
              >
                Edit
              </Link>
              <button className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm font-medium hover:bg-red-200">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
