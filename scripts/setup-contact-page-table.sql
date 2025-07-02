-- Create the contact_page table for editable contact info
create table if not exists contact_page (
  id uuid primary key default gen_random_uuid(),
  address text not null,
  phone text not null,
  email text not null,
  research_coordinator_name text not null,
  research_coordinator_email text not null,
  hours text not null,
  hero_title text not null,
  hero_description text not null,
  map_embed_url text,
  updated_at timestamptz not null default now()
);

-- Insert a default row if table is empty
insert into contact_page (
  id, address, phone, email, research_coordinator_name, research_coordinator_email, hours, hero_title, hero_description, map_embed_url
) values (
  gen_random_uuid(),
  '800 Commissioners Rd E\nLondon, ON N6A 5W9',
  '(519) 685-8500 Ext. 74702',
  'rishi.ganesan@lhsc.on.ca',
  'Ms. Maysaa Assaf',
  'Maysaa.Assaf@lhsc.on.ca',
  'Monday - Friday: 9:00 AM - 5:00 PM\nSaturday - Sunday: Closed',
  'Get In Touch',
  'Let us know if you are interested in learning more about our research, collaborating with our team, or contributing to our mission. If you are a student looking for opportunities to participate in research, please do not hesitate to reach out!',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5979841.431727101!2d-90.98107327499999!3d42.960482299999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882ef0fa90d42453%3A0x1e8dae5de3acaae!2sVictoria%20Hospital%20%26%20Children''s%20Hospital!5e0!3m2!1sen!2sca!4v1751160990375!5m2!1sen!2sca'
) on conflict do nothing; 