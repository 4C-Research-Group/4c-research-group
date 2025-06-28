import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing required environment variables");
  console.error(
    "Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Team members data
const teamMembers = [
  {
    name: "Dr. Rishi Ganesan",
    role: "Head of the 4C Research Group",
    superpower:
      "Believing that something magical is happening within and around us every moment",
    bio: "Dr. Rishi Ganesan is a paediatric intensive care physician-researcher with additional expertise in paediatric neurocritical care. He is a physician in the Division of Paediatric Critical Care Medicine at the Children's Hospital - London Health Sciences Centre, Assistant Professor in the Department of Paediatrics at the Schulich School of Medicine (Western University) and an Associate Scientist at the Lawson Health Research Institute.",
    education: "MD, PhD",
    location: "London, Ontario",
    image_url: "/team/team-1.jpg",
    email: "rishi.ganesan@lhsc.on.ca",
    linkedin_url: "https://linkedin.com/in/rishi-ganesan",
    is_principal_investigator: true,
    is_active: true,
    display_order: 0,
  },
  {
    name: "Maysaa Assaf",
    role: "Clinical Research Coordinator",
    superpower: "My smile!",
    bio: null,
    education: null,
    location: null,
    image_url: "/team/team-2.jpg",
    email: null,
    linkedin_url: null,
    is_principal_investigator: false,
    is_active: true,
    display_order: 1,
  },
  {
    name: "Karen Wong",
    role: "PhD Student",
    superpower: "I play on the Women's Football team at Western!",
    bio: null,
    education: null,
    location: null,
    image_url: "/team/team-3.jpg",
    email: null,
    linkedin_url: null,
    is_principal_investigator: false,
    is_active: true,
    display_order: 2,
  },
  {
    name: "Brian Krivoruk",
    role: "MSc Student",
    superpower: "Making music and DJing as a side job!",
    bio: null,
    education: null,
    location: null,
    image_url: "/team/team-4.jpg",
    email: null,
    linkedin_url: null,
    is_principal_investigator: false,
    is_active: true,
    display_order: 3,
  },
  {
    name: "Hiruthika Ravi",
    role: "MSc Student",
    superpower: "Intense puzzler (2000+ pieces especially!)",
    bio: null,
    education: null,
    location: null,
    image_url: "/team/team-5.jpg",
    email: null,
    linkedin_url: null,
    is_principal_investigator: false,
    is_active: true,
    display_order: 4,
  },
  {
    name: "Srinidhi Srinivasan",
    role: "Research Assistant",
    superpower: "I am a long-distance runner!",
    bio: null,
    education: null,
    location: null,
    image_url: "/team/team-6.jpg",
    email: null,
    linkedin_url: null,
    is_principal_investigator: false,
    is_active: true,
    display_order: 5,
  },
  {
    name: "Kyle Sun",
    role: "MSc Student",
    superpower: "Still searching for my superpower... check back later!",
    bio: null,
    education: null,
    location: null,
    image_url: "/team/team-7.jpg",
    email: null,
    linkedin_url: null,
    is_principal_investigator: false,
    is_active: true,
    display_order: 6,
  },
  {
    name: "Tallulah Nyland",
    role: "MSc Student",
    superpower: "Still searching for my superpower... check back later!",
    bio: null,
    education: null,
    location: null,
    image_url: "/team/team-8.jpg",
    email: null,
    linkedin_url: null,
    is_principal_investigator: false,
    is_active: true,
    display_order: 7,
  },
  {
    name: "Daniela Carvalho",
    role: "Research Assistant",
    superpower: "Major bookworm! (Guess my favourite genre)",
    bio: null,
    education: null,
    location: null,
    image_url: "/team/team-9.jpg",
    email: null,
    linkedin_url: null,
    is_principal_investigator: false,
    is_active: true,
    display_order: 8,
  },
  {
    name: "Sukhnoor Riar",
    role: "BSc Student in Biology and Medical Science",
    superpower: "Quoting Bollywood songs and movies!",
    bio: null,
    education: null,
    location: null,
    image_url: "/team/team-10.jpg",
    email: null,
    linkedin_url: null,
    is_principal_investigator: false,
    is_active: true,
    display_order: 9,
  },
  {
    name: "Sara Gehlaut",
    role: "BHSc student in Health Sciences and Biology",
    superpower: "Bollywood trivia!",
    bio: null,
    education: null,
    location: null,
    image_url: "/team/team-11.jpg",
    email: null,
    linkedin_url: null,
    is_principal_investigator: false,
    is_active: true,
    display_order: 10,
  },
];

// Testimonials data
const testimonials = [
  {
    name: "Julia",
    role: "DDS Student",
    quote:
      "Working with Dr. Ganesan's lab during my clinical rotation has been a valuable experience that I am extremely grateful for. Being immersed in the realm of critical care over the span of 8 weeks allowed me to gain insight into how research is conducted at the bedside. It was evident that Dr. Ganesan, Maysaa, and the lab team strongly value mentorship, as they were always very supportive and available to provide my team and I with guidance on our research projects and in between observership sessions. I look forward to continue working on my research project with the 4C research group, and will carry forth my knowledge regarding pediatric care, and the environmental impact of anesthetics into my future career as a (hopefully pediatric) dentist!",
    bio: "Julia completed her BSc. (Honours) in Behaviour, Cognition, and Neuroscience at the University of Windsor, and her MSc. in Interdisciplinary Medical Sciences at Western University where she completed her clinical rotation under the supervision of Dr. Ganesan. In Fall 2024, she started her first year of the Doctor of Dental Surgery (DDS) program at the Schulich School of Medicine and Dentistry at Western University.",
    education:
      "BSc (Honours) in Behaviour, Cognition, and Neuroscience, University of Windsor; MSc in Interdisciplinary Medical Sciences, Western University; DDS Student at Schulich School of Medicine and Dentistry, Western University",
    image_url: "/team/team-12.jpg",
    is_active: true,
    display_order: 0,
  },
  {
    name: "Devorah",
    role: "Research Assistant",
    quote:
      "I had the privilege of working under the supervision of Dr. Ganesan, alongside three classmates, as a component of my master's program at Western University. I was lucky to be welcomed so generously by Dr. Ganesan, Maysaa, and the graduate students in the lab. In the process of collaborating on various projects of the lab, with a focus on the Predict-ABI study, I learned about clinical research protocols as well as skills in applying fNIRS and EEG functional neuroimaging techniques. One of my favorite parts of the rotation was shadowing Dr. Ganesan in the PCCU during rounds! Dr. Ganesan is an excellent mentor. Their willingness to support me as a student and their investment in my success was what made the experience one-of-a-kind!",
    bio: "Devorah completed her undergraduate degree in cognitive and developmental neurosciences (BSc) at Western University, and a master's in interdisciplinary medical sciences (MSC) at Western University. Through her education, Devorah has gained several translational and technical skills that she hopes to apply in her future career in healthcare.",
    education:
      "BSc in Cognitive and Developmental Neurosciences, Western University; MSc in Interdisciplinary Medical Sciences, Western University",
    image_url: "/team/team-13.jpg",
    is_active: true,
    display_order: 1,
  },
  {
    name: "Daniela",
    role: "Research Assistant",
    quote:
      "I had the pleasure of having Dr. Ganesan as my supervisor during my clinical-based rotation as a component of my MSc. in Interdisciplinary Medical Sciences. This opportunity was highly insightful and allowed me to gain exposure to various aspects of clinic research, such as consent and the REB application process. Dr. Ganesan, Maysaa, and all the other lab members were extremely welcoming to my group and I and were very helpful throughout the rotation as we navigated this new environment. I could not be more grateful to have been paired with Dr. Ganesan and look forward to what my future brings as a Research Assistant with the lab!",
    bio: "Daniela completed her Bachelor of Life Sciences (Honours) degree at McMaster University and went on to complete her MSc. In Interdisciplinary Medical Sciences at the University of Western Ontario. Through her master's program, she completed a clinical-based rotation, where she was able to gain shadowing and research experience. Daniela will now be continuing to pursue her research interests in Dr. Ganesan's lab as a Research Assistant.",
    education:
      "BSc (Honours) in Life Sciences, McMaster University; MSc in Interdisciplinary Medical Sciences, Western University",
    image_url: "/team/team-9.jpg",
    is_active: true,
    display_order: 2,
  },
  {
    name: "Hafsa",
    role: "MSc Student",
    quote:
      "I had the privilege of completing my clinical research rotation under the supervision of Dr. Ganesan as part of my master's program. This experience has been extremely rewarding as I've gotten the opportunity to gain insight into clinical research and the vital role it plays in the PCCU. I was able to learn about the use of various functional neuroimaging tools and everything that goes into the implementation phase of a research project. Dr. Ganesan, Maysaa and all other lab members were a wonderful group to work with. I will always be grateful for their support and mentorship as I continue with my learning journey.",
    bio: "Hafsa completed her bachelor's in psychology, Neuroscience, and behaviour at McMaster University. She is currently completing her MSc. in Interdisciplinary Medical Sciences at the University of Western Ontario. Her research interests focus on neuroscience, child health and improving health outcomes in marginalized populations.",
    education:
      "BSc in Psychology, Neuroscience, and Behaviour, McMaster University; Current MSc Student in Interdisciplinary Medical Sciences, Western University",
    image_url: null,
    is_active: true,
    display_order: 3,
  },
];

async function populateTeamData() {
  console.log("🚀 Starting to populate team data...");

  try {
    // Check if data already exists
    const { data: existingTeamMembers } = await supabase
      .from("team_members")
      .select("id")
      .limit(1);

    const { data: existingTestimonials } = await supabase
      .from("testimonials")
      .select("id")
      .limit(1);

    if (existingTeamMembers && existingTeamMembers.length > 0) {
      console.log(
        "⚠️  Team members already exist in the database. Skipping..."
      );
    } else {
      console.log("📋 Adding team members...");
      const { data: teamMembersData, error: teamMembersError } = await supabase
        .from("team_members")
        .insert(teamMembers)
        .select();

      if (teamMembersError) {
        console.error("❌ Error adding team members:", teamMembersError);
        return;
      }

      console.log(
        `✅ Successfully added ${teamMembersData.length} team members`
      );
    }

    if (existingTestimonials && existingTestimonials.length > 0) {
      console.log(
        "⚠️  Testimonials already exist in the database. Skipping..."
      );
    } else {
      console.log("💬 Adding testimonials...");
      const { data: testimonialsData, error: testimonialsError } =
        await supabase.from("testimonials").insert(testimonials).select();

      if (testimonialsError) {
        console.error("❌ Error adding testimonials:", testimonialsError);
        return;
      }

      console.log(
        `✅ Successfully added ${testimonialsData.length} testimonials`
      );
    }

    console.log("🎉 Team data population completed successfully!");

    // Display summary
    const { data: finalTeamMembers } = await supabase
      .from("team_members")
      .select("id, name, role")
      .order("display_order");

    const { data: finalTestimonials } = await supabase
      .from("testimonials")
      .select("id, name, role")
      .order("display_order");

    console.log("\n📊 Summary:");
    console.log(`Team Members: ${finalTeamMembers?.length || 0}`);
    console.log(`Testimonials: ${finalTestimonials?.length || 0}`);
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

populateTeamData();
