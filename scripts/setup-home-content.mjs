import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing required environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Complete home page content matching the original static version
const homeContent = {
  hero: {
    title: "Advancing Research in Cognition, Consciousness & Critical Care",
    subtitle:
      "<p>Exploring the frontiers of neuroscience and critical care through innovative research and collaboration.</p>",
    primaryText: "Explore Our Research",
    primaryLink: "/research",
    secondaryText: "Contact Us",
    secondaryLink: "/contact",
    logo: "/logo.png",
  },
  researchHighlights: {
    title: "Research Highlights",
    cards: [
      {
        title: "Advanced Research",
        description:
          "<p>Our advanced research in altered cognition and consciousness is paving the way for improved long-term outcomes.</p>",
      },
      {
        title: "Cognitive Functions Analysis",
        description:
          "<p>The groundbreaking analysis of the cognitive functions of critically ill children is essential for better understanding and treatment.</p>",
      },
      {
        title: "Neuroscience Exploration",
        description:
          "<p>Cutting-edge exploration in neuroscience holds the key to enhancing the lives of critically ill children.</p>",
      },
    ],
  },
  services: {
    title: "Our Services",
    description:
      "<p>We provide comprehensive research and clinical services in pediatric critical care and neuroscience.</p>",
    cards: [
      {
        title: "Cognitive Functions Analysis",
        description:
          "<p>The groundbreaking analysis of the cognitive functions of critically ill children is essential for better understanding and treatment.</p>",
        color: "cognition",
        icon: "brain",
      },
      {
        title: "Advanced Research",
        description:
          "<p>Our advanced research in altered cognition and consciousness is paving the way for improved long-term outcomes.</p>",
        color: "consciousness",
        icon: "brain",
      },
      {
        title: "Neuroscience Exploration",
        description:
          "<p>Cutting-edge exploration in neuroscience holds the key to enhancing the lives of critically ill children.</p>",
        color: "care",
        icon: "brain",
      },
    ],
  },
  projects: {
    title: "Our Research Focus Areas",
    cards: [
      {
        title: "Critical Care Delirium",
        description:
          "<p>Prediction and diagnosis of critical delirium using advanced functional neuroimaging tools.</p>",
        image: "/images/project-1.png",
      },
      {
        title: "Disorders of Consciousness",
        description:
          "<p>Prediction of outcomes in unresponsive critically ill patients after acquired brain injury.</p>",
        image: "/images/project-2.jpg",
      },
      {
        title: "Pain and Comfort in Critical Care",
        description:
          "<p>Objective detection of pain and discomfort in critically ill children.</p>",
        image: "/images/project-3.png",
      },
      {
        title: "Pharmacological Sedation in the ICU",
        description:
          "<p>Optimizing depth of sedation and testing innovative strategies to improve patient outcomes.</p>",
        image: "/images/project-4.jpeg",
      },
    ],
  },
  stats: [
    {
      label: "Research Projects",
      value: "12+",
    },
    {
      label: "Publications",
      value: "50+",
    },
    {
      label: "Team Members",
      value: "10+",
    },
    {
      label: "Active Grants",
      value: "10+",
    },
  ],
  mission: {
    title: "Our Mission",
    description:
      "<p>We are dedicated to advancing the understanding and treatment of cognitive and consciousness disorders in critically ill children. Our multidisciplinary team combines expertise in pediatric critical care, neuroscience, and biomedical engineering to develop innovative solutions that improve patient outcomes.</p><p>Through cutting-edge research and clinical collaboration, we strive to make a meaningful difference in the lives of children and their families.</p>",
    primaryText: "Learn More About Us",
    primaryLink: "/about",
    secondaryText: "View Our Research",
    secondaryLink: "/research",
    fourCsTitle: "The 4C's",
    fourCsImage: "/images/4cccc.png",
  },
  partners: {
    title: "Our Partners & Collaborators",
    subtitle:
      "Working together with leading institutions to advance pediatric critical care research",
    cards: [
      {
        name: "London Health Sciences Centre",
        image: "/partners/partner-1.png",
      },
      {
        name: "Schulich School of Medicine",
        image: "/partners/partner-2.png",
      },
      {
        name: "Lawson Health Research Institute",
        image: "/partners/partner-3.png",
      },
      {
        name: "Western University",
        image: "/partners/partner-4.png",
      },
      {
        name: "Children's Hospital",
        image: "/partners/partner-5.png",
      },
      {
        name: "Pediatric Critical Care",
        image: "/partners/partner-6.png",
      },
    ],
  },
  news: {
    title: "Latest News & Updates",
    headline:
      "4C Research Group Receives Major Grant for Pediatric Critical Care Study",
    description:
      "<p>We are excited to announce that our research group has been awarded a significant grant to advance our work in pediatric critical care and cognitive assessment. This funding will enable us to expand our research capabilities and accelerate our mission to improve outcomes for critically ill children.</p><p>The grant will support our ongoing studies in delirium prediction, consciousness assessment, and neuroprotective strategies in the pediatric intensive care unit.</p>",
    link: "https://example.com/news/grant-announcement",
    linkText: "Read the full article",
  },
  social: {
    title: "Stay Connected",
    platformTitle: "Follow Us on Social Media",
    description:
      "<p>Stay updated with our latest research findings, team updates, and insights into pediatric critical care. Follow us on social media to be part of our research community.</p>",
    link: "https://x.com/Mission_FourC",
    buttonText: "@Mission_FourC",
  },
  cta: {
    title: "Join Our Research Community",
    description:
      "<p>We are always looking for passionate researchers, students, and collaborators to join us in advancing the frontiers of cognitive science and critical care research.</p>",
    primaryText: "Join Our Team",
    primaryLink: "/careers",
    secondaryText: "Contact Us",
    secondaryLink: "/contact",
  },
};

async function setupHomeContent() {
  console.log("🚀 Setting up home page content...");

  try {
    // Check if home page already exists
    const { data: existing, error: checkError } = await supabase
      .from("pages")
      .select("id, content")
      .eq("slug", "home")
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("❌ Error checking existing home page:", checkError);
      return;
    }

    if (existing) {
      console.log("📄 Home page already exists, updating content...");

      const { error: updateError } = await supabase
        .from("pages")
        .update({
          content: JSON.stringify(homeContent),
          updated_at: new Date().toISOString(),
        })
        .eq("slug", "home");

      if (updateError) {
        console.error("❌ Error updating home page:", updateError);
        return;
      }

      console.log("✅ Home page content updated successfully!");
    } else {
      console.log("📄 Creating new home page...");

      const { error: insertError } = await supabase.from("pages").insert({
        slug: "home",
        title: "Home Page",
        content: JSON.stringify(homeContent),
        is_active: true,
      });

      if (insertError) {
        console.error("❌ Error creating home page:", insertError);
        return;
      }

      console.log("✅ Home page created successfully!");
    }

    console.log("🎉 Home page setup completed!");
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

setupHomeContent();
