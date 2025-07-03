-- Setup RLS policies for blog_posts table
-- Run these commands in your Supabase SQL Editor

-- Enable RLS on blog_posts table
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY
IF EXISTS "Public can view blog posts" ON blog_posts;
DROP POLICY
IF EXISTS "Admins can manage blog posts" ON blog_posts;
DROP POLICY
IF EXISTS "Admins can create blog posts" ON blog_posts;
DROP POLICY
IF EXISTS "Admins can update blog posts" ON blog_posts;
DROP POLICY
IF EXISTS "Admins can delete blog posts" ON blog_posts;

-- Create policies for blog_posts table

-- Allow public read access to all blog posts
CREATE POLICY "Public can view blog posts" ON blog_posts
  FOR
SELECT USING (true);

-- Allow admins to create blog posts
CREATE POLICY "Admins can create blog posts" ON blog_posts
  FOR
INSERT WITH CHECK
    (
    EXISTS (
    SELE
T 1 FROM u
WHERE users.id = auth.uid()
    AND users.role = 'admin'
    )
);

-- Allow admins to update blog posts
CREATE POLICY "Admins can update blog posts" ON blog_posts
  FOR
UPDATE USING (
    EXISTS (
      SELECT 1
FROM users
WHERE users.id = auth.uid()
    AND users.role = 'admin'
    )
);

-- Allow admins to delete blog posts
CREATE POLICY "Admins can delete blog posts" ON blog_posts
  FOR
DELETE USING (
    EXISTS
(
      SELECT 1
FROM users
WHERE users.id = auth.uid()
    AND users.role = 'admin'
    )
);

-- Grant necessary permissions
GRANT SELECT ON blog_posts TO authenticated;
GRANT SELECT ON blog_posts TO anon;
GRANT ALL ON blog_posts TO service_role;

-- Show current policies
SELECT
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'blog_posts'; 