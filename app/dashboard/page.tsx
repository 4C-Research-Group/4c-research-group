import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to your Dashboard
            </h1>
            <p className="text-gray-600 mb-4">
              You are logged in as: {user.email}
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                This is your user dashboard. If you have admin privileges, you
                can access the admin panel.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    redirect("/login");
  }
}
