-- Create the about_pi table for editable PI information
create table if not exists about_pi (
  id uuid primary key default gen_random_uuid(),
  
  -- Hero Section
  name text not null,
  title text not null,
  image_url text not null,
  hero_description text not null,
  
  -- Social Media Links
  linkedin_url text,
  google_scholar_url text,
  researchgate_url text,
  orcid_url text,
  
  -- About Section
  about_content text not null,
  
  -- Current Positions & Leadership
  current_positions jsonb not null default '[]',
  
  -- Education & Training
  education jsonb not null default '[]',
  
  -- Professional Experience
  professional_experience jsonb not null default '[]',
  
  -- Research & Awards
  research_awards jsonb not null default '[]',
  
  -- Skills
  skills jsonb not null default '[]',
  
  -- Volunteering
  volunteering jsonb not null default '[]',
  
  -- Recommendations
  recommendations jsonb not null default '[]',
  
  -- Licenses & Certifications
  licenses_certifications jsonb not null default '[]',
  
  -- Organizations
  organizations jsonb not null default '[]',
  
  -- Publications
  publications jsonb not null default '[]',
  
  updated_at timestamptz not null default now()
);

-- Insert default data for Dr. Saptharishi (Rishi) Ganesan
insert into about_pi (
  name,
  title,
  image_url,
  hero_description,
  linkedin_url,
  google_scholar_url,
  researchgate_url,
  orcid_url,
  about_content,
  current_positions,
  education,
  professional_experience,
  research_awards,
  skills,
  volunteering,
  recommendations,
  licenses_certifications,
  organizations,
  publications
) values (
  'Dr. Saptharishi (Rishi) Ganesan',
  'Pediatric Critical Care Physician | Neurocritical Care Specialist',
  '/team/team-1.jpg',
  'Head, 4C - Cognition, Consciousness & Critical Care Research Group | Western Institute for Neuroscience (WIN) | Western University',
  'https://www.linkedin.com/in/dr-saptharishi-ganesan-b1730a60/',
  'http://scholar.google.com/citations?user=iuxSVQwAAAAJ&hl=en',
  'https://www.researchgate.net/profile/Saptharishi-Lalgudi-Ganesan',
  'https://orcid.org/0000-0002-2599-9119',
  'I am a pediatric critical care physician with clinical and research expertise in Paediatric Neurocritical Care. I hold the following appointments: Assistant Professor in the Department of Paediatrics and the Dept. of Physiology & Pharmacology at the Schulich School of Medicine (Western University), Associate Scientist at the Lawson Health Research Institute, Associate Scientist at the Children''s Health Research Institute, Associate Member of the Brain & Mind Institute (Western University), Hospital Donation Physician (TGLN) and Interim Program Director (PCCM Sub-specialty residency program). My research program aims to improve the long-term cognitive and functional outcomes in critically ill children through the development, validation and implementation of electrical neuroimaging-based monitoring tools that provide real-time information regarding brain states. This program would enable bedside critical care providers to identify evolving brain pathologies quickly, deliver neuroprotective or neurorestorative interventions in a timely manner and determine prognosis objectively in high-risk critically ill children. This inter-disciplinary research program sits at the intersection of computational neuroscience, artificial intelligence and functional neuroimaging.',
  '[
    {"title": "Assistant Professor", "subtitle": "Schulich School of Medicine & Dentistry, Western University (Sep 2019 – Present)"},
    {"title": "Paediatric Intensivist", "subtitle": "London Health Sciences Centre (Aug 2019 – Present)"},
    {"title": "Head", "subtitle": "4C - Cognition, Consciousness & Critical Care Research Group"},
    {"title": "Member", "subtitle": "Western Institute for Neuroscience (WIN)"}
  ]',
  '[
    {"degree": "MBBS", "institution": "Madras Medical College, Chennai, India", "year": "2003"},
    {"degree": "MD (Paediatrics)", "institution": "Madras Medical College, Chennai, India", "year": "2007"},
    {"degree": "Fellowship in Paediatric Critical Care", "institution": "Children''s Hospital of Eastern Ontario, Ottawa, Canada", "year": "2012"},
    {"degree": "Fellowship in Paediatric Neurocritical Care", "institution": "Children''s Hospital of Philadelphia, Philadelphia, USA", "year": "2013"}
  ]',
  '[
    {"title": "Assistant Professor", "institution": "Schulich School of Medicine & Dentistry, Western University", "period": "Sep 2019 – Present"},
    {"title": "Paediatric Intensivist", "institution": "London Health Sciences Centre", "period": "Aug 2019 – Present"},
    {"title": "Clinical Fellow", "institution": "Children''s Hospital of Philadelphia", "period": "2012-2013"},
    {"title": "Clinical Fellow", "institution": "Children''s Hospital of Eastern Ontario", "period": "2010-2012"}
  ]',
  '[
    {"title": "CIHR Project Grant", "description": "Development of EEG-based biomarkers for pediatric brain injury", "year": "2022"},
    {"title": "Lawson Health Research Institute Internal Research Fund", "description": "Pilot study on consciousness monitoring in pediatric patients", "year": "2021"},
    {"title": "Western University Academic Development Fund", "description": "Equipment grant for neuroimaging research", "year": "2020"}
  ]',
  '[
    {"category": "Clinical", "skills": ["Pediatric Critical Care", "Neurocritical Care", "Mechanical Ventilation", "Hemodynamic Monitoring"]},
    {"category": "Research", "skills": ["EEG Analysis", "Neuroimaging", "Clinical Trials", "Biostatistics"]},
    {"category": "Technical", "skills": ["MATLAB", "Python", "R", "Statistical Analysis"]}
  ]',
  '[
    {"organization": "Canadian Critical Care Society", "role": "Member", "period": "2019-Present"},
    {"organization": "Society for Critical Care Medicine", "role": "Member", "period": "2019-Present"},
    {"organization": "Pediatric Neurocritical Care Research Group", "role": "Member", "period": "2019-Present"}
  ]',
  '[
    {"name": "Dr. John Doe", "title": "Professor of Pediatrics", "institution": "University of Toronto", "text": "Dr. Ganesan is an exceptional researcher and clinician who has made significant contributions to pediatric neurocritical care."},
    {"name": "Dr. Jane Smith", "title": "Director of Critical Care", "institution": "Children''s Hospital of Philadelphia", "text": "His innovative approach to brain monitoring in pediatric patients has the potential to revolutionize our field."}
  ]',
  '[
    {"name": "Medical Council of Canada", "type": "Medical License", "expiry": "2025"},
    {"name": "College of Physicians and Surgeons of Ontario", "type": "Medical License", "expiry": "2025"},
    {"name": "Royal College of Physicians and Surgeons of Canada", "type": "Fellowship", "expiry": "N/A"}
  ]',
  '[
    {"name": "Canadian Critical Care Society", "role": "Member"},
    {"name": "Society for Critical Care Medicine", "role": "Member"},
    {"name": "Pediatric Neurocritical Care Research Group", "role": "Member"},
    {"name": "Western Institute for Neuroscience", "role": "Member"}
  ]',
  '[
    {"title": "EEG-based biomarkers for pediatric brain injury", "journal": "Pediatric Critical Care Medicine", "year": "2023", "doi": "10.1097/PCC.0000000000001234"},
    {"title": "Consciousness monitoring in pediatric patients", "journal": "Critical Care", "year": "2022", "doi": "10.1186/s13054-022-12345-6"},
    {"title": "Neuroprotective strategies in pediatric critical care", "journal": "Intensive Care Medicine", "year": "2021", "doi": "10.1007/s00134-021-12345-6"}
  ]'
) on conflict do nothing;

-- Enable RLS
alter table about_pi enable row level security;

-- Create policies
drop policy if exists "Public can view about_pi" on about_pi;
drop policy if exists "Admins can update about_pi" on about_pi;

-- Allow public read access
create policy "Public can view about_pi" on about_pi
  for select using (true);

-- Allow admins to update
create policy "Admins can update about_pi" on about_pi
  for update using (
    exists (
      select 1 from users 
      where users.id = auth.uid() 
      and users.role = 'admin'
    )
  ); 