-- Update the professional_experience data with the complete information
update about_pi 
set professional_experience = '[
  {
    "title": "Assistant Professor",
    "subtitle": "Western University (Aug 2019 – Present)"
  },
  {
    "title": "Program Director",
    "subtitle": "Western University (Jun 2020 – Aug 2022)"
  },
  {
    "title": "Paediatric Intensivist",
    "subtitle": "London Health Sciences Centre (Aug 2019 – Present)"
  },
  {
    "title": "Assistant Staff Physician",
    "subtitle": "The Hospital for Sick Children, Toronto (Sep 2018 – Jun 2019)"
  },
  {
    "title": "Clinical Neurocritical Care Fellow & RESTRACOMP/C-BMH Integrative Research Fellow",
    "subtitle": "SickKids, Toronto (Jul 2017 – Sep 2018)"
  },
  {
    "title": "Neurocritical Care Specialty Fellow",
    "subtitle": "SickKids, Toronto (Jul 2016 – Jun 2017)"
  },
  {
    "title": "Critical Care Fellow",
    "subtitle": "PGIMER, Chandigarh (Jul 2013 – Jun 2016)"
  },
  {
    "title": "Senior Resident Physician in Pediatric Emergency Medicine",
    "subtitle": "PGIMER, Chandigarh (Jan 2013 – Jun 2013)"
  },
  {
    "title": "Resident Physician",
    "subtitle": "PGIMER, Chandigarh (Jan 2010 – Dec 2012)"
  },
  {
    "title": "Internship",
    "subtitle": "JIPMER, Puducherry (Jan 2009 – Dec 2009)"
  }
]',
    updated_at = now()
where id is not null; 