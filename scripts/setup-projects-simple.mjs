import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupProjects() {
  console.log("Setting up projects table...\n");

  try {
    // First, let's check if the table exists by trying to query it
    console.log("1. Checking if projects table exists...");
    const { data: existingProjects, error: checkError } = await supabase
      .from("projects")
      .select("id")
      .limit(1);

    if (checkError && checkError.code === "42P01") {
      console.log("Projects table does not exist. Creating it...");

      // Create the table using SQL
      const { error: createError } = await supabase.rpc("exec_sql", {
        sql: `
          CREATE TABLE projects (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            slug VARCHAR(255) UNIQUE NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            long_description TEXT,
            category VARCHAR(100) NOT NULL,
            status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'completed', 'upcoming')),
            start_date DATE NOT NULL,
            end_date DATE,
            image VARCHAR(500),
            images JSONB DEFAULT '[]',
            tags JSONB DEFAULT '[]',
            link VARCHAR(500),
            funding VARCHAR(255),
            objectives JSONB DEFAULT '[]',
            team_members JSONB DEFAULT '[]',
            publications JSONB DEFAULT '[]',
            additional_info TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `,
      });

      if (createError) {
        console.error("Error creating table:", createError);
        return;
      }

      console.log("✅ Projects table created successfully");
    } else {
      console.log("✅ Projects table already exists");
    }

    // Insert sample data
    console.log("\n2. Inserting sample projects...");

    const sampleProjects = [
      {
        slug: "nuanced",
        title: "NuANCEd",
        description:
          "Nurse-led Advanced Neuromonitoring in Critically ill children with Encephalopathy",
        long_description:
          "NuANCEd is an integrated knowledge translation project that brings together implementation science, quality improvement and research. The project focuses on developing and implementing a nurse-led processed EEG (qEEG) based seizure screening program to minimize delays in seizure diagnosis and treatment.",
        category: "Implementation Science",
        status: "active",
        start_date: "2023-01-01",
        end_date: "2025-12-31",
        image: "/images/project-1.png",
        images: ["/images/project-1.png"],
        tags: [
          "Neuromonitoring",
          "EEG",
          "Seizure Detection",
          "Pediatric Critical Care",
        ],
        link: "/research/nuanced",
        funding: "AMOSO Opportunities Fund",
        objectives: [
          "Develop a nurse-led qEEG-based seizure screening program",
          "Reduce time to seizure detection and treatment",
          "Establish baseline data on current seizure detection practices",
          "Improve outcomes for critically ill children with encephalopathy",
        ],
        team_members: [
          { name: "Dr. Ganesan", role: "Principal Investigator" },
          { name: "LHSC Team", role: "Clinical Partners" },
        ],
      },
      {
        slug: "transience",
        title: "TraNSIEnCe",
        description:
          "Tracking Neurocognitive States In Encephalopathic Critically ill children",
        long_description:
          "This study aims to characterize functional and effective brain connectivity in critically ill children at varying degrees of risk for delirium. As part of this study, we enroll critically ill children at low-risk and high-risk for PICU delirium.",
        category: "Clinical Research",
        status: "active",
        start_date: "2023-05-15",
        end_date: "2026-06-30",
        image: "/images/project-2.jpg",
        images: ["/images/project-2.jpg"],
        tags: [
          "Brain Connectivity",
          "Delirium",
          "Pediatric Critical Care",
          "EEG",
          "fNIRS",
        ],
        link: "/research/transience",
        funding: "Brain Canada Future Leaders in Brain Research Award",
        objectives: [
          "Characterize brain connectivity patterns in children at risk for PICU delirium",
          "Identify objective neurophysiological markers of delirium",
          "Develop early detection methods using EEG and fNIRS",
        ],
        team_members: [
          { name: "Dr. Ganesan", role: "Principal Investigator" },
          { name: "LHSC Team", role: "Clinical Partners" },
        ],
      },
      {
        slug: "predict-abi",
        title: "PREDICT ABI",
        description:
          "Predicting outcomes in critically ill children with acquired brain injury",
        long_description:
          "This pilot prospective observational study will use functional neuroimaging to help improve the accuracy and precision of predicting neurological outcomes in unresponsive critically ill children with moderate-severe acquired brain injury.",
        category: "Clinical Research",
        status: "upcoming",
        start_date: "2024-01-01",
        end_date: "2026-12-31",
        image: "/images/project-3.png",
        images: ["/images/project-3.png"],
        tags: [
          "Acquired Brain Injury",
          "Outcome Prediction",
          "Neuroimaging",
          "EEG",
          "fMRI",
        ],
        link: "/research/predict-abi",
        funding: "AMOSO Innovation Fund",
        objectives: [
          "Develop accurate outcome prediction models for children with ABI",
          "Utilize multimodal neuroimaging for comprehensive assessment",
          "Identify early biomarkers of neurological recovery",
        ],
        team_members: [
          { name: "Dr. Ganesan", role: "Principal Investigator" },
          { name: "LHSC Team", role: "Clinical Partners" },
        ],
      },
    ];

    for (const project of sampleProjects) {
      const { error: insertError } = await supabase
        .from("projects")
        .insert(project);

      if (insertError) {
        if (insertError.code === "23505") {
          console.log(`ℹ️  Project "${project.title}" already exists`);
        } else {
          console.error(`❌ Error inserting ${project.title}:`, insertError);
        }
      } else {
        console.log(`✅ Created project: ${project.title}`);
      }
    }

    // Verify the projects
    console.log("\n3. Verifying projects...");
    const { data: projects, error: verifyError } = await supabase
      .from("projects")
      .select("slug, title, status")
      .order("created_at", { ascending: false });

    if (verifyError) {
      console.error("❌ Error verifying projects:", verifyError);
      return;
    }

    console.log("✅ Projects setup complete!");
    console.log(`Found ${projects.length} projects:`);
    projects.forEach((project) => {
      console.log(`  - ${project.title} (${project.status})`);
    });
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

setupProjects();
