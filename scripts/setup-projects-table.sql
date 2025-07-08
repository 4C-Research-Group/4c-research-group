-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  category VARCHAR(100) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('active', 'completed', 'upcoming')),
  start_date DATE NOT NULL,
  end_date DATE,
  image VARCHAR(500),
  images JSONB DEFAULT '[]',
  tags JSONB DEFAULT '[]',
  link VARCHAR(500),
  funding VARCHAR(255),
  objectives JSONB DEFAULT '[]',
  team_members JSONB DEFAULT '[]',
  publications JSONB DEFAULT '[]',
  additional_info TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Projects are viewable by everyone" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Projects are insertable by authenticated users" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Projects are updatable by authenticated users" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Projects are deletable by authenticated users" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO projects (
  slug, title, description, long_description, category, status,
  start_date, end_date, image, images, tags, link, funding, objectives, team_members
) VALUES
  (
    'nuanced',
    'NuANCEd',
    'Nurse-led Advanced Neuromonitoring in Critically ill children with Encephalopathy',
    'NuANCEd is an integrated knowledge translation project that brings together implementation science, quality improvement and research. The project focuses on developing and implementing a nurse-led processed EEG (qEEG) based seizure screening program to minimize delays in seizure diagnosis and treatment. This is a four-phase project and we are currently in the pre-implementation phase wherein we are collecting baseline data regarding time lag between seizure occurrence, detection and treatment.',
    'Implementation Science',
    'active',
    '2023-01-01',
    '2025-12-31',
    '/images/project-1.png',
    '["/images/project-1.png", "/images/placeholder.jpg", "/images/placeholder.jpg"]',
    '["Neuromonitoring", "EEG", "Seizure Detection", "Pediatric Critical Care"]',
    NULL,
    'AMOSO Opportunities Fund',
    '["Develop a nurse-led qEEG-based seizure screening program", "Reduce time to seizure detection and treatment", "Establish baseline data on current seizure detection practices", "Improve outcomes for critically ill children with encephalopathy"]',
    '[{"name": "Dr. Ganesan", "role": "Principal Investigator"}, {"name": "LHSC Team", "role": "Clinical Partners"}]'
  ),
  (
    'transience',
    'TraNSIEnCe',
    'Tracking Neurocognitive States In Encephalopathic Critically ill children',
    'This study aims to characterize functional and effective brain connectivity in critically ill children at varying degrees of risk for delirium. As part of this study, we enroll critically ill children at low-risk and high-risk for PICU delirium. We track their neurocognitive state using clinical behavioral scores, electroencephalography (EEG) and optical neuroimaging (fNIRS) techniques to identify objective predictors and signatures of delirium in critically ill children.',
    'Clinical Research',
    'active',
    '2023-05-15',
    '2026-06-30',
    '/images/project-2.jpg',
    '["/images/project-2.jpg", "/images/placeholder.jpg", "/images/placeholder.jpg"]',
    '["Brain Connectivity", "Delirium", "Pediatric Critical Care", "EEG", "fNIRS", "Neuroimaging"]',
    NULL,
    'Brain Canada Future Leaders in Brain Research Award',
    '["Characterize brain connectivity patterns in children at risk for PICU delirium", "Identify objective neurophysiological markers of delirium", "Develop early detection methods using EEG and fNIRS", "Improve understanding of delirium pathophysiology in critically ill children"]',
    '[{"name": "Dr. Ganesan", "role": "Principal Investigator"}, {"name": "LHSC Team", "role": "Clinical Partners"}]'
  ),
  (
    'predict-abi',
    'PREDICT ABI',
    'Predicting outcomes in critically ill children with acquired brain injury',
    'This pilot prospective observational study will use functional neuroimaging (high density EEG, functional MRI and functional near-infrared spectroscopy) to help improve the accuracy and precision of predicting neurological outcomes in unresponsive critically ill children with moderate-severe acquired brain injury. This study is currently awaiting REB approval and will roll out soon.',
    'Clinical Research',
    'upcoming',
    '2024-01-01',
    '2026-12-31',
    '/images/project-3.png',
    '["/images/project-3.png", "/images/placeholder.jpg", "/images/placeholder.jpg"]',
    '["Acquired Brain Injury", "Outcome Prediction", "Neuroimaging", "EEG", "fMRI", "fNIRS", "Pediatric Critical Care"]',
    NULL,
    'AMOSO Innovation Fund',
    '["Develop accurate outcome prediction models for children with ABI", "Utilize multimodal neuroimaging for comprehensive assessment", "Identify early biomarkers of neurological recovery", "Improve prognostic accuracy in unresponsive pediatric patients"]',
    '[{"name": "Dr. Ganesan", "role": "Principal Investigator"}, {"name": "LHSC Team", "role": "Clinical Partners"}]'
  ),
  (
    'above',
    'ABOVE',
    'Advancing Brain Outcomes in paediatric critically ill patients sedated with Volatile Anesthetic Agents',
    'ABOVE is a pilot, multicenter, vanguard randomized controlled trial (RCT) to assess the feasibility of accruing patients, delivering inhaled anesthetics, and ascertaining outcomes in preparation for a definitive trial. This definitive trial will evaluate if inhaled anesthetics (intervention), compared to IV sedative agents (comparator), improves delirium in mechanically ventilated children. This trial will run for 36 months and aims to recruit a total of 60 patients between 2 sites.',
    'Clinical Trial',
    'active',
    '2024-01-15',
    '2026-12-31',
    '/images/project-4.jpeg',
    '["/images/project-4.jpeg", "/images/placeholder.jpg", "/images/placeholder.jpg"]',
    '["Clinical Trial", "Delirium", "Mechanical Ventilation", "Inhaled Anesthetics", "Pediatric Critical Care", "Multicenter Study"]',
    NULL,
    'Investigator Initiated Trial',
    '["Assess feasibility of patient accrual and intervention delivery", "Compare effectiveness of inhaled anesthetics vs. IV sedatives", "Evaluate impact on delirium in mechanically ventilated children", "Establish protocols for definitive multicenter trial"]',
    '[{"name": "Dr. Ganesan", "role": "Co-Principal Investigator"}, {"name": "Dr. Angela Jerath", "role": "Principal Investigator (Sunnybrook)"}, {"name": "SickKids Team", "role": "Collaborating Site"}, {"name": "Sunnybrook Team", "role": "Lead Site"}]'
  ),
  (
    'norse',
    'NORSE',
    'New Onset Refractory Status Epilepticus Registry',
    'This study aims to collect health related data and biological samples that will enable researchers to understand the cause of cryptogenic new-onset refractory status epilepticus (NORSE), to identify the key determinants of outcome and to determine the best management strategy.',
    'Clinical Research',
    'active',
    '2023-03-01',
    '2026-03-31',
    '/images/project-5.jpeg',
    '["/images/project-5.jpeg", "/images/placeholder.jpg", "/images/placeholder.jpg"]',
    '["Epilepsy", "Status Epilepticus", "Biomarkers", "Registry", "Multicenter Study"]',
    NULL,
    'Registry Study',
    '["Collect comprehensive health data on NORSE patients", "Identify key determinants of outcome", "Determine optimal management strategies", "Establish multicenter registry"]',
    '[{"name": "Dr. Ganesan", "role": "Site Investigator"}, {"name": "LHSC Team", "role": "Clinical Partners"}]'
  )
ON CONFLICT (slug) DO NOTHING; 