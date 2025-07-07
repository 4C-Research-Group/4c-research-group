-- Fix RLS UPDATE permission for service role
-- Run this in your Supabase SQL Editor

-- Check current policies
SELECT
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'users'
ORDER BY policyname;

-- Drop existing policies that might be conflicting
DROP POLICY
IF EXISTS "Service role full access" ON public.users;
DROP POLICY
IF EXISTS "Service role can access all data" ON public.users;
DROP POLICY
IF EXISTS "Admins can update any user" ON public.users;

-- Create a specific policy for service role UPDATE operations
CREATE POLICY "Service role can update users"
ON public.users FOR
UPDATE
USING (auth.role()
= 'service_role');

-- Also create a general service role policy for all operations
CREATE POLICY "Service role full access"
ON public.users FOR ALL
USING
(auth.role
() = 'service_role');

-- Grant explicit UPDATE permission
GRANT UPDATE ON public.users TO service_role;

-- Test the policy
SELECT
    'Testing service role UPDATE policy' as test,
    auth.role() as current_role;

-- Show final policies
SELECT
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'users'
ORDER BY policyname; 