import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
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
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    // Get user data for display
    const { data: userData } = await supabase
      .from("users")
      .select("name, role")
      .eq("id", user.id)
      .single();

    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to your Dashboard
        </h2>
        <p className="text-gray-600 mb-4">You are logged in as: {user.email}</p>
        {userData && (
          <p className="text-gray-600 mb-4">
            Name: {userData.name} | Role: {userData.role}
          </p>
        )}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-blue-800">
            This is your user dashboard. If you have admin privileges, you can
            access the admin panel.
          </p>
        </div>

        {/* Admin Panel Link or Message */}
        <div className="mb-2">
          {userData?.role === "admin" ? (
            <a
              href="/admin"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded border border-blue-700 hover:bg-blue-700 transition-colors font-medium mb-2"
            >
              Go to Admin Panel
            </a>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-yellow-800 mb-2">
              You do not have access to the admin panel. Please contact your
              admin to grant you access.
            </div>
          )}
        </div>
        {/* Visit Site Homepage Link */}
        <div className="mb-6">
          <a
            href="/"
            className="inline-block px-4 py-2 bg-gray-100 text-gray-800 rounded border border-gray-300 hover:bg-gray-200 transition-colors font-medium"
          >
            Visit Site Homepage
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Profile
            </h3>
            <p className="text-gray-600 mb-4">
              Manage your account settings and profile information.
            </p>
            <a
              href="/dashboard/profile"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              View Profile →
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Settings
            </h3>
            <p className="text-gray-600 mb-4">
              Configure your preferences and account settings.
            </p>
            <a
              href="/dashboard/settings"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              View Settings →
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Activity
            </h3>
            <p className="text-gray-600 mb-4">
              View your recent activity and account history.
            </p>
            <a
              href="/dashboard/activity"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              View Activity →
            </a>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Dashboard error:", error);
    redirect("/login");
  }
}
