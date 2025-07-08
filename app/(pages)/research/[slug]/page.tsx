import { notFound } from "next/navigation";
import Image from "next/image";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import Link from "next/link";
import {
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaUsers,
  FaBullseye,
  FaArrowLeft,
} from "react-icons/fa";

// Force dynamic rendering for this page
export const dynamic = "force-dynamic";

// Helper to fetch project by slug from Supabase
async function getProjectBySlug(slug: string) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return null;
  return data;
}

type Props = {
  params: {
    slug: string;
  };
};

export default async function ProjectDetail({ params }: Props) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Parse JSON fields
  const images = project.images || [];
  const tags = project.tags || [];
  const objectives = project.objectives || [];
  const teamMembers = project.team_members || [];

  const formatProjectDates = (
    startDate: string,
    status: string,
    endDate?: string
  ) => {
    const start = new Date(startDate);
    const startYear = start.getFullYear();

    if (endDate) {
      const end = new Date(endDate);
      const endYear = end.getFullYear();

      if (startYear === endYear) {
        return `${startYear}`;
      } else {
        return `${startYear} - ${endYear}`;
      }
    } else {
      if (status === "active") {
        return `${startYear} - Present`;
      } else {
        return `${startYear}`;
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: {
        color:
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
        text: "Active",
      },
      completed: {
        color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
        text: "Completed",
      },
      pending: {
        color:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
        text: "Pending",
      },
      on_hold: {
        color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
        text: "On Hold",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Background Image */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        {/* Back to Projects Button - Overlay on Hero */}
        <div className="absolute top-8 left-4 z-20">
          <Link
            href="/research"
            className="inline-flex items-center px-4 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-900 font-medium rounded-lg transition-colors duration-200 shadow-lg"
          >
            <FaArrowLeft className="mr-2" />
            Back to Projects
          </Link>
        </div>
        <div className="absolute inset-0">
          <Image
            src={project.image || "/images/placeholder.jpg"}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>

        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {getStatusBadge(project.status)}
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white">
                  {project.category}
                </span>
                <span className="flex items-center text-white/80 text-sm">
                  <FaCalendarAlt className="mr-2" />
                  {formatProjectDates(
                    project.start_date,
                    project.status,
                    project.end_date
                  )}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {project.title}
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
                {project.description}
              </p>

              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-12">
              {/* About Section */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  About the Project
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.long_description ||
                      "Detailed project description coming soon..."}
                  </p>
                </div>
              </div>

              {/* Project Images */}
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First additional image - always shown */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={images[0] || "/images/placeholder.jpg"}
                        alt={`${project.title} - Project Image 1`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Second additional image - optional */}
                  {images[1] && (
                    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={images[1]}
                          alt={`${project.title} - Project Image 2`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Research Objectives */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FaBullseye className="mr-3 text-cognition-600 dark:text-cognition-400" />
                  Research Objectives
                </h2>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                  {objectives.length > 0 ? (
                    <ul className="space-y-4">
                      {objectives.map((obj: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-cognition-100 dark:bg-cognition-900 rounded-full flex items-center justify-center mr-4 mt-0.5">
                            <span className="text-cognition-600 dark:text-cognition-400 font-semibold text-sm">
                              {index + 1}
                            </span>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {obj}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">
                      No objectives listed
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Details Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  Project Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Status
                    </span>
                    <div className="mt-2">{getStatusBadge(project.status)}</div>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Category
                    </span>
                    <p className="mt-2 font-semibold text-gray-900 dark:text-white">
                      {project.category}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                      Timeline
                    </span>
                    <p className="mt-2 font-semibold text-gray-900 dark:text-white">
                      {formatProjectDates(
                        project.start_date,
                        project.status,
                        project.end_date
                      )}
                    </p>
                  </div>

                  {project.funding && (
                    <div>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Funding
                      </span>
                      <p className="mt-2 font-semibold text-gray-900 dark:text-white">
                        {project.funding}
                      </p>
                    </div>
                  )}

                  {project.link && (
                    <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-full px-6 py-3 bg-cognition-600 hover:bg-cognition-700 text-white font-semibold rounded-xl transition-colors duration-200"
                      >
                        <FaExternalLinkAlt className="mr-2" />
                        Visit Project Website
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Team Members Card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FaUsers className="mr-3 text-cognition-600 dark:text-cognition-400" />
                  Team Members
                </h3>
                {teamMembers.length > 0 ? (
                  <div className="space-y-4">
                    {teamMembers.map((member: any) => (
                      <div
                        key={member.name}
                        className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
                      >
                        <div className="w-10 h-10 rounded-full bg-cognition-100 dark:bg-cognition-900 flex items-center justify-center text-cognition-600 dark:text-cognition-400 font-semibold text-sm mr-3">
                          {member.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">
                            {member.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic text-sm">
                    No team members listed
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: Props) {
  const project = await getProjectBySlug(params.slug);
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }
  return {
    title: project.title,
    description: project.description,
  };
}
