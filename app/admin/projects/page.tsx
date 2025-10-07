"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Edit, Eye, Trash2, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import { Project, getProjects, deleteProject } from "@/lib/supabase/projects";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const projectsData = await getProjects();
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteProject(id: string) {
    setDeleteLoading(id);
    try {
      await deleteProject(id);
      await fetchProjects(); // Refresh the list
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeleteLoading(null);
    }
  }

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      active:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      completed:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      upcoming:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    };

    const statusText = status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <span
        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClasses[status as keyof typeof statusClasses]}`}
      >
        {statusText}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cognition-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              Loading projects...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Research Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage your research projects and publications
          </p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <div className="mb-4">
            <Plus className="h-12 w-12 text-gray-400 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No projects yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Get started by creating your first research project.
          </p>
          <Link href="/admin/projects/new">
            <Button>Create First Project</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow overflow-hidden">
                {/* Project Image */}
                <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      onLoadingComplete={() =>
                        console.log("Image loaded successfully:", project.image)
                      }
                      onError={(e) => {
                        console.log("Image failed to load:", project.image);
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        target.parentElement!.innerHTML = `
                          <div class="w-full h-full flex items-center justify-center text-gray-400">
                            <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                            </svg>
                          </div>
                        `;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg
                        className="w-12 h-12"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-medium line-clamp-2">
                      {project.title}
                    </CardTitle>
                    {getStatusBadge(project.status)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tag className="h-3 w-3" />
                    <span>{project.category}</span>
                  </div>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(project.start_date).toLocaleDateString()} -
                        {project.end_date
                          ? new Date(project.end_date).toLocaleDateString()
                          : "Ongoing"}
                      </span>
                    </div>

                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="pt-3 gap-2 flex-col sm:flex-row">
                  <Link
                    href={`/research/${project.slug}`}
                    className="flex-1"
                    target="_blank"
                  >
                    <Button variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </Link>
                  <Link
                    href={`/admin/projects/edit/${project.id}`}
                    className="flex-1"
                  >
                    <Button variant="secondary" className="w-full">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Project
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="flex-shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Project</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete &quot;{project.title}
                          &quot;? This will permanently remove the project and
                          all associated images. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteProject(project.id)}
                          className="bg-red-600 hover:bg-red-700"
                          disabled={deleteLoading === project.id}
                        >
                          {deleteLoading === project.id
                            ? "Deleting..."
                            : "Delete"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Project Management Guide
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>
            • <strong>View:</strong> See how the project appears on the public
            research page
          </li>
          <li>
            • <strong>Edit:</strong> Modify basic project details, content with
            rich text editing, and upload images (main + additional images)
          </li>
          <li>
            • <strong>Advanced Edit:</strong> Modify detailed project
            information including objectives, team members, tags, and long
            descriptions with rich text editing
          </li>
          <li>
            • <strong>Delete:</strong> Remove projects and all associated images
            (this action cannot be undone)
          </li>
          <li>
            • <strong>Status:</strong> Use &quot;upcoming&quot; for future
            projects, &quot;active&quot; for ongoing, &quot;completed&quot; for
            finished
          </li>
          <li>
            • <strong>Categories:</strong> Organize projects by research type
            (Clinical Research, Implementation Science, Clinical Trial, Basic
            Science, Quality Improvement)
          </li>
          <li>
            • <strong>Images:</strong> Main image (hero) + up to 2 additional
            images (use plus button to upload multiple at once)
          </li>
        </ul>
      </div>
    </div>
  );
}
