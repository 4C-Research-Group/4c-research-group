-- Final fix for users table RLS policies
-- Run this in your Supabase SQL Editor

-- Step 1: Temporarily disable RLS to allow immediate fixes
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop all existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Service role can access all data" ON public.users;
DROP POLICY IF EXISTS "Admins can manage all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update any user" ON public.users;
DROP POLICY IF EXISTS "Authenticated users can view all users" ON public.users;
DROP POLICY IF EXISTS "All users can view all users" ON public.users;

-- Step 3: Re-enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Step 4: Create simple, working policies
-- Allow service role full access (for admin operations)
CREATE POLICY "Service role full access"
ON public.users FOR ALL
USING (auth.role() = 'service_role');

-- Allow authenticated users to view all users (for admin panel)
CREATE POLICY "Authenticated users can view all users"
ON public.users FOR SELECT
USING (auth.role() = 'authenticated');

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
ON public.users FOR UPDATE
USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile"
ON public.users FOR INSERT
WITH CHECK (auth.uid() = id);

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

-- Test: Try to update a user role manually
UPDATE public.users 
SET role = 'admin', updated_at = NOW()
WHERE id = 'd1c70893-f9b2-4bd4-9148-052fdd25397e';

-- Show the result
SELECT id, email, role, updated_at 
FROM public.users 
WHERE id = 'd1c70893-f9b2-4bd4-9148-052fdd25397e'; 