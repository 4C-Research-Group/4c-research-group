-- Update the education data with the correct structure and content
update about_pi 
set education = '[
  {
    "title": "Clinical-Research Fellowship, Pediatric Critical Care Medicine Residency Program",
    "subtitle": "University of Toronto (2017–2018)"
  },
  {
    "title": "Advanced Fellowship, Pediatric Neurocritical Care",
    "subtitle": "University of Toronto (2016–2017)"
  },
  {
    "title": "Doctorate in Medicine (D.M.), Pediatric Critical Care",
    "subtitle": "PGIMER, Chandigarh, India (2013–2016)",
    "note": "Outstanding – Best resident – Bronze medal"
  },
  {
    "title": "M.D., Pediatrics Residency Program",
    "subtitle": "PGIMER, Chandigarh, India (2010–2012)",
    "note": "Outstanding – Best resident – Bronze medal"
  },
  {
    "title": "MBBS, Medicine",
    "subtitle": "JIPMER, Puducherry (2004–2009)",
    "note": "Outstanding – Best outgoing Graduate\nPresident, JIPMER Students Association (2007); Secretary, JSA-RDA joint committee for Student Rights; President, Consortium of Medical Students Against Reservation"
  }
]',
    updated_at = now()
where id is not null; 