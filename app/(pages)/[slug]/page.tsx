import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { isUserAdmin } from "@/lib/utils/role-check";
import EditPage from "@/components/admin/EditPage";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isAdmin = user ? await isUserAdmin(user) : false;

  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!page) {
    return <div>Page not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{page.title}</h1>
      {isAdmin ? (
        <EditPage pageId={page.id} />
      ) : (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      )}
    </div>
  );
}
