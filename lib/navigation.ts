export interface NavItem {
  title: string;
  href: string;
  description?: string;
  subItems?: NavItem[];
}

export const navigationConfig: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects" },
  { title: "Knowledge Mobilization", href: "/knowledge-mobilization" },
  { title: "Join Mission 4C", href: "/team" },
  { title: "4C Blogs", href: "/4c-blogs" },
  { title: "Contact", href: "/contact" },
];
