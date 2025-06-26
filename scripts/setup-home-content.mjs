import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Home page content as JSON
const homeContent = {
  hero: {
    title: "Advancing Research in Cognition, Consciousness & Critical Care",
    subtitle:
      "Exploring the frontiers of neuroscience and critical care through innovative research and collaboration.",
    primaryText: "Explore Our Research",
    primaryLink: "/research",
    secondaryText: "Contact Us",
    secondaryLink: "/contact",
    logo: "/logo.png",
  },
  researchHighlights: {
    title: "Groundbreaking Research",
    cards: [
      {
        title: "Cognitive Functions Analysis",
        description:
          "The groundbreaking analysis of the cognitive functions of critically ill children is essential for better understanding and treatment.",
      },
      {
        title: "Advanced Research",
        description:
          "Our advanced research in altered cognition and consciousness is paving the way for improved long-term outcomes.",
      },
      {
        title: "Neuroscience Exploration",
        description:
          "Cutting-edge exploration in neuroscience holds the key to enhancing the lives of critically ill children.",
      },
    ],
  },
  services: {
    title: "Our Services",
    description:
      "Comprehensive research and clinical services at the intersection of cognition, consciousness, and critical care.",
    cards: [
      {
        title: "Clinical Research",
        description:
          "Cutting-edge clinical trials and studies to advance understanding of brain function and recovery.",
      },
      {
        title: "Patient Care",
        description:
          "Specialized care protocols for patients with cognitive impairments and disorders of consciousness.",
      },
      {
        title: "Consultation",
        description:
          "Expert consultation services for healthcare providers and institutions seeking specialized expertise.",
      },
    ],
  },
  projects: {
    title: "Our Research Focus Areas",
    cards: [
      {
        title: "Critical Care Delirium",
        description:
          "Prediction and diagnosis of critical delirium using advanced functional neuroimaging tools.",
        image:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Disorders of Consciousness",
        description:
          "Prediction of outcomes in unresponsive critically ill patients after acquired brain injury.",
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Pain and Comfort in Critical Care",
        description:
          "Objective detection of pain and discomfort in critically ill children.",
        image:
          "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        title: "Pharmacological Sedation in the ICU",
        description:
          "Optimizing depth of sedation and testing innovative strategies to improve patient outcomes.",
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
  },
  stats: [
    { label: "Research Projects", value: "15+" },
    { label: "Publications", value: "50+" },
    { label: "Team Members", value: "10+" },
    { label: "Active Grants", value: "5+" },
  ],
  news: {
    title: "Latest News",
  },
  cta: {
    title: "Join Our Research Community",
    description:
      "We are always looking for passionate researchers, students, and collaborators to join us in advancing the frontiers of cognitive science and critical care research.",
    primaryText: "Join Our Team",
    primaryLink: "/careers",
    secondaryText: "Contact Us",
    secondaryLink: "/contact",
    social: "https://x.com/Mission_FourC",
  },
};

async function upsertHomePage() {
  const { data, error } = await supabase.from("pages").upsert(
    [
      {
        slug: "home",
        title: "Home Page",
        content: JSON.stringify(homeContent),
        updated_at: new Date().toISOString(),
      },
    ],
    { onConflict: ["slug"] }
  );

  if (error) {
    console.error("Error upserting home page:", error);
    process.exit(1);
  }
  console.log("Home page content upserted successfully!");
  process.exit(0);
}

upsertHomePage();
