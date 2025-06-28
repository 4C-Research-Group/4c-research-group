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

// Complete about page content matching the original static version
const aboutContent = {
  hero: {
    title: "About 4C Research",
    subtitle:
      "Advancing the frontiers of Cognition, Consciousness, and Critical Care through innovative research",
  },
  mission: {
    title: "Our Mission",
    whatTitle: "What?",
    howTitle: "How?",
    whyTitle: "Why?",
    whatDescription:
      "To improve outcomes for critically ill patients with acute disorders of cognition and consciousness.",
    howDescription:
      "Through the development and validation of functional neuroimaging modalities as tools for accurate prediction and timely detection of pathological brain states.",
    whyDescription:
      "The long-term consequences of brain injury acquired prior to or during critical illness are debilitating. Our work will improve survival and mitigate morbidity associated with brain injury.",
  },
  aboutUs: {
    title: "Our Dedicated Research",
    description: `<p>Our dedicated research group focuses on uncovering groundbreaking discoveries in altered cognition and consciousness in critically ill children.</p>
<p>By understanding the complex neurophysiology underlying these pathological brain states, we can develop tools to predict and detect such neurological problems in a timely manner. Accurate prediction and/or early detection of such conditions would positively impact the long-term functional outcomes of these children.</p>
<p>Our work is driven by our passion for improving the lives of children and their families. Join us on this journey as we strive to make a difference in the world of pediatric survivors of critical illness. Together, we can create a brighter future for our young patients.</p>`,
    image: "/images/mission.jpg",
    imageAlt: "Our Mission in Pediatric Research",
    buttonText: "View all projects",
    buttonLink: "/research",
  },
  pi: {
    title: "About the PI",
    subtitle: "Dr. Rishi Ganesan, MD, DM, MSc",
    name: "Pediatric Intensive Care Physician-Researcher",
    bio: "Dr. Rishi Ganesan is a paediatric intensive care physician-researcher with additional expertise in paediatric neurocritical care. He is a physician in the Division of Paediatric Critical Care Medicine at the Children's Hospital - London Health Sciences Centre, Assistant Professor in the Department of Paediatrics at the Schulich School of Medicine (Western University) and an Associate Scientist at the Lawson Health Research Institute.",
    image: "/team/team-1.jpg",
    imageAlt: "Dr. Rishi Ganesan",
    education: "• MD, DM (Pediatric Critical Care), MSc (Neurosciences)",
    researchFocus:
      "Developing EEG-based monitoring tools for improving outcomes in critically ill children.",
    profileLink: "/about-pi",
    profileLinkText: "View Full Profile",
    teamLink: "/team",
    teamLinkText: "View Full Team",
  },
  researchFocus: {
    title: "Our Research Focus",
    subtitle:
      "At 4C Research, we're dedicated to transforming patient outcomes through cutting-edge research at the intersection of neuroscience and critical care medicine.",
    keyAreasTitle: "Key Areas",
    keyAreas: [
      "Cognitive assessment in critical care settings",
      "Neural mechanisms of consciousness",
      "Neuroprotective strategies in critical illness",
      "Long-term cognitive outcomes in critical care survivors",
      "Advanced neuroimaging techniques in critical care",
    ],
    approachTitle: "Our Approach",
    approach: `<p>We combine clinical expertise with cutting-edge research methodologies to address some of the most challenging questions in cognitive and critical care medicine. Our interdisciplinary approach brings together experts from neuroscience, medicine, engineering, and data science.</p>
<p>Our ultimate goal is to translate our findings into clinical practice, improving outcomes for patients with critical illnesses and neurological conditions.</p>`,
  },
};

async function setupAboutContent() {
  console.log("🚀 Setting up about page content...");

  try {
    // Check if about page already exists
    const { data: existing, error: checkError } = await supabase
      .from("pages")
      .select("id, content")
      .eq("slug", "about")
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("❌ Error checking existing about page:", checkError);
      return;
    }

    if (existing) {
      console.log("📄 About page already exists, updating content...");

      const { error: updateError } = await supabase
        .from("pages")
        .update({
          content: JSON.stringify(aboutContent),
          updated_at: new Date().toISOString(),
        })
        .eq("slug", "about");

      if (updateError) {
        console.error("❌ Error updating about page:", updateError);
        return;
      }

      console.log("✅ About page content updated successfully!");
    } else {
      console.log("📄 Creating new about page...");

      const { error: insertError } = await supabase.from("pages").insert({
        slug: "about",
        title: "About Page",
        content: JSON.stringify(aboutContent),
        is_active: true,
      });

      if (insertError) {
        console.error("❌ Error creating about page:", insertError);
        return;
      }

      console.log("✅ About page created successfully!");
    }

    console.log("🎉 About page setup completed!");
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

setupAboutContent();
