-- Disable RLS on users table to allow admin operations
-- Run this in your Supabase SQL Editor

-- Disable RLS
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables
WHERE tablename = 'users';

-- Test: Update a user role manually to verify it works
UPDATE public.users 
SET role = 'admin', updated_at = NOW()
WHERE id = 'd1c70893-f9b2-4bd4-9148-052fdd25397e';

-- Show the result
SELECT id, email, role, updated_at
FROM public.users
WHERE id = 'd1c70893-f9b2-4bd4-9148-052fdd25397e'; 