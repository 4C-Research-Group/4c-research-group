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

// Missing team members data (excluding Dr. Rishi Ganesan who already exists)
const missingTeamMembers = [
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

async function addMissingTeamMembers() {
  console.log("🚀 Adding missing team members...");

  try {
    console.log("📋 Adding team members...");
    const { data: teamMembersData, error: teamMembersError } = await supabase
      .from("team_members")
      .insert(missingTeamMembers)
      .select();

    if (teamMembersError) {
      console.error("❌ Error adding team members:", teamMembersError);
      return;
    }

    console.log(`✅ Successfully added ${teamMembersData.length} team members`);

    // Display summary
    const { data: finalTeamMembers } = await supabase
      .from("team_members")
      .select("id, name, role")
      .order("display_order");

    console.log("\n📊 Summary:");
    console.log(`Total Team Members: ${finalTeamMembers?.length || 0}`);

    if (finalTeamMembers) {
      console.log("\nTeam Members:");
      finalTeamMembers.forEach((member, index) => {
        console.log(`${index + 1}. ${member.name} - ${member.role}`);
      });
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

addMissingTeamMembers();
