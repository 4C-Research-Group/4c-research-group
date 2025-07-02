import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  Users,
  FileEdit,
  Settings,
  Plus,
  Eye,
  TrendingUp,
  Calendar,
  Activity,
  ArrowRight,
  Users as TeamIcon,
  FileText,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ContactPage } from "@/lib/types/contact-page";

export default async function AdminDashboard() {
  const supabase = createClient();

  // Fetch some basic stats
  const [pagesData, teamData, projectsData, usersData, contactPageRes] =
    await Promise.all([
      supabase
        .from("pages")
        .select("slug, updated_at")
        .order("updated_at", { ascending: false })
        .limit(5),
      supabase
        .from("team_members")
        .select("id, name, is_active")
        .eq("is_active", true),
      supabase
        .from("projects")
        .select("id, title, is_active")
        .eq("is_active", true)
        .order("title"),
      supabase.from("users").select("id, name, role").limit(5),
      supabase.from("contact_page").select("updated_at").limit(1).single(),
    ]);

  // Combine pages and contact page for stats and recent pages
  type PageLike = { slug: string; updated_at: string };
  const allPages: PageLike[] = [
    ...(pagesData.data || []),
    contactPageRes.data
      ? { slug: "contact", updated_at: contactPageRes.data.updated_at }
      : undefined,
  ].filter((p): p is PageLike => !!p && !!p.slug && !!p.updated_at);

  const stats = [
    {
      title: "Active Pages",
      value: allPages.length,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      href: "/admin/pages",
    },
    {
      title: "Team Members",
      value: teamData.data?.length || 0,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      href: "/admin/team",
    },
    {
      title: "Research Projects",
      value: projectsData.data?.length || 0,
      icon: FileEdit,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      href: "/admin/projects",
    },
    {
      title: "Total Users",
      value: usersData.data?.length || 0,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      href: "/admin/users",
    },
  ];

  const quickActions = [
    {
      title: "Edit Home Page",
      description: "Update hero section, projects, and main content",
      icon: FileEdit,
      href: "/admin/edit-home",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Add Team Member",
      description: "Add new team member or researcher",
      icon: TeamIcon,
      href: "/admin/team/new",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Create New Project",
      description: "Add new research project to the portfolio",
      icon: Plus,
      href: "/admin/projects/new",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Manage Users",
      description: "View and manage user accounts and roles",
      icon: Users,
      href: "/admin/users",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  // Sort by updated_at desc for recent pages
  const sortedPages = allPages.sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );
  const recentPages = sortedPages.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-cognition-600 to-cognition-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome to 4C Admin</h1>
            <p className="text-cognition-100">
              Manage your research lab website content, team, and projects from
              one central dashboard.
            </p>
          </div>
          <div className="hidden md:block">
            <Globe className="h-16 w-16 text-cognition-200" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Quick Actions
          </h2>
          <Link href="/admin/pages">
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Card
              key={action.title}
              className="hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-start sm:space-x-4 space-y-4 sm:space-y-0">
                  <div className={`p-3 rounded-lg ${action.bgColor}`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>
                  <div className="flex-1 w-full min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 break-words">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 break-words">
                      {action.description}
                    </p>
                    <Link href={action.href} className="block w-full min-w-0">
                      <Button
                        size="sm"
                        className="w-full text-xs break-words whitespace-normal min-w-0 px-2 py-2"
                      >
                        Go to {action.title}
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5" />
              Recent Pages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPages.length > 0 ? (
                recentPages.map((page) => (
                  <div
                    key={page.slug}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white capitalize">
                          {page.slug === "contact"
                            ? "Contact Page"
                            : `${page.slug} Page`}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Updated{" "}
                          {new Date(page.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={
                        page.slug === "contact"
                          ? "/admin/edit-contact"
                          : `/admin/edit-${page.slug}`
                      }
                    >
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No pages found</p>
                  <Link href="/admin/pages/new">
                    <Button size="sm" className="mt-2">
                      Create First Page
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Database
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-400"
                >
                  Connected
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Authentication
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-400"
                >
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Content Management
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-400"
                >
                  Ready
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    File Storage
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-400"
                >
                  Available
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Need Help?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get started with managing your website content and team.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/admin/pages">
                <Button variant="outline">
                  <FileEdit className="mr-2 h-4 w-4" />
                  Manage Pages
                </Button>
              </Link>
              <Link href="/admin/team">
                <Button variant="outline">
                  <TeamIcon className="mr-2 h-4 w-4" />
                  Manage Team
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
