-- Fix duplicate key issue in about_pi table
-- This script ensures there's only one row in the table

-- First, let's see what we have in the table
SELECT id, name, updated_at
FROM about_pi
ORDER BY updated_at DESC;

-- Delete all rows except the most recent one
DELETE FROM about_pi 
WHERE id NOT IN (
  SELECT id
FROM (
    SELECT id, ROW_NUMBER() OVER (ORDER BY updated_at DESC) as rn
  FROM about_pi
  ) t
WHERE t.rn = 1
);

-- Verify we now have only one row
SELECT COUNT(*) as total_rows
FROM about_pi;

-- If the table is empty, insert the default data
INSERT INTO about_pi
  (
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
  )
SELECT
  'Dr. Saptharishi (Rishi) Ganesan',
  'Pediatric Critical Care Physician | Neurocritical Care Specialist',
  '/team/team-1.jpg',
  'Head, 4C - Cognition, Consciousness & Critical Care Research Group | Western Institute for Neuroscience (WIN) | Western University',
  'https://www.linkedin.com/in/dr-saptharishi-ganesan-b1730a60/',
  'http://scholar.google.com/citations?user=iuxSVQwAAAAJ&hl=en',
  'https://www.researchgate.net/profile/Saptharishi-Lalgudi-Ganesan',
  'https://orcid.org/0000-0002-2599-9119',
  '<p>I am a pediatric critical care physician with clinical and research expertise in Paediatric Neurocritical Care. I hold the following appointments: <strong>Assistant Professor</strong> in the Department of Paediatrics and the Dept. of Physiology & Pharmacology at the Schulich School of Medicine (Western University), <strong>Associate Scientist</strong> at the Lawson Health Research Institute, <strong>Associate Scientist</strong> at the Children''s Health Research Institute, <strong>Associate Member</strong> of the Brain & Mind Institute (Western University), <strong>Hospital Donation Physician (TGLN)</strong> and <strong>Interim Program Director (PCCM Sub-specialty residency program)</strong>.</p><p>My research program aims to improve the long-term cognitive and functional outcomes in critically ill children through the development, validation and implementation of electrical neuroimaging-based monitoring tools that provide real-time information regarding brain states. This program would enable bedside critical care providers to identify evolving brain pathologies quickly, deliver neuroprotective or neurorestorative interventions in a timely manner and determine prognosis objectively in high-risk critically ill children. This inter-disciplinary research program sits at the intersection of computational neuroscience, artificial intelligence and functional neuroimaging.</p>',
  '[]',
  '[]',
  '[]',
  '[]',
  '[]',
  '[]',
  '[]',
  '[]',
  '[]',
  '[]'
WHERE NOT EXISTS (SELECT 1
FROM about_pi);

-- Final verification
SELECT id, name, updated_at
FROM about_pi; 