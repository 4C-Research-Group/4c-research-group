import { notFound } from "next/navigation";
import { FaCalendarAlt, FaClock, FaTags, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { getBlogPostBySlug, type BlogPost } from "@/lib/supabase/blog";
import { AdminEditButton } from "@/components/AdminEditButton";
import BlogImage from "@/components/BlogImage";

type Props = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cognition-600 to-cognition-800 text-white">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/4c-blogs"
              className="inline-flex items-center text-cognition-200 hover:text-white mb-6 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to All Posts
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-cognition-200">
              <span className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center">
                <FaClock className="mr-2" />
                {post.read_time}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {post.category}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <AdminEditButton postId={post.id} />
            <div className="prose dark:prose-invert max-w-none">
              <div className="relative aspect-video rounded-xl overflow-hidden mb-12">
                <BlogImage
                  src={post.image_url}
                  alt={post.title}
                  title={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mb-12">
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {post.excerpt}
                </p>
              </div>

              <div
                className="prose-lg dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                    {post.author_image_url ? (
                      <BlogImage
                        src={post.author_image_url}
                        alt={post.author_name}
                        title={post.author_name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold text-2xl">
                        {post.author_name
                          ? post.author_name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                          : "A"}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">
                      {post.author_name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {post.author_role}
                    </p>
                  </div>
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    <FaTags className="mt-1 mr-2 text-gray-500" />
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | 4C Research`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image_url],
      type: "article",
      publishedTime: post.created_at,
      authors: [post.author_name],
    },
  };
}
