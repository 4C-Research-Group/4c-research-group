import { supabase } from "@/lib/supabase/client";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  superpower?: string;
  bio?: string;
  education?: string;
  location?: string;
  image_url?: string;
  email?: string;
  linkedin_url?: string;
  twitter_url?: string;
  phone?: string;
  is_principal_investigator: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  bio: string;
  education: string;
  image_url?: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTeamMemberData {
  name: string;
  role: string;
  superpower?: string;
  bio?: string;
  education?: string;
  location?: string;
  image_url?: string;
  email?: string;
  linkedin_url?: string;
  twitter_url?: string;
  phone?: string;
  is_principal_investigator?: boolean;
  display_order?: number;
  is_active?: boolean;
}

export interface CreateTestimonialData {
  name: string;
  role: string;
  quote: string;
  bio: string;
  education: string;
  image_url?: string;
  display_order?: number;
  is_active?: boolean;
}

export interface UpdateTeamMemberData extends Partial<CreateTeamMemberData> {}

export interface UpdateTestimonialData extends Partial<CreateTestimonialData> {}

// Team Members functions
export async function getTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching team members:", error);
    throw error;
  }

  return (data as unknown as TeamMember[]) || [];
}

export async function getPrincipalInvestigator(): Promise<TeamMember | null> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("is_principal_investigator", true)
    .eq("is_active", true)
    .single();

  if (error) {
    console.error("Error fetching principal investigator:", error);
    return null;
  }

  return data as unknown as TeamMember;
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching all team members:", error);
    throw error;
  }

  return (data as unknown as TeamMember[]) || [];
}

export async function createTeamMember(
  data: CreateTeamMemberData
): Promise<TeamMember> {
  const { data: newMember, error } = await supabase
    .from("team_members")
    .insert([data as unknown as Record<string, unknown>])
    .select()
    .single();

  if (error) {
    console.error("Error creating team member:", error);
    throw error;
  }

  return newMember as unknown as TeamMember;
}

export async function updateTeamMember(
  id: string,
  data: UpdateTeamMemberData
): Promise<TeamMember> {
  const { data: updatedMember, error } = await supabase
    .from("team_members")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating team member:", error);
    throw error;
  }

  return updatedMember as unknown as TeamMember;
}

export async function deleteTeamMember(id: string): Promise<void> {
  const { error } = await supabase.from("team_members").delete().eq("id", id);

  if (error) {
    console.error("Error deleting team member:", error);
    throw error;
  }
}

export async function getTeamMemberById(
  id: string
): Promise<TeamMember | null> {
  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error fetching team member by id:", error);
    return null;
  }
  return data as unknown as TeamMember;
}

// Testimonials functions
export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }

  return (data as unknown as Testimonial[]) || [];
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching all testimonials:", error);
    throw error;
  }

  return (data as unknown as Testimonial[]) || [];
}

export async function getTestimonial(id: string): Promise<Testimonial> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching testimonial:", error);
    throw error;
  }

  return data as unknown as Testimonial;
}

export async function createTestimonial(
  data: CreateTestimonialData
): Promise<Testimonial> {
  const { data: newTestimonial, error } = await supabase
    .from("testimonials")
    .insert([data as unknown as Record<string, unknown>])
    .select()
    .single();

  if (error) {
    console.error("Error creating testimonial:", error);
    throw error;
  }

  return newTestimonial as unknown as Testimonial;
}

export async function updateTestimonial(
  id: string,
  data: UpdateTestimonialData
): Promise<Testimonial> {
  const { data: updatedTestimonial, error } = await supabase
    .from("testimonials")
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating testimonial:", error);
    throw error;
  }

  return updatedTestimonial as unknown as Testimonial;
}

export async function deleteTestimonial(id: string): Promise<void> {
  const { error } = await supabase.from("testimonials").delete().eq("id", id);

  if (error) {
    console.error("Error deleting testimonial:", error);
    throw error;
  }
}
