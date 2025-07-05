-- Test script to verify about_pi table connection
-- Run this in your Supabase SQL Editor

-- Check if table exists
SELECT 'Table exists' as status, count(*) as row_count 
FROM about_pi;

-- Check table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'about_pi' 
ORDER BY ordinal_position;

-- Check RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'about_pi';

-- Check policies
SELECT policyname, cmd, permissive 
FROM pg_policies 
WHERE tablename = 'about_pi';

-- Test insert (should work if you're admin)
INSERT INTO about_pi (
  name, title, image_url, hero_description, about_content,
  current_positions, education, professional_experience, research_awards,
  skills, volunteering, recommendations, licenses_certifications,
  organizations, publications
) VALUES (
  'Test PI',
  'Test Title',
  '/test.jpg',
  'Test description',
  'Test content',
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
) ON CONFLICT DO NOTHING;

-- Check if insert worked
SELECT 'After insert' as status, count(*) as row_count 
FROM about_pi;

-- Clean up test data
DELETE FROM about_pi WHERE name = 'Test PI';

-- Final count
SELECT 'Final' as status, count(*) as row_count 
FROM about_pi; 