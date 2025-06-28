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

async function checkTeamData() {
  console.log("🔍 Checking team data in database...");

  try {
    const { data: teamMembers, error: teamError } = await supabase
      .from("team_members")
      .select("*")
      .order("display_order");

    const { data: testimonials, error: testimonialError } = await supabase
      .from("testimonials")
      .select("*")
      .order("display_order");

    if (teamError) {
      console.error("❌ Error fetching team members:", teamError);
      return;
    }

    if (testimonialError) {
      console.error("❌ Error fetching testimonials:", testimonialError);
      return;
    }

    console.log("\n📋 Team Members:");
    console.log(`Total: ${teamMembers?.length || 0}`);
    if (teamMembers && teamMembers.length > 0) {
      teamMembers.forEach((member, index) => {
        console.log(
          `${index + 1}. ${member.name} - ${member.role} (ID: ${member.id})`
        );
      });
    }

    console.log("\n💬 Testimonials:");
    console.log(`Total: ${testimonials?.length || 0}`);
    if (testimonials && testimonials.length > 0) {
      testimonials.forEach((testimonial, index) => {
        console.log(
          `${index + 1}. ${testimonial.name} - ${testimonial.role} (ID: ${testimonial.id})`
        );
      });
    }
  } catch (error) {
    console.error("❌ Unexpected error:", error);
  }
}

checkTeamData();
