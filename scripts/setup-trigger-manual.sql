-- Run this SQL in your Supabase SQL Editor to set up automatic user creation

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user
()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users
        (id, email, name, role, created_at, updated_at)
    VALUES
        (
            NEW.id,
            NEW.email,
            COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
            'user',
            NOW(),
            NOW()
  );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created
ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER
INSERT ON
auth.users
FOR EACH ROW
EXECUTE
PROCEDURE public.handle_new_user
();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.users TO anon, authenticated;

-- Test the trigger by checking if it exists
SELECT
    trigger_name,
    event_manipulation,
    event_object_table,
    action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created'; 