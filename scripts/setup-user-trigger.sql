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
            COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
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
GRANT ALL ON public.users_id_seq TO anon, authenticated; 