import { getBlogPostById } from "@/lib/supabase/admin/blog";
import { notFound } from "next/navigation";
import EditBlogForm from "./EditBlogForm";

export default async function EditBlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getBlogPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
      <EditBlogForm post={post} />
    </div>
  );
}
