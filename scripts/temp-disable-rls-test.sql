-- Temporarily disable RLS for testing
-- Run this in your Supabase SQL Editor

-- Step 1: Disable RLS temporarily
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Step 2: Test that we can update manually
UPDATE public.users 
SET role = 'admin', updated_at = NOW()
WHERE id = 'd1c70893-f9b2-4bd4-9148-052fdd25397e';

-- Step 3: Show the result
SELECT id, email, role, updated_at 
FROM public.users 
WHERE id = 'd1c70893-f9b2-4bd4-9148-052fdd25397e';

-- Step 4: Re-enable RLS with simple policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Step 5: Drop all existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Service role can access all data" ON public.users;
DROP POLICY IF EXISTS "Admins can manage all users" ON public.users;
DROP POLICY IF EXISTS "Admins can update any user" ON public.users;
DROP POLICY IF EXISTS "Authenticated users can view all users" ON public.users;
DROP POLICY IF EXISTS "All users can view all users" ON public.users;
DROP POLICY IF EXISTS "Service role full access" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Service role can update users" ON public.users;

-- Step 6: Create minimal working policies
-- Allow service role full access (this should work)
CREATE POLICY "Service role bypass"
ON public.users FOR ALL
USING (auth.role() = 'service_role');

-- Allow authenticated users to view all users
CREATE POLICY "View all users"
ON public.users FOR SELECT
USING (auth.role() = 'authenticated');

-- Show final policies
SELECT 
    policyname,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'users'
ORDER BY policyname; 