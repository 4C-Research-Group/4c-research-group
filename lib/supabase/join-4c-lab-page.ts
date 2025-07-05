import { createClient } from "./server";
import type { Join4CLabPage } from "@/lib/types/join-4c-lab-page";

export async function getJoin4CLabPage(): Promise<Join4CLabPage | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("join_4c_lab_page")
    .select("*")
    .limit(1)
    .single();
  if (error) {
    console.error("Error fetching join 4c lab page:", error);
    return null;
  }
  return data as Join4CLabPage;
}

export async function updateJoin4CLabPage(
  updates: Partial<Omit<Join4CLabPage, "id" | "updated_at">>
): Promise<Join4CLabPage | null> {
  const supabase = createClient();

  // First, check if a record exists
  const { data: existingData, error: checkError } = await supabase
    .from("join_4c_lab_page")
    .select("id")
    .limit(1)
    .single();

  if (checkError && checkError.code === "PGRST116") {
    // No record exists, create one with default values
    const defaultValues = {
      hero_title: "Join Mission 4C",
      hero_description:
        "We are always looking for passionate students to join our team. If you are interested in joining our team, please send your CV to:",
      hero_email: "rishi.ganesan@lhsc.on.ca",
      intro_title:
        "Read more about previous students' experiences with Mission 4C below!",
      card1_title: "Research Excellence",
      card1_description:
        "Work on cutting-edge research in cognition, consciousness, and critical care. Gain hands-on experience with state-of-the-art methodologies and technologies.",
      card2_title: "Collaborative Environment",
      card2_description:
        "Join a diverse team of researchers, clinicians, and students. Learn from experts and contribute to meaningful research that makes a difference.",
      card3_title: "Innovation & Growth",
      card3_description:
        "Develop your skills in a supportive environment that encourages innovation and personal growth. Build your research portfolio and network.",
      cta_title: "Ready to Join Our Mission?",
      cta_description:
        "Send your CV today and take the first step towards contributing to groundbreaking research in cognition, consciousness, and critical care.",
      cta_button_text: "Send Your CV",
      cta_button_link: "mailto:rishi.ganesan@lhsc.on.ca",
    };

    const insertData = {
      ...defaultValues,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { data: insertDataResult, error: insertError } = await supabase
      .from("join_4c_lab_page")
      .insert([insertData])
      .select("*")
      .single();

    if (insertError) {
      console.error("Error creating join 4c lab page:", insertError);
      return null;
    }
    return insertDataResult as Join4CLabPage;
  } else if (checkError) {
    console.error("Error checking join 4c lab page:", checkError);
    return null;
  }

  // Record exists, update it
  const { data, error } = await supabase
    .from("join_4c_lab_page")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", existingData.id)
    .select("*")
    .single();

  if (error) {
    console.error("Error updating join 4c lab page:", error);
    return null;
  }
  return data as Join4CLabPage;
}
