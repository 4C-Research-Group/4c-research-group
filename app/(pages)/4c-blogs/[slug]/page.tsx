import { notFound } from "next/navigation";
import {
  FaCalendarAlt,
  FaClock,
  FaTags,
  FaArrowLeft,
  FaShare,
  FaBookmark,
} from "react-icons/fa";
import Link from "next/link";
import { getBlogPostBySlug, type BlogPost } from "@/lib/supabase/blog";
import { AdminEditButton } from "@/components/AdminEditButton";
import BlogImage from "@/components/BlogImage";
import CommentsSection from "@/components/comments/CommentsSection";
import LikeButton from "@/components/LikeButton";

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Featured Image */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10"></div>
        <div className="relative h-[60vh] min-h-[400px]">
          <BlogImage
            src={post.image_url}
            alt={post.title}
            title={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-20">
          <Link
            href="/4c-blogs"
            className="inline-flex items-center px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg"
          >
            <FaArrowLeft className="mr-2" />
            Back to Blog
          </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="container mx-auto px-4 pb-16">
            <div className="max-w-4xl mx-auto text-white">
              <div className="flex items-center gap-4 mb-4 text-sm">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                  {post.category}
                </span>
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
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl md:text-2xl text-gray-100 leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-12">
              <AdminEditButton postId={post.id} />

              {/* Author Info */}
              <div className="flex items-center justify-between mb-8 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
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
                      <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-cognition-600 to-cognition-700 text-white font-bold text-2xl">
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
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {post.author_name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {post.author_role}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <LikeButton blogPostId={post.id} />
                  <button className="p-3 text-gray-500 hover:text-cognition-600 transition-colors">
                    <FaShare className="text-lg" />
                  </button>
                  <button className="p-3 text-gray-500 hover:text-cognition-600 transition-colors">
                    <FaBookmark className="text-lg" />
                  </button>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none">
              <div
                className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </article>

            {/* Tags Section */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3 mb-4">
                  <FaTags className="text-cognition-600" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Tags
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-cognition-50 dark:bg-cognition-900/30 text-cognition-700 dark:text-cognition-300 rounded-full text-sm font-medium border border-cognition-200 dark:border-cognition-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Badge */}
            {post.featured && (
              <div className="mt-8 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-600 dark:text-yellow-400">
                    ⭐
                  </span>
                  <span className="text-yellow-800 dark:text-yellow-200 font-medium">
                    Featured Post
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <CommentsSection blogPostId={post.id} />
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
