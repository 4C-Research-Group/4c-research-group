-- Check and fix RLS policies for about_pi table
-- Run this in your Supabase SQL Editor

-- First, let's check if the table exists
SELECT
    table_name,
    table_type
FROM information_schema.tables
WHERE table_name = 'about_pi';

-- Check if RLS is enabled
SELECT
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename = 'about_pi';

-- Check existing policies
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
WHERE tablename = 'about_pi';

-- Check if the users table exists and has the right structure
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;

-- Enable RLS if not already enabled
ALTER TABLE about_pi ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to recreate them)
DROP POLICY
IF EXISTS "Public can view about_pi" ON about_pi;
DROP POLICY
IF EXISTS "Admins can update about_pi" ON about_pi;
DROP POLICY
IF EXISTS "Admins can insert about_pi" ON about_pi;

-- Create comprehensive policies
-- Allow public read access
CREATE POLICY "Public can view about_pi" ON about_pi
  FOR
SELECT USING (true);

-- Allow admins to insert (in case table is empty)
CREATE POLICY "Admins can insert about_pi" ON about_pi
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

-- Allow admins to update
CREATE POLICY "Admins can update about_pi" ON about_pi
  FOR
UPDATE USING (
    EXISTS (
      SELECT 1
FROM users
WHERE users.id = auth.uid()
    AND users.role = 'admin'
    )
);

-- Allow admins to delete (optional, for cleanup)
CREATE POLICY "Admins can delete about_pi" ON about_pi
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

-- Verify the policies were created
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
WHERE tablename = 'about_pi'
ORDER BY policyname;

-- Test the policies by checking current user context
SELECT
    auth.uid() as current_user_id,
    auth.role() as current_user_role;

-- Check if there's data in the table
SELECT
    id,
    name,
    updated_at
FROM about_pi 
LIMIT
5;

-- Show table structure
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'about_pi'
ORDER BY ordinal_position; 