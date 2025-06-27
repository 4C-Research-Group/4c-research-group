-- Fix RLS policies for blog_comments table
-- Run these commands in your Supabase SQL Editor

-- First, let's check if the table exists and drop existing policies
DROP POLICY
IF EXISTS "Users can view approved comments" ON blog_comments;
DROP POLICY
IF EXISTS "Authenticated users can create comments" ON blog_comments;
DROP POLICY
IF EXISTS "Users can update own comments" ON blog_comments;
DROP POLICY
IF EXISTS "Users can delete own comments" ON blog_comments;
DROP POLICY
IF EXISTS "Admins can do everything" ON blog_comments;

-- Create simpler, more permissive policies for testing
-- Users can view all comments (for now)
CREATE POLICY "Users can view all comments" ON blog_comments
    FOR
SELECT USING (true);

-- Authenticated users can create comments
CREATE POLICY "Authenticated users can create comments" ON blog_comments
    FOR
INSERT WITH CHECK (auth.uid() IS NOT NULL)
;

-- Users can update their own comments
CREATE POLICY "Users can update own comments" ON blog_comments
    FOR
UPDATE USING (auth.uid()
= user_id);

-- Users can delete their own comments
CREATE POLICY "Users can delete own comments" ON blog_comments
    FOR
DELETE USING (auth.uid
() = user_id);

-- Admins can do everything
CREATE POLICY "Admins can do everything" ON blog_comments
    FOR ALL USING
(
        EXISTS
(
            SELECT 1
FROM users
WHERE users.id = auth.uid() AND users.role = 'admin'
        )
);

-- Test the policies
-- This should work now for authenticated users 