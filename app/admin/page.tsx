import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const supabase = createServerComponentClient({ cookies });

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("❌ Auth error in admin page:", authError);
      redirect("/login");
    }

    // Check admin status
    const { data: userData, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    if (error || userData?.role !== "admin") {
      console.error("❌ User is not admin:", error);
      redirect("/dashboard");
    }

    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Admin Dashboard
        </h2>
        <p className="text-gray-600 mb-4">
          You have successfully logged in as an admin user.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800">
            ✅ Authentication successful! You can now manage your site content.
          </p>
        </div>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">
            <strong>User ID:</strong> {user.id}
          </p>
          <p className="text-blue-800">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-blue-800">
            <strong>Role:</strong> {userData.role}
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error("❌ Admin page error:", error);
    redirect("/login");
  }
}
