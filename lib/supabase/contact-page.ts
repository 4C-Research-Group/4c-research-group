import { createClient } from "./server";
import type { ContactPage } from "@/lib/types/contact-page";

export async function getContactPage(): Promise<ContactPage | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("contact_page")
    .select("*")
    .limit(1)
    .single();
  if (error) {
    console.error("Error fetching contact page:", error);
    return null;
  }
  return data as ContactPage;
}

export async function updateContactPage(
  updates: Partial<Omit<ContactPage, "id" | "updated_at">>
): Promise<ContactPage | null> {
  const supabase = createClient();

  // First, check if a record exists
  const { data: existingData, error: checkError } = await supabase
    .from("contact_page")
    .select("id")
    .limit(1)
    .single();

  if (checkError && checkError.code === "PGRST116") {
    // No record exists, create one with default values
    const defaultValues = {
      address: "800 Commissioners Rd E\nLondon, ON N6A 5W9",
      phone: "(519) 685-8500 Ext. 74702",
      email: "rishi.ganesan@lhsc.on.ca",
      research_coordinator_name: "Ms. Maysaa Assaf",
      research_coordinator_email: "Maysaa.Assaf@lhsc.on.ca",
      hours: "Monday - Friday: 9:00 AM - 5:00 PM\nSaturday - Sunday: Closed",
      hero_title: "Get In Touch",
      hero_description:
        "Let us know if you are interested in learning more about our research, collaborating with our team, or contributing to our mission. If you are a student looking for opportunities to participate in research, please do not hesitate to reach out!",
      map_embed_url:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5979841.431727101!2d-90.98107327499999!3d42.960482299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882ef0fa90d42453%3A0x1e8dae5de3acaae!2sVictoria%20Hospital%20%26%20Children's%20Hospital!5e0!3m2!1sen!2sca!4v1751160990375!5m2!1sen!2sca",
    };

    const insertData = {
      ...defaultValues,
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const { data: insertDataResult, error: insertError } = await supabase
      .from("contact_page")
      .insert([insertData])
      .select("*")
      .single();

    if (insertError) {
      console.error("Error creating contact page:", insertError);
      return null;
    }
    return insertDataResult as ContactPage;
  } else if (checkError) {
    console.error("Error checking contact page:", checkError);
    return null;
  }

  // Record exists, update it
  const { data, error } = await supabase
    .from("contact_page")
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq("id", existingData.id)
    .select("*")
    .single();

  if (error) {
    console.error("Error updating contact page:", error);
    return null;
  }
  return data as ContactPage;
}
