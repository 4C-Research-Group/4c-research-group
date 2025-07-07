-- Check current users status
-- Run this in your Supabase SQL Editor

-- Check auth.users (Supabase auth table)
SELECT
    id,
    email,
    created_at,
    updated_at,
    email_confirmed_at,
    last_sign_in_at
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;

-- Check public.users (your custom users table)
SELECT 
    id
,
    email,
    role,
    created_at,
    updated_at
FROM public.users 
ORDER BY created_at DESC
LIMIT 10;

-- Find users that exist in auth.users but not in public.users
SELECT
    au.id,
    au.email,
    au.created_at as auth_created_at
FROM auth.users au
    LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL
ORDER BY au.created_at DESC;

-- Find users that exist in public.users but not in auth.users
SELECT
    pu.id,
    pu.email,
    pu.role,
    pu.created_at as public_created_at
FROM public.users pu
    LEFT JOIN auth.users au ON pu.id = au.id
WHERE au.id IS NULL
ORDER BY pu.created_at DESC;

-- Count total users in each table
    SELECT
        'auth.users' as table_name,
        COUNT(*) as user_count
    FROM auth.users
UNION ALL
    SELECT
        'public.users' as table_name,
        COUNT(*) as user_count
    FROM public.users; 