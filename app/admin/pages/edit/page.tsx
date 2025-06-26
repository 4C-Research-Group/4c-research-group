import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { PageForm } from "@/components/admin/PageForm";
import { notFound } from "next/navigation";

export default async function EditPage({
  searchParams,
}: {
  searchParams: { path: string };
}) {
  const path = searchParams.path;
  if (!path) {
    return notFound();
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check admin status
  let isAdmin = false;
  if (user) {
    try {
      const { data } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();
      isAdmin = data?.role === "admin";
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  }

  if (!isAdmin) {
    redirect("/login");
  }

  // Read the page content
  let pageContent = "";
  try {
    const fs = await import("fs/promises");
    const pathModule = await import("path");
    const filePath = pathModule.join(
      process.cwd(),
      `app/(pages)${path === "/" ? "" : path}`,
      "page.tsx"
    );

    try {
      pageContent = await fs.readFile(filePath, "utf-8");
    } catch (error) {
      console.error(`Error reading file at ${filePath}:`, error);
      return notFound();
    }
  } catch (error) {
    console.error("Error importing fs/promises:", error);
    return notFound();
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Page: {path || "/"}</h1>
      <PageForm
        initialData={{
          id: path,
          title: path.split("/").pop() || "Home",
          content: pageContent,
        }}
      />
    </div>
  );
}
