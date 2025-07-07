-- Sync missing users from auth.users to public.users
-- Run this in your Supabase SQL Editor

-- Insert users that exist in auth.users but not in public.users
INSERT INTO public.users
    (id, email, role, created_at, updated_at)
SELECT
    au.id,
    au.email,
    'user' as role, -- Default role for existing users
    au.created_at,
    COALESCE(au.updated_at, au.created_at) as updated_at
FROM auth.users au
    LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL;

-- Show the results
SELECT
    'Users synced' as action,
    COUNT(*) as count
FROM (
    SELECT au.id
    FROM auth.users au
        LEFT JOIN public.users pu ON au.id = pu.id
    WHERE pu.id IS NULL
) as missing_users;

-- Show current state after sync
    SELECT
        'auth.users' as table_name,
        COUNT(*) as user_count
    FROM auth.users
UNION ALL
    SELECT
        'public.users' as table_name,
        COUNT(*) as user_count
    FROM public.users; 