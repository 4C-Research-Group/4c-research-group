-- Check if users table exists and show its structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'users';

-- Show existing policies on users table
SELECT * FROM pg_policies 
WHERE tablename = 'users' 
AND schemaname = 'public';

-- Check for existing triggers
SELECT trigger_name, event_manipulation, event_object_table, action_statement
FROM information_schema.triggers
WHERE event_object_table = 'users';
