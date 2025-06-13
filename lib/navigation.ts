export interface NavItem {
  title: string;
  href: string;
  description?: string;
  subItems?: NavItem[];
}

export const navigationConfig: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Our Team", href: "/our-team" },
  { title: "Projects", href: "/projects" },
  { title: "Knowledge Mobilization", href: "/knowledge-mobilization" },
  { title: "Join the Team", href: "/join-the-team" },
  { title: "4C Blogs", href: "/4c-blogs" },
  { title: "Contact", href: "/contact" },
];
