export interface AboutPI {
  id: string;
  name: string;
  title: string;
  pronouns: string;
  image_url: string;
  hero_description: string;
  linkedin_url?: string;
  google_scholar_url?: string;
  researchgate_url?: string;
  orcid_url?: string;
  about_content: string;
  current_positions: Position[];
  education: Education[];
  professional_experience: Experience[];
  research_awards: Award[];
  skills: SkillCategory[];
  volunteering: Volunteer[];
  recommendations: Recommendation[];
  licenses_certifications: License[];
  organizations: Organization[];
  publications: Publication[];
  updated_at: string;
}

export interface Position {
  title: string;
  subtitle: string;
}

export interface Education {
  title: string;
  subtitle: string;
  note?: string;
}

export interface Experience {
  title: string;
  subtitle: string;
}

export interface Award {
  title: string;
  subtitle: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Volunteer {
  organization: string;
  role: string;
  period: string;
}

export interface Recommendation {
  name: string;
  title: string;
  institution: string;
  text: string;
}

export interface License {
  name: string;
  type: string;
  expiry: string;
}

export interface Organization {
  name: string;
  role: string;
}

export interface Publication {
  title: string;
  journal: string;
  year: string;
  doi: string;
}
