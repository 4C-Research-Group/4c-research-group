-- Fix RLS policies for about_pi table
-- Run this in your Supabase SQL Editor

-- Enable RLS
ALTER TABLE about_pi ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY
IF EXISTS "Public can view about_pi" ON about_pi;
DROP POLICY
IF EXISTS "Admins can update about_pi" ON about_pi;
DROP POLICY
IF EXISTS "Admins can insert about_pi" ON about_pi;
DROP POLICY
IF EXISTS "Admins can delete about_pi" ON about_pi;

-- Create policies
CREATE POLICY "Public can view about_pi" ON about_pi
  FOR
SELECT USING (true);

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