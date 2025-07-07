-- Fix RLS policies for users table to allow admin operations (CORRECTED VERSION)
-- Run this in your Supabase SQL Editor

-- First, let's check the current table structure
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'users'
ORDER BY ordinal_position;

-- Check current RLS status
SELECT
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename = 'users';

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
WHERE tablename = 'users'
ORDER BY policyname;

-- Enable RLS if not already enabled
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY
IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY
IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY
IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY
IF EXISTS "Service role can access all data" ON public.users;
DROP POLICY
IF EXISTS "Admins can manage all users" ON public.users;

-- Create comprehensive policies for users table

-- Allow users to view their own profile
CREATE POLICY "Users can view their own profile"
ON public.users
FOR
SELECT
    USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
ON public.users
FOR
UPDATE
USING (auth.uid()
= id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile"
ON public.users
FOR
INSERT
WITH CHECK (auth.uid() =
id);

-- Allow service role to access all data (for admin operations)
CREATE POLICY "Service role can access all data"
ON public.users
FOR ALL
USING
(auth.role
() = 'service_role');

-- Allow authenticated users to view all users (for admin panel)
CREATE POLICY "Authenticated users can view all users"
ON public.users
FOR
SELECT
    USING (auth.role() = 'authenticated');

-- Allow admins to update any user (CORRECTED - no circular dependency)
CREATE POLICY "Admins can update any user"
ON public.users
FOR
UPDATE
USING (
    EXISTS (
        SELECT 1
FROM public.users
WHERE users.id = auth.uid()
    AND users.role = 'admin'
    )
);

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.users TO authenticated;
GRANT ALL ON public.users TO service_role;

-- Show final policies
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
WHERE tablename = 'users'
ORDER BY policyname;

-- Test the policies by checking current user context
SELECT
    auth.uid() as current_user_id,
    auth.role() as current_user_role;

-- Check if there are any users in the table
SELECT
    id,
    email,
    role,
    created_at
FROM users 
LIMIT
5; 