-- Create a function to update user roles
-- Run this in your Supabase SQL Editor

-- Create the function
CREATE OR REPLACE FUNCTION update_user_role
(user_id UUID, new_role TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update the user role
  UPDATE public.users 
  SET role = new_role, updated_at = NOW()
  WHERE id = user_id;

  -- Return true if a row was updated
  RETURN FOUND;
END;
$$;

-- Grant execute permission to the service role
GRANT EXECUTE ON FUNCTION update_user_role
(UUID, TEXT) TO service_role;

-- Test the function
SELECT update_user_role('d1c70893-f9b2-4bd4-9148-052fdd25397e', 'admin');

-- Show the result
SELECT id, email, role, updated_at
FROM public.users
WHERE id = 'd1c70893-f9b2-4bd4-9148-052fdd25397e'; 