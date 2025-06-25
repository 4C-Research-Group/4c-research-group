import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isUserAdmin } from "@/lib/utils/role-check";
import { PageForm } from "@/components/admin/PageForm";

export default async function NewPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin = user ? await isUserAdmin(user) : false;

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
