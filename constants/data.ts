const carouselData = [
  {
    heading: "We Build Remote Culture",
    description:
      "Our remote work culture fosters innovation and collaboration, enabling us to deliver cutting-edge solutions.",
    imageSrc: "/office/lab-1.jpg",
    altText: "IDSL Lab Environment 1",
  },
  {
    heading: "Innovation Drives Us",
    description:
      "At IDSL, we focus on using AI and Data to revolutionize industries and empower businesses through smart technologies.",
    imageSrc: "/office/lab-2.jpg",
    altText: "IDSL Lab Environment 2",
  },
  {
    heading: "Empowering Collaboration",
    description:
      "Our cross-functional teams work seamlessly together to create high-impact products and services.",
    imageSrc: "/office/lab-3.jpg",
    altText: "IDSL Lab Environment 3",
  },
];

const testimonials: {
  name: string;
  role: string;
  text: string;
  avatar: string;
  social: {
    platform: "linkedin" | "twitter" | "github";
    url: string;
  };
}[] = [
  {
    name: "Sarah Johnson",
    role: "CISO, TechCorp",
    text: "IDSL's threat detection reduced our incident response time by 68% while maintaining full compliance.",
    avatar: "/testimonials/women-1.jpg",
    social: {
      platform: "linkedin",
      url: "#",
    },
  },
  {
    name: "Michael Chen",
    role: "Lead Researcher, HealthAI",
    text: "IDSL's drug discovery models accelerated our research pipeline by 40%, a game-changer for our team.",
    avatar: "/testimonials/men-1.jpg",
    social: {
      platform: "twitter",
      url: "#",
    },
  },
  {
    name: "Emma Wilson",
    role: "CTO, SecureSystems",
    text: "IDSL's adversarial defense framework has become our first line of protection against next-gen cyber attacks.",
    avatar: "/testimonials/women-2.jpg",
    social: {
      platform: "github",
      url: "#",
    },
  },
];

export { carouselData, testimonials };
