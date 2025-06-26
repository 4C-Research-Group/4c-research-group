import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PageForm } from "@/components/admin/PageForm";

export default async function NewPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check admin status directly using server client
  let isAdmin = false;
  if (user) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      isAdmin = !error && data?.role === "admin";
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  }

  if (!isAdmin) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Page</h1>
      <PageForm />
    </div>
  );
}
