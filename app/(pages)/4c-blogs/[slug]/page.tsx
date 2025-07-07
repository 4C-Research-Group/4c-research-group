import { notFound } from "next/navigation";
import {
  FaCalendarAlt,
  FaClock,
  FaTags,
  FaArrowLeft,
  FaShare,
  FaBookmark,
  FaComment,
} from "react-icons/fa";
import Link from "next/link";
import { getBlogPostBySlug, type BlogPost } from "@/lib/supabase/blog";
import { getCommentCount } from "@/lib/supabase/comments";
import { AdminEditButton } from "@/components/AdminEditButton";
import BlogImage from "@/components/BlogImage";
import CommentsSection from "@/components/comments/CommentsSection";
import LikeButton from "@/components/LikeButton";
import RichTextContent from "@/components/ui/rich-text-content";
import { cleanAuthorName } from "@/lib/utils";

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

  // Get comment count for this post
  const commentCount = await getCommentCount(post.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden">
      {/* Hero Section with Featured Image */}
      <section className="relative overflow-hidden">
        {/* Background image and overlay */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10 pointer-events-none"></div>
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
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-40">
          <Link
            href="/4c-blogs"
            className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 shadow-lg text-sm sm:text-base"
          >
            <FaArrowLeft className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Back to Blogs</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>

        {/* Hero Content (in normal flow) */}
        <div className="relative z-20 container mx-auto px-4 pt-12 pb-12 sm:pt-20 sm:pb-20 flex flex-col justify-center">
          <div className="max-w-6xl mx-auto text-white">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 text-xs sm:text-sm mt-8 sm:mt-12">
              <span className="px-2 py-1 sm:px-3 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full">
                {post.category}
              </span>
              <span className="flex items-center">
                <FaCalendarAlt className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="sm:hidden">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </span>
              <span className="flex items-center">
                <FaClock className="mr-1 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4" />
                {post.read_time}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight break-words">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 leading-relaxed max-w-3xl break-words">
              {post.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Article Header */}
            <div className="mb-8 sm:mb-12">
              <AdminEditButton postId={post.id} />

              {/* Author Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-8 p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0">
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
                      <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-cognition-600 to-cognition-700 text-white font-bold text-lg sm:text-2xl">
                        {cleanAuthorName(post.author_name)
                          ? cleanAuthorName(post.author_name)
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                          : "A"}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {cleanAuthorName(post.author_name)}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {post.author_role}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <LikeButton blogPostId={post.id} />
                  <div className="flex items-center gap-1 text-gray-500">
                    <FaComment className="text-base sm:text-lg" />
                    <span className="text-xs sm:text-sm font-medium">
                      {commentCount}
                    </span>
                  </div>
                  <button className="p-2 sm:p-3 text-gray-500 hover:text-cognition-600 transition-colors">
                    <FaShare className="text-base sm:text-lg" />
                  </button>
                  <button className="p-2 sm:p-3 text-gray-500 hover:text-cognition-600 transition-colors">
                    <FaBookmark className="text-base sm:text-lg" />
                  </button>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <article className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none overflow-hidden">
              <RichTextContent content={post.content} />
            </article>

            {/* Tags Section */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <FaTags className="text-cognition-600 w-4 h-4 sm:w-5 sm:h-5" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                    Tags
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 sm:px-4 sm:py-2 bg-cognition-50 dark:bg-cognition-900/30 text-cognition-700 dark:text-cognition-300 rounded-full text-xs sm:text-sm font-medium border border-cognition-200 dark:border-cognition-700"
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
      <div className="overflow-hidden">
        <CommentsSection blogPostId={post.id} />
      </div>
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
      authors: [cleanAuthorName(post.author_name)],
    },
  };
}
