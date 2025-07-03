import { FileEdit, Plus, Eye } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ContactPage } from "@/lib/types/contact-page";

export default async function AdminPages() {
  const supabase = createClient();

  // Fetch all pages and contact page
  const [
    { data: pagesData, error },
    { data: contactData },
    { data: join4cLabData },
  ] = await Promise.all([
    supabase
      .from("pages")
      .select("slug, updated_at, content, title")
      .order("updated_at", { ascending: false }),
    supabase.from("contact_page").select("updated_at").limit(1).single(),
    supabase.from("join_4c_lab_page").select("updated_at").limit(1).single(),
  ]);

  if (error) {
    console.error("Error fetching pages:", error);
  }

  // Define page configurations
  const pageConfigs = [
    {
      slug: "home",
      title: "Home Page",
      path: "/",
      editPath: "/admin/edit-home",
      description:
        "Main landing page with hero, projects, services, and CTA sections",
    },
    {
      slug: "about",
      title: "About Page",
      path: "/about",
      editPath: "/admin/edit-about",
      description: "About page with mission, PI info, and research focus",
    },
    {
      slug: "about-pi",
      title: "About PI Page",
      path: "/about-pi",
      editPath: "/admin/edit-about-pi",
      description: "Principal Investigator profile with detailed information",
    },
    {
      slug: "research",
      title: "Research Projects",
      path: "/research",
      editPath: "/admin/projects",
      description:
        "Research projects portfolio with filtering and search capabilities",
    },
  ];

  // Map database data to page configs
  const pages = pageConfigs.map((config) => {
    const dbPage = pagesData?.find((p) => p.slug === config.slug);
    return {
      ...config,
      lastModified: dbPage?.updated_at || new Date().toISOString(),
      size: dbPage?.content ? JSON.stringify(dbPage.content).length : 0,
      exists: !!dbPage,
      hasContent: dbPage?.content
        ? Object.keys(JSON.parse(dbPage.content)).length > 0
        : false,
    };
  });

  // Add contact page as a card
  if (contactData) {
    pages.push({
      slug: "contact",
      title: "Contact Page",
      path: "/contact",
      editPath: "/admin/edit-contact",
      description: "Contact information, research coordinator, and location.",
      lastModified: contactData.updated_at,
      size: 0,
      exists: true,
      hasContent: true,
    });
  }

  // Add join-4c-lab page as a card
  if (join4cLabData) {
    pages.push({
      slug: "join-4c-lab",
      title: "Join 4C Lab Page",
      path: "/join-4c-lab",
      editPath: "/admin/edit-join-4c-lab",
      description: "Student recruitment, why join, and call-to-action.",
      lastModified: join4cLabData.updated_at,
      size: 0,
      exists: true,
      hasContent: true,
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Pages Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage and edit your website pages
          </p>
        </div>
        <Link href="/admin/pages/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Page
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <Card
            key={page.slug}
            className="flex flex-col h-full hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium">
                  {page.title}
                </CardTitle>
                <div className="flex items-center gap-1">
                  {page.exists && (
                    <div
                      className={`w-2 h-2 rounded-full ${page.hasContent ? "bg-green-500" : "bg-yellow-500"}`}
                      title={page.hasContent ? "Has content" : "No content"}
                    />
                  )}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{page.path}</p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {page.description}
              </p>
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center">
                  <span className="font-medium mr-2">Status:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      page.exists
                        ? page.hasContent
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                    }`}
                  >
                    {page.exists
                      ? page.hasContent
                        ? "Published"
                        : "Empty"
                      : "Not Created"}
                  </span>
                </div>
                {page.exists && (
                  <>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Last Modified:</span>
                      <span>{formatDate(page.lastModified)}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Size:</span>
                      <span>{(page.size / 1024).toFixed(2)} KB</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0 gap-2">
              <Link href={page.path} className="flex-1" target="_blank">
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
              </Link>
              <Link href={page.editPath} className="flex-1">
                <Button className="w-full">
                  <FileEdit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {pages.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <p className="text-muted-foreground">
            No pages found. Create your first page to get started.
          </p>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Page Management Guide
        </h3>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>
            • <strong>Published:</strong> Page exists and has content
          </li>
          <li>
            • <strong>Empty:</strong> Page exists but has no content
          </li>
          <li>
            • <strong>Not Created:</strong> Page doesn&apos;t exist in database
          </li>
          <li>
            • Use the <strong>Edit</strong> button to modify page content
          </li>
          <li>
            • Use the <strong>View</strong> button to preview the page
          </li>
        </ul>
      </div>
    </div>
  );
}
