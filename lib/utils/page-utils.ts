import { promises as fs } from "fs";
import path from "path";

export interface PageInfo {
  path: string;
  fullPath: string;
  lastModified: Date;
  size: number;
}

export async function getAllPages(): Promise<PageInfo[]> {
  const pagesDir = path.join(process.cwd(), "app/(pages)");
  const pages: PageInfo[] = [];

  async function scanDirectory(dirPath: string, basePath = "") {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        await scanDirectory(fullPath, relativePath);
      } else if (entry.name === "page.tsx" || entry.name === "page.js") {
        const stats = await fs.stat(fullPath);
        pages.push({
          path: `/${basePath}`,
          fullPath: fullPath,
          lastModified: stats.mtime,
          size: stats.size,
        });
      }
    }
  }

  await scanDirectory(pagesDir);
  return pages;
}
