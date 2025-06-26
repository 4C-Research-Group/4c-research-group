import { FileEdit, Plus } from "lucide-react";
import Link from "next/link";
import { getAllPages } from "@/lib/utils/page-utils";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function AdminPages() {
  const pages = await getAllPages();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pages</h1>
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
            key={page.path}
            className="flex flex-col h-full hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium line-clamp-1">
                {page.path || "/"}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center">
                  <span className="font-medium mr-2">Last Modified:</span>
                  <span>{formatDate(page.lastModified)}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">Size:</span>
                  <span>{(page.size / 1024).toFixed(2)} KB</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              {page.path === "/home" ? (
                <Link href="/admin/edit-home" className="w-full">
                  <Button variant="outline" className="w-full">
                    <FileEdit className="h-4 w-4 mr-2" />
                    Edit Page
                  </Button>
                </Link>
              ) : (
                <Link
                  href={`/admin/pages/edit?path=${encodeURIComponent(page.path)}`}
                  className="w-full"
                >
                  <Button variant="outline" className="w-full">
                    <FileEdit className="h-4 w-4 mr-2" />
                    Edit Page
                  </Button>
                </Link>
              )}
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
    </div>
  );
}
