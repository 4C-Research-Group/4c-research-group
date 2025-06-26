-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY
IF EXISTS "Users can view their own profile" ON public.users;
DROP POLICY
IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY
IF EXISTS "Users can insert their own profile" ON public.users;

-- Create policies for users table
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

-- Show current policies
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
WHERE tablename = 'users'; 