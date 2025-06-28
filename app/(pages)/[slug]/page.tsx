import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import EditPage from "@/components/admin/EditPage";

export default async function Page({ params }: { params: { slug: string } }) {
  try {
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

    const { data: page, error } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", params.slug)
      .single();

    if (error || !page) {
      return (
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Page not found</h1>
          <p>The page you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      );
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
  } catch (error) {
    console.error("Error loading page:", error);
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <p>An error occurred while loading the page.</p>
      </div>
    );
  }
}
