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

// Static projects data (from projectsData.ts)
const projects = [
  {
    slug: "nuanced",
    title: "NuANCEd",
    description:
      "Nurse-led Advanced Neuromonitoring in Critically ill children with Encephalopathy",
    long_description: `NuANCEd is an integrated knowledge translation project that brings together implementation science, quality improvement and research. The project focuses on developing and implementing a nurse-led processed EEG (qEEG) based seizure screening program to minimize delays in seizure diagnosis and treatment. This is a four-phase project and we are currently in the pre-implementation phase wherein we are collecting baseline data regarding time lag between seizure occurrence, detection and treatment.`,
    category: "Implementation Science",
    status: "active",
    start_date: "2023-01-01",
    end_date: "2025-12-31",
    image: "/images/project-1.png",
    images: [
      "/images/project-1.png",
      "/images/placeholder.jpg",
      "/images/placeholder.jpg",
    ],
    tags: [
      "Neuromonitoring",
      "EEG",
      "Seizure Detection",
      "Pediatric Critical Care",
    ],
    link: "/projects/nuanced",
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
    long_description: `This study aims to characterize functional and effective brain connectivity in critically ill children at varying degrees of risk for delirium. As part of this study, we enroll critically ill children at low-risk and high-risk for PICU delirium. We track their neurocognitive state using clinical behavioral scores, electroencephalography (EEG) and optical neuroimaging (fNIRS) techniques to identify objective predictors and signatures of delirium in critically ill children.`,
    category: "Clinical Research",
    status: "active",
    start_date: "2023-05-15",
    end_date: "2026-06-30",
    image: "/images/project-2.jpg",
    images: [
      "/images/project-2.jpg",
      "/images/placeholder.jpg",
      "/images/placeholder.jpg",
    ],
    tags: [
      "Brain Connectivity",
      "Delirium",
      "Pediatric Critical Care",
      "EEG",
      "fNIRS",
      "Neuroimaging",
    ],
    link: "/projects/transience",
    funding: "Brain Canada Future Leaders in Brain Research Award",
    objectives: [
      "Characterize brain connectivity patterns in children at risk for PICU delirium",
      "Identify objective neurophysiological markers of delirium",
      "Develop early detection methods using EEG and fNIRS",
      "Improve understanding of delirium pathophysiology in critically ill children",
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
    long_description: `This pilot prospective observational study will use functional neuroimaging (high density EEG, functional MRI and functional near-infrared spectroscopy) to help improve the accuracy and precision of predicting neurological outcomes in unresponsive critically ill children with moderate-severe acquired brain injury. This study is currently awaiting REB approval and will roll out soon.`,
    category: "Clinical Research",
    status: "upcoming",
    start_date: "2024-01-01",
    end_date: "2026-12-31",
    image: "/images/project-3.png",
    images: [
      "/images/project-3.png",
      "/images/placeholder.jpg",
      "/images/placeholder.jpg",
    ],
    tags: [
      "Acquired Brain Injury",
      "Outcome Prediction",
      "Neuroimaging",
      "EEG",
      "fMRI",
      "fNIRS",
      "Pediatric Critical Care",
    ],
    link: "/projects/predict-abi",
    funding: "AMOSO Innovation Fund",
    objectives: [
      "Develop accurate outcome prediction models for children with ABI",
      "Utilize multimodal neuroimaging for comprehensive assessment",
      "Identify early biomarkers of neurological recovery",
      "Improve prognostic accuracy in unresponsive pediatric patients",
    ],
    team_members: [
      { name: "Dr. Ganesan", role: "Principal Investigator" },
      { name: "LHSC Team", role: "Clinical Partners" },
    ],
  },
  {
    slug: "above",
    title: "ABOVE",
    description:
      "Advancing Brain Outcomes in paediatric critically ill patients sedated with Volatile Anesthetic Agents",
    long_description: `ABOVE is a pilot, multicenter, vanguard randomized controlled trial (RCT) to assess the feasibility of accruing patients, delivering inhaled anesthetics, and ascertaining outcomes in preparation for a definitive trial. This definitive trial will evaluate if inhaled anesthetics (intervention), compared to IV sedative agents (comparator), improves delirium in mechanically ventilated children. This trial will run for 36 months and aims to recruit a total of 60 patients between 2 sites.`,
    category: "Clinical Trial",
    status: "active",
    start_date: "2024-01-15",
    end_date: "2026-12-31",
    image: "/images/project-4.jpeg",
    images: [
      "/images/project-4.jpeg",
      "/images/placeholder.jpg",
      "/images/placeholder.jpg",
    ],
    tags: [
      "Clinical Trial",
      "Delirium",
      "Mechanical Ventilation",
      "Inhaled Anesthetics",
      "Pediatric Critical Care",
      "Multicenter Study",
    ],
    link: "/projects/above",
    funding: "Investigator Initiated Trial",
    objectives: [
      "Assess feasibility of patient accrual and intervention delivery",
      "Compare effectiveness of inhaled anesthetics vs. IV sedatives",
      "Evaluate impact on delirium in mechanically ventilated children",
      "Establish protocols for definitive multicenter trial",
    ],
    team_members: [
      { name: "Dr. Ganesan", role: "Co-Principal Investigator" },
      {
        name: "Dr. Angela Jerath",
        role: "Principal Investigator (Sunnybrook)",
      },
      { name: "SickKids Team", role: "Collaborating Site" },
      { name: "Sunnybrook Team", role: "Lead Site" },
    ],
    additional_info:
      "This is an Investigator Initiated Trial with Sunnybrook as the lead site (Dr. Angela Jerath) and SickKids as the other participating site.",
  },
  {
    slug: "norse",
    title: "NORSE",
    description: "New Onset Refractory Status Epilepticus Registry",
    long_description: `This study aims to collect health related data and biological samples that will enable researchers to understand the cause of cryptogenic new-onset refractory status epilepticus (NORSE), to identify the key determinants of outcome and to determine the best management strategy.`,
    category: "Clinical Research",
    status: "active",
    start_date: "2023-03-01",
    end_date: "2026-03-31",
    image: "/images/project-5.jpeg",
    images: [
      "/images/project-5.jpeg",
      "/images/placeholder.jpg",
      "/images/placeholder.jpg",
    ],
    tags: [
      "Epilepsy",
      "Status Epilepticus",
      "Biomarkers",
      "Registry",
      "Multicenter Study",
    ],
    link: "/projects/norse",
    funding: "Registry Study",
    objectives: [
      "Collect comprehensive health data on NORSE patients",
      "Identify key determinants of outcome",
      "Determine optimal management strategies",
      "Establish multicenter registry",
    ],
    team_members: [
      { name: "Dr. Ganesan", role: "Site Investigator" },
      { name: "LHSC Team", role: "Clinical Partners" },
    ],
  },
];

async function addMissingProjects() {
  console.log("🚀 Adding missing research projects...");

  try {
    // Get existing slugs
    const { data: existing, error: fetchError } = await supabase
      .from("projects")
      .select("slug");
    if (fetchError) {
      console.error("❌ Error fetching existing projects:", fetchError);
      return;
    }
    const existingSlugs = (existing || []).map((p) => p.slug);
    const toInsert = projects.filter((p) => !existingSlugs.includes(p.slug));
    if (toInsert.length === 0) {
      console.log("✅ All static projects already exist in the database.");
      return;
    }
    const { data, error } = await supabase
      .from("projects")
      .insert(toInsert)
      .select();
    if (error) {
      console.error("❌ Error inserting projects:", error);
      return;
    }
    console.log(`✅ Successfully added ${data.length} projects.`);
    data.forEach((proj) => {
      console.log(`- ${proj.title} (${proj.slug})`);
    });
  } catch (err) {
    console.error("❌ Unexpected error:", err);
  }
}

addMissingProjects();
