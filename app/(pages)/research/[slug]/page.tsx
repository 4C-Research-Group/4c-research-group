import { notFound } from "next/navigation";
import Image from "next/image";
import { projects } from "../projectsData";

type Props = {
  params: {
    slug: string;
  };
};

export default function ProjectDetail({ params }: Props) {
  const project = projects.find((p) => p.id === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cognition-600 to-cognition-800 text-white">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-cognition-100 mb-8">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                {project.category}
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                {project.status.charAt(0).toUpperCase() +
                  project.status.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Description */}
            <div className="prose dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold mb-6">About the Project</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {project.longDescription ||
                  "Detailed project description coming soon..."}
              </p>

              <h3 className="text-2xl font-semibold mt-10 mb-4">
                Research Objectives
              </h3>
              <ul className="space-y-3 mb-8">
                {project.objectives?.map((obj, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-cognition-600 dark:text-cognition-400 mr-2">
                      •
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {obj}
                    </span>
                  </li>
                )) || (
                  <li className="text-gray-500 dark:text-gray-400">
                    No objectives listed
                  </li>
                )}
              </ul>

              <h3 className="text-2xl font-semibold mt-10 mb-4">
                Team Members
              </h3>
              <div className="flex flex-wrap gap-4">
                {project.teamMembers?.map((member) => (
                  <div key={member.name} className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 font-medium">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {member.role}
                      </p>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-500 dark:text-gray-400">
                    No team members listed
                  </p>
                )}
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="space-y-6">
              <div className="relative rounded-xl overflow-hidden aspect-video bg-gray-100 dark:bg-gray-800">
                <Image
                  src={project.images?.[0] || "/images/placeholder.jpg"}
                  alt={`${project.title} - Main`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-xl overflow-hidden aspect-square bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={project.images?.[1] || "/images/placeholder.jpg"}
                    alt={`${project.title} - Secondary`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-xl overflow-hidden aspect-square bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={project.images?.[2] || "/images/placeholder.jpg"}
                    alt={`${project.title} - Secondary`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Status
                    </span>
                    <p className="font-medium">
                      {project.status.charAt(0).toUpperCase() +
                        project.status.slice(1)}
                    </p>
                  </div>
                  {project.funding && (
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Funding
                      </span>
                      <p className="font-medium">{project.funding}</p>
                    </div>
                  )}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center text-cognition-600 dark:text-cognition-400 hover:underline font-medium"
                  >
                    Visit Project Website
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const project = projects.find((p) => p.id === params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | 4C Research Lab`,
    description: project.description,
    openGraph: {
      images: [project.images?.[0] || "/images/og-default.jpg"],
    },
  };
}
