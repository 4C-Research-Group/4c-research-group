-- Update the research_awards data with the complete information
update about_pi 
set research_awards = '[
  {
    "title": "Research Focus",
    "subtitle": "Early identification and mitigation of neurological insults in critically ill children, quantitative EEG, systems neuroscience, and improving long-term quality of life in ICU survivors."
  },
  {
    "title": "Publication",
    "subtitle": "Published research on healthcare associated infections in critically ill children, including a validated risk score (Journal of Critical Care)."
  },
  {
    "title": "Awards",
    "subtitle": "Recipient of the S. T. Achar award, IJP Best Thesis award, and Global Health award for research excellence."
  },
  {
    "title": "Teaching",
    "subtitle": "Consistently evaluated as a ''teacher par excellence'' by trainees."
  }
]',
    updated_at = now()
where id is not null; 