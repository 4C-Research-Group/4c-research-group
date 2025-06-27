export interface NavItem {
  title: string;
  href: string;
  description?: string;
  subItems?: NavItem[];
}

export const navigationConfig: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Research", href: "/research" },
  { title: "Knowledge Mobilization", href: "/knowledge-mobilization" },
  { title: "Publications", href: "/publications" },
  { title: "Our Team", href: "/team" },
  { title: "4C Blogs", href: "/4c-blogs" },
];
