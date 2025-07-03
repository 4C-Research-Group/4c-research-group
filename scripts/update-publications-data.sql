-- Update the publications data with the complete information
update about_pi 
set publications = '[
  {
    "title": "Airway Pressure Release Ventilation in Pediatric Acute Respiratory Distress Syndrome. A Randomized Controlled Trial",
    "journal": "American Journal of Respiratory & Critical Care Medicine (AJRCCM)",
    "date": "Nov 1, 2018",
    "summary": "A randomized controlled trial comparing APRV and conventional low–tidal volume ventilation in children with ARDS. The trial was terminated early due to higher mortality in the intervention arm. Ventilator-free days were similar, but APRV showed a trend toward higher mortality. Limitations should be considered while interpreting these results."
  },
  {
    "title": "Clinical profile of scrub typhus in children and its association with hemophagocytic lymphohistiocytosis.",
    "journal": "Indian Pediatrics",
    "date": "Aug 1, 2014",
    "summary": "Study of children with scrub typhus and its association with hemophagocytic lymphohistiocytosis. Scrub typhus is a common cause of unexplained fever in children in northern India, and HLH can occasionally complicate scrub typhus."
  },
  {
    "title": "Hyperactivity, Unexplained Speech Delay, and Coarse Facies—Is It Sanfilippo Syndrome?",
    "journal": "Journal of Child Neurology",
    "date": "Jun 12, 2013",
    "summary": "Case report of a girl with mucopolysaccharidosis-IIIB (Sanfilippo-B syndrome), highlighting the need to consider this diagnosis in children with unexplained speech delay and hyperactivity."
  },
  {
    "title": "Non-pharmacological Interventions in Hypertension: A Community-based Cross-over Randomized Controlled Trial",
    "journal": "Indian Journal of Community Medicine",
    "date": "Jul 1, 2011",
    "summary": "Community-based cross-over RCT testing physical exercise, salt reduction, and yoga for controlling hypertension in young adults. All interventions were effective, with exercise being most effective."
  },
  {
    "title": "Community-based randomized controlled trial of non-pharmacological interventions in prevention and control of hypertension among young adults",
    "journal": "Indian Journal of Community Medicine",
    "date": "Oct 1, 2009",
    "summary": "RCT measuring the efficacy of physical exercise, salt reduction, and yoga in lowering BP among young pre-hypertensives and hypertensives. All interventions were effective; exercise was most effective."
  }
]',
    updated_at = now()
where id is not null; 