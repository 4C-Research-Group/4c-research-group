-- Create the join_4c_lab_page table for editable join page content
create table if not exists join_4c_lab_page (
  id uuid primary key default gen_random_uuid(),
  hero_title text not null,
  hero_description text not null,
  hero_email text not null,
  intro_title text not null,
  card1_title text not null,
  card1_description text not null,
  card2_title text not null,
  card2_description text not null,
  card3_title text not null,
  card3_description text not null,
  cta_title text not null,
  cta_description text not null,
  cta_button_text text not null,
  cta_button_link text not null,
  updated_at timestamptz not null default now()
);

-- Insert a default row if table is empty
insert into join_4c_lab_page (
  id, hero_title, hero_description, hero_email, intro_title,
  card1_title, card1_description, card2_title, card2_description, card3_title, card3_description,
  cta_title, cta_description, cta_button_text, cta_button_link
) values (
  gen_random_uuid(),
  'Join Mission 4C',
  'We are always looking for passionate students to join our team. If you are interested in joining our team, please send your CV to:',
  'rishi.ganesan@lhsc.on.ca',
  'Read more about previous students'' experiences with Mission 4C below!',
  'Research Excellence',
  'Work on cutting-edge research in cognition, consciousness, and critical care. Gain hands-on experience with state-of-the-art methodologies and technologies.',
  'Collaborative Environment',
  'Join a diverse team of researchers, clinicians, and students. Learn from experts and contribute to meaningful research that makes a difference.',
  'Innovation & Growth',
  'Develop your skills in a supportive environment that encourages innovation and personal growth. Build your research portfolio and network.',
  'Ready to Join Our Mission?',
  'Send your CV today and take the first step towards contributing to groundbreaking research in cognition, consciousness, and critical care.',
  'Send Your CV',
  'mailto:rishi.ganesan@lhsc.on.ca'
) on conflict do nothing; 