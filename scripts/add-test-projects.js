import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const testProjects = [
  {
    title: "Cognitive Assessment in Critical Care",
    description:
      "A comprehensive study examining cognitive function assessment tools in ICU patients, focusing on delirium detection and long-term cognitive outcomes.",
    image: "/images/project-1.png",
    category: "Cognition",
    status: "active",
    start_date: "2024-01-15",
    tags: ["ICU", "Delirium", "Assessment"],
    link: "https://example.com/project1",
    slug: "cognitive-assessment-critical-care",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    title: "Consciousness Monitoring Systems",
    description:
      "Development of advanced monitoring systems to track consciousness levels in patients with severe brain injuries using EEG and machine learning.",
    image: "/images/project-2.jpg",
    category: "Consciousness",
    status: "completed",
    start_date: "2023-06-01",
    end_date: "2024-03-15",
    tags: ["EEG", "Machine Learning", "Brain Injury"],
    link: "https://example.com/project2",
    slug: "consciousness-monitoring-systems",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    title: "Critical Care Outcomes Research",
    description:
      "Longitudinal study investigating the relationship between critical care interventions and patient outcomes, with focus on cognitive recovery.",
    image: "/images/project-3.png",
    category: "Critical Care",
    status: "active",
    start_date: "2024-02-01",
    tags: ["Outcomes", "Longitudinal", "Recovery"],
    link: "https://example.com/project3",
    slug: "critical-care-outcomes-research",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    updated_at: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    title: "Neural Network Analysis in ICU",
    description:
      "Application of neural network algorithms to predict patient deterioration and optimize treatment protocols in intensive care units.",
    image: "/images/project-4.jpeg",
    category: "Cognition",
    status: "pending",
    start_date: "2024-03-01",
    tags: ["Neural Networks", "Prediction", "ICU"],
    link: "https://example.com/project4",
    slug: "neural-network-analysis-icu",
    created_at: new Date(Date.now() - 259200000).toISOString(),
    updated_at: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    title: "Sleep Quality and Recovery",
    description:
      "Investigating the impact of sleep quality on cognitive recovery in critical care patients, including intervention strategies.",
    image: "/images/project-5.jpeg",
    category: "Consciousness",
    status: "active",
    start_date: "2023-09-01",
    tags: ["Sleep", "Recovery", "Intervention"],
    link: "https://example.com/project5",
    slug: "sleep-quality-recovery",
    created_at: new Date(Date.now() - 345600000).toISOString(),
    updated_at: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    title: "Pharmacological Interventions",
    description:
      "Study of pharmacological approaches to prevent and treat cognitive decline in critical care settings.",
    image: "/images/project-1.png",
    category: "Critical Care",
    status: "on_hold",
    start_date: "2023-12-01",
    tags: ["Pharmacology", "Prevention", "Treatment"],
    link: "https://example.com/project6",
    slug: "pharmacological-interventions",
    created_at: new Date(Date.now() - 432000000).toISOString(),
    updated_at: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    title: "Family Support Systems",
    description:
      "Research on the role of family support in cognitive recovery and patient outcomes in critical care environments.",
    image: "/images/project-2.jpg",
    category: "Cognition",
    status: "completed",
    start_date: "2023-03-01",
    end_date: "2024-01-15",
    tags: ["Family", "Support", "Recovery"],
    link: "https://example.com/project7",
    slug: "family-support-systems",
    created_at: new Date(Date.now() - 518400000).toISOString(),
    updated_at: new Date(Date.now() - 518400000).toISOString(),
  },
  {
    title: "Virtual Reality Rehabilitation",
    description:
      "Development and testing of virtual reality-based rehabilitation programs for cognitive recovery in critical care survivors.",
    image: "/images/project-3.png",
    category: "Consciousness",
    status: "active",
    start_date: "2023-11-01",
    tags: ["Virtual Reality", "Rehabilitation", "Technology"],
    link: "https://example.com/project8",
    slug: "virtual-reality-rehabilitation",
    created_at: new Date(Date.now() - 604800000).toISOString(),
    updated_at: new Date(Date.now() - 604800000).toISOString(),
  },
  {
    title: "Biomarker Discovery",
    description:
      "Identification of novel biomarkers for early detection of cognitive decline in critical care patients.",
    image: "/images/project-4.jpeg",
    category: "Critical Care",
    status: "pending",
    start_date: "2024-04-01",
    tags: ["Biomarkers", "Detection", "Early Warning"],
    link: "https://example.com/project9",
    slug: "biomarker-discovery",
    created_at: new Date(Date.now() - 691200000).toISOString(),
    updated_at: new Date(Date.now() - 691200000).toISOString(),
  },
  {
    title: "Telemedicine in Critical Care",
    description:
      "Evaluation of telemedicine approaches for cognitive assessment and monitoring in remote critical care settings.",
    image: "/images/project-5.jpeg",
    category: "Cognition",
    status: "active",
    start_date: "2023-08-01",
    tags: ["Telemedicine", "Remote", "Assessment"],
    link: "https://example.com/project10",
    slug: "telemedicine-critical-care",
    created_at: new Date(Date.now() - 777600000).toISOString(),
    updated_at: new Date(Date.now() - 777600000).toISOString(),
  },
];

async function addTestProjects() {
  try {
    console.log("Adding test research projects...");

    for (const project of testProjects) {
      const { data, error } = await supabase.from("projects").insert([project]);

      if (error) {
        console.error("Error adding project:", project.title, error);
      } else {
        console.log("Added project:", project.title);
      }
    }

    console.log("Test projects added successfully!");
  } catch (error) {
    console.error("Error adding test projects:", error);
  }
}

addTestProjects();
